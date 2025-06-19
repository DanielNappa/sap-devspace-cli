import * as path from 'path';
import * as vscode from 'vscode';
import { ActionRunContext, ActiveEnv, CompletionPayload, CompletionResponse, GenieChatItem, GenieSession, getLogger, IGenie, UserContext } from '@sap/gai-core';
import { getMDKApplicationJson, getMDKXmlName, getResourceFileContent } from '../util/mdk-util';
import MDKConst from '../util/mdk-const';
import { acceptFile, getMatchedJsonFromResponse, getServiceData } from '../util/session-util';
import { AnalyticsWrapper } from '../usage-report/usage-analytics-wrapper';

export class ActionGenieSession extends GenieSession {
  private xmlFileName: string = "";
  private projectPath: string;
  constructor(genie: IGenie, initialPrompt: string, userContext: UserContext, activeEnv: ActiveEnv) {
    super(genie, initialPrompt, userContext, activeEnv);
    this.projectPath = activeEnv.projectInfo.path;
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
    AnalyticsWrapper.GenerateMDKAction();
    //console.log('BAS Joule: Override the session send');
    this.prepareUserContext(prompt);
    let preProcessingActionPrompt: string = `The user prompt is ${prompt}
    The user prompt may be related to an action type name, the action type name will be in this array: ["CreateODataEntity", "UpdateODataEntity", "DeleteODataEntity", "CreateODataMedia", "InitializeOfflineOData", "DownloadOfflineOData", "UploadOfflineOData", "CancelDownloadOfflineOData", "CancelUploadOfflineOData", "ClearOfflineOData", "CloseOfflineOData", "CreateODataRelatedEntity", "CreateODataRelatedMedia", "CreateODataService", "DeleteODataMedia", "DownloadMediaOData", "LogMessage", "Message", "Navigation", "OpenODataService", "ProgressBanner", "PushNotificationRegister", "PushNotificationUnregister", "ReadODataService", "RemoveDefiningRequest", "SendRequest", "SetLevel", "SetState", "ToastMessage", "UndoPendingChanges", "UploadLog", "UploadODataMedia", "UploadStreamOData", "ChatCompletion", "PopoverMenu", "CheckRequiredFields", "ChangeSet", "OpenDocument", "Banner", "Filter"],if related, please respond the action type name with a JSON object in the following format:
    {
      "action": "Action type name"
    }`;

    const genie = this.genie;
    const serviceProxy = await genie.getServiceProxy();
    let payload = await serviceProxy.buildPayload(genie, '', []);
    payload['messages'] = [
      {
          role: 'user',
          content: preProcessingActionPrompt
      }
    ];
    let response = await serviceProxy.requestCompletion(genie, payload);
    getLogger().info('Response from server: ' + response.content);
    let oJson = getMatchedJsonFromResponse(response.content);
    if (oJson && oJson.action) {
      try {
        let example = getResourceFileContent(oJson.action + ".md");
        this.userContext.mdkExample = example;
      } catch (error) {
        getLogger().error((error as Error).message);
        AnalyticsWrapper.GenerateMDKActionFailed(`Please provide more infomation about the action type. Detail: ${(error as Error).message}`);
        const resultChatItem: GenieChatItem = {
          ID: this.getSessionItemID(),
          prompt,
          response:"Please provide more infomation about the action type that you want to generate in your prompt.",
          status:0
        }
        return resultChatItem;
      }
    }

    if (this.xmlFileName) {
      const xmlFilePath = path.join(this.projectPath, MDKConst.MDK_SERVICE_FOLDER, this.xmlFileName);
      if (oJson && oJson.action !== "ToastMessage" && 
        oJson.action !== "LogMessage" &&
        oJson.action !== "UploadLog" &&
        oJson.action !== "SetLevel" &&
        oJson.action !== "SetState" &&
        oJson.action !== "Navigation" &&
        oJson.action !== "Message" &&
        oJson.action !== "ProgressBanner" &&
        oJson.action !== "PushNotificationRegister" &&
        oJson.action !== "PushNotificationUnregister")
          this.userContext.serviceData = await getServiceData(genie, payload, serviceProxy, prompt, xmlFilePath);
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
      AnalyticsWrapper.GenerateMDKActionFailed(`MDK Action Generation Failed. Detail: ${(error as Error).message}`);
      vscode.window.showErrorMessage((error as Error).message);
    }
    AnalyticsWrapper.GenerateMDKActionSuccess();
    return rst;
  }

  private prepareUserContext(prompt: string) {
    let srvPath = "";
    if (this.userContext.mdkService) {
      srvPath = path.dirname(this.userContext.mdkService);
    }
    this.projectPath = path.join(this.activeEnv.projectInfo.path, srvPath, srvPath ? ".." : "");
    const filePath = path.join(this.projectPath, MDKConst.MDK_APP_FILE);
    const appObj = getMDKApplicationJson(filePath);
    if (appObj && appObj["_Name"]) {
      this.userContext.mdkApp = appObj["_Name"];
    }

    this.userContext.prompt = prompt;
  }
}