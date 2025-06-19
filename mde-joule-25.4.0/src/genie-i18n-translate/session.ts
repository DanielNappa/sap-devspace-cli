import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import { ActionRunContext, ActiveEnv, ChatItemBlock, CompletionResponse, FileListBlock, GenieChatItem, GenieSession, getLogger, IGenie, ResponseBlock, ResultFile, UserContext } from '@sap/gai-core';
import { getCopiedActions } from "@sap/gai-core/dist/util/context-helper";
import { getChildrenFullPathsSync, getTempFolder, writeFileSync } from '../util/mdk-util';
import MDKConst from '../util/mdk-const';
import { AnalyticsWrapper } from '../usage-report/usage-analytics-wrapper';

export class GenieI18nTranslateSession extends GenieSession {
  private tempFolder: string;
  private targetFolder: string;

  constructor(genie: IGenie, initialPrompt: string, userContext: UserContext, activeEnv: ActiveEnv) {
    super(genie, initialPrompt, userContext, activeEnv);
    this.tempFolder = "";
    this.targetFolder = "";
  }

  /**
   * The pre process event before sending each session message
   * @param prompt 
   * @returns 
   */
  protected async preProcess(prompt: string): Promise<string> {
    console.log('BAS Joule: Override the pre process before sending each session message');
    return super.preProcess(prompt);
  }

