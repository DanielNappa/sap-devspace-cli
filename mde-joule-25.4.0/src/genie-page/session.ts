import * as path from 'path';
import * as vscode from 'vscode';
import { ActionRunContext, ActiveEnv, CompletionPayload, CompletionResponse, GenieChatItem, GenieSession, getLogger, IGenie, UserContext } from '@sap/gai-core';
import { getMDKApplicationJson, getMDKXmlName, getResourceFileContent } from '../util/mdk-util';
import MDKConst from '../util/mdk-const';
import { acceptFile, getMatchedJsonFromResponse, getServiceData } from '../util/session-util';
import { AnalyticsWrapper } from '../usage-report/usage-analytics-wrapper';

export class PageGenieSession extends GenieSession {
  private xmlFileName: string = "";
  private projectPath: string = "";
  private projectType: string = "";
  constructor(genie: IGenie, initialPrompt: string, userContext: UserContext, activeEnv: ActiveEnv) {
    super(genie, initialPrompt, userContext, activeEnv);
    if (this.userContext.mdkService) {
      this.xmlFileName = getMDKXmlName(path.basename(this.userContext.mdkService)); 
    }
  }

  /**
   * The pre process payload event before sending each session message
   * @param payload 
   * @returns 
   */
  protected async preProcessPayload(payload: CompletionPayload): Promise<CompletionPayload> {
    //console.log('BAS Joule: Override the pre process before sending each session message');
    return super.preProcessPayload(payload);
  }

  /**
   * send a new message, and append it to the session messages
   * @param prompt 
   * @returns 
   */
  async send(prompt: string): Promise<GenieChatItem> {
    AnalyticsWrapper.GenerateMDKPage();
    //console.log('BAS Joule: Override the session send');
    this.prepareUserContext(prompt);
    if (this.activeEnv.workspaceInfo) {
        this.projectType = this.activeEnv.workspaceInfo[0].type;
    }
    
    let preProcessingPagePrompt: string = `The user prompt is ${prompt}
    The user prompt may be related to a section type name, the section type name will be in this array: ["ObjectTable", "FormCell", "KeyValue", "ObjectHeader", "ContactTable", "SimplePropertyCollection", "ObjectCard", "DataTable", "KPIHeader", "ProfileHeader", "ObjectCollection", "Timeline", "TimelinePreview", "Calendar"], if related, please respond the section type name with a JSON object in the following format:
    {
      "section": "section type name",
      "prompt": "updated prompt"
    }, if the section type name is not in the prompt, please update the prompt to add the section type name in it.`;
    
    const genie = this.genie;
    const serviceProxy = await genie.getServiceProxy();
    let payload = await serviceProxy.buildPayload(genie, '', []);
    payload['messages'] = [
        {
            role: 'user',
            content: preProcessingPagePrompt
        }
    ];
    let response = await serviceProxy.requestCompletion(genie, payload);
    getLogger().info('Response from server: ' + response.content);
    let oJson = getMatchedJsonFromResponse(response.content);
    if (oJson === null) {
      oJson = {"section": "ObjectTable"};
      oJson.prompt = prompt + " using an ObjectTable section";
    }
    
    const resultChatItem: GenieChatItem = {
      ID: this.getSessionItemID(),
      prompt,
      response:"Please provide more infomation about the section type that you want to generate in your prompt.",
      status:0
    }

    if (oJson.section) {
      try {
        let example = getResourceFileContent(oJson.section + ".md");
        this.userContext.mdkExample = example;
      } catch (error) {
        getLogger().error((error as Error).message);
        AnalyticsWrapper.GenerateMDKPageFailed(`Failed to generate the page. Detail: ${(error as Error).message}`);
        return resultChatItem;
      }
    }

    if (this.xmlFileName) {
      const xmlFilePath = path.join(this.projectPath, MDKConst.MDK_SERVICE_FOLDER, this.xmlFileName);
      let serviceData = await getServiceData(genie, payload, serviceProxy, prompt, xmlFilePath);
      if (serviceData === null) {
        resultChatItem.response = "Please provide more infomation about the data entity that you want to use in your prompt.";
        return resultChatItem;
      }
      else {
        this.userContext.serviceData = serviceData;
        let path = this.userContext.mdkService; 
        if (this.projectType === "com.sap.lcap") {
          const index = this.userContext.mdkService.indexOf(".MDKApp");
          path = "/" + path.substring(index+1);
        }
        else {
          let paths = this.projectPath.split('/');
          const projectName = paths[paths.length - 1];
          const index = path.indexOf(projectName);
          if (index !== -1) {
            path = path.substring(index);
          }
        }
        this.userContext.mdkService = path;  
      }
    }
    if (oJson.prompt) {
      prompt = oJson.prompt;
    }
    return super.send(prompt);
  }

  /**
   * modify an sent message and resend it again, all the following session messages will be removed
   * @param newPrompt 
   * @param chatID 
   * @returns 
   */
  async resend(newPrompt: string, chatID: string): Promise<GenieChatItem> {
    //console.log('BAS Joule: Override the session resend');
    return super.resend(newPrompt, chatID);
  }

  /**
   * The post process event after sending each session message
   * @param response 
   * @returns 
   */
  protected async postProcess(response: CompletionResponse): Promise<CompletionResponse> {
    //console.log('BAS Joule: Override the post process after sending each session message');
    return super.postProcess(response);
  }

  async accept(response: string, actionName: string, actionRunContext?: ActionRunContext): Promise<Boolean> {
    let rst: Boolean = true;
    try {
      rst = await acceptFile(this, this.projectPath, response, actionRunContext);
    } catch (error) {
      rst = false;
      console.error(error);
      getLogger().error((error as Error).message);
      AnalyticsWrapper.GenerateMDKPageFailed(`Failed to generate the page. Detail: ${(error as Error).message}`);
      vscode.window.showErrorMessage((error as Error).message);
    }
    AnalyticsWrapper.GenerateMDKPageSuccess();
    return rst;
  }

  private prepareUserContext(prompt: string) {
    let srvPath = "";
    if (this.userContext.mdkService) {
      srvPath = path.dirname(this.userContext.mdkService);
    }
    // if (!this.userContext.mdkApp) {
      this.projectPath = path.join(this.activeEnv.projectInfo.path, srvPath, srvPath ? ".." : "");
      const filePath = path.join(this.projectPath, MDKConst.MDK_APP_FILE);
      const appObj = getMDKApplicationJson(filePath);
      if (appObj && appObj["_Name"]) {
        this.userContext.mdkApp = appObj["_Name"];
      }
    // }

    this.userContext.prompt = prompt;
  }
}