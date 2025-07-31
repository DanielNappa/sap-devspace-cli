<h1 align="center">sap-devspace-cli</h1>
<p align="center">A lightweight, editor-agnostic CLI for SSH access to SAP Business Application Studio Dev Spaces.</p>

<p align="center"><code>npm i -g sap-devspace-cli</code></p>

---

## Disclaimer

**This is an unofficial, community-driven CLI tool and is not affiliated with,
endorsed, or sponsored by SAP SE or its affiliates. It is provided "as-is"
without any warranty. Use at your own discretion and risk.**

---

<details>
<summary><strong>Table of contents</strong></summary>

<!-- Begin ToC -->

- [Why sap-devspace-cli?](#why-sap-devspace-cli)
- [Quickstart](#quickstart)
- [Features](#features)
- [System Requirements](#system-requirements)
- [Installation](#installation)
- [Usage](#usage)
  - [Interactive Mode](#interactive-mode)
  - [Future Enhancements (Potential)](#future-enhancements-potential)
- [Configuration](#configuration)
  - [Landscape Management](#landscape-management)
  - [Authentication](#authentication)
- [Troubleshooting](#troubleshooting)
  - [Windows Corporate Proxies (e.g., Zscaler)](#windows-corporate-proxies-eg-zscaler)
  - [SSH Permission Denied](#ssh-permission-denied)
- [Contributing](#contributing)
- [License](#license)

<!-- End ToC -->

</details>

---

## Why sap-devspace-cli?

sap-devspace-cli provides a fast, terminal-based way to connect to your SAP
Business Application Studio (BAS) Dev Spaces via SSH. It's built for developers
who:

- Prefer terminal-centric workflows and editors like Neovim, Vim, or Emacs.
- Want a lightweight alternative to opening the full BAS or VSCode for quick SSH
  access.
- Need a more streamlined authentication and connection process.

This tool replicates the core SSH tunneling functionality found in the official
"SAP Business Application Studio Toolkit" VSCode extension, but as a standalone,
editor-agnostic command-line interface.

## Quickstart

1. **Install globally:**
   ```shell
   npm install -g sap-devspace-cli
   ```

2. **Run the CLI:**
   ```shell
   sap-devspace-cli
   ```

   The CLI will guide you through:
   - Adding your SAP BTP landscape URL(s) if it's your first time.
   - Authenticating to the selected landscape (this will open your browser for
     login).
   - Selecting a dev space.
   - Choosing an action (Start, Stop, Connect, Delete) based on the dev space's
     status.

   If you choose "Connect," an SSH session will be established in your current
   terminal.

## Features

- **Interactive Landscape & Dev Space Selection:** Easily choose your target
  landscape and dev space.
- **Automatic JWT Authentication:** Handles the browser-based JWT acquisition
  flow for landscape authentication. Caches JWTs for quicker subsequent
  connections and refreshes them when expired.
- **SSH Tunnel Management:** Automatically fetches the necessary SSH private key
  for your selected dev space, configures your local SSH client, and establishes
  a secure tunnel.
- **Dev Space State Management:**
  - **Start** stopped dev spaces.
  - **Stop** running dev spaces.
  - **Connect** to running dev spaces (initiates an SSH session).
  - **Delete** dev spaces.
- **Dynamic Menu Options:** The available actions for a dev space (start, stop,
  connect) dynamically update based on its current state.
- **Cross-Platform (with considerations):** Works on macOS and Windows. Includes
  workarounds for common Windows corporate proxy (e.g., Zscaler) SSL
  interception issues.

---

## System Requirements

| Requirement       | Details                                                         |
| ----------------- | --------------------------------------------------------------- |
| Operating systems | macOS, Windows (Linux should work but is less tested by author) |
| Node.js           | **Version 23.8.0 or newer** (as per `package.json`)             |
| `ssh` client      | A working SSH client must be available in your system's PATH.   |

> **Note for Windows Users:** If you are behind a corporate proxy that performs
> SSL inspection (like Zscaler), the CLI attempts to automatically integrate
> with Windows system certificate authorities. If issues persist, ensure your
> corporate CAs are correctly installed in your Windows trust store.

---

## Installation

Install the CLI globally using npm:

```bash
npm install -g sap-devspace-cli
```

Alternatively, you can use `npx` to run it without global installation (though
for frequent use, global install is recommended):

```bash
npx sap-devspace-cli
```

---

## Usage

### Interactive Mode

Simply run the command:

```shell
sap-devspace-cli
```

The CLI will then present you with interactive prompts to:

1. **Select or Add an SAP BTP Landscape URL:**
   - If no landscapes are configured, you'll be prompted to add one (e.g.,
     `https://account.us10.trial.applicationstudio.cloud.sap`).
   - Landscape URLs are saved for future use.
2. **Authenticate:**
   - If not already authenticated or if your session (JWT) has expired, your
     default web browser will open to the SAP BTP login page.
   - After successful login, the CLI will receive an authentication token. This
     token is cached locally and reused until it expires.
3. **Select a Dev Space:**
   - A list of your available dev spaces in the chosen landscape will be
     displayed.
4. **Choose an Action:**
   - Based on the selected dev space's status (e.g., RUNNING, STOPPED), you'll
     see relevant options:
     - **Connect:** (If RUNNING) Establishes an SSH tunnel and opens an SSH
       session in your terminal.
     - **Start:** (If STOPPED) Starts the dev space.
     - **Stop:** (If RUNNING) Stops the dev space.
     - **Delete:** Deletes the dev space (with confirmation).

### Future Enhancements (Potential) and Known Issues

- Non-interactive mode for scripting (e.g.,
  `sap-devspace-cli connect --landscape <url_or_alias> --devspace <name_or_id>`).
- Configuration file for more advanced settings.
- More detailed error reporting and verbose logging options configurable by
- Return back to main selection after deleting a dev space.
- Assertion failure occurs when there a no dev spaces in the landscape.
- ERR_Invalid_URL is thrown on newly created dev spaces when attempting to
  connect.

---

## Configuration

### Landscape Management

- Landscape URLs are stored locally in a configuration file. The CLI will prompt
  you to add one on the first run.
- Currently, landscape management (beyond adding via the initial prompt) is
  basic. Future versions may include commands to list, add, or remove
  landscapes.
- The location of the configuration file is typically:
  - **macOS:** `~/Library/Preferences/sap-devspace-cli/landscape-config.json`
  - **Windows:** `%APPDATA%\sap-devspace-cli\landscape-config.json`
  - **Linux:** `~/.local/share/sap-devspace-cli/landscape-config.json`

### Authentication

- Authentication is handled via a browser-based OAuth flow, initiated by the
  CLI.
- JWTs (JSON Web Tokens) obtained after successful login are cached locally.
- The CLI will attempt to use a cached JWT. If it's expired or invalid, it will
  automatically trigger the re-authentication process.

---

## Troubleshooting

### Windows Corporate Proxies (e.g., Zscaler)

If you are on Windows and behind a corporate proxy that inspects SSL/TLS traffic
(like Zscaler), you might encounter "unable to get local issuer certificate"
errors when the CLI tries to make HTTPS requests to SAP BTP services.

- **Automatic Fix Attempt:** This CLI automatically uses your Windows system's
  trusted certificate authorities (Node.js 23.8.0+ feature). This often resolves
  the issue if your corporate proxy's root CA certificate is installed and
  trusted by Windows.
- **If Issues Persist:**
  1. Ensure your corporate proxy's root CA certificate is correctly installed in
     your Windows "Trusted Root Certification Authorities" store. Consult your
     IT department if unsure.
  2. As a last resort, and only if you understand the security implications and
     trust your network, you can try setting the
     `NODE_TLS_REJECT_UNAUTHORIZED=0` environment variable before running the
     CLI. This disables TLS certificate validation and is insecure for general
     use.
     ```powershell
     $env:NODE_TLS_REJECT_UNAUTHORIZED="0"
     sap-devspace-cli
     ```
     ```cmd
     set NODE_TLS_REJECT_UNAUTHORIZED=0
     sap-devspace-cli
     ```

### SSH Permission Denied (publickey)

After the tunnel is established, if you see `Permission denied (publickey)` when
the SSH session tries to start:

1. **Key Provisioning:** This usually means the public key corresponding to the
   private key fetched by the CLI is not correctly installed in the
   `~/.ssh/authorized_keys` file _inside your BAS dev space_. This key
   provisioning is handled by SAP Business Application Studio.
2. **Local SSH Client:** Ensure your local SSH client is attempting to use the
   correct private key (the CLI attempts to configure this automatically for the
   session). The CLI saves the private key to your user's `.ssh` directory
   (e.g., `~/.ssh/workspace-id.key`) and configures `~/.ssh/config` to use it
   for the tunnel.

If this error persists, it's likely an issue with the dev space's SSH
configuration on the BAS side.

---

## Contributing

Contributions are welcome! If you'd like to contribute, please feel free to fork
the repository, make your changes, and submit a pull request. For major changes,
please open an issue first to discuss what you would like to change.

---

## License

This project is licensed under the [Apache-2.0 License](LICENSE).
