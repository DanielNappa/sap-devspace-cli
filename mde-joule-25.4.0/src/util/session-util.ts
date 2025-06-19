
import * as path from 'path';
import * as vscode from 'vscode';
import * as fs from 'fs';
import { getCDSFromOData, getEntitySetsFromOData, getXmlEntityFromSet } from './xml-tool';
import { ActionRunContext, CompletionPayload, GenieChatItem, GenieSession, getLogger, IGenie, IModelServiceProxy, ResponseBlock } from '@sap/gai-core';
import MDKConst from './mdk-const';
import { writeFileSync } from './mdk-util';
import { AnalyticsWrapper } from '../usage-report/usage-analytics-wrapper';

export function getMatchedJsonFromResponse(content: string): any {
  if (content) {
    try {
      if (content.indexOf("```json") > -1) {
        const regx = new RegExp(/```json\s*([\s\S]*?)\s*```/);
        const match = regx.exec(content);
        if (match && match.length > 1) {
          content = match[1];
        }
      }
      return JSON.parse(content);
    } catch (err) {
      console.error(err);
      getLogger().error((err as Error).message);
      AnalyticsWrapper.FailedToGetJson(`Failed to get Json from AI response. Detail: ${(err as Error).message}`);    
    }
  }
  return null;
}

export async function getServiceData(genie: IGenie, payload: CompletionPayload, serviceProxy: IModelServiceProxy, prompt: string, xmlFilePath: string): Promise<string> {
  let serviceData = undefined;
  const entitySets: string[] = await getEntitySetsFromOData(xmlFilePath);
  if (entitySets.length > 0) {
    let preProcessingPagePrompt = `The user prompt is ${prompt}
    The user prompt may be related to an EntitySet name, the EntitySet name will be in this array: [${entitySets}], if related, please respond the EntitySet name with a JSON object in the following format:
    {
      "entitySet": "EntitySet name"
    }`;
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
      return oJson;
    }  
    if (oJson && oJson.entitySet) {
      // if the entityset could be retrieved from user prompt, send xml entity definition content to LLM
      serviceData = await getXmlEntityFromSet(xmlFilePath, oJson.entitySet);
    }
  }

  if (!serviceData) {
    // otherwise, send the whole cds content as the service data to LLM
    serviceData = await getCDSFromOData(xmlFilePath);
  }
  return serviceData;
}

export async function acceptFile(session: GenieSession, projectPath: string, response: string, actionRunContext?: ActionRunContext): Promise<Boolean> {
  const chatHistory = await session.getChatHistory();
  let chatItem: GenieChatItem = await session.getLatestChat();
  if (actionRunContext?.chatItemId) {
    chatItem = chatHistory.find(item => item.ID === actionRunContext.chatItemId)!;
  }
  if (actionRunContext?.blockIndex) {
    const blockIdx = actionRunContext?.blockIndex - 1;
    const blocks = chatItem.blocks;
    if (blocks && blockIdx >= 0 && blocks[blockIdx] && blocks[blockIdx].type === "text") {
      // get file name from response
      const content = (blocks[blockIdx] as ResponseBlock).content;
      const fileName = getMatchedFileName(content);
      if (fileName) {
        let folder = MDKConst.MDK_PAGE_FOLDER;
        if (fileName.endsWith(".action")) {
          folder = MDKConst.MDK_ACTION_FOLDER;
        } else if (fileName.endsWith(".js")) {
          folder = MDKConst.MDK_RULE_FOLDER;
        }
        const targetFullPath = path.join(projectPath, folder, fileName);
        if (fs.existsSync(targetFullPath)) {
          const selection = await vscode.window.showInformationMessage(
            'The file already exists, do you want to overwrite it?',
            'Yes', 'Cancel'
          );
          if (selection !== 'Yes') {
              return false;
          }
        }
        const rst = writeFileSync(targetFullPath, response);
        if (rst) {
          vscode.window.showInformationMessage(`File is generated in ${targetFullPath} successfully!`, "Open").then(perform => {
            if (perform) {
              vscode.commands.executeCommand("vscode.open", vscode.Uri.parse(targetFullPath));
            }
            
          });
        }
        return rst;
      }
    }
  }

  return false;
}

export function getMatchedFileName(content: string): string {
  let regex = new RegExp(/#.+\.(page|action|js)/);
  const match = regex.exec(content);
  if (match && match.length > 0) {
    return match[0].replace(/#/g, "").trim();
  }
  return "";
}