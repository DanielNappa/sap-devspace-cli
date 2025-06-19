import * as vscode from 'vscode';
import { AbstractGenie, ActiveEnv, IGenieSession, UserContext, GenieProfile, ActionRunContext } from '@sap/gai-core';
import { getProfile } from './profile';
import { ActionGenieSession } from './session';
import { getServiceFilePaths, normalizeVariableValue} from '../util/mdk-util';

export class MDKActionGenie extends AbstractGenie {
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
          if (activeEnv.workspaceInfo[i].type === "com.sap.mdk" || activeEnv.workspaceInfo[i].type === "com.sap.lcap" || activeEnv.workspaceInfo[i].type === "com.sap.bas.empty") {
            return true;
          }
        }
        return false;
      }
      const projectType = activeEnv.projectInfo?.type;
      return projectType === "com.sap.mdk" || projectType === "com.sap.lcap" || projectType === "com.sap.bas.empty";
    }
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
    const genieSession = new ActionGenieSession(this, initialPrompt, userContext, activeEnv);
    this.sessions.push(genieSession);
    return genieSession;
  }

  async getContextVariableValues(variableName: string, activeEnv?: ActiveEnv): Promise<any[]>{
    let baseVariableValues: string[] = await super.getContextVariableValues(variableName, activeEnv);
    if (activeEnv?.workspaceInfo) {
      activeEnv.workspaceInfo.forEach(info => {
        const uris = getServiceFilePaths(info.path);
        uris.forEach(uri => {
          baseVariableValues.push(uri);
        });
      });
    } else if (activeEnv?.projectInfo.path) {
      const uris = getServiceFilePaths(activeEnv?.projectInfo.path);
        uris.forEach(uri => {
          baseVariableValues.push(uri);
      });
    }
    return normalizeVariableValue(activeEnv?.projectInfo?.path!, baseVariableValues);
  }

  async accept_action(response: string, session: IGenieSession, actionName: string, actionRunContext?: ActionRunContext): Promise<Boolean> {
    return (session as ActionGenieSession).accept(response, actionName, actionRunContext);
  }

  async accept_rule(response: string, session: IGenieSession, actionName: string, actionRunContext?: ActionRunContext): Promise<Boolean> {
    return (session as ActionGenieSession).accept(response, actionName, actionRunContext);
  }
}
