import { AbstractElf } from "@sap/gai-core";
import { CopyI18nFileContentAct } from "./copy-i18n-content-act"

export class FileExtElf extends AbstractElf {
    constructor() {
        super();
        this.init();
    }

    private init() {
        this.register(new CopyI18nFileContentAct(this));
    }

    public getName(): string {
        return 'fileExt';
    }
}

export const fileExtElf = new FileExtElf();