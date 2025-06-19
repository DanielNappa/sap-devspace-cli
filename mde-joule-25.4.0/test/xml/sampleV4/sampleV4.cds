entity Customers 
 {
	City: String;
	Country: String;
	key CustomerID: Int64;
	DateOfBirth: Date;
	EmailAddress: String;
	Gender: Gender;
	FirstName: String;
	HouseNumber: String;
	LastName: String;
	PhoneNumber: String;
	PostalCode: String;
	Street: String;
	Address: Address;
	SalesOrders: Association to many SalesOrderHeaders on SalesOrders.Customer = $self;
}
entity Suppliers 
 {
	City: String;
	Country: String;
	EmailAddress: String;
	HouseNumber: String;
	PhoneNumber: String;
	PostalCode: String;
	Street: String;
	key SupplierID: Int64;
	SupplierName: String;
	Address: Address;
	Products: Association to many Products on Products.Supplier = $self;
	PurchaseOrders: Association to many PurchaseOrderHeaders on PurchaseOrders.Supplier = $self;
}
entity Products 
 {
	Category: String;
	CategoryName: String;
	CurrencyCode: String;
	DimensionDepth: Decimal;
	DimensionHeight: Decimal;
	DimensionUnit: String;
	DimensionWidth: Decimal;
	LongDescription: String;
	Name: String;
	PictureUrl: String;
	Price: Decimal;
	key ProductID: Int64;
	QuantityUnit: String;
	ShortDescription: String;
	SupplierID: Int64;
	Weight: Decimal;
	WeightUnit: String;
	Picture: Stream;
	Supplier: Association to one Suppliers;
	Stock: Association to one Stock;
	PurchaseOrderItems: Association to many PurchaseOrderItems on PurchaseOrderItems.Product = $self;
	SalesOrderItems: Association to many SalesOrderItems on SalesOrderItems.Product = $self;
}
entity ProductCategories 
 {
	key Category: String;
	CategoryName: String;
	MainCategory: String;
	MainCategoryName: String;
	NumberOfProducts: Int64;
}
entity ProductTexts 
 {
	key ID: Int64;
	Language: String;
	LongDescription: String;
	Name: String;
	ProductID: Int64;
	ShortDescription: String;
}
entity PurchaseOrderHeaders 
 {
	CurrencyCode: String;
	GrossAmount: Decimal;
	NetAmount: Decimal;
	key PurchaseOrderID: Int64;
	SupplierID: Int64;
	TaxAmount: Decimal;
	Supplier: Association to one Suppliers;
	Items: Association to many PurchaseOrderItems on Items.Header = $self;
}
entity PurchaseOrderItems 
 {
	CurrencyCode: String;
	GrossAmount: Decimal;
	key ItemNumber: Int32;
	NetAmount: Decimal;
	ProductID: Int64;
	key PurchaseOrderID: Int64;
	Quantity: Int32;
	QuantityUnit: String;
	TaxAmount: Decimal;
	Product: Association to one Products;
	Header: Association to one PurchaseOrderHeaders;
}
entity SalesOrderHeaders 
 {
	CreatedAt: DateTimeOffset;
	CurrencyCode: String;
	CustomerID: Int64;
	GrossAmount: Decimal;
	LifeCycleStatus: String;
	LifeCycleStatusName: String;
	NetAmount: Decimal;
	key SalesOrderID: Int64;
	TaxAmount: Decimal;
	Customer: Association to one Customers;
	Items: Association to many SalesOrderItems on Items.Header = $self;
}
entity SalesOrderItems 
 {
	CurrencyCode: String;
	DeliveryDate: Date;
	GrossAmount: Decimal;
	key ItemNumber: Int32;
	NetAmount: Decimal;
	ProductID: Int64;
	Quantity: Int32;
	QuantityUnit: String;
	key SalesOrderID: Int64;
	TaxAmount: Decimal;
	Product: Association to one Products;
	Header: Association to one SalesOrderHeaders;
}
entity Stock 
 {
	LotSize: Int32;
	MinStock: Int32;
	key ProductID: Int64;
	Quantity: Int32;
	QuantityLessMin: Boolean;
	Product: Association to one Products;
}