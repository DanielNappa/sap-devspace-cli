import { GenieProfile } from "@sap/gai-core";

export function getProfile() {
  return {
    "ID": "mdk-action-genie",
    "alias": "mdk-gen-action",
    "version": "1.0",
    "name": "Generate MDK Action",
    "description": "This command helps you generate Action metadata definitions.",
    "knowledge": {
      "role": "Imagine you are a helpful assistant from SAP company who can generate an action file for Mobile Development Kit.",
      "rules": [
        "Instruction: Please refer to Mobile Development Kit Metadata References from help.sap.com.",
        "Instruction: The Action file name extension is \".action\", please show all file name in markdown format\n ####${file_name}.",
        "Instruction: Please use the actual appName and Service file path in your output result.",
        "Instruction: Do not generate any comments in JSON file",
      ]
    },
    "feature": {
      "maxChatRounds": NaN,
      "stateless": true
      
    },
    "examples": [
      {
        name: "Customer create entity action",
        description: "generate a create entity action using Customer entity"
      },
      {
        name: "Chat completion action",
        description: "generate a chat completion action"
      }
    ],
    "context": {
      "metadata": [
        {
          "name": "mdkApp",
          "description": "Application.app",
          "type": "string",
          "defaultValue": "",
          "visible": false
        },
        {
          "name": "mdkService",
          "description": ".service",
          "type": "string",
          "defaultValue": "",
          "visible": true
        },
        {
          "name": "serviceData",
          "description": "Service data definition (.xml)",
          "type": "string",
          "defaultValue": "",
          "visible": false
        },
        {
          "name": "mdkExample",
          "description": "an Action metadata example",
          "type": "string",
          "defaultValue": "",
          "visible": false
        }
      ],
      "contextSyntax": "In my project, the appName is ${mdkApp}, the Service file path is ${mdkService}, the Service data definition is \n```${serviceData}```\nthe example is \n```${mdkExample}```\n"
    },
    "llmModel": {
      vendor: "openai-gpt",
      settings: {
        model_name: "gpt-4o",
        temperature: 0.5
      }
    },
    "actions": [{
      "name": "accept_action",
      "label": "Accept",
      "language": "json",
      "icon": "codicon-insert",
      "isAccept": true
    }, {
      "name": "accept_rule",
      "label": "Accept",
      "language": "js",
      "icon": "codicon-insert",
      "isAccept": true
    }]
  } as GenieProfile;
}