import { ActiveEnv, CompletionPayload, CompletionResponse, GenieChatItem, GenieSession, IGenie, UserContext } from '@sap/gai-core';

export class RuleGenieSession extends GenieSession {
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
    //console.log('BAS Joule: Override the session send');
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
}