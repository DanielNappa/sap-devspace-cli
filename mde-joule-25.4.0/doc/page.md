# Overview

ID: mdk-page-genie

Match Context:
- Current project is MDK project
- Current open file suffix is .page.
- Current open file is within '\Pages' folder

# Knowledge

    "role": "Imagine you are a helpful assistant from SAP company who can generate a page file for Mobile Development Kit.",
      "rules": [
        "Instruction: Please refer to Mobile Development Kit Metadata References from help.sap.com.",
        "Instruction: Please refer to SAP Asset Manager souce code."
      ]

# Context

## Application

We passed application.app content, so that LLM can use correct application name.

- ToDo

    Use ApplicationName only to replace whole application.app file.

## Service

We passed .service content, so that LLM can use corrent service name in target binding.

- ToDo

     Use ServiceName only to replace whole .service file.

## Service Xml

We passed .xml content, so that LLM can use corrent OData properties in property binding.

- ToDo

    Use related entitySet/entityType to replace whole XML.

## Current Page

We passed current page, so that LLM can make changes based on current page content.

- ToDo

    If user has selected content, use selected content.

## Selected Example

We passed the an example, so that LLM can generate correct page schema.

- ToDo

    As we have not much examples to match user question, use related schema to replace example.

# Prompts Example

You can have a try in SAP AI launchpad with below prompts:


Imagine you are a helpful assistant from SAP company who can generate a page file for Mobile Development Kit.

Instruction: Please refer to Mobile Development Kit Metadata References from help.sap.com.

Instruction: Please refer to SAP Asset Manager souce code.

Please write a section page to show Customer List

In my project, the application file is 
```
{
	"_Name": "crud1",
	"Version": "/crud1/Globals/Application/AppDefinition_Version.global",
	"MainPage": "/crud1/Pages/Main.page",
	"OnLaunch": [
		"/crud1/Actions/Service/InitializeOffline.action"
	],
	"OnWillUpdate": "/crud1/Rules/Application/OnWillUpdate.js",
	"OnDidUpdate": "/crud1/Actions/Service/InitializeOffline.action",
	"Styles": "/crud1/Styles/Styles.less",
	"Localization": "/crud1/i18n/i18n.properties",
	"_SchemaVersion": "23.12"
}
```
 the Service file is 
```
{
    "DestinationName": "com.sap.edm.sampleservice.v2",
    "OfflineEnabled": true,
    "LanguageURLParam": "",
    "OnlineOptions": {},
    "PathSuffix": "",
    "SourceType": "Mobile",
    "ServiceUrl":""
}
```

