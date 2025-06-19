entity Customers 
 {
	City: String;
	Country: String;
	key CustomerId: String;
	DateOfBirth: DateTime;
	EmailAddress: String;
	FirstName: String;
	HouseNumber: String;
	LastName: String;
	PhoneNumber: String;
	PostalCode: String;
	Street: String;
	Address: Address;
	UpdatedTimestamp: DateTime;
	SalesOrders: Association to many SalesOrderHeaders on SalesOrders.CustomerId = $self;
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
	key SupplierId: String;
	SupplierName: String;
	Address: Address;
	UpdatedTimestamp: DateTime;
	Products: Association to many Products on Products.SupplierId = $self;
	PurchaseOrders: Association to many PurchaseOrderHeaders on PurchaseOrders.SupplierId = $self;
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
	key ProductId: String;
	QuantityUnit: String;
	ShortDescription: String;
	SupplierId: String;
	UpdatedTimestamp: DateTime;
	Weight: Decimal;
	WeightUnit: String;
	StockDetails: Association to one Stock;
	SupplierDetails: Association to one Suppliers;
}
entity ProductCategories 
 {
	key Category: String;
	CategoryName: String;
	MainCategory: String;
	MainCategoryName: String;
	NumberOfProducts: Int64;
	UpdatedTimestamp: DateTime;
}
entity ProductTexts 
 {
	key Id: Int64;
	Language: String;
	LongDescription: String;
	Name: String;
	ProductId: String;
	ShortDescription: String;
}
entity Stock 
 {
	LotSize: Decimal;
	MinStock: Decimal;
	key ProductId: String;
	Quantity: Decimal;
	QuantityLessMin: Boolean;
	UpdatedTimestamp: DateTime;
	ProductDetails: Association to one Products;
}
entity PurchaseOrderHeaders 
 {
	CurrencyCode: String;
	GrossAmount: Decimal;
	NetAmount: Decimal;
	key PurchaseOrderId: String;
	SupplierId: String;
	TaxAmount: Decimal;
	Items: Association to many PurchaseOrderItems on Items.PurchaseOrderId = $self;
	SupplierDetails: Association to one Suppliers;
}
entity PurchaseOrderItems 
 {
	CurrencyCode: String;
	GrossAmount: Decimal;
	key ItemNumber: Int32;
	NetAmount: Decimal;
	ProductId: String;
	key PurchaseOrderId: String;
	Quantity: Decimal;
	QuantityUnit: String;
	TaxAmount: Decimal;
	Header: Association to one PurchaseOrderHeaders;
	ProductDetails: Association to one Products;
}
entity SalesOrderHeaders 
 {
	CreatedAt: DateTime;
	CurrencyCode: String;
	CustomerId: String;
	GrossAmount: Decimal;
	LifeCycleStatus: String;
	LifeCycleStatusName: String;
	NetAmount: Decimal;
	key SalesOrderId: String;
	TaxAmount: Decimal;
	Items: Association to many SalesOrderItems on Items.SalesOrderId = $self;
	CustomerDetails: Association to one Customers;
}
entity SalesOrderItems 
 {
	CurrencyCode: String;
	DeliveryDate: DateTime;
	GrossAmount: Decimal;
	key ItemNumber: Int32;
	NetAmount: Decimal;
	ProductId: String;
	Quantity: Decimal;
	QuantityUnit: String;
	key SalesOrderId: String;
	TaxAmount: Decimal;
	Header: Association to one SalesOrderHeaders;
	ProductDetails: Association to one Products;
}