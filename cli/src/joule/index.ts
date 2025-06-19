import { log } from "@clack/prompts";
import sendAiRequest from "@/bas-sdk/src/apis/ai.ts";

export async function handlePromptMode(
  prompt: string,
  useProxy: boolean,
  jwt?: string,
): Promise<void> {
  try {
    const response = await sendAiRequest.default(
      {
        path: "v2/lm/deployments",
        method: "GET",
      },
      useProxy,
      jwt,
    );

    console.log("Final Response Data:");
    console.log(JSON.stringify(response?.data?.resources, null, 2) || []);
  } catch (error) {
    log.error(`Failed to get deployments: ${error}`);
    return;
  }
}
