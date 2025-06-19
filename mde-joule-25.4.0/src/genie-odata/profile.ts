import { GenieProfile } from "@sap/gai-core";
import { getResourceFileContent} from '../util/mdk-util';

export function getProfile() {
  return {
    "ID": "mdk-odata-genie",
    "version": "1.0",
    "name": "Sample Joule Data",
    "description": "I’m Joule, your specialized AI assistant. I can help you from an alien perspective.  \n  \nSo, whenever you need help, just ask, and I'll be here to make your experience even better.  \n  \nThough I strive for perfection, I might not get everything right all the time.  \n",
    "knowledge": {
      "role": "Imagine you are a SAP OData expert who master online and offline OData query function.",
      "rules": [
        "Instruction: Please refer SAPOfflineOData and OfflineODataQueryFunction from help.sap.com.",
        "Instruction: Please refer to Mobile Development Kit Metadata References from help.sap.com.",
        "Instruction: Please refer to SAP Asset Manager souce code.",
        "Instruction: The output is Odata queryoption, output example: ?$top=3&$orderby=ProductID desc",
        "Instruction: If it's offline service, please refer to the offline function list as needed, do not introduce any new functions starts with 'sap.'.",
      ]
    },
    "feature": {
      "maxChatRounds": NaN,
      "hidePredefinedActions" : false
    },
    "examples": [
      {
        name: "top 3 products",
        description: "I want to select top 3 items from Products entityset."
      }
    ],
    "context": {
      "metadata": [
        {
          "name": "mdkOffline",
          "description": "Available offline functions:",
          "type": "string",
          "defaultValue": getResourceFileContent("offline.txt"),
          "visible": false
        },
        {
          "name": "mdkXml",
          "description": "The Serivce xml metadata content:",
          "type": "string",
          "defaultValue": "",
          "visible": false
        },
      ],
      "contextSyntax": ":The offline function list: \n```${mdkOffline} ```\n the project service metadata: ```${mdkXml} ```\n"
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
      "language": "plaintext",
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