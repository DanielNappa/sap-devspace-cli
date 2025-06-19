entity PurchaseOrderItems 
 {
	key Id: Guid;
	CurrencyCode: String;
	GrossAmount: Decimal;
	NetAmount: Decimal;
	Quantity: Decimal;
	QuantityUnit: String;
	TaxAmount: Decimal;
	ProductDetails_ProductId: String;
	Header_PurchaseOrderId: String;
	ProductDetails: Association to one Products;
	Header: Association to one PurchaseOrderHeaders;
}
entity SalesOrderItems 
 {
	key Id: Guid;
	CurrencyCode: String;
	DeliveryDate: DateTimeOffset;
	GrossAmount: Decimal;
	NetAmount: Decimal;
	Quantity: Decimal;
	QuantityUnit: String;
	TaxAmount: Decimal;
	ProductDetails_ProductId: String;
	Header_SalesOrderId: String;
	ProductDetails: Association to one Products;
	Header: Association to one SalesOrderHeaders;
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
	UpdatedTimestamp: DateTimeOffset;
	Weight: Decimal;
	WeightUnit: String;
	Picture: Stream;
	SupplierDetails_SupplierId: String;
	SupplierDetails: Association to one Suppliers;
}
entity PurchaseOrderHeaders 
 {
	CurrencyCode: String;
	GrossAmount: Decimal;
	NetAmount: Decimal;
	key PurchaseOrderId: String;
	TaxAmount: Decimal;
	SupplierDetails_SupplierId: String;
	SupplierDetails: Association to one Suppliers;
	Items: Association to many PurchaseOrderItems on Items.Header = $self;
}
entity ProductCategories 
 {
	key Category: String;
	CategoryName: String;
	MainCategory: String;
	MainCategoryName: String;
	NumberOfProducts: Int64;
	UpdatedTimestamp: DateTimeOffset;
}
entity SalesOrderHeaders 
 {
	CreatedAt: DateTimeOffset;
	CurrencyCode: String;
	GrossAmount: Decimal;
	LifeCycleStatus: String;
	LifeCycleStatusName: String;
	NetAmount: Decimal;
	key SalesOrderId: String;
	TaxAmount: Decimal;
	CustomerDetails_CustomerId: String;
	CustomerDetails: Association to one Customers;
	Items: Association to many SalesOrderItems on Items.Header = $self;
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
entity Customers 
 {
	City: String;
	Country: String;
	key CustomerId: String;
	DateOfBirth: DateTimeOffset;
	EmailAddress: String;
	FirstName: String;
	HouseNumber: String;
	LastName: String;
	PhoneNumber: String;
	PostalCode: String;
	Street: String;
	UpdatedTimestamp: DateTimeOffset;
	SalesOrders: Association to many SalesOrderHeaders on SalesOrders.CustomerDetails = $self;
}
entity Stock 
 {
	LotSize: Decimal;
	MinStock: Decimal;
	key ProductId: String;
	Quantity: Decimal;
	QuantityLessMin: Boolean;
	UpdatedTimestamp: DateTimeOffset;
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
	UpdatedTimestamp: DateTimeOffset;
	Products: Association to many Products on Products.SupplierDetails = $self;
}