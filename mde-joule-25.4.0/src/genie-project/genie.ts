import * as vscode from 'vscode';
import { AbstractGenie, ActiveEnv, IGenieSession, UserContext, GenieProfile, ActionRunContext } from '@sap/gai-core';
import { getProfile } from './profile';
import { ProjectGenieSession } from './session';
import { getMatchedFiles, normalizeVariableValue } from '../util/mdk-util';
import * as fs from 'fs';

export class MDKProjectGenie extends AbstractGenie {
  constructor(gProfile: GenieProfile = getProfile()) {
    super(gProfile);
  }

  /**
   * [Mandatory] The file-level checking machanism for waking up the current BAS genie
   * (It can be invoked when an opened file tab is activated)
   * @param activeEnv 
   * @returns 
   */
  async match(activeEnv: ActiveEnv): Promise<boolean> {
    const devSpaceData : any = (await vscode.commands.getCommands()).includes('sapbas.getDevSpaceMetadata')? await vscode.commands.executeCommand('sapbas.getDevSpaceMetadata') : null;
    if (devSpaceData && devSpaceData.devSpacePackName === "SAP Mobile Application") {
      return true;
    }
    else {
      if (activeEnv.workspaceInfo && activeEnv.workspaceInfo.length > 0) {
        for (let i = 0; i < activeEnv.workspaceInfo.length; i++) {
          if (activeEnv.workspaceInfo[i].type === "com.sap.mdk" || activeEnv.workspaceInfo[i].type === "com.sap.bas.empty" || activeEnv.workspaceInfo[i].type === "com.sap.lcap") {
            return true;
          }
        }
        return false;
      }
      const projectType = activeEnv.projectInfo?.type;
      return projectType === "com.sap.mdk" || projectType === "com.sap.bas.empty" || projectType === "com.sap.lcap";
    }
  }

  /**
   * The custom implementation for the user action `acceptFileList` defined in profile
   * @param response 
   * @param session 
   * @param actionName
   * @param actionRunContext
   * @returns 
   */
  async acceptFileList(response: string, session: IGenieSession, actionName: string, actionRunContext?: ActionRunContext): Promise<Boolean> {
    return (session as ProjectGenieSession).accept(response, actionName, actionRunContext);
  }

  async acceptJson(response: string, session: IGenieSession, actionName: string, actionRunContext?: ActionRunContext): Promise<Boolean> {
    return true;
  }

  /**
   * The default initial prompt shown in the Joule input field when activating the current BAS genie
   * (It's for UX quick input purpose)
   * @returns 
   */
  async getInitialPrompt(activeEnv: ActiveEnv): Promise<string> {
    return super.getInitialPrompt(activeEnv);
  }
  

  /**
   * Override the auto attached system messages here
   * @returns 
   */
  async getKnowledge(): Promise<string[]> {
    const knowledge = await super.getKnowledge();
    console.log('BAS Joule: the auto attached system messages are:');
    console.log(knowledge.join('\n'));
    return knowledge;
  }

  /**
   * Override the auto attahced user context messages here
   * @param prompt 
   * @param session 
   */
  async getContextPrompt(prompt: string, session: IGenieSession): Promise<string> {
    const userContext = await super.getContextPrompt(prompt, session);
    console.log('BAS Joule: the auto attached user context message is:');
    console.log(userContext);
    return userContext;
  }

  /**
   * Override the model vendor name here
   * @returns 
   */
  async getModelVendor(): Promise<string> {
    const modeVendor = await super.getModelVendor();
    console.log('BAS Joule: the configured model is:');
    console.log(modeVendor);
    return modeVendor;
  }

  /**
   * Override the model vendor name here
   * @returns 
   */
  async getModelSettings(): Promise<any> {
    const modelSettings = await super.getModelSettings();
    console.log('BAS Joule: the configured model settings are:');
    console.log(modelSettings);
    return modelSettings;
  }

  /**
   * Override the startSession here, inlcuding attach more info to the user context, and use a customized genie session
   * All the conversational chat messages for one specific matched file will be maintained in one GenieSession object
   * @param initialPrompt 
   * @param userContext 
   * @param activeEnv 
   * @returns 
   */
  async startSession(initialPrompt: string, userContext: UserContext, activeEnv: ActiveEnv): Promise<IGenieSession> {
    const genieSession = new ProjectGenieSession(this, initialPrompt, userContext, activeEnv);
    this.sessions.push(genieSession);
    return genieSession;
  }

  async getContextVariableValues(variableName: string, activeEnv?: ActiveEnv): Promise<any[]> {
    let baseVariableValues: string[] = [];
    if (activeEnv?.workspaceInfo) {
      activeEnv.workspaceInfo.forEach(info => {
        baseVariableValues.push(info.path);
      });
    }
    return baseVariableValues;
  }

  async accept_json(response: string, session: IGenieSession, actionName: string, actionRunContext?: ActionRunContext): Promise<Boolean> {
    return (session as ProjectGenieSession).accept(response, actionName, actionRunContext);
  }

  async accept_js(response: string, session: IGenieSession, actionName: string, actionRunContext?: ActionRunContext): Promise<Boolean> {
    return (session as ProjectGenieSession).accept(response, actionName, actionRunContext);
  }

  private getProjectName(folderPath: string) {
    const paths = folderPath.split('/');
    return paths[paths.length - 1];
  }
}