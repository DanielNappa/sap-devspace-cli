# MDK Joule 

In BAS Joule scenario, MDK support below AI genies:

## Rule JS code generation 

ID: mdk-rule-genie

Match Context:
- Current project is MDK project
- Current open file suffix is .js
- Current open file is within '\Rules' folder

[link](rule.md)

## Page metadata generation

ID: mdk-page-genie

Match Context:
- Current project is MDK project
- Current open file suffix is .page.
- Current open file is within '\Pages' folder

[link](page.md)

## Query Option generation

ID: mdk-odata-genie

Match Context: 

    No auto match context. 

    It should be invoked by show-chat with ID 'mdk-odata-genie'.

[link](queryOption.md)

## I18n translation

ID: i18n-translate-genie

Match Context: 

- current open file suffix is '.properties'

[link](i18n.md)