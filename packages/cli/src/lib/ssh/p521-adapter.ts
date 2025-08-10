import {
  BigInt,
  type ECParameters,
  KeyExchangeAlgorithm,
  type KeyPair as DtKeyPair,
  PublicKeyAlgorithm,
  type Signer as DtSigner,
  SshDataReader,
  SshDataWriter,
  type Verifier as DtVerifier,
} from "@microsoft/dev-tunnels-ssh";
import { p521 } from "@noble/curves/nist"; // Node/ESM import path for noble-curves
import { Buffer } from "node:buffer";

// Noble-backed ECDH for P-521 (ecdh-sha2-nistp521)
export class NobleECDH521 extends KeyExchangeAlgorithm {
  constructor(name: string, keySizeInBits: number, hashAlgorithmName: string) {
    // Validate that P-521 uses SHA-512 as per standard
    if (!hashAlgorithmName.includes("512")) {
      throw new Error("P-521 requires SHA-512 hash algorithm");
    }
    super(
      name,
      keySizeInBits,
      hashAlgorithmName,
      64, /* SHA-512 digest length */
    );
  }
  createKeyExchange() {
    // Avoid `this` alias; capture required fields
    const hashDigestLength = this.hashDigestLength;
    const keySizeInBits = this.keySizeInBits;
    const hashAlgorithmName = this.hashAlgorithmName;
    return new (class {
      public readonly digestLength: number = hashDigestLength;
      private secretKey!: Uint8Array;
      private publicKey!: Uint8Array; // 0x04||X||Y uncompressed

      startKeyExchange(): Promise<Buffer> {
        // Use utils.randomSecretKey() to avoid type issues with keygen
        const secretKey = p521.utils.randomSecretKey();
        this.secretKey = secretKey;
        // Uncompressed public key for SSH: 0x04 || X || Y
        this.publicKey = p521.getPublicKey(this.secretKey, false);
        return Promise.resolve(Buffer.from(this.publicKey));
      }

      decryptKeyExchange(exchangeValue: Buffer): Promise<Buffer> {
        if (!this.secretKey) throw new Error("Key exchange not started.");
        const peer = new Uint8Array(exchangeValue);
        // Shared secret as uncompressed point: 0x04 || X || Y
        const shared = p521.getSharedSecret(this.secretKey, peer, false);
        if (shared[0] !== 4) {
          throw new Error("Unexpected shared secret format.");
        }
        const n = Math.ceil(keySizeInBits / 8); // 66 bytes for P-521
        // RFC 5656: use X coordinate as shared secret mpint
        const x = shared.slice(1, 1 + n);
        const mp = BigInt.fromBytes(Buffer.from(x), { unsigned: true })
          .toBytes();
        return Promise.resolve(Buffer.from(mp));
      }

      async sign(data: Buffer): Promise<Buffer> {
        // For KEX, "sign" is H(data) with negotiated hash
        // Map SSH hash names to WebCrypto names
        const algMap: Record<string, string> = {
          "SHA2-256": "SHA-256",
          "SHA2-384": "SHA-384",
          "SHA2-512": "SHA-512",
        };
        const alg = algMap[hashAlgorithmName] || hashAlgorithmName;
        if (!alg || !algMap[hashAlgorithmName]) {
          throw new Error(`Unsupported hash algorithm: ${hashAlgorithmName}`);
        }
        const hashBuffer = await crypto.subtle.digest(alg, data);
        return Buffer.from(hashBuffer);
      }

      dispose(): void {}
    })();
  }
}

// Noble-backed ECDSA for P-521 (ecdsa-sha2-nistp521)
export class NobleECDSA521 extends PublicKeyAlgorithm {
  constructor(name: string, hashAlgorithmName: string) {
    super(name, name, hashAlgorithmName);
  }

  createKeyPair(): DtKeyPair {
    return new NobleECDSA521KeyPair(this.name);
  }

  async generateKeyPair(): Promise<DtKeyPair> {
    const kp = new NobleECDSA521KeyPair(this.name);
    await kp.generate();
    return kp;
  }

  createSigner(keyPair: DtKeyPair): DtSigner {
    if (!(keyPair instanceof NobleECDSA521KeyPair)) {
      throw new TypeError("ECDSA key pair object expected.");
    }
    return new NobleECDSA521SignerVerifier(keyPair, this.hashAlgorithmName);
  }

  createVerifier(keyPair: DtKeyPair): DtVerifier {
    if (!(keyPair instanceof NobleECDSA521KeyPair)) {
      throw new TypeError("ECDSA key pair object expected.");
    }
    return new NobleECDSA521SignerVerifier(keyPair, this.hashAlgorithmName);
  }
}

