import { GenieProfile } from "@sap/gai-core";
import MDKConst from '../util/mdk-const';

export function getProfile() {
  return {
    "ID": "mdk-project-genie",
    "alias": "mdk-gen-project",
    "version": "1.0",
    "name": "Generate MDK Project",
    "description": "The command can help you generate project metadata.",
    "knowledge": {
      "role": "Imagine you are a helpful assistant from SAP company who can generate a prpject for Mobile Development Kit.",
      "rules": [
        ]
    },
    "feature": {
      "maxChatRounds": NaN,
      "stateless": true
    },
    "examples": [
      {
        name: "crud project",
        description: "generate a MDK app that creates and updates customer entity"
      }
    ],
    "context": {
      "metadata": [
        {
          "name": "projectPath",
          "description": "MDK Projects",
          "type": "string",
          "defaultValue": "",
          "visible": true
        }
      ],
      "contextSyntax": "",
    },
    "llmModel": {
      vendor: "openai-gpt",
      settings: {
        model_name: "gpt-4o",
        temperature: 0.5
      }
      /*vendor: "google",
      settings: {
        model_name: "gemini-1.5-flash"
      }*/
    },
    "actions": [{
      "name": "acceptFileList",
      "label": "Accept",
      "type": "fileList",
      "isAccept": true,
      "icon": "codicon:info"
    },
    {
      "name": "acceptJson",
      "label": "Accept",
      "language": "json",
      "icon": "codicon-insert",
      "isAccept": false
  }]
  } as GenieProfile;
}