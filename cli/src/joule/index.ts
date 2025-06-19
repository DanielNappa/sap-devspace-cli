import { log } from "@clack/prompts";
import { ai } from "@sap/bas-sdk";

export async function handlePromptMode(prompt: string): Promise<void> {
  
  try {
    const response = await ai.sendAiRequest({
      path: 'v2/lm/deployments',
      method: 'GET'
    });
    
    console.log('📋 Final Response Data:');
    console.log(process.env.WS_BASE_URL, JSON.stringify(response?.data?.resources, null, 2) || []);
  } catch (error) {
    log.error(`Failed to get deployments: ${error}`);
    return;
  } 
}