class NobleECDSA521KeyPair implements DtKeyPair {
  constructor(private algorithmName: string) {}
  publicKey?: Uint8Array; // 0x04||X||Y
  privateKey?: Uint8Array; // 66-byte scalar
  comment: string | null = null;

  generate(): Promise<void> {
    // Use utils.randomSecretKey/getPublicKey to support older type surfaces
    const secretKey = p521.utils.randomSecretKey();
    this.privateKey = secretKey;
    this.publicKey = p521.getPublicKey(secretKey, false);
    return Promise.resolve();
  }

  get hasPublicKey() {
    return !!this.publicKey;
  }
  get hasPrivateKey() {
    return !!this.privateKey;
  }
  get keyAlgorithmName() {
    return this.algorithmName;
  }

  setPublicKeyBytes(keyBytes: Buffer): Promise<void> {
    const r = new SshDataReader(keyBytes);
    const alg = r.readString("ascii");
    if (alg !== this.algorithmName) throw new Error("Algorithm mismatch");
    const curve = r.readString("ascii"); // "nistp521"
    if (curve !== "nistp521") throw new Error("Invalid curve");
    const xy = r.readBinary();
    if (xy[0] !== 4) throw new Error("Expected uncompressed EC point");
    this.publicKey = new Uint8Array(xy);
    return Promise.resolve();
  }

  getPublicKeyBytes(algorithmName?: string): Promise<Buffer | null> {
    if (!this.publicKey) return Promise.resolve(null);
    const alg = algorithmName || this.algorithmName;
    // Calculate exact size: 4 + alg.length + 4 + "nistp521".length + 4 + publicKey.length
    const bufferSize = 12 + alg.length + 8 + this.publicKey.length;
    const w = new SshDataWriter(
      Buffer.alloc(bufferSize),
    );
    w.writeString(alg, "ascii");
    w.writeString("nistp521", "ascii");
    w.writeBinary(Buffer.from(this.publicKey));
    return Promise.resolve(w.toBuffer());
  }

  importParameters(_params: ECParameters): Promise<void> {
    // Not needed for SSH operations - P-521 parameters are fixed
    return Promise.reject(new Error("Not implemented"));
  }

  exportParameters(): Promise<ECParameters> {
    // Not needed for SSH operations - P-521 parameters are fixed
    return Promise.reject(new Error("Not implemented"));
  }

  dispose(): void {}
}

class NobleECDSA521SignerVerifier implements DtSigner, DtVerifier {
  constructor(
    private keyPair: NobleECDSA521KeyPair,
    private hashAlgName: string,
  ) {}

  get digestLength(): number {
    // Maximum SSH signature size: (4+66+1)*2 for two mpints (r,s)
    // 4 bytes length prefix + up to 1 byte padding + 66 bytes value
    return 4 + 1 + 66 + 4 + 1 + 66;
  }

  async sign(data: Buffer): Promise<Buffer> {
    if (!this.keyPair.privateKey) throw new Error("Private key not set");
    const alg = this.hashAlgName.replace("SHA2-", "SHA-");
    const hash = new Uint8Array(await crypto.subtle.digest(alg, data));
    // noble-curves v2 returns signature object; convert to compact bytes
    const sigObj = p521.sign(hash, this.keyPair.privateKey, { prehash: false });
    const compact = sigObj.toBytes("compact");
    if (compact.length !== 132) {
      throw new Error(
        `Unexpected signature size: ${compact.length}, expected 132`,
      );
    }
    const n = 66;
    const r = compact.slice(0, n);
    const s = compact.slice(n);
    const w = new SshDataWriter(Buffer.alloc(this.digestLength));
    w.writeBinary(
      BigInt.fromBytes(Buffer.from(r), { unsigned: true }).toBytes({
        unsigned: true,
        length: 66 + 1,
      }),
    );
    w.writeBinary(
      BigInt.fromBytes(Buffer.from(s), { unsigned: true }).toBytes({
        unsigned: true,
        length: 66 + 1,
      }),
    );
    return w.toBuffer();
  }

  async verify(data: Buffer, signature: Buffer): Promise<boolean> {
    if (!this.keyPair.publicKey) throw new Error("Public key not set");
    const rd = new SshDataReader(signature);
    const rBI = rd.readBigInt();
    const sBI = rd.readBigInt();
    const n = 66;
    const r = rBI.toBytes({ unsigned: true, length: n });
    const s = sBI.toBytes({ unsigned: true, length: n });
    const compact = new Uint8Array(Buffer.concat([r, s]));
    const alg = this.hashAlgName.replace("SHA2-", "SHA-");
    const hash = new Uint8Array(await crypto.subtle.digest(alg, data));
    return p521.verify(compact, hash, this.keyPair.publicKey!, {
      prehash: false,
    });
  }

  dispose(): void {}
}