  /**
   * send a new message, and append it to the session messages
   * @param prompt 
   * @returns 
   */
  async send(prompt: string): Promise<GenieChatItem> {
    AnalyticsWrapper.NewMDKI18n();
    console.log('BAS Joule: Override the session send');
    if (this.userContext.Base_i18n) {
      try {
        // read the base i18n file content
        const baseI18nPath = path.join(this.activeEnv.projectInfo.path, this.userContext.Base_i18n);
        const baseI18nContent = fs.readFileSync(baseI18nPath, 'utf8');
        // remove the comments
        this.userContext.Base_i18n_content = baseI18nContent.replace(/#.*/g, '');
      } catch (error: any) {
        console.error(error);
        getLogger().error(error.message);
      }      
    }
    const result = await super.send(prompt);

    const tempFolder = this.getTempFolder();
    const resultFiles: ResultFile[] = [];
    const resultBlocks = result.blocks || [];
    const blocks: ChatItemBlock[] = [];
    for (let i = 0; i < resultBlocks.length; i++) {
      const block = resultBlocks[i];
      if (block.type === 'text') {
        const i18nFileName = this.getMatchedI18nFileName((block as ResponseBlock).content);
        if (i18nFileName && i + 1 < resultBlocks.length) {
          const nextBlock = resultBlocks[i + 1];
          if (nextBlock && nextBlock.type === 'code') {
            const filePath = path.join(tempFolder, i18nFileName);
            const sContent = (nextBlock as ResponseBlock).content;
            writeFileSync(filePath, sContent);
            resultFiles.push({
              label: i18nFileName,
              name: i18nFileName,
              path: filePath
            });
          }
        }
      }
    }
    if (resultFiles.length > 0) {
      blocks.push({
        type: 'fileList',
        title: 'Staging Files',
        fileList: resultFiles,
        actions: getCopiedActions(await this.genie.getProfile(), action => action.type === 'fileList')
      } as FileListBlock);
    }
    const resultChatItem = this.createChatItem(prompt, result.response, blocks, 200);
    this.chatItems.push(resultChatItem);

    return resultChatItem;
  }

  /**
   * modify an sent message and resend it again, all the following session messages will be removed
   * @param newPrompt 
   * @param chatID 
   * @returns 
   */
  async resend(newPrompt: string, chatID: string): Promise<GenieChatItem> {
    console.log('BAS Joule: Override the session resend');
    return super.resend(newPrompt, chatID);
  }

  /**
   * The post process event after sending each session message
   * @param response 
   * @returns 
   */
  protected async postProcess(response: CompletionResponse): Promise<CompletionResponse> {
    console.log('BAS Joule: Override the post process after sending each session message');
    return super.postProcess(response);
  }

  async acceptI18nFile(response: string, actionName: string, actionRunContext?: ActionRunContext): Promise<Boolean> {
    const selection = await vscode.window.showQuickPick([
			{
				label: "Merge file",
			},
			{
				label: "Overwrite file"
			},
      {
        label: "Cancel"
      }
		], { placeHolder: "What would you like to perform this action?" });
    if (!selection || selection.label === "Cancel") {
      return false;
    }

    try {
      if (selection.label === "Merge file") {
        this.merge(this.getTempFolder(), this.getTargetFolder());
      } else if (selection.label === "Overwrite file") {
        fs.cpSync(this.getTempFolder(), this.getTargetFolder(), { recursive: true, force: true});
      }
      vscode.window.showInformationMessage(`The i18n files are generated in ${this.getTargetFolder()} successfully!`);
    } catch (error) {
      console.error(error);
      getLogger().error((error as Error).message);
      AnalyticsWrapper.NewMDKI18nFailed(`Failed to generate i18n files. Detail: ${(error as Error).message}`);
      vscode.window.showErrorMessage(`Failed to generate i18n files. ${(error as Error).message}`);
      return false;
    }

    AnalyticsWrapper.NewMDKI18nSuccess();
    return true;
  }

  private createChatItem(prompt: string, response: string, blocks: ChatItemBlock[] | undefined, status: number): GenieChatItem {
    if (blocks === undefined) {
        blocks = [ { type: 'text', content: response } as ChatItemBlock ];
    }

    return {
        ID: this.getSessionItemID(),
        prompt,
        response,
        status,
        blocks
    };
  }

  private getTempFolder() {
    if (!this.tempFolder) {
      let i18nPath = "";
      let projectPath = this.activeEnv.projectInfo.path;
      if (this.userContext.Base_i18n) {
        i18nPath = path.dirname(this.userContext.Base_i18n);
      }
      projectPath = path.join(this.activeEnv.projectInfo.path, i18nPath, i18nPath ? ".." : "");
      this.tempFolder = getTempFolder(projectPath);
    }
    return this.tempFolder;
  }

  private getTargetFolder() {
    if (!this.targetFolder) {
      let _targetPath = MDKConst.MDK_I18N_FOLDER;
      if (this.userContext.Base_i18n) {
        _targetPath = path.dirname(this.userContext.Base_i18n);
      }
      this.targetFolder = path.join(this.activeEnv.projectInfo.path, _targetPath);
    }
    return this.targetFolder;
  }

  private getMatchedI18nFileName(content: string): string {
    const i18nReg = new RegExp(/i18n_.+\.properties/);
    const match = i18nReg.exec(content);
    if (match && match.length > 0) {
      return match[0];
    }
    return "";
  }

  private merge(src: string, dest: string): void {
    const srcFilesFullPaths = getChildrenFullPathsSync(src);
    srcFilesFullPaths.forEach(fileFullPath => {
      const relativePath = path.relative(src, fileFullPath);
      const destFullPath = path.join(dest, relativePath);
      if (fs.existsSync(destFullPath)) {
        // merge the content
        const srcContent = fs.readFileSync(fileFullPath, "utf8");
        const destContent = fs.readFileSync(destFullPath, "utf8");
        const mergedContent = this.mergeContent(srcContent, destContent);
        fs.writeFileSync(destFullPath, mergedContent);
      } else {
        // copy the file
        fs.copyFileSync(fileFullPath, destFullPath);
      }
    });
  }

  private mergeContent(srcContent: string, destContent: string): string {
    // Helper function to parse key=value pairs into an object
    const parseKeyValuePairs = (content: string): Record<string, string> => {
      return content.split('\n').reduce((acc, line) => {
        const [key, value] = line.split('=');
        if (key && value) {
          acc[key.trim()] = value.trim();
        }
        return acc;
      }, {} as Record<string, string>);
    };
  
    // Helper function to convert an object back to key=value pairs
    const convertToKeyValuePairs = (obj: Record<string, string>): string => {
      return Object.entries(obj).map(([key, value]) => `${key}=${value}`).join('\n');
    };
  
    // Parse the key=value pairs from source and destination
    const srcObj = parseKeyValuePairs(srcContent);
    const destObj = parseKeyValuePairs(destContent);
  
    // Merge the objects
    const mergedObj = { ...destObj, ...srcObj };
  
    // Convert the merged object back to key=value pairs
    return convertToKeyValuePairs(mergedObj);
  }
}