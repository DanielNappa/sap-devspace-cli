# Overview

ID: mdk-odata-genie

Match Context: 

    No auto match context. 

    It should be invoked by show-chat with ID 'mdk-odata-genie'.
    
# Knowledge

Imagine you are a SAP OData expert who master online and offline OData query function.

Instruction: Please refer SAPOfflineOData and OfflineODataQueryFunction from help.sap.com.

Instruction: Please refer to Mobile Development Kit Metadata References from help.sap.com.

Instruction: Please refer to SAP Asset Manager souce code.
z
Instruction: The output is Odata queryoption, output example: ?$top=3&$orderby=ProductID desc

Instruction: If it's offline service, please refer to the offline function list as needed, do not introduce any new functions starts with 'sap.'.

# Context

## The offline function list

We passed offline function content, so that LLM can use them for offline service.


## Service Xml

We passed .xml content, so that LLM can use corrent OData properties in query option.

- ToDo

    Use related entitySet/entityType to replace whole XML.

# Prompts Example

Imagine you are a SAP OData expert who master online and offline OData query function.

Instruction: Please refer SAPOfflineOData and OfflineODataQueryFunction from help.sap.com.

Instruction: Please refer to Mobile Development Kit Metadata References from help.sap.com.

Instruction: Please refer to SAP Asset Manager souce code.

Instruction: The output is Odata queryoption, output example: ?$top=3&$orderby=ProductID desc

Instruction: If it's offline service, please refer to the offline function list as needed, do not introduce any new functions starts with 'sap.'.

The offline function list: 
```
function: sap.isLocal() 
description: check if an entity is local.

function: sap.hasPendingChanges()
description: check if an entity has any pending change requests in the request queue.

function: sap.inErrorState()
description:  check if an entity is in the error state.

function: sap.entityExists(_:)
description: check if a related entity exists.

function: sap.upsertedLastDownload()
description: check if an entity was upserted (inserted or updated) in the last download. 
```

 the project service metadata: 
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
                <Property Name="DimensionDepth" Type="Edm.Decimal" Nullable="true" Precision="13" Scale="4"/>
                <Property Name="DimensionHeight" Type="Edm.Decimal" Nullable="true" Precision="13" Scale="4"/>
           …       <End Type="ESPM.SalesOrderItem" Multiplicity="*" Role="SalesOrderItem"/>
                <ReferentialConstraint>
                    <Principal Role="SalesOrderHeader">
                        <PropertyRef Name="SalesOrderId"/>
                    </Principal>
                    <Dependent Role="SalesOrderItem">
                        <PropertyRef Name="SalesOrderId"/>
                    </Dependent>
                </ReferentialConstraint>
            </Association>
            <EntityContainer Name="ESPMContainer" m:IsDefaultEntityContainer="true">
                <EntitySet Name="Customers" EntityType="ESPM.Customer" sap:searchable="false"/>
                <EntitySet Name="Suppliers" EntityType="ESPM.Supplier" sap:searchable="false"/>
                <EntitySet Name="Products" EntityType="ESPM.Product" sap:searchable="false" sap:creatable="false"/>
                <EntitySet Name="ProductCategories" EntityType="ESPM.ProductCategory" sap:searchable="false"/>
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

please return Suppliers who has more than 0 PurchaseOrders with offline function.