the Service xml is 
```
<?xml version="1.0" ?>
<edmx:Edmx Version="1.0" xmlns:edmx="http://schemas.microsoft.com/ado/2007/06/edmx" xmlns:sap="http://www.sap.com/Protocols/SAPData">
    <edmx:DataServices m:DataServiceVersion="1.0" xmlns:m="http://schemas.microsoft.com/ado/2007/08/dataservices/metadata">
        <Schema Namespace="ESPM" xmlns="http://schemas.microsoft.com/ado/2008/09/edm">
            <EntityType Name="Customer">
                <Key>
                    <PropertyRef Name="CustomerId"/>
                </Key>
                <Property Name="City" Type="Edm.String" Nullable="true" MaxLength="40"/>
                <Property Name="Country" Type="Edm.String" Nullable="true" MaxLength="3"/>
                <Property Name="CustomerId" Type="Edm.String" Nullable="false" MaxLength="36"/>
                <Property Name="DateOfBirth" Type="Edm.DateTime" Nullable="false"/>
                <Property Name="EmailAddress" Type="Edm.String" Nullable="true" MaxLength="255"/>
                <Property Name="FirstName" Type="Edm.String" Nullable="true" MaxLength="40"/>
                <Property Name="HouseNumber" Type="Edm.String" Nullable="true" MaxLength="10"/>
                <Property Name="LastName" Type="Edm.String" Nullable="true" MaxLength="40"/>
                <Property Name="PhoneNumber" Type="Edm.String" Nullable="true" MaxLength="30"/>
                <Property Name="PostalCode" Type="Edm.String" Nullable="true" MaxLength="10"/>
                <Property Name="Street" Type="Edm.String" Nullable="true" MaxLength="60"/>
                <Property Name="Address" Type="ESPM.Address" Nullable="true"/>
                <Property Name="UpdatedTimestamp" Type="Edm.DateTime"/>
                <NavigationProperty Name="SalesOrders" Relationship="ESPM.Customer_to_SalesOrderHeaders" FromRole="Customer" ToRole="SalesOrderHeader"/>
            </EntityType>
            <ComplexType Name="Address">
                <Property Name="HouseNumber" Type="Edm.String" Nullable="true"/>
                <Property Name="Street" Type="Edm.String" Nullable="true"/>
                <Property Name="City" Type="Edm.String" Nullable="true"/>
                <Property Name="Country" Type="Edm.String" Nullable="true"/>
                <Property Name="PostalCode" Type="Edm.String" Nullable="true"/>
            </ComplexType>
            <EntityType Name="Supplier">
                <Key>
                    <PropertyRef Name="SupplierId"/>
                </Key>
                <Property Name="City" Type="Edm.String" Nullable="true" MaxLength="40"/>
                <Property Name="Country" Type="Edm.String" Nullable="true" MaxLength="3"/>
                <Property Name="EmailAddress" Type="Edm.String" Nullable="true" MaxLength="255"/>
                <Property Name="HouseNumber" Type="Edm.String" Nullable="true" MaxLength="10"/>
                <Property Name="PhoneNumber" Type="Edm.String" Nullable="true" MaxLength="30"/>
                <Property Name="PostalCode" Type="Edm.String" Nullable="true" MaxLength="10"/>
                <Property Name="Street" Type="Edm.String" Nullable="true" MaxLength="60"/>
                <Property Name="SupplierId" Type="Edm.String" Nullable="false" MaxLength="36"/>
                <Property Name="SupplierName" Type="Edm.String" Nullable="true" MaxLength="80"/>
                <Property Name="Address" Type="ESPM.Address" Nullable="true"/>
                <Property Name="UpdatedTimestamp" Type="Edm.DateTime"/>
                <NavigationProperty Name="Products" Relationship="ESPM.Supplier_to_Products" FromRole="Supplier" ToRole="Product"/>
                <NavigationProperty Name="PurchaseOrders" Relationship="ESPM.Supplier_to_PurchaseOrderHeaders" FromRole="Supplier" ToRole="PurchaseOrderHeader"/>
            </EntityType>
            <EntityType Name="Product" m:HasStream="true">
                <Key>
                    <PropertyRef Name="ProductId"/>
                </Key>
                <Property Name="Category" Type="Edm.String" Nullable="true" MaxLength="40"/>
                <Property Name="CategoryName" Type="Edm.String" Nullable="true" MaxLength="40"/>
                <Property Name="CurrencyCode" Type="Edm.String" Nullable="true" MaxLength="5"/>
                <Property Na…="ProductCategories" EntityType="ESPM.ProductCategory" sap:searchable="false"/>
                <EntitySet Name="ProductTexts" EntityType="ESPM.ProductText" sap:searchable="false"/>
                <EntitySet Name="Stock" EntityType="ESPM.Stock" sap:searchable="false"/>
                <EntitySet Name="PurchaseOrderHeaders" EntityType="ESPM.PurchaseOrderHeader" sap:searchable="false"/>
                <EntitySet Name="PurchaseOrderItems" EntityType="ESPM.PurchaseOrderItem" sap:searchable="false"/>
                <EntitySet Name="SalesOrderHeaders" EntityType="ESPM.SalesOrderHeader" sap:searchable="false"/>
                <EntitySet Name="SalesOrderItems" EntityType="ESPM.SalesOrderItem" sap:searchable="false"/>
                <AssociationSet Name="Customer_to_SalesOrderHeaders" Association="ESPM.Customer_to_SalesOrderHeaders" sap:searchable="false">
                    <End EntitySet="Customers" Role="Customer"/>
                    <End EntitySet="SalesOrderHeaders" Role="SalesOrderHeader"/>
                </AssociationSet>
                <AssociationSet Name="Supplier_to_PurchaseOrderHeaders" Association="ESPM.Supplier_to_PurchaseOrderHeaders" sap:searchable="false">
                    <End EntitySet="Suppliers" Role="Supplier"/>
                    <End EntitySet="PurchaseOrderHeaders" Role="PurchaseOrderHeader"/>
                </AssociationSet>
                <AssociationSet Name="Supplier_to_Products" Association="ESPM.Supplier_to_Products" sap:searchable="false">
                    <End EntitySet="Suppliers" Role="Supplier"/>
                    <End EntitySet="Products" Role="Product"/>
                </AssociationSet>
                <AssociationSet Name="Product_to_PurchaseOrderItems" Association="ESPM.Product_to_PurchaseOrderItems" sap:searchable="false">
                    <End EntitySet="Products" Role="Product"/>
                    <End EntitySet="PurchaseOrderItems" Role="PurchaseOrderItem"/>
                </AssociationSet>
                <AssociationSet Name="Product_to_SalesOrderItems" Association="ESPM.Product_to_SalesOrderItems" sap:searchable="false">
                    <End EntitySet="SalesOrderItems" Role="SalesOrderItem"/>
                    <End EntitySet="Products" Role="Product"/>
                </AssociationSet>
                <AssociationSet Name="Product_to_Stock" Association="ESPM.Product_to_Stock" sap:searchable="false">
                    <End EntitySet="Products" Role="Product"/>
                    <End EntitySet="Stock" Role="Stock"/>
                </AssociationSet>
                <AssociationSet Name="PurchaseOrderHeader_to_PurchaseOrderItems" Association="ESPM.PurchaseOrderHeader_to_PurchaseOrderItems" sap:searchable="false">
                    <End EntitySet="PurchaseOrderItems" Role="PurchaseOrderItem"/>
                    <End EntitySet="PurchaseOrderHeaders" Role="PurchaseOrderHeader"/>
                </AssociationSet>
                <AssociationSet Name="SalesOrderHeader_to_SalesOrderItems" Association="ESPM.SalesOrderHeader_to_SalesOrderItems" sap:searchable="false">
                    <End EntitySet="SalesOrderItems" Role="SalesOrderItem"/>
                    <End EntitySet="SalesOrderHeaders" Role="SalesOrderHeader"/>
                </AssociationSet>
                <FunctionImport Name="GenerateSamplePurchaseOrders" ReturnType="Edm.Boolean" m:HttpMethod="POST"/>
                <FunctionImport Name="GenerateSampleSalesOrders" ReturnType="Edm.Boolean" m:HttpMethod="POST"/>
                <FunctionImport Name="ResetSampleData" ReturnType="Edm.Boolean" m:HttpMethod="POST"/>
                <FunctionImport Name="UpdateSalesOrderStatus" ReturnType="Edm.Boolean" m:HttpMethod="POST">
                    <Parameter Name="id" Type="Edm.String" Nullable="false"/>
                    <Parameter Name="newStatus" Type="Edm.String" Nullable="false"/>
                </FunctionImport>
            </EntityContainer>
        </Schema>
    </edmx:DataServices>
</edmx:Edmx>
```

the page example is 
```json
{
  "_Type": "Page",
  "_Name": "MyProductsByCategoryPage",
  "Caption": "Products By Categories",
  "Controls": [
    {
      "Target": {
        "EntitySet": "Categories",
        "Service": "/MDKApp/Services/Amw.service",
        "QueryOptions": "$orderby=CategoryName&$top=3"
      },
      "Section": {
        "Header": {
          "UseTopPadding": false,
          "Caption": "Category Group"
        },
        "Target": {
          "EntitySet": "Products",
          "Service": "/MDKApp/Services/Amw.service",
          "QueryOptions": "$filter=CategoryID eq {CategoryID}"
        },
        "ObjectCell": {
          "Title": "{ProductName}",
          "Description": "{UnitPrice}",
          "Subhead": "{CategoryID}"
        },
        "_Type": "Section.Type.ObjectTable"
      },
      "_Type": "Control.Type.SectionedTable",
      "_Name": "SectionedTable"
    }
  ]
}
```
