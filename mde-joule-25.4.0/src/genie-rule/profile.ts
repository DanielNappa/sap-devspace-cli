import { GenieProfile } from "@sap/gai-core";
import MDKConst from '../util/mdk-const';

export function getProfile() {
  return {
    "ID": "mdk-rule-genie",
    "version": "1.0",
    "name": "MDK Rule",
    "description": "I'm Joule, your specialized AI assistant. I can help you generate MDK rule code.  \n  \nWhether you're creating new rule or refining an existing one, I'm here to help.  \n  \nThough I strive for perfection, I might not get everything right all the time.  \n",
    "knowledge": {
      "role": "Imagine you are a helpful assistant from SAP company who can generate a rule javascript file for Mobile Development Kit.",
      "rules": [
        "Instruction: The default function parameter is IClientAPI type.",
        "Instruction: ClientAPI and IActionResult are global available, no need to import any of them.",
        "Instruction: No need to export class, we can export default function with clientAPI  parameter directly.",
        "Instruction: No need to wrapp error object,the error string can be reject directly.",
        "Instruction: In using dialog, do not use clientAPI.nativescript.uiDialogs, please use a fake message action, example: clientAPI.executeAction('/{applicationName}/Actions/{namedAction}.action')",
        "Instruction: If it needs executeAction, please do not pass an object, just pass a fake action file path, example: clientAPI.executeAction('/{applicationName}/Actions/{namedAction}.action')",
        "Instruction: Please refer to Mobile Development Kit Metadata References from help.sap.com.",
        "Instruction: Please refer to SAP Asset Manager souce code."
      ]
    },

    "feature": {
      "maxChatRounds": NaN
    },
    "examples": [
      {
        name: "delete a customer",
        description: "I want a rule to delete a customer entity after confirm dialog"
      }
    ],
    "context": {
      "metadata": [
        {
          "name": "mdkApp",
          "description": "The Application.app file content:",
          "type": "file",
          "defaultValue": MDKConst.MDK_APP_FILE,
          "visible": false
        },
        /*{
          "name": "mdkApi",
          "description": "The IClientAPI.d.ts file content:",
          "type": "file",
          "defaultValue": MDKConst.MDK_API_FILE,
          "visible": false
        },*/
        {
          "name": "mdkRule",
          "description": "The MDK rule file",
          "type": "file",
          "defaultValue": "",
          "visible": false
        },
        {
          "name": "mdkExample",
          "description": "The section table page example",
          "type": "string",
          "defaultValue": "",//getResourceFileContent(MDKConst.MDK_EXAMPLE_PAGE),
          "visible": false
        }
      ],
      "contextSyntax": "In my project, the application file is \n```${mdkApp}```\n the current file is \n```${mdkRule}```\n the example is \n```${mdkExample}```\n"
    },
    "llmModel": {
      vendor: "openai-gpt",
      settings: {
        model_name: "gpt-4",
        temperature: 0.5
      }
    },
    "actions": [{
      "name": "accept",
      "label": "Accept",
      "language": "javascript",
      "icon": "codicon-insert",
      "steps": [{
        "elf": "file",
        "act": "copyResponse"
      }]
    },{
      "name": "showResult",
      "label": "Show Result",
      "language": "plaintext",
      "icon": "codicon:info"
    }]
  } as GenieProfile;
}