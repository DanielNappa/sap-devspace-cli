import { GenieProfile } from "@sap/gai-core";

const profile: GenieProfile = {
  "ID": "i18n-translate-genie",
  "alias": "mdk-gen-i18n",
  "version": "1.0",
  "name": "Generate i18n File",
  "description": "This command helps you generate i18n files in one or more languages, containing key-value string pairs.",
  "knowledge": {
        "role": "Imagine you are a helpful assistant from SAP company who can generate i18n files and translate the values in i18n files to a special language",
        "rules": [
            "Restriction: An i18n file is a file that contains the translated texts. The i18n file stores translations as key-value pairs. A resource bundle key-value pair consists of a key and a value separated by an equal sign. For each language, there's one resource bundle.",
            "Instruction: The key is consistent resource bundles—it always stays the same—the value changes to each language",
            "Instruction: The keys are in CamelCase. The value is the actual text that should be displayed.",
            "Requirement: All i18n files end in .properties. Their names begin with an i18n, followed by an underscore, and the language's acronym, like i18n_en.properties.",
            "Restriction: All strings for translation have to be annotated to provide more context for translation. An annotation consists of an 'X/Y text type classification, an optional length restriction, and a freetext explanation how the string is used on the UI. the annotation need not to be translated ",
            "Requirement: please show your whole output in Markdown fenced code block\n####${language_name} (${file_name})\n\n```plaintext\n${file_content}\n```.",
            "Restriction: don't generate comments in the i18n file",
            "Restriction: don't remove _ from keys",
            "Restriction: don't generate `X/Y text type classification, Customer list on dashboard=` in the i18n file"
        ]
  },
  "feature": {
    "maxChatRounds": NaN
  },
  "examples": [
    {
      name: "generate multiple i18n files",
      description: "Please generate i18n files in some languages: English, Chinese, Dutch, French, German, Italian, Japanese, and Spanish."
    },
    {
        name: "generate single i18n file",
        description: "Please generate i18n file in German language."
    }
  ],
  "context": {
    "metadata": [
      {
        "name": "Base_i18n",
        "description": "Base i18n.properties file path",
        "type": "string",
        "defaultValue": "",
        "visible": true
      },
      {
        "name": "Base_i18n_content",
        "description": "Base i18n.properties file content",
        "type": "string",
        "defaultValue": "",
        "visible": false
      }
  ],
  "contextSyntax": "In my project, the default i18n file is \n```${Base_i18n_content}```\n"
  },
  "llmModel": {
    vendor: "openai-gpt",
    settings: {
      model_name: "gpt-4o",
      temperature: 0.5
    }
  },
  "actions": [{
    "name": "acceptFileList",
    "label": "Accept",
    "type": "fileList",
    "isAccept": true,
    "icon": "codicon:info"
  }]
};

export default profile;