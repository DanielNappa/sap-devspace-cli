import { GenieProfile } from "@sap/gai-core";

export function getProfile() {
  return {
    "ID": "mdk-page-genie",
    "alias": "mdk-gen-page",
    "version": "1.0",
    "name": "Generate MDK Page",
    "description": "This command helps you generate Page metadata definitions.",
    "knowledge": {
      "role": "Imagine you are a helpful assistant from SAP company who can generate a page file for Mobile Development Kit.",
      "rules": [
        "Instruction: Please refer to Mobile Development Kit Metadata References from help.sap.com.",
        // "Instruction: Please refer to SAP Asset Manager souce code.",
        "Instruction: The page file name extension is \".page\", please show all file name in\n ####${file_name}.",
        "Instruction: Please use the actual appName and Service file path in your output result.",
        "Instruction: Do not generate any comments in JSON file",
        "Instruction: When the Section type is FormCell,if the data property type is Edm.String or String, generate Control.Type.FormCell.SimpleProperty, if the data property type is Edm.Boolean or Boolean, generate Control.Type.FormCell.Switch, if the data property type is Edm.DateTime or Date, generate Control.Type.FormCell.DatePicker.",
        "Instruction: When the Section type is FormCell,if the data property is key, don't generate formcell control.",
        "Instruction: When the Section type is FormCell, also generate the corresponding actions and javascript files.",
        "Instruction: Don't inlcude project name in the file path." 
      ]
    },
    "feature": {
      "maxChatRounds": NaN,
      "stateless": true
      //"streaming": true
    },
    "examples": [
      {
        name: "Product list page",
        description: "Generate a page displaying list of products and its related details"
      },
      {
        name: "Customer form page",
        description: "generate a page using formcell section and customer entity"
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
          "description": "Service data definition(.xml)",
          "type": "string",
          "defaultValue": "",
          "visible": false
        },
        {
          "name": "mdkExample",
          "description": "a Page metadata example",
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
      //  stream: true
      }
     /*vendor: "google",
      settings: {
        model_name: "gemini-1.5-flash",
        generation_config: {temperature: 1.5}
      }*/
    },
    "actions": [{
      "name": "accept_json",
      "label": "Accept",
      "language": "json",
      "icon": "codicon-insert",
      "isAccept": true
    }, {
      "name": "accept_js",
      "label": "Accept",
      "language": "js",
      "icon": "codicon-insert",
      "isAccept": true
    }]
  } as GenieProfile;
}