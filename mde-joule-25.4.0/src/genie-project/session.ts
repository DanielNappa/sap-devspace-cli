import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import { ActionRunContext, ActiveEnv, CompletionPayload, CompletionResponse, GenieChatItem, GenieSession, IGenie, UserContext, ChatItemBlock, ResultFile, FileListBlock, ResponseBlock, CodeBlock, getLogger } from '@sap/gai-core';
import { getCopiedActions, getCopiedCodeBlockActions } from "@sap/gai-core/dist/util/context-helper";
import { getMDKApplicationJson, getMDKXmlName, getTempFolder, geServiceMetadataJson, getResourceFileContent, writeFileSync, getAllFiles, findFirstMdkGenerator, getMDKToolsPath } from '../util/mdk-util';
import MDKConst from '../util/mdk-const';
import { acceptFile, getMatchedJsonFromResponse, getServiceData } from '../util/session-util';
import { execSync } from "child_process";
import { getEntitySetsFromODataString } from '../util/xml-tool';
import { BasToolkit } from "@sap-devx/app-studio-toolkit-types";
const basAPI: BasToolkit = vscode.extensions.getExtension(
  'SAPOSS.app-studio-toolkit'
)?.exports;

export class ProjectGenieSession extends GenieSession {
  private xmlFileName: string = "";
  private projectPath: string = "";
  private projectType: string = "";
  private tempFolder: string = "";
  constructor(genie: IGenie, initialPrompt: string, userContext: UserContext, activeEnv: ActiveEnv) {
    super(genie, initialPrompt, userContext, activeEnv);
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
    console.log('BAS Joule: Override the session send');
    await this.prepareUserContext(prompt);
    if (this.activeEnv.workspaceInfo) {
      if (this.activeEnv.workspaceInfo.length === 1) {
        this.projectPath = this.activeEnv.workspaceInfo[0].path;
        this.projectType = this.activeEnv.workspaceInfo[0].type
      }
      else {
        this.activeEnv.workspaceInfo.forEach(info => {
          if (this.userContext.projectPath === info.path) {
            this.projectPath = info.path;
            this.projectType = info.type;
            return;
          }
        });
      }
    }
    
    let preProcessingProjectPrompt: string = `The user prompt is ${prompt} 
    The user prompt may be related to a MDK project templete, the template name will be in this array: ["crud", "listreport", "basic"], if related, please respond the templete info with a JSON object in the following format: \n
    { 
      "template": "basic",
      "entitySets": ["entitySet1", "entitySet2"], 
      "offline": false 
    }`;

    const genie = this.genie;
    const serviceProxy = await genie.getServiceProxy();
    let payload = await serviceProxy.buildPayload(genie, '', []);
    payload['messages'] = [
        {
            role: 'user',
            content: preProcessingProjectPrompt
        }
    ];
    let response = await serviceProxy.requestCompletion(genie, payload);
    let oJson = getMatchedJsonFromResponse(response.content);
    const resultChatItem: GenieChatItem = {
      ID: this.getSessionItemID(),
      prompt,
      response:"Please provide more infomation about the rule that you want to generate in your prompt.",
      status:0
    }

    if (oJson !== null) { 
      const tempFolder = this.getTempFolder();  
      let oJson1: any = {};
      oJson1.services = [];
      
      if (this.projectType !== "com.sap.lcap") {
        const filePath = path.join(this.projectPath, MDKConst.MDK_SERVICE_METADATA_FILE);
        const serviceMetadataObj = geServiceMetadataJson(filePath);
        if (serviceMetadataObj === null) {
          resultChatItem.response = "Please create .service.metadata file in your project.";
          return resultChatItem;
        }
    
        let paths = this.projectPath.split('/');
        oJson1.projectName = paths[paths.length - 1];
        oJson1.target = tempFolder;
      
        oJson1.type = "headless";
        oJson1.appId = serviceMetadataObj["mobile"]["app"];
        oJson1.adminAPI = serviceMetadataObj["mobile"]["api"];
        
        const destinations = serviceMetadataObj["mobile"]["destinations"];
        let entitySets: string[];
        let entitySetsService: string[];
        let entitySetsServices: string[] = [];
        for (let i = 0; i < destinations.length; i++) {
          entitySetsService = [];
          entitySets = await getEntitySetsFromODataString(destinations[i]["metadata"]["odataContent"]); 
          for (let j = 0; j < oJson.entitySets.length; j++) {
            if (entitySets.includes(oJson.entitySets[j]) && !entitySetsServices.includes(oJson.entitySets[j])) {
              entitySetsServices.push(oJson.entitySets[j]);
              entitySetsService.push(oJson.entitySets[j]);
            }
          }
          let oService = {
            name: destinations[i]["name"].replaceAll('.', '_'),
            path: "/",
            destination: destinations[i]["name"],
            edmxPath: destinations[i]["metadata"]["odataContent"],
            entitySets: entitySetsService,
            offline: oJson.offline
          };
          oJson1.services.push(oService);
        }
        if (destinations.length === 0) {
          oJson.template = "empty";
        }
      }
      else {

        oJson1.type = "lcap-headless";
        oJson1.target = tempFolder + "/app";
        oJson1.projectName = "MDKApp";
        let paths = this.projectPath.split('/');
        oJson1.projectId = paths[paths.length - 1];

        const workspaceAPI = basAPI.workspaceAPI;
        const papi = await workspaceAPI.getProject(this.projectPath);
        const servicesInfo = await papi.getServicesInfo();
        let entitySets: string[];
        let entitySetsService: string[];
        let entitySetsServices: string[] = [];

        for (let i = 0; i < servicesInfo.length; i++) {
          const edmx = await papi.getServiceEdmx(path.join(this.projectPath, "/" + servicesInfo[i].sourcePath), servicesInfo[i].name);
          
          entitySetsService = [];
          entitySets = await getEntitySetsFromODataString(edmx); 
          for (let j = 0; j < oJson.entitySets.length; j++) {
            if (entitySets.includes(oJson.entitySets[j]) && !entitySetsServices.includes(oJson.entitySets[j])) {
              entitySetsServices.push(oJson.entitySets[j]);
              entitySetsService.push(oJson.entitySets[j]);
            }
          }

          let oService = {
            name: servicesInfo[i].name,
            path: servicesInfo[i].path,
            entryPath: servicesInfo[i].entryPath,
            destination: servicesInfo[i].destination,
            edmxPath: edmx,
            entitySets: entitySetsService,
            offline: oJson.offline
          };
          oJson1.services.push(oService);

        }
        if (servicesInfo.length === 0) {
          oJson.template = "empty";
        }
      }
      oJson1.template = oJson.template;

      writeFileSync(tempFolder+"/headless.json", JSON.stringify(oJson1));
      const mdkToolsPath = await getMDKToolsPath();
      let sScript = `yo ${findFirstMdkGenerator()} --dataFile ${tempFolder}/headless.json`;
      if (mdkToolsPath) {
        sScript += ` --tool ${mdkToolsPath}`;
      }
      try {
        console.log(sScript);
        execSync(sScript);
      }
      catch(error) {
        console.error(error);
        getLogger().error((error as Error).message);
      }

      let files: string[] = [];
      let folder = "";
      if (oJson1.projectId) {
        folder += oJson1.projectId + ".";
      }
      folder += oJson1.projectName;
      getAllFiles(oJson1.target + "/" + folder, files);
      const blocks: ChatItemBlock[] = [];
      const resultFiles: ResultFile[] = [];

      let response = "\"template\" : \""+oJson.template + "\"";
      if (oJson.template !== "empty") {
        response += ",\n\"entitySets\" : [\""+oJson.entitySets + "\"],\n\"offline\" : "+oJson.offline;
      }

      blocks.push({
        type: 'code',
        content: response,
        language: 'json'
      } as CodeBlock);

     /* const template =  "\"template\" : \""+oJson.template + "\"";
      blocks.push({
        content: template
      } as ResponseBlock);

      if (oJson.template !== "empty") {
        const entitySets = "\"entitySets\" : \""+oJson.entitySets + "\"";
        blocks.push({
          content: entitySets
        } as ResponseBlock);

        const offline = "\"offline\" : \""+oJson.offline + "\""; 
        blocks.push({
          content: offline
        } as ResponseBlock);
      }*/

      for (let i = 0; i < files.length; i++) {
          resultFiles.push({
            label: files[i].slice(files[i].lastIndexOf(oJson1.projectName) + oJson1.projectName.length + 1),
            name: files[i],
            path: files[i]
          });
      }
      if (resultFiles.length > 0) {
        blocks.push({
          type: 'fileList',
          title: 'Staging Files',
          fileList: resultFiles,
          actions: getCopiedActions(await this.genie.getProfile(), action => action.type === 'fileList')
        } as FileListBlock);
      }
      resultChatItem.blocks = blocks;
      this.chatItems.push(resultChatItem);
    } 

    return resultChatItem;
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
    let paths = this.projectPath.split('/');
    if (this.projectType === "com.sap.lcap") {
      fs.cpSync(this.tempFolder + "/app/" + paths[paths.length - 1] + ".MDKApp" , this.projectPath + "/app/" + paths[paths.length - 1] + ".MDKApp", { recursive: true, force: true});  
    }
    else {
      fs.cpSync(this.tempFolder + "/" + paths[paths.length - 1], this.projectPath, { recursive: true, force: true});
    }
    return true;
  }

  private async prepareUserContext(prompt: string): Promise<void> {
    this.userContext.prompt = prompt;
  }

  private getTempFolder() {
    this.tempFolder = getTempFolder(this.projectPath);
    return this.tempFolder;
  }
}