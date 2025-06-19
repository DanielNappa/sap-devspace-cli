entity AcctIndicators 
 {
	key AcctIndicator: String;
	AcctIndicatorDesc: String;
	Confirmations: Association to many Confirmations on Confirmations.AccountingIndicator = $self;
	WOHeaders_Nav: Association to many MyWorkOrderHeaders on WOHeaders_Nav.AccountingIndicator = $self;
}
entity AcctIndicators 
 {
	key AcctIndicator: String;
	AcctIndicatorDesc: String;
	Confirmations: Association to many Confirmations on Confirmations.AccountingIndicator = $self;
	WOHeaders_Nav: Association to many MyWorkOrderHeaders on WOHeaders_Nav.AccountingIndicator = $self;
}
entity ActivityReasons 
 {
	key ActivityReason: String;
	Description: String;
	LossOfCertification: String;
	LossOfLotMembership: String;
	PermitForInstallation: String;
	PermitForRemoval: String;
	PermitForReplace: String;
}
entity ActivityTypes 
 {
	key ActivityType: String;
	ActivityTypeDescription: String;
	NumberRange: String;
	OrderCategory: String;
	key OrderType: String;
}
entity ActivityTypes 
 {
	key ActivityType: String;
	ActivityTypeDescription: String;
	NumberRange: String;
	OrderCategory: String;
	key OrderType: String;
}
entity AddressCommunications 
 {
	key AddressNum: String;
	key CommType: String;
	Country: String;
	Default: String;
	EMail: String;
	key PersonNum: String;
	PreferTelType: String;
	key SequenceNum: String;
	TelExtension: String;
	TelNumber: String;
	TelNumberCall: String;
	TelNumberLong: String;
	Address: Association to many Addresses on Address.AddressNum = $self;
}
entity AddressCommunications 
 {
	key AddressNum: String;
	key CommType: String;
	Country: String;
	Default: String;
	EMail: String;
	key PersonNum: String;
	PreferTelType: String;
	key SequenceNum: String;
	TelExtension: String;
	TelNumber: String;
	TelNumberCall: String;
	TelNumberLong: String;
	Address: Association to many Addresses on Address.AddressNum = $self;
}
entity AddressDetSequences 
 {
	Active: String;
	key BusinessObject: String;
	key PMObjectType: String;
	SequenceNo: String;
	key SrcObjectTechEntityType: String;
	key SrcObjectType: String;
}
entity AddressDetSequences 
 {
	Active: String;
	key BusinessObject: String;
	key PMObjectType: String;
	SequenceNo: String;
	key SrcObjectTechEntityType: String;
	key SrcObjectType: String;
}
entity AddressGeocodes 
 {
	AddressNumber: String;
	key LogicalSystem: String;
	key ObjectGroup: String;
	key ObjectGroup1: String;
	key ObjectKey: String;
	key ObjectType: String;
	SpatialObjectGUID: String;
	SpatialObjectId: String;
	Address_Nav: Association to one Addresses;
	Geometry_Nav: Association to many Geometries on Geometry_Nav.ObjectGroup = $self;
}
entity AddressGeocodes 
 {
	AddressNumber: String;
	key LogicalSystem: String;
	key ObjectGroup: String;
	key ObjectGroup1: String;
	key ObjectKey: String;
	key ObjectType: String;
	SpatialObjectGUID: String;
	SpatialObjectId: String;
	Address_Nav: Association to one Addresses;
	Geometry_Nav: Association to many Geometries on Geometry_Nav.ObjectGroup = $self;
}
entity Addresses 
 {
	key AddressNum: String;
	Building: String;
	City: String;
	Country: String;
	CountryVersionFlag: String;
	FirstName: String;
	Floor: String;
	HouseNum: String;
	LastName: String;
	Name: String;
	PersonalAddress: String;
	PostalCode: String;
	Region: String;
	RoomNum: String;
	Street: String;
	AddressCommunication: Association to many AddressCommunications on AddressCommunication.AddressNum = $self;
	AddressGeocode_Nav: Association to many AddressGeocodes on AddressGeocode_Nav.AddressNumber = $self;
	Country_Nav: Association to one Countries;
	Customer_Nav: Association to many Customers on Customer_Nav.AddressNum = $self;
	EquipPartner_Nav: Association to many MyEquipPartners on EquipPartner_Nav.AddressNum = $self;
	Equipment: Association to many MyEquipments on Equipment.AddressNum = $self;
	FuncLocPartner_Nav: Association to many MyFuncLocPartners on FuncLocPartner_Nav.AddressNum = $self;
	FunctionalLocation: Association to many MyFunctionalLocations on FunctionalLocation.AddressNum = $self;
	Notification: Association to many MyNotificationHeaders on Notification.AddressNum = $self;
	NotificationPartner: Association to many MyNotificationPartners on NotificationPartner.AddressNum = $self;
	Region_Nav: Association to one Regions;
	RouteStops: Association to many MyRouteStops on RouteStops.AddressNum = $self;
	Vendor_Nav: Association to many Vendors on Vendor_Nav.AddressNum = $self;
	WorkOrder: Association to many MyWorkOrderHeaders on WorkOrder.AddressNum = $self;
	WorkOrderPartner: Association to many MyWorkOrderPartners on WorkOrderPartner.AddressNum = $self;
}
entity Addresses 
 {
	key AddressNum: String;
	Building: String;
	City: String;
	Country: String;
	CountryVersionFlag: String;
	FirstName: String;
	Floor: String;
	HouseNum: String;
	LastName: String;
	Name: String;
	PersonalAddress: String;
	PostalCode: String;
	Region: String;
	RoomNum: String;
	Street: String;
	AddressCommunication: Association to many AddressCommunications on AddressCommunication.AddressNum = $self;
	AddressGeocode_Nav: Association to many AddressGeocodes on AddressGeocode_Nav.AddressNumber = $self;
	Country_Nav: Association to one Countries;
	Customer_Nav: Association to many Customers on Customer_Nav.AddressNum = $self;
	EquipPartner_Nav: Association to many MyEquipPartners on EquipPartner_Nav.AddressNum = $self;
	Equipment: Association to many MyEquipments on Equipment.AddressNum = $self;
	FuncLocPartner_Nav: Association to many MyFuncLocPartners on FuncLocPartner_Nav.AddressNum = $self;
	FunctionalLocation: Association to many MyFunctionalLocations on FunctionalLocation.AddressNum = $self;
	Notification: Association to many MyNotificationHeaders on Notification.AddressNum = $self;
	NotificationPartner: Association to many MyNotificationPartners on NotificationPartner.AddressNum = $self;
	Region_Nav: Association to one Regions;
	RouteStops: Association to many MyRouteStops on RouteStops.AddressNum = $self;
	Vendor_Nav: Association to many Vendors on Vendor_Nav.AddressNum = $self;
	WorkOrder: Association to many MyWorkOrderHeaders on WorkOrder.AddressNum = $self;
	WorkOrderPartner: Association to many MyWorkOrderPartners on WorkOrderPartner.AddressNum = $self;
}
entity AddressesAtWork 
 {
	key AddressNum: String;
	Building: String;
	City: String;
	Country: String;
	CountryVersionFlag: String;
	Department: String;
	FirstName: String;
	Floor: String;
	Function: String;
	HouseNum: String;
	LastName: String;
	Name: String;
	key PersonNum: String;
	PersonalAddress: String;
	PostalCode: String;
	Region: String;
	RoomNum: String;
	Street: String;
	AddressAtWorkComm: Association to many AddressesAtWorkComm on AddressAtWorkComm.PersonNum = $self;
	EquipPartner_Nav: Association to many MyEquipPartners on EquipPartner_Nav.PersonNum = $self;
	FuncLocPartner_Nav: Association to many MyFuncLocPartners on FuncLocPartner_Nav.AddressNum = $self;
	NotificationPartner: Association to many MyNotificationPartners on NotificationPartner.PersonNum = $self;
	SAPUser_Nav: Association to many SAPUsers on SAPUser_Nav.PersonNum = $self;
	WorkOrderPartner: Association to many MyWorkOrderPartners on WorkOrderPartner.AddressNum = $self;
}
entity AddressesAtWork 
 {
	key AddressNum: String;
	Building: String;
	City: String;
	Country: String;
	CountryVersionFlag: String;
	Department: String;
	FirstName: String;
	Floor: String;
	Function: String;
	HouseNum: String;
	LastName: String;
	Name: String;
	key PersonNum: String;
	PersonalAddress: String;
	PostalCode: String;
	Region: String;
	RoomNum: String;
	Street: String;
	AddressAtWorkComm: Association to many AddressesAtWorkComm on AddressAtWorkComm.PersonNum = $self;
	EquipPartner_Nav: Association to many MyEquipPartners on EquipPartner_Nav.PersonNum = $self;
	FuncLocPartner_Nav: Association to many MyFuncLocPartners on FuncLocPartner_Nav.AddressNum = $self;
	NotificationPartner: Association to many MyNotificationPartners on NotificationPartner.PersonNum = $self;
	SAPUser_Nav: Association to many SAPUsers on SAPUser_Nav.PersonNum = $self;
	WorkOrderPartner: Association to many MyWorkOrderPartners on WorkOrderPartner.AddressNum = $self;
}
entity AddressesAtWorkComm 
 {
	key AddressNum: String;
	key CommType: String;
	Country: String;
	Default: String;
	EMail: String;
	key PersonNum: String;
	PreferTelType: String;
	key SequenceNum: String;
	TelExtension: String;
	TelNumber: String;
	TelNumberCall: String;
	TelNumberLong: String;
	AddressAtWork: Association to many AddressesAtWork on AddressAtWork.PersonNum = $self;
}
entity AddressesAtWorkComm 
 {
	key AddressNum: String;
	key CommType: String;
	Country: String;
	Default: String;
	EMail: String;
	key PersonNum: String;
	PreferTelType: String;
	key SequenceNum: String;
	TelExtension: String;
	TelNumber: String;
	TelNumberCall: String;
	TelNumberLong: String;
	AddressAtWork: Association to many AddressesAtWork on AddressAtWork.PersonNum = $self;
}
entity AnswerHeaders 
 {
	key AnswerId: String;
	AnswerOptionCount: String;
	Client: String;
	DisplayId: String;
	HasDependentObjects: String;
	LongDescription: String;
	Name: String;
	OrganizationName: String;
	ShortDescription: String;
	Status: String;
	Type: String;
	UoM: String;
	AnswerOptions_Nav: Association to many AnswerOptions on AnswerOptions_Nav.AnswerId = $self;
	ChecklistQuestion_Nav: Association to many ChecklistAssessmentQuestions on ChecklistQuestion_Nav.AnswerId = $self;
	FormQuestion_Nav: Association to many FormQuestions on FormQuestion_Nav.AnswerId = $self;
}
entity AnswerHeaders 
 {
	key AnswerId: String;
	AnswerOptionCount: String;
	Client: String;
	DisplayId: String;
	HasDependentObjects: String;
	LongDescription: String;
	Name: String;
	OrganizationName: String;
	ShortDescription: String;
	Status: String;
	Type: String;
	UoM: String;
	AnswerOptions_Nav: Association to many AnswerOptions on AnswerOptions_Nav.AnswerId = $self;
	ChecklistQuestion_Nav: Association to many ChecklistAssessmentQuestions on ChecklistQuestion_Nav.AnswerId = $self;
	FormQuestion_Nav: Association to many FormQuestions on FormQuestion_Nav.AnswerId = $self;
}
entity AnswerOptions 
 {
	key AnswerId: String;
	DisplayId: String;
	HasDependentObjects: String;
	IsSelected: String;
	LongDescription: String;
	key OptionID: String;
	ScaleDimension: String;
	ShortDescription: String;
	SortNumber: String;
	UoM: String;
	Value1: String;
	Value2: String;
	Weightage: String;
	AnswerHeader_Nav: Association to many AnswerHeaders on AnswerHeader_Nav.AnswerId = $self;
	ChecklistQuestion_Nav: Association to many ChecklistAssessmentQuestions on ChecklistQuestion_Nav.SelectedAnswerOptionId = $self;
}
entity AnswerOptions 
 {
	key AnswerId: String;
	DisplayId: String;
	HasDependentObjects: String;
	IsSelected: String;
	LongDescription: String;
	key OptionID: String;
	ScaleDimension: String;
	ShortDescription: String;
	SortNumber: String;
	UoM: String;
	Value1: String;
	Value2: String;
	Weightage: String;
	AnswerHeader_Nav: Association to many AnswerHeaders on AnswerHeader_Nav.AnswerId = $self;
	ChecklistQuestion_Nav: Association to many ChecklistAssessmentQuestions on ChecklistQuestion_Nav.SelectedAnswerOptionId = $self;
}
entity AppParameters 
 {
	FlagNoChange: Boolean;
	ParamComment: String;
	ParamGroup: String;
	ParamScope: String;
	ParamType: String;
	ParamValue: String;
	ParameterName: String;
	key RecordNo: String;
}
entity AppParameters 
 {
	FlagNoChange: Boolean;
	ParamComment: String;
	ParamGroup: String;
	ParamScope: String;
	ParamType: String;
	ParamValue: String;
	ParameterName: String;
	key RecordNo: String;
}
entity AssetCentralEquipmentIndicators 
 {
	key AINEquipmentGUID: String;
	AggregatedValue: String;
	EquipId: String;
	IndicatorCategory: String;
	IndicatorCategoryDescription: String;
	IndicatorColorCode: String;
	IndicatorDesc: String;
	IndicatorGroupDesc: String;
	key IndicatorGroupId: String;
	IndicatorGroupInternalId: String;
	IndicatorGroupName: String;
	IndicatorId: String;
	key IndicatorInstanceId: String;
	IndicatorInternalId: String;
	IndicatorName: String;
	IndicatorType: String;
	MaximumThreshold: String;
	MinimumThreshold: String;
	NormalFlag: String;
	TemplateId: String;
	TemplateInternalId: String;
	ThresholdDesc: String;
	Trend: String;
	UoMDescription: String;
	UpdateTimeStamp: String;
	Equipment_Nav: Association to many MyEquipments on Equipment_Nav.EquipId = $self;
}
entity AssetCentralEquipmentIndicators 
 {
	key AINEquipmentGUID: String;
	AggregatedValue: String;
	EquipId: String;
	IndicatorCategory: String;
	IndicatorCategoryDescription: String;
	IndicatorColorCode: String;
	IndicatorDesc: String;
	IndicatorGroupDesc: String;
	key IndicatorGroupId: String;
	IndicatorGroupInternalId: String;
	IndicatorGroupName: String;
	IndicatorId: String;
	key IndicatorInstanceId: String;
	IndicatorInternalId: String;
	IndicatorName: String;
	IndicatorType: String;
	MaximumThreshold: String;
	MinimumThreshold: String;
	NormalFlag: String;
	TemplateId: String;
	TemplateInternalId: String;
	ThresholdDesc: String;
	Trend: String;
	UoMDescription: String;
	UpdateTimeStamp: String;
	Equipment_Nav: Association to many MyEquipments on Equipment_Nav.EquipId = $self;
}
entity AssetCentralObjectLinks 
 {
	key AINObjectId: String;
	AINObjectType: String;
	EAMObjectId: String;
	EAMObjectType: String;
	EquipId: String;
	FuncLocIdIntern: String;
	ChecklistBusObject_Nav: Association to many ChecklistBusObjects on ChecklistBusObject_Nav.ObjectId = $self;
	Equipment_Nav: Association to many MyEquipments on Equipment_Nav.EquipId = $self;
	FuncLoc_Nav: Association to many MyFunctionalLocations on FuncLoc_Nav.FuncLocIdIntern = $self;
}
entity AssetCentralObjectLinks 
 {
	key AINObjectId: String;
	AINObjectType: String;
	EAMObjectId: String;
	EAMObjectType: String;
	EquipId: String;
	FuncLocIdIntern: String;
	ChecklistBusObject_Nav: Association to many ChecklistBusObjects on ChecklistBusObject_Nav.ObjectId = $self;
	Equipment_Nav: Association to many MyEquipments on Equipment_Nav.EquipId = $self;
	FuncLoc_Nav: Association to many MyFunctionalLocations on FuncLoc_Nav.FuncLocIdIntern = $self;
}
entity AttendanceTypes 
 {
	key AttendanceType: String;
	AttendanceTypeText: String;
	IsNonWorking: String;
	MaxDuration: String;
	MinDuration: String;
	key PersonnelArea: String;
	key PersonnelSubarea: String;
	key PersonnelSubareaGrouping: String;
}
entity AttendanceTypes 
 {
	key AttendanceType: String;
	AttendanceTypeText: String;
	IsNonWorking: String;
	MaxDuration: String;
	MinDuration: String;
	key PersonnelArea: String;
	key PersonnelSubarea: String;
	key PersonnelSubareaGrouping: String;
}
entity BOMHeaders 
 {
	AlternativeBOM: String;
	key BOMCategory: String;
	BOMDescription: String;
	BOMGroup: String;
	key BOMId: String;
	BOMStatus: String;
	BaseQuantity: String;
	BaseUoM: String;
	Counter: String;
	ValidFrom: String;
	ValidTo: String;
	BOMItems_Nav: Association to many BOMItems on BOMItems_Nav.BOMId = $self;
	EquiBOMs_Nav: Association to many EquipmentBOMs on EquiBOMs_Nav.BOMId = $self;
	FLocBOMs_Nav: Association to many FunctionalLocationBOMs on FLocBOMs_Nav.BOMId = $self;
	MaterialBOM_Nav: Association to many MaterialBOMs on MaterialBOM_Nav.BOMCategory = $self;
}
entity BOMHeaders 
 {
	AlternativeBOM: String;
	key BOMCategory: String;
	BOMDescription: String;
	BOMGroup: String;
	key BOMId: String;
	BOMStatus: String;
	BaseQuantity: String;
	BaseUoM: String;
	Counter: String;
	ValidFrom: String;
	ValidTo: String;
	BOMItems_Nav: Association to many BOMItems on BOMItems_Nav.BOMId = $self;
	EquiBOMs_Nav: Association to many EquipmentBOMs on EquiBOMs_Nav.BOMId = $self;
	FLocBOMs_Nav: Association to many FunctionalLocationBOMs on FLocBOMs_Nav.BOMId = $self;
	MaterialBOM_Nav: Association to many MaterialBOMs on MaterialBOM_Nav.BOMCategory = $self;
}
entity BOMItems 
 {
	key BOMCategory: String;
	key BOMId: String;
	BOMPath: String;
	ChildBoMCategory: String;
	ChildBoMId: String;
	ChildBoMUsage: String;
	ChildItemNode: String;
	Component: String;
	Counter: String;
	DocDesc: String;
	InheritedItemNode: String;
	ItemCategory: String;
	ItemGroup: String;
	ItemId: String;
	key ItemNode: String;
	ItemText1: String;
	ItemText2: String;
	MaterialDesc: String;
	MaterialNum: String;
	ObjectType: String;
	PMAssembly: String;
	Quantity: String;
	RequiredComponent: String;
	Sort: String;
	UoM: String;
	ValidFrom: String;
	ValidTo: String;
	BOMHeader_Nav: Association to many BOMHeaders on BOMHeader_Nav.BOMId = $self;
	ItemCategory_Nav: Association to many ItemCategories on ItemCategory_Nav.ItemCategory = $self;
}
entity BOMItems 
 {
	key BOMCategory: String;
	key BOMId: String;
	BOMPath: String;
	ChildBoMCategory: String;
	ChildBoMId: String;
	ChildBoMUsage: String;
	ChildItemNode: String;
	Component: String;
	Counter: String;
	DocDesc: String;
	InheritedItemNode: String;
	ItemCategory: String;
	ItemGroup: String;
	ItemId: String;
	key ItemNode: String;
	ItemText1: String;
	ItemText2: String;
	MaterialDesc: String;
	MaterialNum: String;
	ObjectType: String;
	PMAssembly: String;
	Quantity: String;
	RequiredComponent: String;
	Sort: String;
	UoM: String;
	ValidFrom: String;
	ValidTo: String;
	BOMHeader_Nav: Association to many BOMHeaders on BOMHeader_Nav.BOMId = $self;
	ItemCategory_Nav: Association to many ItemCategories on ItemCategory_Nav.ItemCategory = $self;
}
entity BlockingStatuses 
 {
	key DeliveryBlock: String;
	DeliveryBlockDesc: String;
	InboundDelivery_Nav: Association to many InboundDeliveries on InboundDelivery_Nav.DeliveryBlock = $self;
	OutboundDelivery_Nav: Association to many OutboundDeliveries on OutboundDelivery_Nav.DeliveryBlock = $self;
}
entity BlockingStatuses 
 {
	key DeliveryBlock: String;
	DeliveryBlockDesc: String;
	InboundDelivery_Nav: Association to many InboundDeliveries on InboundDelivery_Nav.DeliveryBlock = $self;
	OutboundDelivery_Nav: Association to many OutboundDeliveries on OutboundDelivery_Nav.DeliveryBlock = $self;
}
entity BusinessAreas 
 {
	key BusinessArea: String;
	BusinessAreaDesc: String;
}
entity BusinessAreas 
 {
	key BusinessArea: String;
	BusinessAreaDesc: String;
}
entity BusinessPartners 
 {
	AddressNum: String;
	key BPNum: String;
	BPType: String;
	CostCenter: String;
	FirstName: String;
	FullName: String;
	LastName: String;
	OrgName1: String;
	OrgName2: String;
	PersonNum: String;
	UserName: String;
	Address: Association to one Addresses;
	AddressAtWork: Association to one AddressesAtWork;
	Customer_Nav: Association to many Customers on Customer_Nav.PartnerNum = $self;
	EquipmentPartner: Association to many MyEquipPartners on EquipmentPartner.BPNum = $self;
	FunctionalLocPartner: Association to many MyFuncLocPartners on FunctionalLocPartner.BPNum = $self;
	NotificationPartner: Association to many MyNotificationPartners on NotificationPartner.BPNum = $self;
	Vendor_Nav: Association to many Vendors on Vendor_Nav.PartnerNum = $self;
	WCMApplicationPartner_Nav: Association to many WCMApplicationPartners on WCMApplicationPartner_Nav.BPNum = $self;
	WCMApprovalPartner_Nav: Association to many WCMApprovalPartners on WCMApprovalPartner_Nav.BPNum = $self;
	WCMDocumentPartner_Nav: Association to many WCMDocumentHeaderPartners on WCMDocumentPartner_Nav.BPNum = $self;
	WorkOrderPartner: Association to many MyWorkOrderPartners on WorkOrderPartner.BPNum = $self;
}
entity COActivityTypes 
 {
	key ActivityType: String;
	ActivityTypeDescription: String;
	key ControllingArea: String;
	key CostCenter: String;
	CostCenterDescription: String;
	key FiscalYear: String;
	IsOvertime: String;
}
entity COActivityTypes 
 {
	key ActivityType: String;
	ActivityTypeDescription: String;
	key ControllingArea: String;
	key CostCenter: String;
	CostCenterDescription: String;
	key FiscalYear: String;
	IsOvertime: String;
}
entity CategorizationSchemas 
 {
	CategoryDescription: String;
	key CategoryGuid: Guid;
	CategoryGuid32: String;
	CategoryID: String;
	CategoryLevel: String;
	CategoryName: String;
	Code: String;
	CodeCatalog: String;
	CodeGroup: String;
	CodeText: String;
	NodeLeaf: String;
	PareGuid: Guid;
	PareGuid32: String;
	key SchemaGuid: Guid;
	SchemaGuid32: String;
	SchemaID: String;
	SubjectProfile: String;
	S4ConfItemCat1_Nav: Association to many S4ServiceConfirmationItems on S4ConfItemCat1_Nav.SchemaGUID = $self;
	S4ConfItemCat2_Nav: Association to many S4ServiceConfirmationItems on S4ConfItemCat2_Nav.SchemaGUID = $self;
	S4ConfItemCat3_Nav: Association to many S4ServiceConfirmationItems on S4ConfItemCat3_Nav.SchemaGUID = $self;
	S4ConfItemCat4_Nav: Association to many S4ServiceConfirmationItems on S4ConfItemCat4_Nav.Category4 = $self;
	S4ConfirmationCat1_Nav: Association to many S4ServiceConfirmations on S4ConfirmationCat1_Nav.Category1 = $self;
	S4ConfirmationCat2_Nav: Association to many S4ServiceConfirmations on S4ConfirmationCat2_Nav.SchemaGUID = $self;
	S4ConfirmationCat3_Nav: Association to many S4ServiceConfirmations on S4ConfirmationCat3_Nav.SchemaGUID = $self;
	S4ConfirmationCat4_Nav: Association to many S4ServiceConfirmations on S4ConfirmationCat4_Nav.Category4 = $self;
	S4OrderCat1_Nav: Association to many S4ServiceOrders on S4OrderCat1_Nav.Category1 = $self;
	S4OrderCat2_Nav: Association to many S4ServiceOrders on S4OrderCat2_Nav.Category2 = $self;
	S4OrderCat3_Nav: Association to many S4ServiceOrders on S4OrderCat3_Nav.SchemaGUID = $self;
	S4OrderCat4_Nav: Association to many S4ServiceOrders on S4OrderCat4_Nav.Category4 = $self;
	S4RequestCat1_1_Nav: Association to many S4ServiceRequests on S4RequestCat1_1_Nav.ReasonCategory1 = $self;
	S4RequestCat1_2_Nav: Association to many S4ServiceRequests on S4RequestCat1_2_Nav.SchemaGUID2 = $self;
	S4RequestCat2_1_Nav: Association to many S4ServiceRequests on S4RequestCat2_1_Nav.SchemaGUID1 = $self;
	S4RequestCat2_2_Nav: Association to many S4ServiceRequests on S4RequestCat2_2_Nav.SubjCategory2 = $self;
	S4RequestCat3_1_Nav: Association to many S4ServiceRequests on S4RequestCat3_1_Nav.SchemaGUID1 = $self;
	S4RequestCat3_2_Nav: Association to many S4ServiceRequests on S4RequestCat3_2_Nav.SubjCategory3 = $self;
	S4RequestCat4_1_Nav: Association to many S4ServiceRequests on S4RequestCat4_1_Nav.ReasonCategory4 = $self;
	S4RequestCat4_2_Nav: Association to many S4ServiceRequests on S4RequestCat4_2_Nav.SchemaGUID2 = $self;
	S4ServItemCat1_Nav: Association to many S4ServiceItems on S4ServItemCat1_Nav.SchemaGUID = $self;
	S4ServItemCat2_Nav: Association to many S4ServiceItems on S4ServItemCat2_Nav.SchemaGUID = $self;
	S4ServItemCat3_Nav: Association to many S4ServiceItems on S4ServItemCat3_Nav.Category3 = $self;
	S4ServItemCat4_Nav: Association to many S4ServiceItems on S4ServItemCat4_Nav.Category4 = $self;
}
entity CatsTimesheetOverviewRows 
 {
	key Date: DateTime;
	Hours: Decimal;
	TimesheetEntry: Association to many CatsTimesheets;
}
entity CatsTimesheetOverviewRows 
 {
	key Date: DateTime;
	Hours: Decimal;
	TimesheetEntry: Association to many CatsTimesheets;
}
entity CatsTimesheetTexts 
 {
	key Counter: String;
	NewTextString: String;
	ObjectKey: String;
	TextId: String;
	TextObjectType: String;
	TextString: String;
	TimesheetEntry: Association to one CatsTimesheets;
}
entity CatsTimesheetTexts 
 {
	key Counter: String;
	NewTextString: String;
	ObjectKey: String;
	TextId: String;
	TextObjectType: String;
	TextString: String;
	TimesheetEntry: Association to one CatsTimesheets;
}
entity CatsTimesheets 
 {
	Activity: String;
	ActivityType: String;
	AttendAbsenceType: String;
	ControllerArea: String;
	CostCenter: String;
	key Counter: String;
	Date: DateTime;
	DocumentNumber: String;
	EndTime: Time;
	Hours: Decimal;
	LastChangeDate: DateTime;
	LastChangeTime: Time;
	LongTextFlag: String;
	Network: String;
	Operation: String;
	PersonnelNumber: String;
	Plant: String;
	RecOrder: String;
	SenderCostCenter: String;
	ShortText: String;
	StartTime: Time;
	StartTimestamp: DateTime;
	Status: String;
	SubOperation: String;
	WBSElement: String;
	Workcenter: String;
	Employee: Association to one Employees;
	MyWOHeader: Association to many MyWorkOrderHeaders on MyWOHeader.RecOrder = $self;
	MyWOOperation: Association to many MyWorkOrderOperations on MyWOOperation.RecOrder = $self;
	MyWOSubOperation: Association to many MyWorkOrderSubOperations on MyWOSubOperation.SubOperation = $self;
	Text: Association to many CatsTimesheetTexts on Text.Counter = $self;
}
entity CatsTimesheets 
 {
	Activity: String;
	ActivityType: String;
	AttendAbsenceType: String;
	ControllerArea: String;
	CostCenter: String;
	key Counter: String;
	Date: DateTime;
	DocumentNumber: String;
	EndTime: Time;
	Hours: Decimal;
	LastChangeDate: DateTime;
	LastChangeTime: Time;
	LongTextFlag: String;
	Network: String;
	Operation: String;
	PersonnelNumber: String;
	Plant: String;
	RecOrder: String;
	SenderCostCenter: String;
	ShortText: String;
	StartTime: Time;
	StartTimestamp: DateTime;
	Status: String;
	SubOperation: String;
	WBSElement: String;
	Workcenter: String;
	Employee: Association to one Employees;
	MyWOHeader: Association to many MyWorkOrderHeaders on MyWOHeader.RecOrder = $self;
	MyWOOperation: Association to many MyWorkOrderOperations on MyWOOperation.RecOrder = $self;
	MyWOSubOperation: Association to many MyWorkOrderSubOperations on MyWOSubOperation.SubOperation = $self;
	Text: Association to many CatsTimesheetTexts on Text.Counter = $self;
}
entity CharValueCodes 
 {
	ValueCode1: String;
	ValueCode2: String;
	key ValueRel: String;
	ClassCharValCode_Nav: Association to many ClassCharacteristicValues on ClassCharValCode_Nav.ValueRel = $self;
	EquipCharValCode_Nav: Association to many MyEquipClassCharValues on EquipCharValCode_Nav.ValueRel = $self;
	FuncLocCharValCode_Nav: Association to many MyFuncLocClassCharValues on FuncLocCharValCode_Nav.ValueRel = $self;
}
entity CharValueCodes 
 {
	ValueCode1: String;
	ValueCode2: String;
	key ValueRel: String;
	ClassCharValCode_Nav: Association to many ClassCharacteristicValues on ClassCharValCode_Nav.ValueRel = $self;
	EquipCharValCode_Nav: Association to many MyEquipClassCharValues on EquipCharValCode_Nav.ValueRel = $self;
	FuncLocCharValCode_Nav: Association to many MyFuncLocClassCharValues on FuncLocCharValCode_Nav.ValueRel = $self;
}
entity Characteristics 
 {
	AdditionalVal: String;
	CaseSensitive: String;
	CharDesc: String;
	key CharId: String;
	CharName: String;
	DataType: String;
	EntryRequired: String;
	Exponent: Int16;
	FieldName: String;
	IntCounter: String;
	IntValueAllow: String;
	NumofChar: Int16;
	NumofDecimal: Int16;
	SingleValue: String;
	TableName: String;
	Template: String;
	UoM: String;
	UoMExt: String;
	ValueSign: String;
	CharacteristicValues: Association to many ClassCharacteristicValues on CharacteristicValues.CharId = $self;
	ClassCharacteristics: Association to many ClassCharacteristics on ClassCharacteristics.InternCharNum = $self;
	EquiClassCharValue: Association to many MyEquipClassCharValues on EquiClassCharValue.CharId = $self;
	FuncLocClassCharValue: Association to many MyFuncLocClassCharValues on FuncLocClassCharValue.CharId = $self;
}
entity Characteristics 
 {
	AdditionalVal: String;
	CaseSensitive: String;
	CharDesc: String;
	key CharId: String;
	CharName: String;
	DataType: String;
	EntryRequired: String;
	Exponent: Int16;
	FieldName: String;
	IntCounter: String;
	IntValueAllow: String;
	NumofChar: Int16;
	NumofDecimal: Int16;
	SingleValue: String;
	TableName: String;
	Template: String;
	UoM: String;
	UoMExt: String;
	ValueSign: String;
	CharacteristicValues: Association to many ClassCharacteristicValues on CharacteristicValues.CharId = $self;
	ClassCharacteristics: Association to many ClassCharacteristics on ClassCharacteristics.InternCharNum = $self;
	EquiClassCharValue: Association to many MyEquipClassCharValues on EquiClassCharValue.CharId = $self;
	FuncLocClassCharValue: Association to many MyFuncLocClassCharValues on FuncLocClassCharValue.CharId = $self;
}
entity ChecklistAssessmentQuestions 
 {
	AINObjectId: String;
	AnswerId: String;
	key AssessmentId: String;
	CLTemplateId: String;
	ChecklistType: String;
	Comments: String;
	DisplayId: String;
	FormId: String;
	key GroupId: String;
	Language: String;
	key ObjectId: String;
	key QuestionId: String;
	SelectedAnswerOptionId: String;
	SortNumber: String;
	Status: String;
	TemplateId: String;
	Version: String;
	AnswerHeader_Nav: Association to many AnswerHeaders on AnswerHeader_Nav.AnswerId = $self;
	AnswerOption_Nav: Association to many AnswerOptions on AnswerOption_Nav.SelectedAnswerOptionId = $self;
	ChecklistBusObject_Nav: Association to many ChecklistBusObjects on ChecklistBusObject_Nav.CLTemplateId = $self;
	FormGroup_Nav: Association to many FormGroups on FormGroup_Nav.GroupId = $self;
	FormQuestion_Nav: Association to many FormQuestions on FormQuestion_Nav.QuestionId = $self;
}
entity ChecklistAssessmentQuestions 
 {
	AINObjectId: String;
	AnswerId: String;
	key AssessmentId: String;
	CLTemplateId: String;
	ChecklistType: String;
	Comments: String;
	DisplayId: String;
	FormId: String;
	key GroupId: String;
	Language: String;
	key ObjectId: String;
	key QuestionId: String;
	SelectedAnswerOptionId: String;
	SortNumber: String;
	Status: String;
	TemplateId: String;
	Version: String;
	AnswerHeader_Nav: Association to many AnswerHeaders on AnswerHeader_Nav.AnswerId = $self;
	AnswerOption_Nav: Association to many AnswerOptions on AnswerOption_Nav.SelectedAnswerOptionId = $self;
	ChecklistBusObject_Nav: Association to many ChecklistBusObjects on ChecklistBusObject_Nav.CLTemplateId = $self;
	FormGroup_Nav: Association to many FormGroups on FormGroup_Nav.GroupId = $self;
	FormQuestion_Nav: Association to many FormQuestions on FormQuestion_Nav.QuestionId = $self;
}
entity ChecklistBusObjects 
 {
	key AssessmentId: String;
	ChecklistTemplateOrder: String;
	DisplayId: String;
	EquipId: String;
	FormId: String;
	FuncLocIdIntern: String;
	key ObjectId: String;
	ObjectType: String;
	Status: String;
	key TemplateId: String;
	AssessmentQuestion_Nav: Association to many ChecklistAssessmentQuestions on AssessmentQuestion_Nav.CLTemplateId = $self;
	Equipment_Nav: Association to many MyEquipments on Equipment_Nav.EquipId = $self;
	Form_Nav: Association to many Forms on Form_Nav.FormId = $self;
	FuncLoc_Nav: Association to many MyFunctionalLocations on FuncLoc_Nav.FuncLocIdIntern = $self;
}
entity ChecklistBusObjects 
 {
	key AssessmentId: String;
	ChecklistTemplateOrder: String;
	DisplayId: String;
	EquipId: String;
	FormId: String;
	FuncLocIdIntern: String;
	key ObjectId: String;
	ObjectType: String;
	Status: String;
	key TemplateId: String;
	AssessmentQuestion_Nav: Association to many ChecklistAssessmentQuestions on AssessmentQuestion_Nav.CLTemplateId = $self;
	Equipment_Nav: Association to many MyEquipments on Equipment_Nav.EquipId = $self;
	Form_Nav: Association to many Forms on Form_Nav.FormId = $self;
	FuncLoc_Nav: Association to many MyFunctionalLocations on FuncLoc_Nav.FuncLocIdIntern = $self;
}
entity ClassCharacteristicValues 
 {
	key CharId: String;
	key CharValCounter: String;
	CharValDesc: String;
	CharValFrom: Double;
	CharValTo: Double;
	CharValue: String;
	key IntCounter: String;
	UoM: String;
	ValueRel: String;
	CharValCode_Nav: Association to many CharValueCodes on CharValCode_Nav.ValueRel = $self;
	Characteristic: Association to many Characteristics on Characteristic.CharId = $self;
}
entity ClassCharacteristicValues 
 {
	key CharId: String;
	key CharValCounter: String;
	CharValDesc: String;
	CharValFrom: Double;
	CharValTo: Double;
	CharValue: String;
	key IntCounter: String;
	UoM: String;
	ValueRel: String;
	CharValCode_Nav: Association to many CharValueCodes on CharValCode_Nav.ValueRel = $self;
	Characteristic: Association to many Characteristics on Characteristic.CharId = $self;
}
entity ClassCharacteristics 
 {
	key IntCounter: String;
	InternCharNum: String;
	key InternClassNum: String;
	key ItemId: String;
	LAMEnabled: String;
	Characteristic: Association to many Characteristics on Characteristic.InternCharNum = $self;
	ClassDefinition: Association to many ClassDefinitions on ClassDefinition.InternClassNum = $self;
}
entity ClassCharacteristics 
 {
	key IntCounter: String;
	InternCharNum: String;
	key InternClassNum: String;
	key ItemId: String;
	LAMEnabled: String;
	Characteristic: Association to many Characteristics on Characteristic.InternCharNum = $self;
	ClassDefinition: Association to many ClassDefinitions on ClassDefinition.InternClassNum = $self;
}
entity ClassDefinitions 
 {
	ClassDesc: String;
	ClassId: String;
	ClassStatus: String;
	ClassType: String;
	key InternClassNum: String;
	ClassCharacteristics: Association to many ClassCharacteristics on ClassCharacteristics.InternClassNum = $self;
	EquipClass: Association to many MyEquipClasses on EquipClass.InternClassNum = $self;
	FuncLocClass: Association to many MyFuncLocClasses on FuncLocClass.InternClassNum = $self;
}
entity ClassDefinitions 
 {
	ClassDesc: String;
	ClassId: String;
	ClassStatus: String;
	ClassType: String;
	key InternClassNum: String;
	ClassCharacteristics: Association to many ClassCharacteristics on ClassCharacteristics.InternClassNum = $self;
	EquipClass: Association to many MyEquipClasses on EquipClass.InternClassNum = $self;
	FuncLocClass: Association to many MyFuncLocClasses on FuncLocClass.InternClassNum = $self;
}
entity ClassTypes 
 {
	key ClassType: String;
	Description: String;
	Table: String;
	Texts: String;
}
entity ClassTypes 
 {
	key ClassType: String;
	Description: String;
	Table: String;
	Texts: String;
}
entity ConfirmationLongTexts 
 {
	key ConfirmationCounter: String;
	key ConfirmationNum: String;
	NewTextString: String;
	ObjectKey: String;
	TextId: String;
	TextObjType: String;
	TextString: String;
	Confirmation: Association to one Confirmations;
}
entity ConfirmationLongTexts 
 {
	key ConfirmationCounter: String;
	key ConfirmationNum: String;
	NewTextString: String;
	ObjectKey: String;
	TextId: String;
	TextObjType: String;
	TextString: String;
	Confirmation: Association to one Confirmations;
}
entity ConfirmationOverviewRows 
 {
	ActualDuration: Decimal;
	ActualDurationUOM: String;
	ActualWork: Decimal;
	ActualWorkUOM: String;
	key PostingDate: DateTime;
	Confirmations: Association to many Confirmations on Confirmations.PostingDate = $self;
}
entity ConfirmationOverviewRows 
 {
	ActualDuration: Decimal;
	ActualDurationUOM: String;
	ActualWork: Decimal;
	ActualWorkUOM: String;
	key PostingDate: DateTime;
	Confirmations: Association to many Confirmations on Confirmations.PostingDate = $self;
}
entity Confirmations 
 {
	AccountingIndicator: String;
	ActivityType: String;
	ActualDuration: Decimal;
	ActualDurationUOM: String;
	ActualWork: Decimal;
	ActualWorkUOM: String;
	CompleteFlag: String;
	key ConfirmationCounter: String;
	key ConfirmationNum: String;
	CreatedBy: String;
	CreatedDate: DateTime;
	CreatedTime: Time;
	Description: String;
	FinalConfirmation: String;
	FinishDate: DateTime;
	FinishTime: Time;
	LAMObjectType: String;
	LAMTableKey: String;
	Operation: String;
	OrderID: String;
	OrderType: String;
	PersonnelNumber: String;
	Plant: String;
	PostingDate: DateTime;
	ReverseIndicator: String;
	StartDate: DateTime;
	StartTime: Time;
	StartTimeStamp: DateTime;
	SubOperation: String;
	VarianceReason: String;
	WorkCenter: String;
	AcctIndicator: Association to one AcctIndicators;
	ConfirmationOverview: Association to one ConfirmationOverviewRows;
	LAMObjectDatum_Nav: Association to many LAMObjectData on LAMObjectDatum_Nav.ConfirmationNum = $self;
	LongText: Association to many ConfirmationLongTexts on LongText.ConfirmationNum = $self;
	Variance: Association to one VarianceReasons;
	WorkOrderHeader: Association to one MyWorkOrderHeaders;
	WorkOrderOperation: Association to one MyWorkOrderOperations;
	WorkOrderSubOperation: Association to one MyWorkOrderSubOperations;
}
entity Confirmations 
 {
	AccountingIndicator: String;
	ActivityType: String;
	ActualDuration: Decimal;
	ActualDurationUOM: String;
	ActualWork: Decimal;
	ActualWorkUOM: String;
	CompleteFlag: String;
	key ConfirmationCounter: String;
	key ConfirmationNum: String;
	CreatedBy: String;
	CreatedDate: DateTime;
	CreatedTime: Time;
	Description: String;
	FinalConfirmation: String;
	FinishDate: DateTime;
	FinishTime: Time;
	LAMObjectType: String;
	LAMTableKey: String;
	Operation: String;
	OrderID: String;
	OrderType: String;
	PersonnelNumber: String;
	Plant: String;
	PostingDate: DateTime;
	ReverseIndicator: String;
	StartDate: DateTime;
	StartTime: Time;
	StartTimeStamp: DateTime;
	SubOperation: String;
	VarianceReason: String;
	WorkCenter: String;
	AcctIndicator: Association to one AcctIndicators;
	ConfirmationOverview: Association to one ConfirmationOverviewRows;
	LAMObjectDatum_Nav: Association to many LAMObjectData on LAMObjectDatum_Nav.ConfirmationNum = $self;
	LongText: Association to many ConfirmationLongTexts on LongText.ConfirmationNum = $self;
	Variance: Association to one VarianceReasons;
	WorkOrderHeader: Association to one MyWorkOrderHeaders;
	WorkOrderOperation: Association to one MyWorkOrderOperations;
	WorkOrderSubOperation: Association to one MyWorkOrderSubOperations;
}
entity ConnectionObjectMRNotes 
 {
	key ConnectionObject: String;
	NoteID: String;
	Priority: String;
	key SequenceNum: String;
	ConnectionObject_Nav: Association to many ConnectionObjects on ConnectionObject_Nav.ConnectionObject = $self;
	MeterReaderNote_Nav: Association to one MeterReaderNotes;
}
entity ConnectionObjects 
 {
	AuthorizationGroup: String;
	key ConnectionObject: String;
	Country: String;
	Description: String;
	MaintenancePlant: String;
	PoliticalRegStrutureElement: String;
	AuthorizationGroup_Nav: Association to one PMAuthorizationGroups;
	ConnectionObjectMRNote_Nav: Association to many ConnectionObjectMRNotes on ConnectionObjectMRNote_Nav.ConnectionObject = $self;
	DeviceLocations_Nav: Association to many DeviceLocations on DeviceLocations_Nav.ConnectionObject = $self;
	Devices_Nav: Association to many Devices on Devices_Nav.ConnectionObject = $self;
	FuncLocation_Nav: Association to one MyFunctionalLocations;
	OrderISULink_Nav: Association to many OrderISULinks on OrderISULink_Nav.ConnectionObject = $self;
	PolRegStructElement_Nav: Association to one PolRegStructElements;
	Premises_Nav: Association to many Premises on Premises_Nav.ConnectionObject = $self;
	StreetRouteConnectionObject_Nav: Association to many StreetRouteConnectionObjects on StreetRouteConnectionObject_Nav.ConnectionObject = $self;
	StreetRoute_Nav: Association to many StreetRoutes on StreetRoute_Nav.ConnectionObject = $self;
}
entity ConsequenceCategories 
 {
	key CategoryId: String;
	key GroupId: String;
	key PrioritizationProfileId: String;
	Subtitle: String;
	Title: String;
	ConsequenceGroup_Nav: Association to many ConsequenceGroups on ConsequenceGroup_Nav.GroupId = $self;
	ConsequenceLikelihoodMap_Nav: Association to many ConsequenceLikelihoodMaps on ConsequenceLikelihoodMap_Nav.PrioritizationProfileId = $self;
	ConsequenceSeverity_Nav: Association to many ConsequenceSeverities on ConsequenceSeverity_Nav.CategoryId = $self;
}
entity ConsequenceGroups 
 {
	Description: String;
	key GroupId: String;
	key PrioritizationProfileId: String;
	ConsequenceCategory_Nav: Association to many ConsequenceCategories on ConsequenceCategory_Nav.GroupId = $self;
	PrioritizationProfile_Nav: Association to many PrioritizationProfiles on PrioritizationProfile_Nav.PrioritizationProfileId = $self;
}
entity ConsequenceLikelihoodMaps 
 {
	key CategoryId: String;
	key GroupId: String;
	key LikelihoodId: String;
	key LikelihoodPosition: String;
	key PrioritizationProfileId: String;
	ConsequenceCategory_Nav: Association to many ConsequenceCategories on ConsequenceCategory_Nav.PrioritizationProfileId = $self;
	ConsequenceLikelihood_Nav: Association to many ConsequenceLikelihoods on ConsequenceLikelihood_Nav.LikelihoodId = $self;
}
entity ConsequenceLikelihoods 
 {
	Description: String;
	key LikelihoodId: String;
	Position: String;
	ConsequenceLikelihoodMap_Nav: Association to many ConsequenceLikelihoodMaps on ConsequenceLikelihoodMap_Nav.LikelihoodId = $self;
}
entity ConsequenceSeverities 
 {
	key CategoryId: String;
	key ConsequenceId: String;
	Description: String;
	key GroupId: String;
	Position: String;
	key PrioritizationProfileId: String;
	ConsequenceCategory_Nav: Association to many ConsequenceCategories on ConsequenceCategory_Nav.CategoryId = $self;
}
entity ControlKeys 
 {
	key Application: String;
	ConfirmationIndicator: String;
	key ControlKey: String;
	ControlKeyDescription: String;
	InspCharRequired: String;
}
entity ControlKeys 
 {
	key Application: String;
	ConfirmationIndicator: String;
	key ControlKey: String;
	ControlKeyDescription: String;
	InspCharRequired: String;
}
entity CostCenters 
 {
	BusinessArea: String;
	CCtrCategory: String;
	key COArea: String;
	CompanyCode: String;
	key CostCenter: String;
	Description: String;
	Language: String;
	LockActPCosts: String;
	Name1: String;
	PersonResp: String;
	Planpricosts: String;
	ShortText: String;
	UserResponsible: String;
	ValidFrom: DateTime;
	key ValidTo: DateTime;
}
entity Countries 
 {
	key Country: String;
	Description: String;
	DialingCode: String;
	PostalCodeLength: String;
	PostalCodeMask: String;
	PostalCodeMask2: String;
	Addresses_Nav: Association to many Addresses on Addresses_Nav.Country = $self;
	Regions_Nav: Association to many Regions on Regions_Nav.Country = $self;
}
entity Countries 
 {
	key Country: String;
	Description: String;
	DialingCode: String;
	PostalCodeLength: String;
	PostalCodeMask: String;
	PostalCodeMask2: String;
	Addresses_Nav: Association to many Addresses on Addresses_Nav.Country = $self;
	Regions_Nav: Association to many Regions on Regions_Nav.Country = $self;
}
entity CrewListItems 
 {
	CatsHours: Decimal;
	CatsUoM: String;
	CompanyCode: String;
	CrewId: String;
	key CrewItemId: String;
	CrewItemKey: String;
	CrewItemType: String;
	Plant: String;
	RemovalFlag: String;
	RemovalTimeStamp: DateTime;
	WorkDate: DateTime;
	CrewList: Association to many CrewLists on CrewList.CrewId = $self;
	Employee: Association to one Employees;
	Fleet: Association to many Fleets on Fleet.CrewItemKey = $self;
}
entity CrewListItems 
 {
	CatsHours: Decimal;
	CatsUoM: String;
	CompanyCode: String;
	CrewId: String;
	key CrewItemId: String;
	CrewItemKey: String;
	CrewItemType: String;
	Plant: String;
	RemovalFlag: String;
	RemovalTimeStamp: DateTime;
	WorkDate: DateTime;
	CrewList: Association to many CrewLists on CrewList.CrewId = $self;
	Employee: Association to one Employees;
	Fleet: Association to many Fleets on Fleet.CrewItemKey = $self;
}
entity CrewLists 
 {
	CompanyCode: String;
	CreationTimeStamp: DateTime;
	key CrewId: String;
	CrewListNo: String;
	ListReferenceKey: String;
	ListType: String;
	OriginTimeStamp: DateTime;
	Plant: String;
	SAPUserName: String;
	UserGuid: String;
	CrewListItems: Association to many CrewListItems on CrewListItems.CrewId = $self;
}
entity CrewLists 
 {
	CompanyCode: String;
	CreationTimeStamp: DateTime;
	key CrewId: String;
	CrewListNo: String;
	ListReferenceKey: String;
	ListType: String;
	OriginTimeStamp: DateTime;
	Plant: String;
	SAPUserName: String;
	UserGuid: String;
	CrewListItems: Association to many CrewListItems on CrewListItems.CrewId = $self;
}
entity Currencies 
 {
	ALTWR: String;
	GDATU: DateTime;
	ISOCD: String;
	KTEXT: String;
	SPRAS: String;
	key WAERS: String;
	XPRIMARY: String;
	S4ConfirmItems_Nav: Association to many S4ServiceConfirmationItems on S4ConfirmItems_Nav.Currency = $self;
	S4ContractItems_Nav: Association to many S4ServiceContractItems on S4ContractItems_Nav.Currency = $self;
	S4ServiceItems_Nav: Association to many S4ServiceItems on S4ServiceItems_Nav.Currency = $self;
}
entity CustomerSalesData 
 {
	key Customer: String;
	key DistributionChannel: String;
	key Division: String;
	IncoTerms: String;
	IncotermsPart2: String;
	key SalesOrg: String;
	Customer_Nav: Association to one Customers;
}
entity CustomerSalesData 
 {
	key Customer: String;
	key DistributionChannel: String;
	key Division: String;
	IncoTerms: String;
	IncotermsPart2: String;
	key SalesOrg: String;
	Customer_Nav: Association to one Customers;
}
entity Customers 
 {
	AddressNum: String;
	key Customer: String;
	CustomerAccountGroup: String;
	Name1: String;
	PartnerNum: String;
	Address_Nav: Association to one Addresses;
	CustomerSalesData_Nav: Association to many CustomerSalesData on CustomerSalesData_Nav.Customer = $self;
	NotifSales_Nav: Association to many MyNotificationSales on NotifSales_Nav.Customer = $self;
	OutboundDelivery_Nav: Association to many OutboundDeliveries on OutboundDelivery_Nav.ShipToParty = $self;
	WOSales_Nav: Association to many MyWorkOrderSales on WOSales_Nav.Customer = $self;
}
entity Customers 
 {
	AddressNum: String;
	key Customer: String;
	CustomerAccountGroup: String;
	Name1: String;
	PartnerNum: String;
	Address_Nav: Association to one Addresses;
	CustomerSalesData_Nav: Association to many CustomerSalesData on CustomerSalesData_Nav.Customer = $self;
	NotifSales_Nav: Association to many MyNotificationSales on NotifSales_Nav.Customer = $self;
	OutboundDelivery_Nav: Association to many OutboundDeliveries on OutboundDelivery_Nav.ShipToParty = $self;
	WOSales_Nav: Association to many MyWorkOrderSales on WOSales_Nav.Customer = $self;
}
entity DefectClasses 
 {
	key DefectClass: String;
	QualityScore: String;
	ShortDesc: String;
	InspCode_Nav: Association to many InspectionCodes on InspCode_Nav.DefectClass = $self;
	InspectionChars_Nav: Association to many InspectionCharacteristics on InspectionChars_Nav.DefectClass = $self;
	NotifItems_Nav: Association to many MyNotificationItems on NotifItems_Nav.DefectClass = $self;
	PMCatalogCode_Nav: Association to many PMCatalogCodes on PMCatalogCode_Nav.DefectClass = $self;
}
entity DefectClasses 
 {
	key DefectClass: String;
	QualityScore: String;
	ShortDesc: String;
	InspCode_Nav: Association to many InspectionCodes on InspCode_Nav.DefectClass = $self;
	InspectionChars_Nav: Association to many InspectionCharacteristics on InspectionChars_Nav.DefectClass = $self;
	NotifItems_Nav: Association to many MyNotificationItems on NotifItems_Nav.DefectClass = $self;
	PMCatalogCode_Nav: Association to many PMCatalogCodes on PMCatalogCode_Nav.DefectClass = $self;
}
entity DeliveryPriorities 
 {
	key DeliveryPriority: String;
	Description: String;
	InboundDelivery_Nav: Association to many InboundDeliveries on InboundDelivery_Nav.DeliveryPriority = $self;
	OutboundDelivery_Nav: Association to many OutboundDeliveries on OutboundDelivery_Nav.DeliveryPriority = $self;
}
entity DeliveryPriorities 
 {
	key DeliveryPriority: String;
	Description: String;
	InboundDelivery_Nav: Association to many InboundDeliveries on InboundDelivery_Nav.DeliveryPriority = $self;
	OutboundDelivery_Nav: Association to many OutboundDeliveries on OutboundDelivery_Nav.DeliveryPriority = $self;
}
entity DetectionCatalogs 
 {
	DetectionCatalog: String;
	DetectionCatalogDesc: String;
	key NotifType: String;
	NotifType_Nav: Association to many NotificationTypes on NotifType_Nav.NotifType = $self;
}
entity DetectionCodes 
 {
	key DetectionCatalog: String;
	key DetectionCode: String;
	DetectionCodeDesc: String;
	key DetectionGroup: String;
	NotifHeader_Nav: Association to many MyNotificationHeaders on NotifHeader_Nav.DetectionCodeGroup = $self;
}
entity DetectionGroups 
 {
	key DetectionCatalog: String;
	key DetectionGroup: String;
	DetectionGroupDesc: String;
	DetectionCodes_Nav: Association to many DetectionCodes on DetectionCodes_Nav.DetectionCatalog = $self;
	NotifHeader_Nav: Association to many MyNotificationHeaders on NotifHeader_Nav.DetectionCodeGroup = $self;
}
entity DeviceCategories 
 {
	Description: String;
	key DeviceCategory: String;
	RegisterGroup: String;
	Unit: String;
	Devices_Nav: Association to many Devices on Devices_Nav.DeviceCategory = $self;
	Material_Nav: Association to one Materials;
	OrderISULink_Nav: Association to many OrderISULinks on OrderISULink_Nav.DeviceCategory = $self;
}
entity DeviceGoodsMovements 
 {
	CostCenter: String;
	key EquipmentNum: String;
	MovementType: String;
	Plant: String;
	StorageLocation: String;
	Device_Nav: Association to many Devices on Device_Nav.EquipmentNum = $self;
}
entity DeviceLocationMRNotes 
 {
	key DeviceLocation: String;
	NoteID: String;
	Priority: String;
	key SequenceNum: String;
	DeviceLocation_Nav: Association to many DeviceLocations on DeviceLocation_Nav.DeviceLocation = $self;
	MeterReaderNote_Nav: Association to one MeterReaderNotes;
}
entity DeviceLocations 
 {
	ConnectionObject: String;
	Description: String;
	key DeviceLocation: String;
	LocationAddition: String;
	Premise: String;
	ConnectionObject_Nav: Association to many ConnectionObjects on ConnectionObject_Nav.ConnectionObject = $self;
	DeviceLocationMRNote_Nav: Association to many DeviceLocationMRNotes on DeviceLocationMRNote_Nav.DeviceLocation = $self;
	Device_Nav: Association to one Devices;
	FuncLocation_Nav: Association to one MyFunctionalLocations;
	OrderISULink_Nav: Association to many OrderISULinks on OrderISULink_Nav.DeviceLocation = $self;
	Premise_Nav: Association to many Premises on Premise_Nav.Premise = $self;
}
entity DeviceMeterReadings 
 {
	ActualMeterReadingDate: DateTime;
	ActualMeterReadingTime: String;
	DateMaxRead: DateTime;
	EquipmentNum: String;
	MeterReaderNote: String;
	MeterReaderNum: String;
	MeterReadingActive: String;
	MeterReadingDate: DateTime;
	key MeterReadingDocID: String;
	MeterReadingReason: String;
	MeterReadingRecorded: Double;
	MeterReadingTime: String;
	MeterReadingType: String;
	NoAmiLimit: String;
	NumberSapSegment: String;
	OrderNum: String;
	Register: String;
	SchedMeterReadingDate: DateTime;
	TimeMaxReading: String;
	Device_Nav: Association to many Devices on Device_Nav.EquipmentNum = $self;
	MeterReading_Nav: Association to many MeterReadings on MeterReading_Nav.MeterReadingDocID = $self;
}
entity Devices 
 {
	Action: String;
	ActivityDate: DateTime;
	ActivityReason: String;
	ConnectionObject: String;
	Customer: String;
	Device: String;
	DeviceBlocked: Boolean;
	DeviceCategory: String;
	DeviceLocation: String;
	key EquipmentNum: String;
	Installation: String;
	RegisterGroup: String;
	ConnectionObject_Nav: Association to many ConnectionObjects on ConnectionObject_Nav.ConnectionObject = $self;
	DeviceCategory_Nav: Association to one DeviceCategories;
	DeviceLocation_Nav: Association to many DeviceLocations on DeviceLocation_Nav.DeviceLocation = $self;
	DeviceMeterReading_Nav: Association to many DeviceMeterReadings on DeviceMeterReading_Nav.EquipmentNum = $self;
	DisconnectObject_Nav: Association to many DisconnectionObjects on DisconnectObject_Nav.EquipmentNum = $self;
	Equipment_Nav: Association to one MyEquipments;
	GoodsMovement_Nav: Association to many DeviceGoodsMovements on GoodsMovement_Nav.EquipmentNum = $self;
	MeterReadings_Nav: Association to many MeterReadings on MeterReadings_Nav.EquipmentNum = $self;
	OrderISULink_Nav: Association to many OrderISULinks on OrderISULink_Nav.EquipmentNum = $self;
	PeriodicMeterReading_Nav: Association to many PeriodicMeterReadings on PeriodicMeterReading_Nav.EquipmentNum = $self;
	RegisterGroup_Nav: Association to one RegisterGroups;
	StreetRoute_Nav: Association to many StreetRoutes on StreetRoute_Nav.EquipmentNum = $self;
}
entity DigitalSignatureApplications 
 {
	key Application: String;
	ApplicationDescription: String;
	DigitalSignatureHeader_Nav: Association to many DigitalSignatureHeaders on DigitalSignatureHeader_Nav.Application = $self;
	DigitalSignatureLink_Nav: Association to many DigitalSignatureLinks on DigitalSignatureLink_Nav.Application = $self;
	DigitalSignatureObjectConfig_Nav: Association to many DigitalSignatureObjectConfigs on DigitalSignatureObjectConfig_Nav.Application = $self;
	DigitalSignatureObject_Nav: Association to many DigitalSignatureObjects on DigitalSignatureObject_Nav.Application = $self;
}
entity DigitalSignatureAuthGroups 
 {
	ApplicationId: String;
	key AuthorizationGroup: String;
	AuthorizationGroupDescription: String;
	DigitalSignatureItem_Nav: Association to many DigitalSignatureItems on DigitalSignatureItem_Nav.AuthorizationGroup = $self;
}
entity DigitalSignatureHeaders 
 {
	Application: String;
	Method: String;
	Object: String;
	ObjectDescription: String;
	key SignatureId: String;
	Strategy: String;
	TimeStamp: DateTime;
	Type: String;
	Version: String;
	DigitalSignatureApplication_Nav: Association to one DigitalSignatureApplications;
	DigitalSignatureItem_Nav: Association to many DigitalSignatureItems on DigitalSignatureItem_Nav.SignatureId = $self;
	DigitalSignatureLink_Nav: Association to many DigitalSignatureLinks on DigitalSignatureLink_Nav.SignatureId = $self;
	DigitalSignatureMethod_Nav: Association to one DigitalSignatureMethods;
	DigitalSignatureObject_Nav: Association to one DigitalSignatureObjects;
	DigitalSignatureStrategy_Nav: Association to one DigitalSignatureStrategies;
	DigitalSignatureType_Nav: Association to one DigitalSignatureTypes;
}
entity DigitalSignatureItems 
 {
	AuthorizationGroup: String;
	Comment: String;
	key Index: Int32;
	IndividualSignature: String;
	Language: String;
	key Process: String;
	Remark: String;
	SignatoryFirstName: String;
	SignatoryLastName: String;
	key SignatureId: String;
	SignerObjectOwner: String;
	State: String;
	Step: String;
	TimeStamp: String;
	DigitalSignatureAuthGroup_Nav: Association to one DigitalSignatureAuthGroups;
	DigitalSignatureHeader_Nav: Association to one DigitalSignatureHeaders;
}
entity DigitalSignatureLinks 
 {
	Application: String;
	Notification: String;
	Object: String;
	ObjectGroup: String;
	ObjectGroup1: String;
	ObjectNumber: String;
	ObjectType: String;
	Operation: String;
	Order: String;
	key SignatureId: String;
	Strategy: String;
	DigitalSignatureApplication_Nav: Association to one DigitalSignatureApplications;
	DigitalSignatureHeader_Nav: Association to one DigitalSignatureHeaders;
	DigitalSignatureObject_Nav: Association to one DigitalSignatureObjects;
	DigitalSignatureStrategy_Nav: Association to one DigitalSignatureStrategies;
	NotifHeader_Nav: Association to many MyNotificationHeaders on NotifHeader_Nav.Notification = $self;
	WorkOrderHeader_Nav: Association to one MyWorkOrderHeaders;
	WorkOrderOperation_Nav: Association to many MyWorkOrderOperations on WorkOrderOperation_Nav.Operation = $self;
}
entity DigitalSignatureMethods 
 {
	key Method: String;
	MethodDescription: String;
	DigitalSignatureHeader_Nav: Association to many DigitalSignatureHeaders on DigitalSignatureHeader_Nav.Method = $self;
	DigitalSignatureStrategy_Nav: Association to many DigitalSignatureStrategies on DigitalSignatureStrategy_Nav.Method = $self;
}
entity DigitalSignatureNotes 
 {
	NoteDescription: String;
	key NoteId: String;
}
entity DigitalSignatureObjectConfigs 
 {
	key Application: String;
	key Object: String;
	ObjectType: String;
	TableFields: String;
	DigitalSignatureApplication_Nav: Association to one DigitalSignatureApplications;
	DigitalSignatureObject_Nav: Association to one DigitalSignatureObjects;
}
entity DigitalSignatureObjects 
 {
	AllowComment: String;
	AllowDocumentSign: String;
	AllowObjectDescription: String;
	AllowRemark: String;
	key Application: String;
	LogStructure: String;
	MetaName: String;
	key Object: String;
	ObjectDescription: String;
	SignatureVersion: String;
	SubObject: String;
	DigitalSignatureHeader_Nav: Association to many DigitalSignatureHeaders on DigitalSignatureHeader_Nav.Object = $self;
	DigitalSignatureLink_Nav: Association to many DigitalSignatureLinks on DigitalSignatureLink_Nav.Application = $self;
	DigitalSignatureObjectConfig_Nav: Association to many DigitalSignatureObjectConfigs on DigitalSignatureObjectConfig_Nav.Object = $self;
}
entity DigitalSignatureStrategies 
 {
	AllowComment: Boolean;
	AllowDocument: Boolean;
	AllowRemark: Boolean;
	AllowVerification: Boolean;
	ApplicationId: String;
	Method: String;
	key Strategy: String;
	StrategyDescription: String;
	DigitalSignatureHeader_Nav: Association to many DigitalSignatureHeaders on DigitalSignatureHeader_Nav.Strategy = $self;
	DigitalSignatureLink_Nav: Association to many DigitalSignatureLinks on DigitalSignatureLink_Nav.Strategy = $self;
	DigitalSignatureMethod_Nav: Association to one DigitalSignatureMethods;
}
entity DigitalSignatureTypes 
 {
	key SignatureType: String;
	SignatureTypeDescription: String;
	DigitalSignatureHeader_Nav: Association to many DigitalSignatureHeaders on DigitalSignatureHeader_Nav.Type = $self;
}
entity DisconnectActivityStatuses 
 {
	Description: String;
	ReconnectFlag: String;
	key Status: String;
	DisconnectActivity_Nav: Association to many DisconnectionActivities on DisconnectActivity_Nav.ActivityStatus = $self;
}
entity DisconnectDocStatuses 
 {
	Description: String;
	key Status: String;
	DisconnectDoc_Nav: Association to many DisconnectionDocuments on DisconnectDoc_Nav.DocStatus = $self;
}
entity DisconnectionActivities 
 {
	ActivityDate: DateTime;
	key ActivityNum: String;
	ActivityStatus: String;
	ActivityTime: Time;
	ActivityType: String;
	BudgetBillingPlanChanged: String;
	CompleteFlag: String;
	DisconnectCanceled: String;
	DisconnectFlag: String;
	DisconnectType: String;
	key DocNum: String;
	NewOrderFlag: String;
	OrderId: String;
	DisconnectActivityStatus_Nav: Association to many DisconnectActivityStatuses on DisconnectActivityStatus_Nav.ActivityStatus = $self;
	DisconnectActivityType_Nav: Association to one DisconnectionActivityTypes;
	DisconnectDoc_Nav: Association to many DisconnectionDocuments on DisconnectDoc_Nav.DocNum = $self;
	DisconnectObject_Nav: Association to many DisconnectionObjects on DisconnectObject_Nav.ActivityNum = $self;
	DisconnectType_Nav: Association to many DisconnectionTypes on DisconnectType_Nav.DisconnectType = $self;
	WOHeader_Nav: Association to one MyWorkOrderHeaders;
}
entity DisconnectionActivityTypes 
 {
	key ActivityType: String;
	ActivityTypeDescription: String;
	DisconnectionActivity_Nav: Association to one DisconnectionActivities;
}
entity DisconnectionDocuments 
 {
	DisconnectReason: String;
	key DocNum: String;
	DocStatus: String;
	ProcessVariant: String;
	RefObjKey: String;
	RefObjType: String;
	DisconnectActivity_Nav: Association to many DisconnectionActivities on DisconnectActivity_Nav.DocNum = $self;
	DisconnectDocStatus_Nav: Association to many DisconnectDocStatuses on DisconnectDocStatus_Nav.DocStatus = $self;
	DisconnectObject_Nav: Association to many DisconnectionObjects on DisconnectObject_Nav.DocNum = $self;
	DisconnectReason_Nav: Association to many DisconnectionReasons on DisconnectReason_Nav.DisconnectReason = $self;
	ProcessVariant_Nav: Association to many ProcessVariants on ProcessVariant_Nav.ProcessVariant = $self;
}
entity DisconnectionObjects 
 {
	ActivityDate: DateTime;
	key ActivityNum: String;
	ActivityTime: Time;
	DeviceLocation: String;
	DisconnectStatus: String;
	DisconnectType: String;
	key DocNum: String;
	EquipmentNum: String;
	key ObjectNum: String;
	ObjectType: String;
	Device_Nav: Association to many Devices on Device_Nav.EquipmentNum = $self;
	DisconnectActivity_Nav: Association to many DisconnectionActivities on DisconnectActivity_Nav.ActivityNum = $self;
	DisconnectDoc_Nav: Association to many DisconnectionDocuments on DisconnectDoc_Nav.DocNum = $self;
}
entity DisconnectionReasons 
 {
	Description: String;
	key DisconnectionReason: String;
	DisconnectDocument_Nav: Association to many DisconnectionDocuments on DisconnectDocument_Nav.DisconnectReason = $self;
}
entity DisconnectionTypes 
 {
	Description: String;
	key DisconnectionType: String;
	DisconnectActivity_Nav: Association to many DisconnectionActivities on DisconnectActivity_Nav.DisconnectType = $self;
}
entity DistributionChannels 
 {
	key DistributionChannelCode: String;
	DistributionChannelText: String;
	S4ServiceConfirmationItem_Nav: Association to many S4ServiceConfirmationItems on S4ServiceConfirmationItem_Nav.DistributionChannel = $self;
	S4ServiceConfirmation_Nav: Association to many S4ServiceConfirmations on S4ServiceConfirmation_Nav.DistributionChannel = $self;
}
entity Divisions 
 {
	Description: String;
	key Division: String;
	Installations_Nav: Association to many Installations on Installations_Nav.Division = $self;
	Plants_NAV: Association to many Plants on Plants_NAV.Division = $self;
	RegisterGroups_Nav: Association to many RegisterGroups on RegisterGroups_Nav.Division = $self;
}
entity Divisions 
 {
	Description: String;
	key Division: String;
	Installations_Nav: Association to many Installations on Installations_Nav.Division = $self;
	Plants_NAV: Association to many Plants on Plants_NAV.Division = $self;
	RegisterGroups_Nav: Association to many RegisterGroups on RegisterGroups_Nav.Division = $self;
}
entity Documents 
 {
	Description: String;
	key DocumentID: String;
	FileName: String;
	FileSize: String;
	FileType: String;
	MimeType: String;
	ObjectKey: String;
	ObjectLink: String;
	ObjectType: String;
	StorageCategory: String;
	URL: String;
	WSApplication: String;
	EquipDocuments: Association to many MyEquipDocuments on EquipDocuments.DocumentID = $self;
	FileExtension_Nav: Association to one FileExtensions;
	FuncLocDocuments: Association to many MyFuncLocDocuments on FuncLocDocuments.DocumentID = $self;
	InspMethodDocs_Nav: Association to many InspectionMethodDocuments on InspMethodDocs_Nav.DocumentID = $self;
	MatDocAttachment_Nav: Association to many MatDocAttachments on MatDocAttachment_Nav.DocumentID = $self;
	NotifDocuments: Association to many MyNotifDocuments on NotifDocuments.DocumentID = $self;
	PRTDocuments: Association to many MyWorkOrderTools on PRTDocuments.DocumentID = $self;
	ReportTemplate_Nav: Association to many ReportTemplates on ReportTemplate_Nav.DocumentID = $self;
	WODocuments: Association to many MyWorkOrderDocuments on WODocuments.DocumentID = $self;
}
entity Documents 
 {
	Description: String;
	key DocumentID: String;
	FileName: String;
	FileSize: String;
	FileType: String;
	MimeType: String;
	ObjectKey: String;
	ObjectLink: String;
	ObjectType: String;
	StorageCategory: String;
	URL: String;
	WSApplication: String;
	EquipDocuments: Association to many MyEquipDocuments on EquipDocuments.DocumentID = $self;
	FileExtension_Nav: Association to one FileExtensions;
	FuncLocDocuments: Association to many MyFuncLocDocuments on FuncLocDocuments.DocumentID = $self;
	InspMethodDocs_Nav: Association to many InspectionMethodDocuments on InspMethodDocs_Nav.DocumentID = $self;
	MatDocAttachment_Nav: Association to many MatDocAttachments on MatDocAttachment_Nav.DocumentID = $self;
	NotifDocuments: Association to many MyNotifDocuments on NotifDocuments.DocumentID = $self;
	PRTDocuments: Association to many MyWorkOrderTools on PRTDocuments.DocumentID = $self;
	ReportTemplate_Nav: Association to many ReportTemplates on ReportTemplate_Nav.DocumentID = $self;
	WODocuments: Association to many MyWorkOrderDocuments on WODocuments.DocumentID = $self;
}
entity DynamicFormAttachments 
 {
	key AppName: String;
	key AttachmentID: String;
	key FormInstanceID: String;
	key FormName: String;
	key FormVersion: String;
	MimeType: String;
}
entity DynamicFormInstances 
 {
	key AppName: String;
	ChangeToken: String;
	Content: String;
	key FormInstanceID: String;
	key FormName: String;
	FormStatus: String;
	key FormVersion: String;
	Mandatory: String;
	ObjectKey: String;
	ObjectType: String;
	OperationNumber: String;
	OrderID: String;
	SortField: String;
	TechnicalEntityKey: String;
	TechnicalEntityType: String;
	DynamicFormTemplate_Nav: Association to many DynamicFormTemplates on DynamicFormTemplate_Nav.FormVersion = $self;
	MyEquipment_Nav: Association to many MyEquipments on MyEquipment_Nav.ObjectKey = $self;
	MyFunctionalLocation_Nav: Association to many MyFunctionalLocations on MyFunctionalLocation_Nav.ObjectKey = $self;
	MyNotificationHeader_Nav: Association to many MyNotificationHeaders on MyNotificationHeader_Nav.ObjectKey = $self;
	MyWorkOrderHeader_Nav: Association to many MyWorkOrderHeaders on MyWorkOrderHeader_Nav.SortField = $self;
	MyWorkOrderOperation_Nav: Association to many MyWorkOrderOperations on MyWorkOrderOperation_Nav.OperationNumber = $self;
}
entity DynamicFormTemplates 
 {
	key AppName: String;
	Content: String;
	key FormName: String;
	key FormVersion: String;
	DynamicFormInstance_Nav: Association to many DynamicFormInstances on DynamicFormInstance_Nav.FormVersion = $self;
}
entity EAMOverallStatusConfigs 
 {
	Description: String;
	EAMOverallStatus: String;
	key EAMOverallStatusProfile: String;
	EntityType: String;
	IsLogged: String;
	IsSkippable: String;
	MobileStatus: String;
	ObjectType: String;
	OverallStatusLabel: String;
	Phase: String;
	PhaseDesc: String;
	SequenceNum: Int16;
	key Status: String;
	StatusAttribute1: String;
	StatusAttribute2: String;
	StatusProfile: String;
	Subphase: String;
	SubphaseDesc: String;
	SystemStatus: String;
	TransitionTextKey: String;
	UserStatus: String;
	NextOverallStatusSeq_Nav: Association to many EAMOverallStatusSeqs on NextOverallStatusSeq_Nav.EAMOverallStatusProfile = $self;
	OverallStatusSeq_Nav: Association to many EAMOverallStatusSeqs on OverallStatusSeq_Nav.EAMOverallStatusProfile = $self;
	PMMobileStatus_Nav: Association to many PMMobileStatuses on PMMobileStatus_Nav.Status = $self;
}
entity EAMOverallStatusConfigs 
 {
	Description: String;
	EAMOverallStatus: String;
	key EAMOverallStatusProfile: String;
	EntityType: String;
	IsLogged: String;
	IsSkippable: String;
	MobileStatus: String;
	ObjectType: String;
	OverallStatusLabel: String;
	Phase: String;
	PhaseDesc: String;
	SequenceNum: Int16;
	key Status: String;
	StatusAttribute1: String;
	StatusAttribute2: String;
	StatusProfile: String;
	Subphase: String;
	SubphaseDesc: String;
	SystemStatus: String;
	TransitionTextKey: String;
	UserStatus: String;
	NextOverallStatusSeq_Nav: Association to many EAMOverallStatusSeqs on NextOverallStatusSeq_Nav.EAMOverallStatusProfile = $self;
	OverallStatusSeq_Nav: Association to many EAMOverallStatusSeqs on OverallStatusSeq_Nav.EAMOverallStatusProfile = $self;
	PMMobileStatus_Nav: Association to many PMMobileStatuses on PMMobileStatus_Nav.Status = $self;
}
entity EAMOverallStatusSeqs 
 {
	CannotBeSkipped: String;
	EAMNextOverallStatus: String;
	EAMOverallStatus: String;
	key EAMOverallStatusProfile: String;
	key FromStatus: String;
	IsMandatory: String;
	PhaseModelRelevant: String;
	key RoleType: String;
	key ToStatus: String;
	TransitionType: String;
	key UserPersona: String;
	NextOverallStatusCfg_Nav: Association to one EAMOverallStatusConfigs;
	OverallStatusCfg_Nav: Association to one EAMOverallStatusConfigs;
}
entity EAMOverallStatusSeqs 
 {
	CannotBeSkipped: String;
	EAMNextOverallStatus: String;
	EAMOverallStatus: String;
	key EAMOverallStatusProfile: String;
	key FromStatus: String;
	IsMandatory: String;
	PhaseModelRelevant: String;
	key RoleType: String;
	key ToStatus: String;
	TransitionType: String;
	key UserPersona: String;
	NextOverallStatusCfg_Nav: Association to one EAMOverallStatusConfigs;
	OverallStatusCfg_Nav: Association to one EAMOverallStatusConfigs;
}
entity Effects 
 {
	key Effect: String;
	EffectDescription: String;
	NotificationHeaders_Nav: Association to many MyNotificationHeaders on NotificationHeaders_Nav.Effect = $self;
}
entity EmployeeAddresses 
 {
	key AddressType: String;
	Building: String;
	CareOfName: String;
	City: String;
	Country: String;
	District: String;
	Floor: String;
	HouseNum: String;
	key PersonnelNum: String;
	PostalCode: String;
	key SequenceNum: String;
	Street: String;
	Employee_Nav: Association to one Employees;
}
entity EmployeeAddresses 
 {
	key AddressType: String;
	Building: String;
	CareOfName: String;
	City: String;
	Country: String;
	District: String;
	Floor: String;
	HouseNum: String;
	key PersonnelNum: String;
	PostalCode: String;
	key SequenceNum: String;
	Street: String;
	Employee_Nav: Association to one Employees;
}
entity EmployeeCommunications 
 {
	key CommunicationType: String;
	key PersonnelNumber: String;
	key SequenceNum: String;
	Value: String;
	Employee_Nav: Association to one Employees;
}
entity EmployeeCommunications 
 {
	key CommunicationType: String;
	key PersonnelNumber: String;
	key SequenceNum: String;
	Value: String;
	Employee_Nav: Association to one Employees;
}
entity Employees 
 {
	ControllingArea: String;
	EmployeeName: String;
	EndDate: DateTime;
	FirstName: String;
	LastName: String;
	PartnerNumber: String;
	PersonnelArea: String;
	key PersonnelNumber: String;
	StartDate: DateTime;
	UserID: String;
	CatsTimesheet: Association to many CatsTimesheets on CatsTimesheet.PersonnelNumber = $self;
	Confirmations: Association to many Confirmations on Confirmations.PersonnelNumber = $self;
	CrewListItem: Association to many CrewListItems on CrewListItem.CrewItemKey = $self;
	EmployeeAddress_Nav: Association to many EmployeeAddresses on EmployeeAddress_Nav.PersonnelNum = $self;
	EmployeeCommunications_Nav: Association to many EmployeeCommunications on EmployeeCommunications_Nav.PersonnelNumber = $self;
	MyEquipPartners_Nav: Association to many MyEquipPartners on MyEquipPartners_Nav.PersonnelNum = $self;
	MyFuncLocPartners_Nav: Association to many MyFuncLocPartners on MyFuncLocPartners_Nav.PersonnelNum = $self;
	MyNotifPartners_Nav: Association to many MyNotificationPartners on MyNotifPartners_Nav.PersonnelNum = $self;
	MyWorkOrderPartners_Nav: Association to many MyWorkOrderPartners on MyWorkOrderPartners_Nav.PersonnelNum = $self;
	NotificationHistory_Nav: Association to many NotificationHistories on NotificationHistory_Nav.PersonRespNum = $self;
	WorkOrderHistory_Nav: Association to many WorkOrderHistories on WorkOrderHistory_Nav.PersonalNumber = $self;
	WorkOrderOperation_Nav: Association to many MyWorkOrderOperations on WorkOrderOperation_Nav.PersonNum = $self;
}
entity Employees 
 {
	ControllingArea: String;
	EmployeeName: String;
	EndDate: DateTime;
	FirstName: String;
	LastName: String;
	PartnerNumber: String;
	PersonnelArea: String;
	key PersonnelNumber: String;
	StartDate: DateTime;
	UserID: String;
	CatsTimesheet: Association to many CatsTimesheets on CatsTimesheet.PersonnelNumber = $self;
	Confirmations: Association to many Confirmations on Confirmations.PersonnelNumber = $self;
	CrewListItem: Association to many CrewListItems on CrewListItem.CrewItemKey = $self;
	EmployeeAddress_Nav: Association to many EmployeeAddresses on EmployeeAddress_Nav.PersonnelNum = $self;
	EmployeeCommunications_Nav: Association to many EmployeeCommunications on EmployeeCommunications_Nav.PersonnelNumber = $self;
	MyEquipPartners_Nav: Association to many MyEquipPartners on MyEquipPartners_Nav.PersonnelNum = $self;
	MyFuncLocPartners_Nav: Association to many MyFuncLocPartners on MyFuncLocPartners_Nav.PersonnelNum = $self;
	MyNotifPartners_Nav: Association to many MyNotificationPartners on MyNotifPartners_Nav.PersonnelNum = $self;
	MyWorkOrderPartners_Nav: Association to many MyWorkOrderPartners on MyWorkOrderPartners_Nav.PersonnelNum = $self;
	NotificationHistory_Nav: Association to many NotificationHistories on NotificationHistory_Nav.PersonRespNum = $self;
	WorkOrderHistory_Nav: Association to many WorkOrderHistories on WorkOrderHistory_Nav.PersonalNumber = $self;
	WorkOrderOperation_Nav: Association to many MyWorkOrderOperations on WorkOrderOperation_Nav.PersonNum = $self;
}
entity EquipObjectTypes 
 {
	key ObjectType: String;
	ObjectTypeDesc: String;
	MyEquipments_Nav: Association to many MyEquipments;
}
entity EquipObjectTypes 
 {
	key ObjectType: String;
	ObjectTypeDesc: String;
	MyEquipments_Nav: Association to many MyEquipments;
}
entity EquipTemplates 
 {
	EquipCategory: String;
	key EquipId: String;
}
entity EquipTemplates 
 {
	EquipCategory: String;
	key EquipId: String;
}
entity EquipmentBOMs 
 {
	key AlternativeBOM: String;
	key BOMCategory: String;
	key BOMId: String;
	key BOMUsage: String;
	key EquipId: String;
	key Plant: String;
	BOMHeader_Nav: Association to many BOMHeaders on BOMHeader_Nav.BOMId = $self;
	Equipment_Nav: Association to many MyEquipments on Equipment_Nav.EquipId = $self;
}
entity EquipmentBOMs 
 {
	key AlternativeBOM: String;
	key BOMCategory: String;
	key BOMId: String;
	key BOMUsage: String;
	key EquipId: String;
	key Plant: String;
	BOMHeader_Nav: Association to many BOMHeaders on BOMHeader_Nav.BOMId = $self;
	Equipment_Nav: Association to many MyEquipments on Equipment_Nav.EquipId = $self;
}
entity EquipmentCategories 
 {
	key EquipCategory: String;
	EquipCategoryDesc: String;
	EquipTemplate_Nav: Association to many EquipTemplates on EquipTemplate_Nav.EquipCategory = $self;
	MyEquipments_Nav: Association to many MyEquipments on MyEquipments_Nav.EquipCategory = $self;
}
entity EquipmentCategories 
 {
	key EquipCategory: String;
	EquipCategoryDesc: String;
	EquipTemplate_Nav: Association to many EquipTemplates on EquipTemplate_Nav.EquipCategory = $self;
	MyEquipments_Nav: Association to many MyEquipments on MyEquipments_Nav.EquipCategory = $self;
}
entity FSMFormAttachments 
 {
	Category: String;
	CreatedTimestamp: DateTime;
	Description: String;
	DocumentId: String;
	FileContent: String;
	FileName: String;
	key Id: String;
	Inactive: Boolean;
	LastChangedTimestamp: DateTime;
	MimeType: String;
	ObjectId: String;
	ObjectType: String;
	Status: String;
	Title: String;
	Type: String;
}
entity FSMFormInstances 
 {
	ActivityId: String;
	Branches: String;
	ChecklistId: String;
	Closed: Boolean;
	Content: String;
	CreatePerson: String;
	CreatedTimeStamp: DateTime;
	DataVersion: Int16;
	Description: String;
	ExternalId: String;
	Groups: String;
	key Id: String;
	Inactive: Boolean;
	Language: String;
	LastChanged: String;
	LastChangedBy: String;
	LastChangedTimestamp: DateTime;
	Location: String;
	Mandatory: Boolean;
	Operation: String;
	OrgLevel: String;
	Owners: String;
	ResponsiblePerson: String;
	SyncObjectKPIs: String;
	SyncStatus: String;
	Template: String;
	UdfMetaGroups: String;
	UdfValues: String;
	Version: Int16;
	WorkOrder: String;
	FSMFormTemplate_Nav: Association to many FSMFormTemplates on FSMFormTemplate_Nav.Template = $self;
	MyWorkOrderOperation_Nav: Association to one MyWorkOrderOperations;
}
entity FSMFormTemplates 
 {
	Branches: String;
	ChecklistCategory: String;
	Content: String;
	CreatePerson: String;
	CreatedTimeStamp: DateTime;
	DefaultLanguage: String;
	Description: String;
	ExternalId: String;
	Groups: String;
	HazardType: String;
	key Id: String;
	Inactive: Boolean;
	LastChanged: String;
	LastChangedBy: String;
	Location: String;
	Name: String;
	OrgLevel: String;
	Owners: String;
	Status: String;
	SyncObjectKPIs: String;
	SyncStatus: String;
	Tag: String;
	UdfMetaGroups: String;
	UdfValues: String;
	Version: Int16;
	FSMFormInstance_Nav: Association to many FSMFormInstances on FSMFormInstance_Nav.Template = $self;
}
entity FileExtensions 
 {
	Description: String;
	Extension: String;
	key Type: String;
	Document_Nav: Association to many Documents on Document_Nav.MimeType = $self;
}
entity FileExtensions 
 {
	Description: String;
	Extension: String;
	key Type: String;
	Document_Nav: Association to many Documents on Document_Nav.MimeType = $self;
}
entity Fleets 
 {
	ABCIndicator: String;
	Asset: String;
	Batch: String;
	BusinessArea: String;
	CRObjectType: String;
	CatalogProfile: String;
	CompanyCode: String;
	ConstructionMonth: String;
	ConstructionType: String;
	ConstructionYear: String;
	ControllingArea: String;
	CostCenter: String;
	CountryOfManufact: String;
	DeleteIndicator: String;
	DeliveryDate: DateTime;
	DistributionChannel: String;
	EquipCategory: String;
	EquipDivision: String;
	EquipmentDataExists: String;
	EquipmentDesc: String;
	key EquipmentNumber: String;
	Field: String;
	FleetObjectData: String;
	ISU: String;
	InventoryNumber: String;
	LicensePlateNumber: String;
	LocAcctAssignment: String;
	Location: String;
	MaintenancePlan: String;
	MaintenancePlant: String;
	ManufDrawingNumber: String;
	ManufSerialNumber: String;
	ManufactPartNo: String;
	Manufacturer: String;
	ManufacturerVIN: String;
	Material: String;
	MeasuringPoint: String;
	ModelNumber: String;
	ObjReference: String;
	ObjectNumber: String;
	PMDivision: String;
	PMObjectType: String;
	PPWorkCenter: String;
	PlannerGroup: String;
	PlanningPlant: String;
	Plant: String;
	PlantSection: String;
	SalesOrg: String;
	SerialNumber: String;
	SettlementOrder: String;
	Size: String;
	SortField: String;
	StorageLocation: String;
	SubNumber: String;
	SuperOrdEquipment: String;
	TechnicalIdentNo: String;
	TechnicalObjectType: String;
	UnitOfWeight: String;
	UsagePerConsecNo: String;
	ValidTo: DateTime;
	VehicleType: String;
	WBSElement: String;
	WeightOfObject: Decimal;
	CrewListItem: Association to many CrewListItems on CrewListItem.CrewItemKey = $self;
	MeasuringPoints: Association to many MeasuringPoints on MeasuringPoints.EquipId = $self;
}
entity Fleets 
 {
	ABCIndicator: String;
	Asset: String;
	Batch: String;
	BusinessArea: String;
	CRObjectType: String;
	CatalogProfile: String;
	CompanyCode: String;
	ConstructionMonth: String;
	ConstructionType: String;
	ConstructionYear: String;
	ControllingArea: String;
	CostCenter: String;
	CountryOfManufact: String;
	DeleteIndicator: String;
	DeliveryDate: DateTime;
	DistributionChannel: String;
	EquipCategory: String;
	EquipDivision: String;
	EquipmentDataExists: String;
	EquipmentDesc: String;
	key EquipmentNumber: String;
	Field: String;
	FleetObjectData: String;
	ISU: String;
	InventoryNumber: String;
	LicensePlateNumber: String;
	LocAcctAssignment: String;
	Location: String;
	MaintenancePlan: String;
	MaintenancePlant: String;
	ManufDrawingNumber: String;
	ManufSerialNumber: String;
	ManufactPartNo: String;
	Manufacturer: String;
	ManufacturerVIN: String;
	Material: String;
	MeasuringPoint: String;
	ModelNumber: String;
	ObjReference: String;
	ObjectNumber: String;
	PMDivision: String;
	PMObjectType: String;
	PPWorkCenter: String;
	PlannerGroup: String;
	PlanningPlant: String;
	Plant: String;
	PlantSection: String;
	SalesOrg: String;
	SerialNumber: String;
	SettlementOrder: String;
	Size: String;
	SortField: String;
	StorageLocation: String;
	SubNumber: String;
	SuperOrdEquipment: String;
	TechnicalIdentNo: String;
	TechnicalObjectType: String;
	UnitOfWeight: String;
	UsagePerConsecNo: String;
	ValidTo: DateTime;
	VehicleType: String;
	WBSElement: String;
	WeightOfObject: Decimal;
	CrewListItem: Association to many CrewListItems on CrewListItem.CrewItemKey = $self;
	MeasuringPoints: Association to many MeasuringPoints on MeasuringPoints.EquipId = $self;
}
entity FormGroups 
 {
	DisplayId: String;
	key GroupId: String;
	HasDependentObjects: String;
	ImageURL: String;
	LongDescription: String;
	OrganizationName: String;
	ShortDescription: String;
	Status: String;
	ChecklistQuestion_Nav: Association to many ChecklistAssessmentQuestions on ChecklistQuestion_Nav.GroupId = $self;
	TemplateGroups_Nav: Association to many FormTemplateGroups on TemplateGroups_Nav.GroupId = $self;
}
entity FormGroups 
 {
	DisplayId: String;
	key GroupId: String;
	HasDependentObjects: String;
	ImageURL: String;
	LongDescription: String;
	OrganizationName: String;
	ShortDescription: String;
	Status: String;
	ChecklistQuestion_Nav: Association to many ChecklistAssessmentQuestions on ChecklistQuestion_Nav.GroupId = $self;
	TemplateGroups_Nav: Association to many FormTemplateGroups on TemplateGroups_Nav.GroupId = $self;
}
entity FormQuestions 
 {
	AnswerId: String;
	DisplayId: String;
	HasDependentObjects: String;
	LongDescription: String;
	MaxScaleOptionsValue: String;
	MinScaleOptionsValue: String;
	OrganizationName: String;
	QuestionDesc: String;
	key QuestionId: String;
	QuestionText: String;
	ScaleOptionCount: String;
	ShortDescription: String;
	Status: String;
	AnswerHeader_Nav: Association to many AnswerHeaders on AnswerHeader_Nav.AnswerId = $self;
	ChecklistQuestions_Nav: Association to many ChecklistAssessmentQuestions on ChecklistQuestions_Nav.QuestionId = $self;
	TemplateQuestions_Nav: Association to many FormTemplateQuestions on TemplateQuestions_Nav.QuestionId = $self;
}
entity FormQuestions 
 {
	AnswerId: String;
	DisplayId: String;
	HasDependentObjects: String;
	LongDescription: String;
	MaxScaleOptionsValue: String;
	MinScaleOptionsValue: String;
	OrganizationName: String;
	QuestionDesc: String;
	key QuestionId: String;
	QuestionText: String;
	ScaleOptionCount: String;
	ShortDescription: String;
	Status: String;
	AnswerHeader_Nav: Association to many AnswerHeaders on AnswerHeader_Nav.AnswerId = $self;
	ChecklistQuestions_Nav: Association to many ChecklistAssessmentQuestions on ChecklistQuestions_Nav.QuestionId = $self;
	TemplateQuestions_Nav: Association to many FormTemplateQuestions on TemplateQuestions_Nav.QuestionId = $self;
}
entity FormTemplateGroups 
 {
	DisplayId: String;
	key GroupId: String;
	SortNumber: String;
	key TemplateId: String;
	FormGroup_Nav: Association to many FormGroups on FormGroup_Nav.GroupId = $self;
	GroupQuestion_Nav: Association to many FormTemplateQuestions on GroupQuestion_Nav.TemplateId = $self;
	TemplateHeader_Nav: Association to many FormTemplateHeaders on TemplateHeader_Nav.TemplateId = $self;
}
entity FormTemplateGroups 
 {
	DisplayId: String;
	key GroupId: String;
	SortNumber: String;
	key TemplateId: String;
	FormGroup_Nav: Association to many FormGroups on FormGroup_Nav.GroupId = $self;
	GroupQuestion_Nav: Association to many FormTemplateQuestions on GroupQuestion_Nav.TemplateId = $self;
	TemplateHeader_Nav: Association to many FormTemplateHeaders on TemplateHeader_Nav.TemplateId = $self;
}
entity FormTemplateHeaders 
 {
	BusinessObjects: String;
	DisplayId: String;
	FormCategory: String;
	IntentCode: String;
	LongDescription: String;
	PublishDate: String;
	ShortDescription: String;
	Status: String;
	key TemplateId: String;
	Version: String;
	TemplateGroups_Nav: Association to many FormTemplateGroups on TemplateGroups_Nav.TemplateId = $self;
}
entity FormTemplateHeaders 
 {
	BusinessObjects: String;
	DisplayId: String;
	FormCategory: String;
	IntentCode: String;
	LongDescription: String;
	PublishDate: String;
	ShortDescription: String;
	Status: String;
	key TemplateId: String;
	Version: String;
	TemplateGroups_Nav: Association to many FormTemplateGroups on TemplateGroups_Nav.TemplateId = $self;
}
entity FormTemplateQuestions 
 {
	AnswerId: String;
	DisplayId: String;
	key GroupId: String;
	key QuestionId: String;
	SortNumber: String;
	Status: String;
	key TemplateId: String;
	Version: String;
	FormQuestion_Nav: Association to many FormQuestions on FormQuestion_Nav.QuestionId = $self;
	TemplateGroup_Nav: Association to many FormTemplateGroups on TemplateGroup_Nav.TemplateId = $self;
}
entity FormTemplateQuestions 
 {
	AnswerId: String;
	DisplayId: String;
	key GroupId: String;
	key QuestionId: String;
	SortNumber: String;
	Status: String;
	key TemplateId: String;
	Version: String;
	FormQuestion_Nav: Association to many FormQuestions on FormQuestion_Nav.QuestionId = $self;
	TemplateGroup_Nav: Association to many FormTemplateGroups on TemplateGroup_Nav.TemplateId = $self;
}
entity Forms 
 {
	Client: String;
	CreatedOn: DateTime;
	DisplayId: String;
	key FormId: String;
	Language: String;
	LongDescription: String;
	MatrixDisplayID: String;
	MobileStatus: String;
	ObjectCount: String;
	Ownership: String;
	ShortDescription: String;
	Source: String;
	Status: String;
	StatusText: String;
	Type: String;
	TypeDescription: String;
	UpdatedOn: DateTime;
	ChecklistBusObjects_Nav: Association to many ChecklistBusObjects on ChecklistBusObjects_Nav.FormId = $self;
}
entity Forms 
 {
	Client: String;
	CreatedOn: DateTime;
	DisplayId: String;
	key FormId: String;
	Language: String;
	LongDescription: String;
	MatrixDisplayID: String;
	MobileStatus: String;
	ObjectCount: String;
	Ownership: String;
	ShortDescription: String;
	Source: String;
	Status: String;
	StatusText: String;
	Type: String;
	TypeDescription: String;
	UpdatedOn: DateTime;
	ChecklistBusObjects_Nav: Association to many ChecklistBusObjects on ChecklistBusObjects_Nav.FormId = $self;
}
entity FuncLocCategories 
 {
	key FuncLocCategory: String;
	FuncLocCategoryDesc: String;
	MyFunctionalLocations_Nav: Association to many MyFunctionalLocations on MyFunctionalLocations_Nav.FuncLocType = $self;
}
entity FuncLocCategories 
 {
	key FuncLocCategory: String;
	FuncLocCategoryDesc: String;
	MyFunctionalLocations_Nav: Association to many MyFunctionalLocations on MyFunctionalLocations_Nav.FuncLocType = $self;
}
entity FuncLocLabels 
 {
	key FuncLocLabel: String;
	FuncLocLabelDesc: String;
	PrimaryLabel: String;
	Unique: String;
}
entity FuncLocLabels 
 {
	key FuncLocLabel: String;
	FuncLocLabelDesc: String;
	PrimaryLabel: String;
	Unique: String;
}
entity FuncLocStructInds 
 {
	EditMask: String;
	key FuncLocStructInd: String;
	FuncLocStructIndDesc: String;
	HierarchyLevels: String;
}
entity FuncLocStructInds 
 {
	EditMask: String;
	key FuncLocStructInd: String;
	FuncLocStructIndDesc: String;
	HierarchyLevels: String;
}
entity FuncLocTemplates 
 {
	FuncLocCategory: String;
	FuncLocId: String;
	key FuncLocIdIntern: String;
}
entity FuncLocTemplates 
 {
	FuncLocCategory: String;
	FuncLocId: String;
	key FuncLocIdIntern: String;
}
entity FunctionalLocationBOMs 
 {
	key AlternativeBOM: String;
	key BOMCategory: String;
	key BOMId: String;
	key BOMUsage: String;
	key FuncLocIdIntern: String;
	key Plant: String;
	BOMHeader_Nav: Association to many BOMHeaders on BOMHeader_Nav.BOMId = $self;
	FuncLoc_Nav: Association to many MyFunctionalLocations on FuncLoc_Nav.FuncLocIdIntern = $self;
}
entity FunctionalLocationBOMs 
 {
	key AlternativeBOM: String;
	key BOMCategory: String;
	key BOMId: String;
	key BOMUsage: String;
	key FuncLocIdIntern: String;
	key Plant: String;
	BOMHeader_Nav: Association to many BOMHeaders on BOMHeader_Nav.BOMId = $self;
	FuncLoc_Nav: Association to many MyFunctionalLocations on FuncLoc_Nav.FuncLocIdIntern = $self;
}
entity GISMapParameters 
 {
	key ParameterGroup: String;
	key ParameterName: String;
	ParameterValue: String;
	key ParentParemeterGroup: String;
}
entity GISMapParameters 
 {
	key ParameterGroup: String;
	key ParameterName: String;
	ParameterValue: String;
	key ParentParemeterGroup: String;
}
entity GLAccounts 
 {
	AuthorizationGroup: String;
	key ChartofAccounts: String;
	CompanyCode: String;
	key GLAccount: String;
	GLAccountLongText: String;
	GLAccountText: String;
	Language: String;
	SearchTerm: String;
}
entity Geometries 
 {
	GeometryType: String;
	GeometryValue: String;
	LogicalSystem: String;
	key ObjectGroup: String;
	key ObjectGroup1: String;
	ObjectKey: String;
	ObjectType: String;
	OutputFormat: String;
	SegmentCount: Int16;
	SegmentNo: Int16;
	key SpacialGUId: String;
	key SpacialId: String;
	EquipGeometries: Association to many MyEquipGeometries on EquipGeometries.ObjectGroup = $self;
	Equip_Nav: Association to many MyEquipments on Equip_Nav.ObjectKey = $self;
	FuncLocGeometries: Association to many MyFuncLocGeometries on FuncLocGeometries.ObjectGroup1 = $self;
	FuncLoc_Nav: Association to many MyFunctionalLocations on FuncLoc_Nav.ObjectKey = $self;
	NotifGeometries: Association to many MyNotifGeometries on NotifGeometries.SpacialGUId = $self;
	NotifHeader_Nav: Association to many MyNotificationHeaders on NotifHeader_Nav.ObjectKey = $self;
	WOGeometries: Association to many MyWorkOrderGeometries on WOGeometries.SpacialId = $self;
	WOHeader_Nav: Association to many MyWorkOrderHeaders on WOHeader_Nav.ObjectKey = $self;
}
entity Geometries 
 {
	GeometryType: String;
	GeometryValue: String;
	LogicalSystem: String;
	key ObjectGroup: String;
	key ObjectGroup1: String;
	ObjectKey: String;
	ObjectType: String;
	OutputFormat: String;
	SegmentCount: Int16;
	SegmentNo: Int16;
	key SpacialGUId: String;
	key SpacialId: String;
	EquipGeometries: Association to many MyEquipGeometries on EquipGeometries.ObjectGroup = $self;
	Equip_Nav: Association to many MyEquipments on Equip_Nav.ObjectKey = $self;
	FuncLocGeometries: Association to many MyFuncLocGeometries on FuncLocGeometries.ObjectGroup1 = $self;
	FuncLoc_Nav: Association to many MyFunctionalLocations on FuncLoc_Nav.ObjectKey = $self;
	NotifGeometries: Association to many MyNotifGeometries on NotifGeometries.SpacialGUId = $self;
	NotifHeader_Nav: Association to many MyNotificationHeaders on NotifHeader_Nav.ObjectKey = $self;
	WOGeometries: Association to many MyWorkOrderGeometries on WOGeometries.SpacialId = $self;
	WOHeader_Nav: Association to many MyWorkOrderHeaders on WOHeader_Nav.ObjectKey = $self;
}
entity GlobalParameters 
 {
	FlagNoChange: Boolean;
	ParamComment: String;
	ParamGroup: String;
	ParamScope: String;
	ParamType: String;
	ParamValue: String;
	ParameterName: String;
	key RecordNo: String;
}
entity GlobalParameters 
 {
	FlagNoChange: Boolean;
	ParamComment: String;
	ParamGroup: String;
	ParamScope: String;
	ParamType: String;
	ParamValue: String;
	ParameterName: String;
	key RecordNo: String;
}
entity InboundDeliveries 
 {
	ActualGoodsMvtDate: DateTime;
	DeliveryBlock: String;
	DeliveryDate: DateTime;
	key DeliveryNum: String;
	DeliveryPriority: String;
	DeliveryType: String;
	DocumentCategory: String;
	GoodsMvtStatus: String;
	NumPackages: Int32;
	OverallStatus: String;
	ReceivingPlant: String;
	ShippingConditions: String;
	ShippingPoint: String;
	TotalWeight: Decimal;
	UnloadingPoint: String;
	Vendor: String;
	WMStatus: String;
	WeightUnit: String;
	BlockingStatus_Nav: Association to many BlockingStatuses on BlockingStatus_Nav.DeliveryBlock = $self;
	DeliveryPriority_Nav: Association to many DeliveryPriorities on DeliveryPriority_Nav.DeliveryPriority = $self;
	Items_Nav: Association to many InboundDeliveryItems on Items_Nav.DeliveryNum = $self;
	MaterialDocItem_Nav: Association to many MaterialDocItems on MaterialDocItem_Nav.Delivery = $self;
	MyInventoryObject_Nav: Association to one MyInventoryObjects;
}
entity InboundDeliveries 
 {
	ActualGoodsMvtDate: DateTime;
	DeliveryBlock: String;
	DeliveryDate: DateTime;
	key DeliveryNum: String;
	DeliveryPriority: String;
	DeliveryType: String;
	DocumentCategory: String;
	GoodsMvtStatus: String;
	NumPackages: Int32;
	OverallStatus: String;
	ReceivingPlant: String;
	ShippingConditions: String;
	ShippingPoint: String;
	TotalWeight: Decimal;
	UnloadingPoint: String;
	Vendor: String;
	WMStatus: String;
	WeightUnit: String;
	BlockingStatus_Nav: Association to many BlockingStatuses on BlockingStatus_Nav.DeliveryBlock = $self;
	DeliveryPriority_Nav: Association to many DeliveryPriorities on DeliveryPriority_Nav.DeliveryPriority = $self;
	Items_Nav: Association to many InboundDeliveryItems on Items_Nav.DeliveryNum = $self;
	MaterialDocItem_Nav: Association to many MaterialDocItems on MaterialDocItem_Nav.Delivery = $self;
	MyInventoryObject_Nav: Association to one MyInventoryObjects;
}
entity InboundDeliveryItems 
 {
	Batch: String;
	key DeliveryNum: String;
	DenominatorConvertSKU: Decimal;
	GoodsMvmtStatus: String;
	key Item: String;
	ItemCategory: String;
	ItemGMRelevant: String;
	ItemType: String;
	Material: String;
	MovementType: String;
	NumeratorConvertSKU: Decimal;
	PickedDiffQuantity: Decimal;
	PickedQuantity: Decimal;
	Plant: String;
	Quantity: Decimal;
	ReasonForMovement: String;
	SalesUnit: String;
	StorageBin: String;
	StorageLocation: String;
	UOM: String;
	WMStatus: String;
	InboundDeliverySerial_Nav: Association to many InboundDeliverySerials on InboundDeliverySerial_Nav.Item = $self;
	InboundDelivery_Nav: Association to one InboundDeliveries;
	MaterialDocItem_Nav: Association to many MaterialDocItems on MaterialDocItem_Nav.Delivery = $self;
	MaterialPlant_Nav: Association to many MaterialPlants on MaterialPlant_Nav.Material = $self;
	Material_Nav: Association to one Materials;
}
entity InboundDeliveryItems 
 {
	Batch: String;
	key DeliveryNum: String;
	DenominatorConvertSKU: Decimal;
	GoodsMvmtStatus: String;
	key Item: String;
	ItemCategory: String;
	ItemGMRelevant: String;
	ItemType: String;
	Material: String;
	MovementType: String;
	NumeratorConvertSKU: Decimal;
	PickedDiffQuantity: Decimal;
	PickedQuantity: Decimal;
	Plant: String;
	Quantity: Decimal;
	ReasonForMovement: String;
	SalesUnit: String;
	StorageBin: String;
	StorageLocation: String;
	UOM: String;
	WMStatus: String;
	InboundDeliverySerial_Nav: Association to many InboundDeliverySerials on InboundDeliverySerial_Nav.Item = $self;
	InboundDelivery_Nav: Association to one InboundDeliveries;
	MaterialDocItem_Nav: Association to many MaterialDocItems on MaterialDocItem_Nav.Delivery = $self;
	MaterialPlant_Nav: Association to many MaterialPlants on MaterialPlant_Nav.Material = $self;
	Material_Nav: Association to one Materials;
}
entity InboundDeliverySerials 
 {
	key DeliveryNum: String;
	key Item: String;
	key SerialNumber: String;
	InboundDeliveryItem_Nav: Association to one InboundDeliveryItems;
}
entity InboundDeliverySerials 
 {
	key DeliveryNum: String;
	key Item: String;
	key SerialNumber: String;
	InboundDeliveryItem_Nav: Association to one InboundDeliveryItems;
}
entity InspectionCatalogValuations 
 {
	ShortText: String;
	key Valuation: String;
	InspectionCodes_Nav: Association to many InspectionCodes on InspectionCodes_Nav.ValuationStatus = $self;
	InspectionLots_Nav: Association to many InspectionLots on InspectionLots_Nav.ValuationStatus = $self;
	InspectionPoints_Nav: Association to many InspectionPoints on InspectionPoints_Nav.ValuationStatus = $self;
}
entity InspectionCatalogValuations 
 {
	ShortText: String;
	key Valuation: String;
	InspectionCodes_Nav: Association to many InspectionCodes on InspectionCodes_Nav.ValuationStatus = $self;
	InspectionLots_Nav: Association to many InspectionLots on InspectionLots_Nav.ValuationStatus = $self;
	InspectionPoints_Nav: Association to many InspectionPoints on InspectionPoints_Nav.ValuationStatus = $self;
}
entity InspectionCharStatuses 
 {
	ShortDesc: String;
	key Status: String;
	InspChar_Nav: Association to many InspectionCharacteristics on InspChar_Nav.Status = $self;
}
entity InspectionCharStatuses 
 {
	ShortDesc: String;
	key Status: String;
	InspChar_Nav: Association to many InspectionCharacteristics on InspChar_Nav.Status = $self;
}
entity InspectionCharacteristics 
 {
	CalculatedCharFlag: String;
	Catalog: String;
	CatalogVersion: String;
	ChangedAt: DateTime;
	ChangedBy: String;
	CharAttributeFlag: String;
	CharCategory: String;
	CharId: String;
	Code: String;
	CodeGroup: String;
	CreatedAt: DateTime;
	CreatedBy: String;
	DecimalPlaces: Int16;
	DefectClass: String;
	DefectRecordingFlag: String;
	Formula1: String;
	Formula2: String;
	key InspectionChar: String;
	key InspectionLot: String;
	InspectionMethod: String;
	InspectionMethodPlant: String;
	InspectionMethodVersion: String;
	key InspectionNode: String;
	InspectionScope: String;
	LongTermInspFlag: String;
	LongTextFlag: String;
	LongTextLang: String;
	LowerLimit: Double;
	LowerLimitFlag: String;
	MasterInspChar: String;
	MasterInspCharPlant: String;
	MasterInspCharVersion: String;
	NoOfDefect: Int32;
	NoOfInspected: Int32;
	OperationNum: String;
	OriginalInput: String;
	QuantitativeFlag: String;
	RecordingType: String;
	ResultChangedAt: DateTime;
	ResultChangedBy: String;
	ResultValue: Double;
	ResultValueFlag: String;
	key SampleNum: String;
	SampleQty: String;
	SampleUOM: String;
	ScrapShareFlag: String;
	SelectedSet: String;
	SelectedSetFlag: String;
	SelectedSetPlant: String;
	ShortDesc: String;
	Status: String;
	TargetValue: Double;
	TargetValueFlag: String;
	UpperLimit: Double;
	UpperLimitFlag: String;
	Valuation: String;
	ValueAbove: Int64;
	ValueBelow: Int64;
	DefectClass_Nav: Association to many DefectClasses on DefectClass_Nav.DefectClass = $self;
	InspCharStatus_Nav: Association to many InspectionCharStatuses on InspCharStatus_Nav.Status = $self;
	InspValuation_Nav: Association to many InspectionResultValuations on InspValuation_Nav.Valuation = $self;
	InspectionCode_Nav: Association to many InspectionCodes on InspectionCode_Nav.SelectedSetPlant = $self;
	InspectionLot_Nav: Association to many InspectionLots on InspectionLot_Nav.InspectionLot = $self;
	InspectionMethod_Nav: Association to many InspectionMethods on InspectionMethod_Nav.InspectionMethodVersion = $self;
	InspectionPoint_Nav: Association to many InspectionPoints on InspectionPoint_Nav.InspectionLot = $self;
	MasterInspChar_Nav: Association to many MasterInspectionChars on MasterInspChar_Nav.MasterInspChar = $self;
	NotifItems_Nav: Association to many MyNotificationItems on NotifItems_Nav.InspectionNode = $self;
}
entity InspectionCharacteristics 
 {
	CalculatedCharFlag: String;
	Catalog: String;
	CatalogVersion: String;
	ChangedAt: DateTime;
	ChangedBy: String;
	CharAttributeFlag: String;
	CharCategory: String;
	CharId: String;
	Code: String;
	CodeGroup: String;
	CreatedAt: DateTime;
	CreatedBy: String;
	DecimalPlaces: Int16;
	DefectClass: String;
	DefectRecordingFlag: String;
	Formula1: String;
	Formula2: String;
	key InspectionChar: String;
	key InspectionLot: String;
	InspectionMethod: String;
	InspectionMethodPlant: String;
	InspectionMethodVersion: String;
	key InspectionNode: String;
	InspectionScope: String;
	LongTermInspFlag: String;
	LongTextFlag: String;
	LongTextLang: String;
	LowerLimit: Double;
	LowerLimitFlag: String;
	MasterInspChar: String;
	MasterInspCharPlant: String;
	MasterInspCharVersion: String;
	NoOfDefect: Int32;
	NoOfInspected: Int32;
	OperationNum: String;
	OriginalInput: String;
	QuantitativeFlag: String;
	RecordingType: String;
	ResultChangedAt: DateTime;
	ResultChangedBy: String;
	ResultValue: Double;
	ResultValueFlag: String;
	key SampleNum: String;
	SampleQty: String;
	SampleUOM: String;
	ScrapShareFlag: String;
	SelectedSet: String;
	SelectedSetFlag: String;
	SelectedSetPlant: String;
	ShortDesc: String;
	Status: String;
	TargetValue: Double;
	TargetValueFlag: String;
	UpperLimit: Double;
	UpperLimitFlag: String;
	Valuation: String;
	ValueAbove: Int64;
	ValueBelow: Int64;
	DefectClass_Nav: Association to many DefectClasses on DefectClass_Nav.DefectClass = $self;
	InspCharStatus_Nav: Association to many InspectionCharStatuses on InspCharStatus_Nav.Status = $self;
	InspValuation_Nav: Association to many InspectionResultValuations on InspValuation_Nav.Valuation = $self;
	InspectionCode_Nav: Association to many InspectionCodes on InspectionCode_Nav.SelectedSetPlant = $self;
	InspectionLot_Nav: Association to many InspectionLots on InspectionLot_Nav.InspectionLot = $self;
	InspectionMethod_Nav: Association to many InspectionMethods on InspectionMethod_Nav.InspectionMethodVersion = $self;
	InspectionPoint_Nav: Association to many InspectionPoints on InspectionPoint_Nav.InspectionLot = $self;
	MasterInspChar_Nav: Association to many MasterInspectionChars on MasterInspChar_Nav.MasterInspChar = $self;
	NotifItems_Nav: Association to many MyNotificationItems on NotifItems_Nav.InspectionNode = $self;
}
entity InspectionCodes 
 {
	key Catalog: String;
	key Code: String;
	CodeDesc: String;
	key CodeGroup: String;
	CodeGroupDesc: String;
	DefectClass: String;
	key Plant: String;
	QualityScore: Int32;
	key SelectedSet: String;
	ValuationStatus: String;
	Version: String;
	DefectClass_Nav: Association to many DefectClasses on DefectClass_Nav.DefectClass = $self;
	InspCharacteristics_Nav: Association to many InspectionCharacteristics on InspCharacteristics_Nav.SelectedSetPlant = $self;
	InspHistories_Nav: Association to many InspectionHistories on InspHistories_Nav.DefectCode = $self;
	InspPoints_Nav: Association to many InspectionPoints on InspPoints_Nav.ValCatalog = $self;
	InspValuation_Nav: Association to many InspectionCatalogValuations on InspValuation_Nav.ValuationStatus = $self;
	InspectionLots_Nav: Association to many InspectionLots on InspectionLots_Nav.UDSelectedSet = $self;
}
entity InspectionCodes 
 {
	key Catalog: String;
	key Code: String;
	CodeDesc: String;
	key CodeGroup: String;
	CodeGroupDesc: String;
	DefectClass: String;
	key Plant: String;
	QualityScore: Int32;
	key SelectedSet: String;
	ValuationStatus: String;
	Version: String;
	DefectClass_Nav: Association to many DefectClasses on DefectClass_Nav.DefectClass = $self;
	InspCharacteristics_Nav: Association to many InspectionCharacteristics on InspCharacteristics_Nav.SelectedSetPlant = $self;
	InspHistories_Nav: Association to many InspectionHistories on InspHistories_Nav.DefectCode = $self;
	InspPoints_Nav: Association to many InspectionPoints on InspPoints_Nav.ValCatalog = $self;
	InspValuation_Nav: Association to many InspectionCatalogValuations on InspValuation_Nav.ValuationStatus = $self;
	InspectionLots_Nav: Association to many InspectionLots on InspectionLots_Nav.UDSelectedSet = $self;
}
entity InspectionHistories 
 {
	DefectCatalog: String;
	DefectClass: String;
	DefectCode: String;
	DefectCodeGroup: String;
	DefectPlant: String;
	DefectSelectedSet: String;
	EndDate: DateTime;
	InputValue: String;
	key InspectionChar: String;
	key InspectionLot: String;
	key InspectionNode: String;
	Inspector: String;
	LastChangedDate: DateTime;
	MasterInspChar: String;
	MasterInspVersion: String;
	MeanValue: Double;
	NumOfDefects: Int16;
	NumOfInspected: Int16;
	Plant: String;
	key SampleNum: String;
	StartDate: DateTime;
	Valuation: String;
	InspectionCode_Nav: Association to many InspectionCodes on InspectionCode_Nav.DefectCode = $self;
	MasterInspChar_Nav: Association to many MasterInspectionChars on MasterInspChar_Nav.MasterInspVersion = $self;
}
entity InspectionHistories 
 {
	DefectCatalog: String;
	DefectClass: String;
	DefectCode: String;
	DefectCodeGroup: String;
	DefectPlant: String;
	DefectSelectedSet: String;
	EndDate: DateTime;
	InputValue: String;
	key InspectionChar: String;
	key InspectionLot: String;
	key InspectionNode: String;
	Inspector: String;
	LastChangedDate: DateTime;
	MasterInspChar: String;
	MasterInspVersion: String;
	MeanValue: Double;
	NumOfDefects: Int16;
	NumOfInspected: Int16;
	Plant: String;
	key SampleNum: String;
	StartDate: DateTime;
	Valuation: String;
	InspectionCode_Nav: Association to many InspectionCodes on InspectionCode_Nav.DefectCode = $self;
	MasterInspChar_Nav: Association to many MasterInspectionChars on MasterInspChar_Nav.MasterInspVersion = $self;
}
entity InspectionLots 
 {
	CodeVersion: String;
	CreatedAt: DateTime;
	CreatedBy: String;
	EAMChecklistInd: String;
	EndDate: DateTime;
	Equipment: String;
	FunctionalLocation: String;
	key InspectionLot: String;
	InspectionLotOrigin: String;
	InspectionType: String;
	ObjCategory: String;
	ObjNum: String;
	OrderId: String;
	Plant: String;
	QualityScore: Decimal;
	SelectedSetVersion: String;
	ShortDesc: String;
	StartDate: DateTime;
	SystemStatus: String;
	TaskListGroup: String;
	TaskListType: String;
	TaskListUsage: String;
	UDCatalog: String;
	UDChangedAt: Time;
	UDChangedBy: String;
	UDChangedDate: DateTime;
	UDCode: String;
	UDCodeGroup: String;
	UDCreatedAt: Time;
	UDCreatedBy: String;
	UDCreatedDate: DateTime;
	UDSelectedSet: String;
	UserStatus: String;
	ValuationStatus: String;
	InspValuation_Nav: Association to many InspectionCatalogValuations on InspValuation_Nav.ValuationStatus = $self;
	InspectionChars_Nav: Association to many InspectionCharacteristics on InspectionChars_Nav.InspectionLot = $self;
	InspectionCode_Nav: Association to many InspectionCodes on InspectionCode_Nav.UDSelectedSet = $self;
	InspectionPoints_Nav: Association to many InspectionPoints on InspectionPoints_Nav.InspectionLot = $self;
	NotifHeaders_Nav: Association to many MyNotificationHeaders on NotifHeaders_Nav.InspectionLot = $self;
	WOHeader_Nav: Association to many MyWorkOrderHeaders on WOHeader_Nav.OrderId = $self;
}
entity InspectionLots 
 {
	CodeVersion: String;
	CreatedAt: DateTime;
	CreatedBy: String;
	EAMChecklistInd: String;
	EndDate: DateTime;
	Equipment: String;
	FunctionalLocation: String;
	key InspectionLot: String;
	InspectionLotOrigin: String;
	InspectionType: String;
	ObjCategory: String;
	ObjNum: String;
	OrderId: String;
	Plant: String;
	QualityScore: Decimal;
	SelectedSetVersion: String;
	ShortDesc: String;
	StartDate: DateTime;
	SystemStatus: String;
	TaskListGroup: String;
	TaskListType: String;
	TaskListUsage: String;
	UDCatalog: String;
	UDChangedAt: Time;
	UDChangedBy: String;
	UDChangedDate: DateTime;
	UDCode: String;
	UDCodeGroup: String;
	UDCreatedAt: Time;
	UDCreatedBy: String;
	UDCreatedDate: DateTime;
	UDSelectedSet: String;
	UserStatus: String;
	ValuationStatus: String;
	InspValuation_Nav: Association to many InspectionCatalogValuations on InspValuation_Nav.ValuationStatus = $self;
	InspectionChars_Nav: Association to many InspectionCharacteristics on InspectionChars_Nav.InspectionLot = $self;
	InspectionCode_Nav: Association to many InspectionCodes on InspectionCode_Nav.UDSelectedSet = $self;
	InspectionPoints_Nav: Association to many InspectionPoints on InspectionPoints_Nav.InspectionLot = $self;
	NotifHeaders_Nav: Association to many MyNotificationHeaders on NotifHeaders_Nav.InspectionLot = $self;
	WOHeader_Nav: Association to many MyWorkOrderHeaders on WOHeader_Nav.OrderId = $self;
}
entity InspectionMethodDocuments 
 {
	DocumentID: String;
	Method: String;
	key ObjectKey: String;
	Plant: String;
	key RelationshipID: String;
	Version: String;
	Document_Nav: Association to many Documents on Document_Nav.DocumentID = $self;
	InspectionMethod_Nav: Association to many InspectionMethods on InspectionMethod_Nav.Version = $self;
}
entity InspectionMethodDocuments 
 {
	DocumentID: String;
	Method: String;
	key ObjectKey: String;
	Plant: String;
	key RelationshipID: String;
	Version: String;
	Document_Nav: Association to many Documents on Document_Nav.DocumentID = $self;
	InspectionMethod_Nav: Association to many InspectionMethods on InspectionMethod_Nav.Version = $self;
}
entity InspectionMethodLongTexts 
 {
	key Method: String;
	ObjectKey: String;
	key Plant: String;
	TextId: String;
	TextObjType: String;
	TextString: String;
	key Version: String;
	InspectionMethod_Nav: Association to many InspectionMethods on InspectionMethod_Nav.Method = $self;
}
entity InspectionMethodLongTexts 
 {
	key Method: String;
	ObjectKey: String;
	key Plant: String;
	TextId: String;
	TextObjType: String;
	TextString: String;
	key Version: String;
	InspectionMethod_Nav: Association to many InspectionMethods on InspectionMethod_Nav.Method = $self;
}
entity InspectionMethods 
 {
	LongTextFlag: String;
	key Method: String;
	key Plant: String;
	ShortDesc: String;
	SortField: String;
	Status: String;
	StatusDesc: String;
	key Version: String;
	InspectionChars_Nav: Association to many InspectionCharacteristics on InspectionChars_Nav.InspectionMethodVersion = $self;
	MethodDoc_Nav: Association to many InspectionMethodDocuments on MethodDoc_Nav.Version = $self;
	MethodLongText_Nav: Association to many InspectionMethodLongTexts on MethodLongText_Nav.Method = $self;
}
entity InspectionMethods 
 {
	LongTextFlag: String;
	key Method: String;
	key Plant: String;
	ShortDesc: String;
	SortField: String;
	Status: String;
	StatusDesc: String;
	key Version: String;
	InspectionChars_Nav: Association to many InspectionCharacteristics on InspectionChars_Nav.InspectionMethodVersion = $self;
	MethodDoc_Nav: Association to many InspectionMethodDocuments on MethodDoc_Nav.Version = $self;
	MethodLongText_Nav: Association to many InspectionMethodLongTexts on MethodLongText_Nav.Method = $self;
}
entity InspectionPoints 
 {
	ConfirmCounter: String;
	ConfirmNum: String;
	EquipNum: String;
	FuncLocId: String;
	FuncLocIntern: String;
	key InspectionLot: String;
	key InspectionNode: String;
	Inspector: String;
	OperationNo: String;
	OrderId: String;
	Plant: String;
	key SampleNum: String;
	ValCatalog: String;
	ValCode: String;
	ValCodeGroup: String;
	ValSelectedSet: String;
	ValuationStatus: String;
	Equip_Nav: Association to many MyEquipments on Equip_Nav.EquipNum = $self;
	FuncLoc_Nav: Association to many MyFunctionalLocations on FuncLoc_Nav.FuncLocIntern = $self;
	InspCode_Nav: Association to many InspectionCodes on InspCode_Nav.ValCatalog = $self;
	InspValuation_Nav: Association to many InspectionCatalogValuations on InspValuation_Nav.ValuationStatus = $self;
	InspectionChar_Nav: Association to many InspectionCharacteristics on InspectionChar_Nav.InspectionLot = $self;
	InspectionLot_Nav: Association to many InspectionLots on InspectionLot_Nav.InspectionLot = $self;
	NotifItems_Nav: Association to many MyNotificationItems on NotifItems_Nav.InspectionSample = $self;
	WOOperation_Nav: Association to many MyWorkOrderOperations on WOOperation_Nav.OrderId = $self;
}
entity InspectionPoints 
 {
	ConfirmCounter: String;
	ConfirmNum: String;
	EquipNum: String;
	FuncLocId: String;
	FuncLocIntern: String;
	key InspectionLot: String;
	key InspectionNode: String;
	Inspector: String;
	OperationNo: String;
	OrderId: String;
	Plant: String;
	key SampleNum: String;
	ValCatalog: String;
	ValCode: String;
	ValCodeGroup: String;
	ValSelectedSet: String;
	ValuationStatus: String;
	Equip_Nav: Association to many MyEquipments on Equip_Nav.EquipNum = $self;
	FuncLoc_Nav: Association to many MyFunctionalLocations on FuncLoc_Nav.FuncLocIntern = $self;
	InspCode_Nav: Association to many InspectionCodes on InspCode_Nav.ValCatalog = $self;
	InspValuation_Nav: Association to many InspectionCatalogValuations on InspValuation_Nav.ValuationStatus = $self;
	InspectionChar_Nav: Association to many InspectionCharacteristics on InspectionChar_Nav.InspectionLot = $self;
	InspectionLot_Nav: Association to many InspectionLots on InspectionLot_Nav.InspectionLot = $self;
	NotifItems_Nav: Association to many MyNotificationItems on NotifItems_Nav.InspectionSample = $self;
	WOOperation_Nav: Association to many MyWorkOrderOperations on WOOperation_Nav.OrderId = $self;
}
entity InspectionResultValuations 
 {
	ShortText: String;
	key Valuation: String;
	InspectionChars_Nav: Association to many InspectionCharacteristics on InspectionChars_Nav.Valuation = $self;
}
entity InspectionResultValuations 
 {
	ShortText: String;
	key Valuation: String;
	InspectionChars_Nav: Association to many InspectionCharacteristics on InspectionChars_Nav.Valuation = $self;
}
entity Installations 
 {
	Division: String;
	key Installation: String;
	InstallationDate: DateTime;
	InstallationStatus: String;
	InstallationType: String;
	Premise: String;
	Division_Nav: Association to one Divisions;
	OrderISULink_Nav: Association to many OrderISULinks on OrderISULink_Nav.Installation = $self;
	Premise_Nav: Association to many Premises on Premise_Nav.Premise = $self;
}
entity ItemCategories 
 {
	key ItemCategory: String;
	ItemCategoryDesc: String;
	BOMItemCategory_Nav: Association to many BOMItems on BOMItemCategory_Nav.ItemCategory = $self;
	CompItemCategory_Nav: Association to many MyWorkOrderComponents on CompItemCategory_Nav.ItemCategory = $self;
}
entity ItemCategories 
 {
	key ItemCategory: String;
	ItemCategoryDesc: String;
	BOMItemCategory_Nav: Association to many BOMItems on BOMItemCategory_Nav.ItemCategory = $self;
	CompItemCategory_Nav: Association to many MyWorkOrderComponents on CompItemCategory_Nav.ItemCategory = $self;
}
entity LAMCharacteristicValues 
 {
	key CharValCounter: String;
	key ClassType: String;
	EndPoint: String;
	key InternCharacteristic: String;
	key InternCounter: String;
	key LAMInternCounter: String;
	Length: String;
	key ObjClassFlag: String;
	key ObjectKey: String;
	StartPoint: String;
	key Table: String;
	UOM: String;
	MyEquipClassCharValue_Nav: Association to many MyEquipClassCharValues on MyEquipClassCharValue_Nav.ObjClassFlag = $self;
	MyFuncLocClassCharValue_Nav: Association to many MyFuncLocClassCharValues on MyFuncLocClassCharValue_Nav.InternCounter = $self;
}
entity LAMCharacteristicValues 
 {
	key CharValCounter: String;
	key ClassType: String;
	EndPoint: String;
	key InternCharacteristic: String;
	key InternCounter: String;
	key LAMInternCounter: String;
	Length: String;
	key ObjClassFlag: String;
	key ObjectKey: String;
	StartPoint: String;
	key Table: String;
	UOM: String;
	MyEquipClassCharValue_Nav: Association to many MyEquipClassCharValues on MyEquipClassCharValue_Nav.ObjClassFlag = $self;
	MyFuncLocClassCharValue_Nav: Association to many MyFuncLocClassCharValues on MyFuncLocClassCharValue_Nav.InternCounter = $self;
}
entity LAMObjectData 
 {
	ConfirmationCounter: String;
	ConfirmationNum: String;
	EndMarker: String;
	EndMarkerDistance: String;
	EndPoint: String;
	EquipId: String;
	FuncLocIdIntern: String;
	LRPId: String;
	Length: String;
	MarkerUOM: String;
	MeasurementDocNum: String;
	NotifItemNumber: String;
	NotificationNumber: String;
	key ObjectType: String;
	Offset1Type: String;
	Offset1UOM: String;
	Offset1Value: String;
	Offset2Type: String;
	Offset2UOM: String;
	Offset2Value: String;
	OperationNo: String;
	OrderId: String;
	Point: String;
	StartMarker: String;
	StartMarkerDistance: String;
	StartPoint: String;
	key TableKey: String;
	UOM: String;
	Confirmation_Nav: Association to many Confirmations on Confirmation_Nav.ConfirmationNum = $self;
	MeasurementDocument_Nav: Association to many MeasurementDocuments on MeasurementDocument_Nav.MeasurementDocNum = $self;
	MeasuringPoint_Nav: Association to many MeasuringPoints on MeasuringPoint_Nav.Point = $self;
	MyEquipment_Nav: Association to many MyEquipments on MyEquipment_Nav.EquipId = $self;
	MyFunctionalLocation_Nav: Association to many MyFunctionalLocations on MyFunctionalLocation_Nav.FuncLocIdIntern = $self;
	MyNotificationHeader_Nav: Association to many MyNotificationHeaders on MyNotificationHeader_Nav.NotificationNumber = $self;
	MyNotificationItem_Nav: Association to many MyNotificationItems on MyNotificationItem_Nav.NotifItemNumber = $self;
	MyWorkOrderHeader_Nav: Association to many MyWorkOrderHeaders on MyWorkOrderHeader_Nav.OrderId = $self;
	MyWorkOrderOperation_Nav: Association to many MyWorkOrderOperations on MyWorkOrderOperation_Nav.OperationNo = $self;
}
entity LAMObjectData 
 {
	ConfirmationCounter: String;
	ConfirmationNum: String;
	EndMarker: String;
	EndMarkerDistance: String;
	EndPoint: String;
	EquipId: String;
	FuncLocIdIntern: String;
	LRPId: String;
	Length: String;
	MarkerUOM: String;
	MeasurementDocNum: String;
	NotifItemNumber: String;
	NotificationNumber: String;
	key ObjectType: String;
	Offset1Type: String;
	Offset1UOM: String;
	Offset1Value: String;
	Offset2Type: String;
	Offset2UOM: String;
	Offset2Value: String;
	OperationNo: String;
	OrderId: String;
	Point: String;
	StartMarker: String;
	StartMarkerDistance: String;
	StartPoint: String;
	key TableKey: String;
	UOM: String;
	Confirmation_Nav: Association to many Confirmations on Confirmation_Nav.ConfirmationNum = $self;
	MeasurementDocument_Nav: Association to many MeasurementDocuments on MeasurementDocument_Nav.MeasurementDocNum = $self;
	MeasuringPoint_Nav: Association to many MeasuringPoints on MeasuringPoint_Nav.Point = $self;
	MyEquipment_Nav: Association to many MyEquipments on MyEquipment_Nav.EquipId = $self;
	MyFunctionalLocation_Nav: Association to many MyFunctionalLocations on MyFunctionalLocation_Nav.FuncLocIdIntern = $self;
	MyNotificationHeader_Nav: Association to many MyNotificationHeaders on MyNotificationHeader_Nav.NotificationNumber = $self;
	MyNotificationItem_Nav: Association to many MyNotificationItems on MyNotificationItem_Nav.NotifItemNumber = $self;
	MyWorkOrderHeader_Nav: Association to many MyWorkOrderHeaders on MyWorkOrderHeader_Nav.OrderId = $self;
	MyWorkOrderOperation_Nav: Association to many MyWorkOrderOperations on MyWorkOrderOperation_Nav.OperationNo = $self;
}
entity LAMOffsetTypes 
 {
	DefaultOffset: String;
	Description: String;
	DocumentationObject: String;
	key OffsetTypeCode: String;
	UOM: String;
}
entity LAMOffsetTypes 
 {
	DefaultOffset: String;
	Description: String;
	DocumentationObject: String;
	key OffsetTypeCode: String;
	UOM: String;
}
entity LinearReferencePatternHeaders 
 {
	Description: String;
	key LRPId: String;
	MarkerDistanceCode: String;
	Type: String;
	UOM: String;
	LRPItem_Nav: Association to many LinearReferencePatternItems on LRPItem_Nav.LRPId = $self;
}
entity LinearReferencePatternHeaders 
 {
	Description: String;
	key LRPId: String;
	MarkerDistanceCode: String;
	Type: String;
	UOM: String;
	LRPItem_Nav: Association to many LinearReferencePatternItems on LRPItem_Nav.LRPId = $self;
}
entity LinearReferencePatternItems 
 {
	Description: String;
	key LRPId: String;
	Length: String;
	key Marker: String;
	MarkerType: String;
	StartPoint: String;
	TechnicalObject: String;
	UOM: String;
}
entity LinearReferencePatternItems 
 {
	Description: String;
	key LRPId: String;
	Length: String;
	key Marker: String;
	MarkerType: String;
	StartPoint: String;
	TechnicalObject: String;
	UOM: String;
}
entity Locations 
 {
	key Location: String;
	LocationName: String;
	key Plant: String;
	MyEquipments_Nav: Association to many MyEquipments on MyEquipments_Nav.MaintPlant = $self;
	MyFunctionalLocations_Nav: Association to many MyFunctionalLocations on MyFunctionalLocations_Nav.Location = $self;
	Plant_Nav: Association to one Plants;
}
entity Locations 
 {
	key Location: String;
	LocationName: String;
	key Plant: String;
	MyEquipments_Nav: Association to many MyEquipments on MyEquipments_Nav.MaintPlant = $self;
	MyFunctionalLocations_Nav: Association to many MyFunctionalLocations on MyFunctionalLocations_Nav.Location = $self;
	Plant_Nav: Association to one Plants;
}
entity MarkedJobs 
 {
	key OrderId: String;
	PreferenceGroup: String;
	PreferenceName: String;
	PreferenceValue: String;
	RecordId: String;
	UserGUID: String;
	WorkOrderHeader: Association to many MyWorkOrderHeaders on WorkOrderHeader.OrderId = $self;
}
entity MarkedJobs 
 {
	key OrderId: String;
	PreferenceGroup: String;
	PreferenceName: String;
	PreferenceValue: String;
	RecordId: String;
	UserGUID: String;
	WorkOrderHeader: Association to many MyWorkOrderHeaders on WorkOrderHeader.OrderId = $self;
}
entity MasterInspCharLongTexts 
 {
	key MasterInspChar: String;
	key MasterInspCharPlant: String;
	key MasterInspCharVersion: String;
	ObjectKey: String;
	TextId: String;
	TextObjType: String;
	TextString: String;
	MasterInspChar_Nav: Association to many MasterInspectionChars on MasterInspChar_Nav.MasterInspChar = $self;
}
entity MasterInspCharLongTexts 
 {
	key MasterInspChar: String;
	key MasterInspCharPlant: String;
	key MasterInspCharVersion: String;
	ObjectKey: String;
	TextId: String;
	TextObjType: String;
	TextString: String;
	MasterInspChar_Nav: Association to many MasterInspectionChars on MasterInspChar_Nav.MasterInspChar = $self;
}
entity MasterInspectionChars 
 {
	CalculatedCharFlag: String;
	CharAttributeFlag: String;
	CharCategory: String;
	CharId: String;
	DecimalPlaces: Int16;
	DefectCodeGroupLowerLimit: String;
	DefectCodeGroupUpperLimit: String;
	DefectCodeLowerLimit: String;
	DefectCodeUpperLimit: String;
	DefectRecordingFlag: String;
	InspectionScope: String;
	LongTermInspFlag: String;
	LowerLimit: Double;
	LowerLimitFlag: String;
	key MasterInspChar: String;
	key MasterInspCharPlant: String;
	key MasterInspCharVersion: String;
	QuantitativeFlag: String;
	RecordingType: String;
	SampleProcReqFlag: String;
	ScrapShareFlag: String;
	ShortDesc: String;
	SortField: String;
	TargetValue: Double;
	TargetValueFlag: String;
	UoM: String;
	UpperLimit: Double;
	UpperLimitFlag: String;
	InspHistory_Nav: Association to many InspectionHistories on InspHistory_Nav.MasterInspVersion = $self;
	InspectionChar_Nav: Association to many InspectionCharacteristics on InspectionChar_Nav.MasterInspChar = $self;
	LongText_Nav: Association to many MasterInspCharLongTexts on LongText_Nav.MasterInspChar = $self;
}
entity MasterInspectionChars 
 {
	CalculatedCharFlag: String;
	CharAttributeFlag: String;
	CharCategory: String;
	CharId: String;
	DecimalPlaces: Int16;
	DefectCodeGroupLowerLimit: String;
	DefectCodeGroupUpperLimit: String;
	DefectCodeLowerLimit: String;
	DefectCodeUpperLimit: String;
	DefectRecordingFlag: String;
	InspectionScope: String;
	LongTermInspFlag: String;
	LowerLimit: Double;
	LowerLimitFlag: String;
	key MasterInspChar: String;
	key MasterInspCharPlant: String;
	key MasterInspCharVersion: String;
	QuantitativeFlag: String;
	RecordingType: String;
	SampleProcReqFlag: String;
	ScrapShareFlag: String;
	ShortDesc: String;
	SortField: String;
	TargetValue: Double;
	TargetValueFlag: String;
	UoM: String;
	UpperLimit: Double;
	UpperLimitFlag: String;
	InspHistory_Nav: Association to many InspectionHistories on InspHistory_Nav.MasterInspVersion = $self;
	InspectionChar_Nav: Association to many InspectionCharacteristics on InspectionChar_Nav.MasterInspChar = $self;
	LongText_Nav: Association to many MasterInspCharLongTexts on LongText_Nav.MasterInspChar = $self;
}
entity MatDocAttachments 
 {
	DocumentID: String;
	MatDocYear: String;
	MaterialDoc: String;
	key ObjectKey: String;
	key RelationShipID: String;
	Document: Association to many Documents on Document.DocumentID = $self;
	MaterialDocument_Nav: Association to one MaterialDocuments;
}
entity MatDocAttachments 
 {
	DocumentID: String;
	MatDocYear: String;
	MaterialDoc: String;
	key ObjectKey: String;
	key RelationShipID: String;
	Document: Association to many Documents on Document.DocumentID = $self;
	MaterialDocument_Nav: Association to one MaterialDocuments;
}
entity MatDocItemSerialNums 
 {
	key MatDocItem: String;
	key MaterialDocNumber: String;
	key MaterialDocYear: String;
	key SerialNum: String;
	UniversalItemId: String;
	MatDocItem_Nav: Association to one MaterialDocItems;
}
entity MatDocItemSerialNums 
 {
	key MatDocItem: String;
	key MaterialDocNumber: String;
	key MaterialDocYear: String;
	key SerialNum: String;
	UniversalItemId: String;
	MatDocItem_Nav: Association to one MaterialDocItems;
}
entity MaterialBOMs 
 {
	key BOMCategory: String;
	key BOMId: String;
	key BOMUsage: String;
	key MaterialNum: String;
	key Plant: String;
	BOMHeader_Nav: Association to many BOMHeaders on BOMHeader_Nav.BOMCategory = $self;
	Material_Nav: Association to one Materials;
}
entity MaterialBOMs 
 {
	key BOMCategory: String;
	key BOMId: String;
	key BOMUsage: String;
	key MaterialNum: String;
	key Plant: String;
	BOMHeader_Nav: Association to many BOMHeaders on BOMHeader_Nav.BOMCategory = $self;
	Material_Nav: Association to one Materials;
}
entity MaterialBatchStockSet 
 {
	key Batch: String;
	key MaterialNum: String;
	key Plant: String;
	key StorageLocation: String;
	UnrestrictedQuantity: Decimal;
	MaterialPlant_Nav: Association to one MaterialPlants;
	MaterialProjectStock: Association to many MaterialProjectStocks on MaterialProjectStock.MaterialNum = $self;
	MaterialVendorConsignmentStock: Association to many MaterialVendorConsignmentStocks on MaterialVendorConsignmentStock.Batch = $self;
	Material_Nav: Association to one Materials;
	MyEquipSerialNumber_Nav: Association to many MyEquipSerialNumbers on MyEquipSerialNumber_Nav.BatchNumber = $self;
	MyWorkOrderComponent_Nav: Association to many MyWorkOrderComponents on MyWorkOrderComponent_Nav.StorageLocation = $self;
}
entity MaterialBatches 
 {
	key Batch: String;
	BatchType: String;
	key MaterialNum: String;
	key Plant: String;
	MaterialPlant_Nav: Association to one MaterialPlants;
	Material_Nav: Association to one Materials;
	MyEquipSerialNum_Nav: Association to many MyEquipSerialNumbers on MyEquipSerialNum_Nav.BatchNumber = $self;
	MyWOComponent_Nav: Association to many MyWorkOrderComponents on MyWOComponent_Nav.MaterialNum = $self;
}
entity MaterialBatches 
 {
	key Batch: String;
	BatchType: String;
	key MaterialNum: String;
	key Plant: String;
	MaterialPlant_Nav: Association to one MaterialPlants;
	Material_Nav: Association to one Materials;
	MyEquipSerialNum_Nav: Association to many MyEquipSerialNumbers on MyEquipSerialNum_Nav.BatchNumber = $self;
	MyWOComponent_Nav: Association to many MyWorkOrderComponents on MyWOComponent_Nav.MaterialNum = $self;
}
entity MaterialDocItems 
 {
	AutoGenerateSerialNumbers: String;
	Batch: String;
	CostCenter: String;
	Customer: String;
	Delivery: String;
	DeliveryItem: String;
	EntryQuantity: Decimal;
	EntryUOM: String;
	FinalIssue: String;
	GLAccount: String;
	GoodsRecipient: String;
	ItemText: String;
	key MatDocItem: String;
	Material: String;
	key MaterialDocNumber: String;
	key MaterialDocYear: String;
	MoveBatch: String;
	MovePlant: String;
	MoveStorageLocation: String;
	MoveValuationType: String;
	MovementIndicator: String;
	MovementReason: String;
	MovementType: String;
	Network: String;
	NetworkActivity: String;
	NumOfLabels: String;
	OrderItemNumber: String;
	OrderNumber: String;
	Plant: String;
	PurchaseOrderItem: String;
	PurchaseOrderNumber: String;
	Quantity: Decimal;
	ReferenceDocHdr: String;
	ReferenceDocItem: String;
	ReferenceDocYear: String;
	ReservationItemNumber: String;
	ReservationNumber: String;
	ResvRecordType: String;
	SalesOrderItem: String;
	SalesOrderNumber: String;
	SpecialStockInd: String;
	StockType: String;
	StockWBSElement: String;
	StorageBin: String;
	StorageLocation: String;
	UOM: String;
	UnloadingPoint: String;
	ValuationCategory: String;
	ValuationType: String;
	Vendor: String;
	WBSElement: String;
	AssociatedMaterialDoc: Association to one MaterialDocuments;
	InboundDeliveryItem_Nav: Association to many InboundDeliveryItems on InboundDeliveryItem_Nav.Delivery = $self;
	InboundDelivery_Nav: Association to many InboundDeliveries on InboundDelivery_Nav.Delivery = $self;
	OutboundDeliveryItem_Nav: Association to many OutboundDeliveryItems on OutboundDeliveryItem_Nav.DeliveryItem = $self;
	PurchaseOrderItem_Nav: Association to many PurchaseOrderItems on PurchaseOrderItem_Nav.PurchaseOrderItem = $self;
	PurchaseOrder_Nav: Association to many PurchaseOrderHeaders on PurchaseOrder_Nav.PurchaseOrderNumber = $self;
	ReservationItem_Nav: Association to many ReservationItems on ReservationItem_Nav.ReservationItemNumber = $self;
	Reservation_Nav: Association to many ReservationHeaders on Reservation_Nav.ReservationNumber = $self;
	STO_Nav: Association to many StockTransportOrderHeaders on STO_Nav.PurchaseOrderNumber = $self;
	SerialNum: Association to many MatDocItemSerialNums on SerialNum.MaterialDocNumber = $self;
	StockTransportOrderItem_Nav: Association to many StockTransportOrderItems on StockTransportOrderItem_Nav.PurchaseOrderNumber = $self;
	ValuationCategory_Nav: Association to many ValuationCategories on ValuationCategory_Nav.ValuationCategory = $self;
	ValuationType_Nav: Association to many ValuationTypes on ValuationType_Nav.Plant = $self;
	WorkOrderCompMatDoc: Association to one MyWorkOrderComponentMatDocs;
	WorkOrderHeader: Association to one MyWorkOrderHeaders;
}
entity MaterialDocItems 
 {
	AutoGenerateSerialNumbers: String;
	Batch: String;
	CostCenter: String;
	Customer: String;
	Delivery: String;
	DeliveryItem: String;
	EntryQuantity: Decimal;
	EntryUOM: String;
	FinalIssue: String;
	GLAccount: String;
	GoodsRecipient: String;
	ItemText: String;
	key MatDocItem: String;
	Material: String;
	key MaterialDocNumber: String;
	key MaterialDocYear: String;
	MoveBatch: String;
	MovePlant: String;
	MoveStorageLocation: String;
	MoveValuationType: String;
	MovementIndicator: String;
	MovementReason: String;
	MovementType: String;
	Network: String;
	NetworkActivity: String;
	NumOfLabels: String;
	OrderItemNumber: String;
	OrderNumber: String;
	Plant: String;
	PurchaseOrderItem: String;
	PurchaseOrderNumber: String;
	Quantity: Decimal;
	ReferenceDocHdr: String;
	ReferenceDocItem: String;
	ReferenceDocYear: String;
	ReservationItemNumber: String;
	ReservationNumber: String;
	ResvRecordType: String;
	SalesOrderItem: String;
	SalesOrderNumber: String;
	SpecialStockInd: String;
	StockType: String;
	StockWBSElement: String;
	StorageBin: String;
	StorageLocation: String;
	UOM: String;
	UnloadingPoint: String;
	ValuationCategory: String;
	ValuationType: String;
	Vendor: String;
	WBSElement: String;
	AssociatedMaterialDoc: Association to one MaterialDocuments;
	InboundDeliveryItem_Nav: Association to many InboundDeliveryItems on InboundDeliveryItem_Nav.Delivery = $self;
	InboundDelivery_Nav: Association to many InboundDeliveries on InboundDelivery_Nav.Delivery = $self;
	OutboundDeliveryItem_Nav: Association to many OutboundDeliveryItems on OutboundDeliveryItem_Nav.DeliveryItem = $self;
	PurchaseOrderItem_Nav: Association to many PurchaseOrderItems on PurchaseOrderItem_Nav.PurchaseOrderItem = $self;
	PurchaseOrder_Nav: Association to many PurchaseOrderHeaders on PurchaseOrder_Nav.PurchaseOrderNumber = $self;
	ReservationItem_Nav: Association to many ReservationItems on ReservationItem_Nav.ReservationItemNumber = $self;
	Reservation_Nav: Association to many ReservationHeaders on Reservation_Nav.ReservationNumber = $self;
	STO_Nav: Association to many StockTransportOrderHeaders on STO_Nav.PurchaseOrderNumber = $self;
	SerialNum: Association to many MatDocItemSerialNums on SerialNum.MaterialDocNumber = $self;
	StockTransportOrderItem_Nav: Association to many StockTransportOrderItems on StockTransportOrderItem_Nav.PurchaseOrderNumber = $self;
	ValuationCategory_Nav: Association to many ValuationCategories on ValuationCategory_Nav.ValuationCategory = $self;
	ValuationType_Nav: Association to many ValuationTypes on ValuationType_Nav.Plant = $self;
	WorkOrderCompMatDoc: Association to one MyWorkOrderComponentMatDocs;
	WorkOrderHeader: Association to one MyWorkOrderHeaders;
}
entity MaterialDocuments 
 {
	BillOfLading: String;
	DocumentDate: DateTime;
	GMCode: String;
	GoodsReceiptIssueNumber: String;
	HeaderText: String;
	key MaterialDocNumber: String;
	key MaterialDocYear: String;
	ObjectKey: String;
	PostingDate: DateTime;
	RefDocumentNumber: String;
	UserName: String;
	MatDocAttachment_Nav: Association to many MatDocAttachments on MatDocAttachment_Nav.MatDocYear = $self;
	RelatedItem: Association to many MaterialDocItems on RelatedItem.MaterialDocNumber = $self;
}
entity MaterialDocuments 
 {
	BillOfLading: String;
	DocumentDate: DateTime;
	GMCode: String;
	GoodsReceiptIssueNumber: String;
	HeaderText: String;
	key MaterialDocNumber: String;
	key MaterialDocYear: String;
	ObjectKey: String;
	PostingDate: DateTime;
	RefDocumentNumber: String;
	UserName: String;
	MatDocAttachment_Nav: Association to many MatDocAttachments on MatDocAttachment_Nav.MatDocYear = $self;
	RelatedItem: Association to many MaterialDocItems on RelatedItem.MaterialDocNumber = $self;
}
entity MaterialPlants 
 {
	BatchIndicator: String;
	key MaterialNum: String;
	key Plant: String;
	PurchasingGroup: String;
	SerialNumberProfile: String;
	ValuationArea: String;
	ValuationCategory: String;
	InboundDeliveryItem_Nav: Association to many InboundDeliveryItems on InboundDeliveryItem_Nav.Material = $self;
	Material: Association to one Materials;
	MaterialBatch_Nav: Association to many MaterialBatches on MaterialBatch_Nav.Plant = $self;
	MaterialProjectStock: Association to many MaterialProjectStocks on MaterialProjectStock.MaterialNum = $self;
	MaterialSLocs: Association to many MaterialSLocs on MaterialSLocs.MaterialNum = $self;
	MaterialValuation_Nav: Association to many MaterialValuations on MaterialValuation_Nav.ValuationArea = $self;
	MaterialVendorConsignmentStock: Association to many MaterialVendorConsignmentStocks on MaterialVendorConsignmentStock.Plant = $self;
	OutboundDeliveryItem_Nav: Association to many OutboundDeliveryItems on OutboundDeliveryItem_Nav.Plant = $self;
	PhysicalInventoryDocItem_Nav: Association to many PhysicalInventoryDocItems on PhysicalInventoryDocItem_Nav.Plant = $self;
	ProductionOrderComponent_Nav: Association to many ProductionOrderComponents on ProductionOrderComponent_Nav.SupplyPlant = $self;
	PurchaseOrderItem_Nav: Association to many PurchaseOrderItems on PurchaseOrderItem_Nav.MaterialNum = $self;
	ReservationItem_Nav: Association to many ReservationItems on ReservationItem_Nav.SupplyPlant = $self;
	StockTransportOrderItem_Nav: Association to many StockTransportOrderItems on StockTransportOrderItem_Nav.Plant = $self;
	ValuationCategory_Nav: Association to many ValuationCategories on ValuationCategory_Nav.ValuationCategory = $self;
}
entity MaterialPlants 
 {
	BatchIndicator: String;
	key MaterialNum: String;
	key Plant: String;
	PurchasingGroup: String;
	SerialNumberProfile: String;
	ValuationArea: String;
	ValuationCategory: String;
	InboundDeliveryItem_Nav: Association to many InboundDeliveryItems on InboundDeliveryItem_Nav.Material = $self;
	Material: Association to one Materials;
	MaterialBatch_Nav: Association to many MaterialBatches on MaterialBatch_Nav.Plant = $self;
	MaterialProjectStock: Association to many MaterialProjectStocks on MaterialProjectStock.MaterialNum = $self;
	MaterialSLocs: Association to many MaterialSLocs on MaterialSLocs.MaterialNum = $self;
	MaterialValuation_Nav: Association to many MaterialValuations on MaterialValuation_Nav.ValuationArea = $self;
	MaterialVendorConsignmentStock: Association to many MaterialVendorConsignmentStocks on MaterialVendorConsignmentStock.Plant = $self;
	OutboundDeliveryItem_Nav: Association to many OutboundDeliveryItems on OutboundDeliveryItem_Nav.Plant = $self;
	PhysicalInventoryDocItem_Nav: Association to many PhysicalInventoryDocItems on PhysicalInventoryDocItem_Nav.Plant = $self;
	ProductionOrderComponent_Nav: Association to many ProductionOrderComponents on ProductionOrderComponent_Nav.SupplyPlant = $self;
	PurchaseOrderItem_Nav: Association to many PurchaseOrderItems on PurchaseOrderItem_Nav.MaterialNum = $self;
	ReservationItem_Nav: Association to many ReservationItems on ReservationItem_Nav.SupplyPlant = $self;
	StockTransportOrderItem_Nav: Association to many StockTransportOrderItems on StockTransportOrderItem_Nav.Plant = $self;
	ValuationCategory_Nav: Association to many ValuationCategories on ValuationCategory_Nav.ValuationCategory = $self;
}
entity MaterialProjectStocks 
 {
	key Batch: String;
	BlockedQty: Decimal;
	key MaterialNum: String;
	key Plant: String;
	QualityInspectionQty: Decimal;
	RestrictedUseQty: Decimal;
	key SpecialStock: String;
	key StorageLocation: String;
	UnrestrictedQty: Decimal;
	key WBSElement: String;
	Material: Association to one Materials;
	MaterialBatch: Association to many MaterialBatches on MaterialBatch.MaterialNum = $self;
	MaterialPlant: Association to one MaterialPlants;
	MaterialSLoc: Association to one MaterialSLocs;
}
entity MaterialSLocs 
 {
	BatchIndicator: String;
	key MaterialNum: String;
	OnOrderQuantity: Decimal;
	key Plant: String;
	StorageBin: String;
	key StorageLocation: String;
	StorageLocationDesc: String;
	TransferSlocQuantity: Decimal;
	UnrestrictedQuantity: Decimal;
	Material: Association to one Materials;
	MaterialPlant: Association to one MaterialPlants;
	MaterialProjectStock: Association to many MaterialProjectStocks on MaterialProjectStock.Plant = $self;
	MaterialVendorConsignmentStock: Association to many MaterialVendorConsignmentStocks on MaterialVendorConsignmentStock.MaterialNum = $self;
}
entity MaterialSLocs 
 {
	BatchIndicator: String;
	key MaterialNum: String;
	OnOrderQuantity: Decimal;
	key Plant: String;
	StorageBin: String;
	key StorageLocation: String;
	StorageLocationDesc: String;
	TransferSlocQuantity: Decimal;
	UnrestrictedQuantity: Decimal;
	Material: Association to one Materials;
	MaterialPlant: Association to one MaterialPlants;
	MaterialProjectStock: Association to many MaterialProjectStocks on MaterialProjectStock.Plant = $self;
	MaterialVendorConsignmentStock: Association to many MaterialVendorConsignmentStocks on MaterialVendorConsignmentStock.MaterialNum = $self;
}
entity MaterialSales 
 {
	key DistributionChannel: String;
	ItemCategoryGoup: String;
	key MaterialNum: String;
	key SalesOrg: String;
	Material_Nav: Association to one Materials;
}
entity MaterialSales 
 {
	key DistributionChannel: String;
	ItemCategoryGoup: String;
	key MaterialNum: String;
	key SalesOrg: String;
	Material_Nav: Association to one Materials;
}
entity MaterialUOMs 
 {
	BaseFlag: Boolean;
	BaseUOM: String;
	BatchIndicator: String;
	ConversionFactor: Decimal;
	Denominator: Decimal;
	key MaterialNum: String;
	Numerator: Decimal;
	key UOM: String;
	Material: Association to one Materials;
}
entity MaterialUOMs 
 {
	BaseFlag: Boolean;
	BaseUOM: String;
	BatchIndicator: String;
	ConversionFactor: Decimal;
	Denominator: Decimal;
	key MaterialNum: String;
	Numerator: Decimal;
	key UOM: String;
	Material: Association to one Materials;
}
entity MaterialValuations 
 {
	key Material: String;
	ValuationArea: String;
	key ValuationCategory: String;
	key ValuationType: String;
	MaterialPlant_Nav: Association to many MaterialPlants on MaterialPlant_Nav.ValuationArea = $self;
	Material_Nav: Association to one Materials;
	ValuationCategory_Nav: Association to many ValuationCategories on ValuationCategory_Nav.ValuationCategory = $self;
	ValuationType_Nav: Association to many ValuationTypes on ValuationType_Nav.ValuationType = $self;
}
entity MaterialValuations 
 {
	key Material: String;
	ValuationArea: String;
	key ValuationCategory: String;
	key ValuationType: String;
	MaterialPlant_Nav: Association to many MaterialPlants on MaterialPlant_Nav.ValuationArea = $self;
	Material_Nav: Association to one Materials;
	ValuationCategory_Nav: Association to many ValuationCategories on ValuationCategory_Nav.ValuationCategory = $self;
	ValuationType_Nav: Association to many ValuationTypes on ValuationType_Nav.ValuationType = $self;
}
entity MaterialVendorConsignmentStocks 
 {
	key Batch: String;
	BlockedQty: Decimal;
	key MaterialNum: String;
	key Plant: String;
	QualityInspectionQty: Decimal;
	RestrictedQty: Decimal;
	key SpecialStock: String;
	key StorageLocation: String;
	key Supplier: String;
	UnrestrictedQty: Decimal;
	Material: Association to one Materials;
	MaterialBatch: Association to many MaterialBatches on MaterialBatch.Batch = $self;
	MaterialPlant: Association to one MaterialPlants;
	MaterialSLoc: Association to one MaterialSLocs;
}
entity MaterialVendorConsignmentStocks 
 {
	key Batch: String;
	BlockedQty: Decimal;
	key MaterialNum: String;
	key Plant: String;
	QualityInspectionQty: Decimal;
	RestrictedQty: Decimal;
	key SpecialStock: String;
	key StorageLocation: String;
	key Supplier: String;
	UnrestrictedQty: Decimal;
	Material: Association to one Materials;
	MaterialBatch: Association to many MaterialBatches on MaterialBatch.Batch = $self;
	MaterialPlant: Association to one MaterialPlants;
	MaterialSLoc: Association to one MaterialSLocs;
}
entity Materials 
 {
	BaseUOM: String;
	Description: String;
	Division: String;
	EanUpc: String;
	GrossWeight: Decimal;
	MaterialGroup: String;
	key MaterialNum: String;
	MaterialType: String;
	NetWeight: Decimal;
	ProductHierarchy: String;
	SerialNumberProfile: String;
	Volume: Decimal;
	VolumeUnit: String;
	WeightUnit: String;
	DeviceCategory: Association to many DeviceCategories on DeviceCategory.DeviceCategory = $self;
	InboundDeliveryItem_Nav: Association to many InboundDeliveryItems on InboundDeliveryItem_Nav.Material = $self;
	MaterialBOM_Nav: Association to many MaterialBOMs on MaterialBOM_Nav.MaterialNum = $self;
	MaterialBatchStock_Nav: Association to many MaterialBatchStockSet on MaterialBatchStock_Nav.MaterialNum = $self;
	MaterialBatch_Nav: Association to many MaterialBatches on MaterialBatch_Nav.MaterialNum = $self;
	MaterialPlants: Association to many MaterialPlants on MaterialPlants.MaterialNum = $self;
	MaterialProjectStock: Association to many MaterialProjectStocks on MaterialProjectStock.MaterialNum = $self;
	MaterialSLocs: Association to many MaterialSLocs on MaterialSLocs.MaterialNum = $self;
	MaterialSales_Nav: Association to many MaterialSales on MaterialSales_Nav.MaterialNum = $self;
	MaterialUOMs: Association to many MaterialUOMs on MaterialUOMs.MaterialNum = $self;
	MaterialValuation_Nav: Association to many MaterialValuations on MaterialValuation_Nav.Material = $self;
	MaterialVendorConsignmentStock: Association to many MaterialVendorConsignmentStocks on MaterialVendorConsignmentStock.MaterialNum = $self;
	MyNotificationHeader_Nav: Association to many MyNotificationHeaders on MyNotificationHeader_Nav.Assembly = $self;
	MyWorkOrderHeader_Nav: Association to many MyWorkOrderHeaders on MyWorkOrderHeader_Nav.Assembly = $self;
	MyWorkOrderOperation_Nav: Association to many MyWorkOrderOperations on MyWorkOrderOperation_Nav.Assembly = $self;
	OutboundDeliveryItem_Nav: Association to many OutboundDeliveryItems on OutboundDeliveryItem_Nav.Material = $self;
	PhysicalInventoryDocItem_Nav: Association to many PhysicalInventoryDocItems on PhysicalInventoryDocItem_Nav.Material = $self;
	PurchaseOrderItem_Nav: Association to many PurchaseOrderItems on PurchaseOrderItem_Nav.MaterialNum = $self;
	SerialNumbers: Association to many MyEquipSerialNumbers on SerialNumbers.MaterialNum = $self;
	StockTransportOrderItem_Nav: Association to many StockTransportOrderItems on StockTransportOrderItem_Nav.MaterialNum = $self;
	WOObjectList_Nav: Association to many MyWorkOrderObjectLists;
	WorkOrderComponent: Association to many MyWorkOrderComponents on WorkOrderComponent.MaterialNum = $self;
	WorkOrderTool: Association to many MyWorkOrderTools on WorkOrderTool.Material = $self;
}
entity Materials 
 {
	BaseUOM: String;
	Description: String;
	Division: String;
	EanUpc: String;
	GrossWeight: Decimal;
	MaterialGroup: String;
	key MaterialNum: String;
	MaterialType: String;
	NetWeight: Decimal;
	ProductHierarchy: String;
	SerialNumberProfile: String;
	Volume: Decimal;
	VolumeUnit: String;
	WeightUnit: String;
	DeviceCategory: Association to many DeviceCategories on DeviceCategory.DeviceCategory = $self;
	InboundDeliveryItem_Nav: Association to many InboundDeliveryItems on InboundDeliveryItem_Nav.Material = $self;
	MaterialBOM_Nav: Association to many MaterialBOMs on MaterialBOM_Nav.MaterialNum = $self;
	MaterialBatchStock_Nav: Association to many MaterialBatchStockSet on MaterialBatchStock_Nav.MaterialNum = $self;
	MaterialBatch_Nav: Association to many MaterialBatches on MaterialBatch_Nav.MaterialNum = $self;
	MaterialPlants: Association to many MaterialPlants on MaterialPlants.MaterialNum = $self;
	MaterialProjectStock: Association to many MaterialProjectStocks on MaterialProjectStock.MaterialNum = $self;
	MaterialSLocs: Association to many MaterialSLocs on MaterialSLocs.MaterialNum = $self;
	MaterialSales_Nav: Association to many MaterialSales on MaterialSales_Nav.MaterialNum = $self;
	MaterialUOMs: Association to many MaterialUOMs on MaterialUOMs.MaterialNum = $self;
	MaterialValuation_Nav: Association to many MaterialValuations on MaterialValuation_Nav.Material = $self;
	MaterialVendorConsignmentStock: Association to many MaterialVendorConsignmentStocks on MaterialVendorConsignmentStock.MaterialNum = $self;
	MyNotificationHeader_Nav: Association to many MyNotificationHeaders on MyNotificationHeader_Nav.Assembly = $self;
	MyWorkOrderHeader_Nav: Association to many MyWorkOrderHeaders on MyWorkOrderHeader_Nav.Assembly = $self;
	MyWorkOrderOperation_Nav: Association to many MyWorkOrderOperations on MyWorkOrderOperation_Nav.Assembly = $self;
	OutboundDeliveryItem_Nav: Association to many OutboundDeliveryItems on OutboundDeliveryItem_Nav.Material = $self;
	PhysicalInventoryDocItem_Nav: Association to many PhysicalInventoryDocItems on PhysicalInventoryDocItem_Nav.Material = $self;
	PurchaseOrderItem_Nav: Association to many PurchaseOrderItems on PurchaseOrderItem_Nav.MaterialNum = $self;
	SerialNumbers: Association to many MyEquipSerialNumbers on SerialNumbers.MaterialNum = $self;
	StockTransportOrderItem_Nav: Association to many StockTransportOrderItems on StockTransportOrderItem_Nav.MaterialNum = $self;
	WOObjectList_Nav: Association to many MyWorkOrderObjectLists;
	WorkOrderComponent: Association to many MyWorkOrderComponents on WorkOrderComponent.MaterialNum = $self;
	WorkOrderTool: Association to many MyWorkOrderTools on WorkOrderTool.Material = $self;
}
entity MeasurementDocumentLongTexts 
 {
	key MeasurementDocNum: String;
	ObjectKey: String;
	TextId: String;
	TextObjType: String;
	TextString: String;
	MeasurementDocument: Association to one MeasurementDocuments;
}
entity MeasurementDocumentLongTexts 
 {
	key MeasurementDocNum: String;
	ObjectKey: String;
	TextId: String;
	TextObjType: String;
	TextString: String;
	MeasurementDocument: Association to one MeasurementDocuments;
}
entity MeasurementDocuments 
 {
	CodeCatalog: String;
	CodeGroup: String;
	CodeShortText: String;
	CounterReadingDifference: Double;
	CounterReadingValue: Double;
	CustomDuprecOccurred: String;
	DifferenceReading: String;
	EquipmentId: String;
	FunctionalLocation: String;
	HasReadingValue: String;
	IsCounterReading: String;
	LAMObjectType: String;
	LAMTableKey: String;
	key MeasurementDocNum: String;
	NotificationNumber: String;
	OperationObjNum: String;
	OrderObjNum: String;
	OriginIndicator: String;
	Point: String;
	PointObjectKey: String;
	ReadBy: String;
	ReadingAfterAction: String;
	ReadingDate: DateTime;
	ReadingTime: Time;
	ReadingTimestamp: DateTime;
	ReadingValue: Double;
	RecordedUnit: String;
	RecordedValue: String;
	RecordedValueFloat: Double;
	SecondaryIndex: String;
	ShortText: String;
	SortField: String;
	TotalReadingValue: Double;
	UOM: String;
	ValuationCode: String;
	LAMObjectDatum_Nav: Association to many LAMObjectData on LAMObjectDatum_Nav.MeasurementDocNum = $self;
	LongText: Association to many MeasurementDocumentLongTexts on LongText.MeasurementDocNum = $self;
	MeasuringPoint: Association to one MeasuringPoints;
}
entity MeasurementDocuments 
 {
	CodeCatalog: String;
	CodeGroup: String;
	CodeShortText: String;
	CounterReadingDifference: Double;
	CounterReadingValue: Double;
	CustomDuprecOccurred: String;
	DifferenceReading: String;
	EquipmentId: String;
	FunctionalLocation: String;
	HasReadingValue: String;
	IsCounterReading: String;
	LAMObjectType: String;
	LAMTableKey: String;
	key MeasurementDocNum: String;
	NotificationNumber: String;
	OperationObjNum: String;
	OrderObjNum: String;
	OriginIndicator: String;
	Point: String;
	PointObjectKey: String;
	ReadBy: String;
	ReadingAfterAction: String;
	ReadingDate: DateTime;
	ReadingTime: Time;
	ReadingTimestamp: DateTime;
	ReadingValue: Double;
	RecordedUnit: String;
	RecordedValue: String;
	RecordedValueFloat: Double;
	SecondaryIndex: String;
	ShortText: String;
	SortField: String;
	TotalReadingValue: Double;
	UOM: String;
	ValuationCode: String;
	LAMObjectDatum_Nav: Association to many LAMObjectData on LAMObjectDatum_Nav.MeasurementDocNum = $self;
	LongText: Association to many MeasurementDocumentLongTexts on LongText.MeasurementDocNum = $self;
	MeasuringPoint: Association to one MeasuringPoints;
}
entity MeasuringPointTexts 
 {
	ObjectKey: String;
	key Point: String;
	TextId: String;
	TextObjType: String;
	TextString: String;
	MeasuringPoint: Association to one MeasuringPoints;
}
entity MeasuringPointTexts 
 {
	ObjectKey: String;
	key Point: String;
	TextId: String;
	TextObjType: String;
	TextString: String;
	MeasuringPoint: Association to one MeasuringPoints;
}
entity MeasuringPoints 
 {
	AnnualEstimate: Double;
	CatalogType: String;
	CharDescription: String;
	CharId: String;
	CharName: String;
	CharType: String;
	CodeGroup: String;
	CounterOverflow: Double;
	Decimal: Int16;
	DecimalPlaces: Int16;
	DeletionFlag: String;
	DisplayExponent: Int16;
	EquipId: String;
	Exponent: Int16;
	FuncLocIdIntern: String;
	IsAnnualEstimate: String;
	IsCodeSufficient: String;
	IsCounter: String;
	IsCounterOverflow: String;
	IsInactive: String;
	IsLowerRange: String;
	IsNegative: String;
	IsPrevReading: String;
	IsRefMeasurementTransfer: String;
	IsReferenceCharacteristic: String;
	IsReferenceCodeGroup: String;
	IsReferenceMeasuringPoint: String;
	IsReferenceShortText: String;
	IsReferenceTarget: String;
	IsReferenceTransfer: String;
	IsReverse: String;
	IsTransfer: String;
	IsUpperRange: String;
	IsValid: String;
	LAMObjectType: String;
	LAMTableKey: String;
	LocalizationAssembly: String;
	LongTextExists: String;
	LowerRange: Double;
	Mode: String;
	ModifiedBy: String;
	key Point: String;
	PointDesc: String;
	PointObjectKey: String;
	PointType: String;
	Position: String;
	PositionIndicator: String;
	PrevCatalogType: String;
	PrevCodeDescription: String;
	PrevCodeGroup: String;
	PrevCounterReadingDiff: Double;
	PrevCounterValue: Double;
	PrevHasReadingValue: String;
	PrevMeasurementDoc: String;
	PrevReadBy: String;
	PrevReadingDate: DateTime;
	PrevReadingTime: Time;
	PrevReadingValue: Double;
	PrevTotalReadingValue: Double;
	PrevValuationCode: String;
	RangeUOM: String;
	ReferenceMeasuringPoint: String;
	ShortText: String;
	SortField: String;
	Target: Double;
	UoM: String;
	UpperRange: Double;
	ValuationCode: String;
	Equipment: Association to one MyEquipments;
	FunctionalLocation: Association to many MyFunctionalLocations on FunctionalLocation.FuncLocIdIntern = $self;
	LAMObjectDatum_Nav: Association to many LAMObjectData on LAMObjectDatum_Nav.Point = $self;
	LongText: Association to many MeasuringPointTexts on LongText.Point = $self;
	MeasurementDocs: Association to many MeasurementDocuments on MeasurementDocs.Point = $self;
	RoutePoints: Association to many MyRoutePoints on RoutePoints.Point = $self;
	WorkOrderTool: Association to many MyWorkOrderTools on WorkOrderTool.Point = $self;
}
entity MeasuringPoints 
 {
	AnnualEstimate: Double;
	CatalogType: String;
	CharDescription: String;
	CharId: String;
	CharName: String;
	CharType: String;
	CodeGroup: String;
	CounterOverflow: Double;
	Decimal: Int16;
	DecimalPlaces: Int16;
	DeletionFlag: String;
	DisplayExponent: Int16;
	EquipId: String;
	Exponent: Int16;
	FuncLocIdIntern: String;
	IsAnnualEstimate: String;
	IsCodeSufficient: String;
	IsCounter: String;
	IsCounterOverflow: String;
	IsInactive: String;
	IsLowerRange: String;
	IsNegative: String;
	IsPrevReading: String;
	IsRefMeasurementTransfer: String;
	IsReferenceCharacteristic: String;
	IsReferenceCodeGroup: String;
	IsReferenceMeasuringPoint: String;
	IsReferenceShortText: String;
	IsReferenceTarget: String;
	IsReferenceTransfer: String;
	IsReverse: String;
	IsTransfer: String;
	IsUpperRange: String;
	IsValid: String;
	LAMObjectType: String;
	LAMTableKey: String;
	LocalizationAssembly: String;
	LongTextExists: String;
	LowerRange: Double;
	Mode: String;
	ModifiedBy: String;
	key Point: String;
	PointDesc: String;
	PointObjectKey: String;
	PointType: String;
	Position: String;
	PositionIndicator: String;
	PrevCatalogType: String;
	PrevCodeDescription: String;
	PrevCodeGroup: String;
	PrevCounterReadingDiff: Double;
	PrevCounterValue: Double;
	PrevHasReadingValue: String;
	PrevMeasurementDoc: String;
	PrevReadBy: String;
	PrevReadingDate: DateTime;
	PrevReadingTime: Time;
	PrevReadingValue: Double;
	PrevTotalReadingValue: Double;
	PrevValuationCode: String;
	RangeUOM: String;
	ReferenceMeasuringPoint: String;
	ShortText: String;
	SortField: String;
	Target: Double;
	UoM: String;
	UpperRange: Double;
	ValuationCode: String;
	Equipment: Association to one MyEquipments;
	FunctionalLocation: Association to many MyFunctionalLocations on FunctionalLocation.FuncLocIdIntern = $self;
	LAMObjectDatum_Nav: Association to many LAMObjectData on LAMObjectDatum_Nav.Point = $self;
	LongText: Association to many MeasuringPointTexts on LongText.Point = $self;
	MeasurementDocs: Association to many MeasurementDocuments on MeasurementDocs.Point = $self;
	RoutePoints: Association to many MyRoutePoints on RoutePoints.Point = $self;
	WorkOrderTool: Association to many MyWorkOrderTools on WorkOrderTool.Point = $self;
}
entity MeterReaderNotes 
 {
	key NoteID: String;
	NoteText: String;
	ConnObjectMRNotes_Nav: Association to many ConnectionObjectMRNotes on ConnObjectMRNotes_Nav.NoteID = $self;
	DevLocMRNotes_Nav: Association to many DeviceLocationMRNotes on DevLocMRNotes_Nav.NoteID = $self;
}
entity MeterReadingLimits 
 {
	key EquipmentNum: String;
	ErrorMaxLimit: Double;
	ErrorMaxLimitChar: String;
	ErrorMinLimit: Double;
	ErrorMinLimitChar: String;
	key MeterReadingDocID: String;
	MeterReadingLimitDate: DateTime;
	key Register: String;
	WarningMaxLimit: Double;
	WarningMaxLimitChar: String;
	WarningMinLimit: Double;
	WarningMinLimitChar: String;
	MeterReading_Nav: Association to many MeterReadings on MeterReading_Nav.EquipmentNum = $self;
	PeriodicMeterReading_Nav: Association to many PeriodicMeterReadings on PeriodicMeterReading_Nav.Register = $self;
}
entity MeterReadingNotes 
 {
	ControlFollowUpAction: String;
	Description: String;
	key NoteID: String;
	key ProcessType: String;
}
entity MeterReadingReasons 
 {
	Description: String;
	key MeterReadingReason: String;
	TechInstallationFlag: String;
	UploadFlag: String;
	MeterReading_Nav: Association to many MeterReadings on MeterReading_Nav.MeterReadingReason = $self;
}
entity MeterReadingStatuses 
 {
	key MeterReadingStatus: String;
	Text: String;
	MeterReadings_Nav: Association to many MeterReadings on MeterReadings_Nav.MeterReadingStatus = $self;
}
entity MeterReadingTypes 
 {
	Description: String;
	MeterReadingCategory: String;
	key MeterReadingType: String;
	NoResetMRT: String;
}
entity MeterReadingUnits 
 {
	BusinessPartner: String;
	Description: String;
	key MeterReadingUnit: String;
	PersonnelNumber: String;
	PeriodicMeterReading_Nav: Association to many PeriodicMeterReadings on PeriodicMeterReading_Nav.MeterReadingUnit = $self;
	StreetRouteConnObj_Nav: Association to many StreetRouteConnectionObjects on StreetRouteConnObj_Nav.MeterReadingUnit = $self;
	StreetRoute_Nav: Association to many StreetRoutes on StreetRoute_Nav.MeterReadingUnit = $self;
}
entity MeterReadingUnits 
 {
	BusinessPartner: String;
	Description: String;
	key MeterReadingUnit: String;
	PersonnelNumber: String;
	PeriodicMeterReading_Nav: Association to many PeriodicMeterReadings on PeriodicMeterReading_Nav.MeterReadingUnit = $self;
	StreetRouteConnObj_Nav: Association to many StreetRouteConnectionObjects on StreetRouteConnObj_Nav.MeterReadingUnit = $self;
	StreetRoute_Nav: Association to many StreetRoutes on StreetRoute_Nav.MeterReadingUnit = $self;
}
entity MeterReadings 
 {
	ActualMeterReadingDate: DateTime;
	ActualMeterReadingTime: String;
	DateMaxRead: DateTime;
	EquipmentNum: String;
	EstimatedResult: String;
	EstimatedResultFloat: Double;
	MeterReaderNote: String;
	MeterReaderNum: String;
	MeterReadingDate: DateTime;
	key MeterReadingDocID: String;
	MeterReadingReason: String;
	MeterReadingRecorded: Double;
	MeterReadingStatus: String;
	MeterReadingTime: String;
	MeterReadingType: String;
	OrderNum: String;
	PreviousReading: String;
	PreviousReadingDate: DateTime;
	PreviousReadingFloat: Double;
	PreviousReadingStatus: String;
	PreviousReadingTime: String;
	PreviousReadingTimestamp: DateTime;
	Register: String;
	RegisterGroup: String;
	SchedMeterReadingDate: DateTime;
	TimeMaxReading: String;
	DeviceMeterReading_Nav: Association to many DeviceMeterReadings on DeviceMeterReading_Nav.MeterReadingDocID = $self;
	Device_Nav: Association to many Devices on Device_Nav.EquipmentNum = $self;
	MeterReadingReason_Nav: Association to one MeterReadingReasons;
	ReadLimit_Nav: Association to many MeterReadingLimits on ReadLimit_Nav.EquipmentNum = $self;
	RegisterGroup_Nav: Association to one RegisterGroups;
}
entity MobileClientSynchronizationSessions 
 {
	CreatedBy: String;
	SessionBeginTimeStamp: DateTime;
	SessionCloseTimeStamp: DateTime;
	key SessionGUID: String;
	UserGUID: String;
}
entity MobileClientSynchronizationSessions 
 {
	CreatedBy: String;
	SessionBeginTimeStamp: DateTime;
	SessionCloseTimeStamp: DateTime;
	key SessionGUID: String;
	UserGUID: String;
}
entity MobileStatusMappings 
 {
	InitialStatusFlag: Boolean;
	MobileStatus: String;
	MobileStatusLabel: String;
	ObjectType: String;
	key RecordNo: String;
	StatusAttribute1: String;
	StatusAttribute2: String;
	StatusProfile: String;
	SystemStatus: String;
	UserStatus: String;
}
entity MobileStatusMappings 
 {
	InitialStatusFlag: Boolean;
	MobileStatus: String;
	MobileStatusLabel: String;
	ObjectType: String;
	key RecordNo: String;
	StatusAttribute1: String;
	StatusAttribute2: String;
	StatusProfile: String;
	SystemStatus: String;
	UserStatus: String;
}
entity MovementReasons 
 {
	key MovementReason: String;
	MovementReasonText: String;
	key MovementType: String;
}
entity MovementReasons 
 {
	key MovementReason: String;
	MovementReasonText: String;
	key MovementType: String;
}
entity MovementTypeSpecialStocks 
 {
	key Consumption: String;
	key Language: String;
	key MovementInd: String;
	key MovementType: String;
	MovementTypeText: String;
	key ReceiptInd: String;
	key SpecialStock: String;
}
entity MovementTypeTcodes 
 {
	key MovementType: String;
	MovementTypeText: String;
	ProposeMovementType: String;
	key SpecialStockIndicator: String;
	key Tcode: String;
}
entity MovementTypeTcodes 
 {
	key MovementType: String;
	MovementTypeText: String;
	ProposeMovementType: String;
	key SpecialStockIndicator: String;
	key Tcode: String;
}
entity MovementTypeTexts 
 {
	key MovementType: String;
	key SpecialStock: String;
	Text: String;
}
entity MovementTypes 
 {
	key Consumption: String;
	DebitCredit: String;
	key LanguageKey: String;
	key MovementInd: String;
	key MovementType: String;
	MovementTypeDesc: String;
	key ReceiptInd: String;
	RevMvmtTypeInd: String;
	SAMType: String;
	key SpecialStockInd: String;
}
entity MovementTypes 
 {
	key Consumption: String;
	DebitCredit: String;
	key LanguageKey: String;
	key MovementInd: String;
	key MovementType: String;
	MovementTypeDesc: String;
	key ReceiptInd: String;
	RevMvmtTypeInd: String;
	SAMType: String;
	key SpecialStockInd: String;
}
entity MyEquipClassCharValues 
 {
	key CharId: String;
	key CharValCounter: String;
	CharValDesc: String;
	CharValFrom: Double;
	CharValTo: Double;
	CharValue: String;
	key ClassType: String;
	EquipId: String;
	key InternCounter: String;
	key ObjClassFlag: String;
	key ObjectKey: String;
	ValueRel: String;
	CharValCode_Nav: Association to many CharValueCodes on CharValCode_Nav.ValueRel = $self;
	Characteristic: Association to many Characteristics on Characteristic.CharId = $self;
	Equipment: Association to many MyEquipments on Equipment.EquipId = $self;
	LAMCharacteristicValue_Nav: Association to many LAMCharacteristicValues on LAMCharacteristicValue_Nav.ObjClassFlag = $self;
}
entity MyEquipClassCharValues 
 {
	key CharId: String;
	key CharValCounter: String;
	CharValDesc: String;
	CharValFrom: Double;
	CharValTo: Double;
	CharValue: String;
	key ClassType: String;
	EquipId: String;
	key InternCounter: String;
	key ObjClassFlag: String;
	key ObjectKey: String;
	ValueRel: String;
	CharValCode_Nav: Association to many CharValueCodes on CharValCode_Nav.ValueRel = $self;
	Characteristic: Association to many Characteristics on Characteristic.CharId = $self;
	Equipment: Association to many MyEquipments on Equipment.EquipId = $self;
	LAMCharacteristicValue_Nav: Association to many LAMCharacteristicValues on LAMCharacteristicValue_Nav.ObjClassFlag = $self;
}
entity MyEquipClasses 
 {
	ClassId: String;
	key ClassType: String;
	EquipId: String;
	key InternClassNum: String;
	key InternCounter: String;
	key ObjClassFlag: String;
	key ObjectKey: String;
	ClassDefinition: Association to many ClassDefinitions on ClassDefinition.InternClassNum = $self;
	Equipment: Association to many MyEquipments on Equipment.EquipId = $self;
}
entity MyEquipClasses 
 {
	ClassId: String;
	key ClassType: String;
	EquipId: String;
	key InternClassNum: String;
	key InternCounter: String;
	key ObjClassFlag: String;
	key ObjectKey: String;
	ClassDefinition: Association to many ClassDefinitions on ClassDefinition.InternClassNum = $self;
	Equipment: Association to many MyEquipments on Equipment.EquipId = $self;
}
entity MyEquipDocuments 
 {
	DocumentID: String;
	EquipId: String;
	key ObjectKey: String;
	key RelationshipID: String;
	Document: Association to many Documents on Document.DocumentID = $self;
	Equipment: Association to many MyEquipments on Equipment.EquipId = $self;
}
entity MyEquipDocuments 
 {
	DocumentID: String;
	EquipId: String;
	key ObjectKey: String;
	key RelationshipID: String;
	Document: Association to many Documents on Document.DocumentID = $self;
	Equipment: Association to many MyEquipments on Equipment.EquipId = $self;
}
entity MyEquipGeometries 
 {
	EquipId: String;
	key LogicalSystem: String;
	key ObjectGroup: String;
	key ObjectGroup1: String;
	key ObjectKey: String;
	key ObjectType: String;
	SpacialGUId: String;
	SpacialId: String;
	Equip_Nav: Association to many MyEquipments on Equip_Nav.EquipId = $self;
	Geometry: Association to many Geometries on Geometry.ObjectGroup = $self;
}
entity MyEquipGeometries 
 {
	EquipId: String;
	key LogicalSystem: String;
	key ObjectGroup: String;
	key ObjectGroup1: String;
	key ObjectKey: String;
	key ObjectType: String;
	SpacialGUId: String;
	SpacialId: String;
	Equip_Nav: Association to many MyEquipments on Equip_Nav.EquipId = $self;
	Geometry: Association to many Geometries on Geometry.ObjectGroup = $self;
}
entity MyEquipLongTexts 
 {
	key EquipmentNum: String;
	NewTextString: String;
	ObjectKey: String;
	TextId: String;
	TextObjType: String;
	TextString: String;
	Equipment: Association to one MyEquipments;
}
entity MyEquipLongTexts 
 {
	key EquipmentNum: String;
	NewTextString: String;
	ObjectKey: String;
	TextId: String;
	TextObjType: String;
	TextString: String;
	Equipment: Association to one MyEquipments;
}
entity MyEquipObjectStatuses 
 {
	key EquipId: String;
	ObjectKey: String;
	Status: String;
	Equipment_Nav: Association to one MyEquipments;
	SystemStatus_Nav: Association to one SystemStatuses;
}
entity MyEquipObjectStatuses 
 {
	key EquipId: String;
	ObjectKey: String;
	Status: String;
	Equipment_Nav: Association to one MyEquipments;
	SystemStatus_Nav: Association to one SystemStatuses;
}
entity MyEquipPartners 
 {
	AddressNum: String;
	BPNum: String;
	key Counter: String;
	key EquipId: String;
	ObjectCategory: String;
	ObjectNum: String;
	key PartnerFunction: String;
	PartnerNum: String;
	PersonNum: String;
	PersonnelNum: String;
	AddressAtWork_Nav: Association to one AddressesAtWork;
	Address_Nav: Association to one Addresses;
	Employee_Nav: Association to one Employees;
	Equipment: Association to many MyEquipments on Equipment.EquipId = $self;
	PartnerFunction_Nav: Association to one PartnerFunctions;
}
entity MyEquipPartners 
 {
	AddressNum: String;
	BPNum: String;
	key Counter: String;
	key EquipId: String;
	ObjectCategory: String;
	ObjectNum: String;
	key PartnerFunction: String;
	PartnerNum: String;
	PersonNum: String;
	PersonnelNum: String;
	AddressAtWork_Nav: Association to one AddressesAtWork;
	Address_Nav: Association to one Addresses;
	Employee_Nav: Association to one Employees;
	Equipment: Association to many MyEquipments on Equipment.EquipId = $self;
	PartnerFunction_Nav: Association to one PartnerFunctions;
}
entity MyEquipSerialNumbers 
 {
	BatchNumber: String;
	CompanyCode: String;
	Customer: String;
	key EquipId: String;
	Issued: String;
	LastGoodsMvtDate: DateTime;
	LastSerialNumber: String;
	MasterBatchNumber: String;
	MaterialNum: String;
	Plant: String;
	SalesOrder: String;
	SerialNumber: String;
	SpecialStock: String;
	StockType: String;
	StorageLocation: String;
	Vendor: String;
	WBSElement: Int64;
	Equipment: Association to one MyEquipments;
	Material: Association to one Materials;
	MaterialBatch_Nav: Association to many MaterialBatches on MaterialBatch_Nav.BatchNumber = $self;
}
entity MyEquipSerialNumbers 
 {
	BatchNumber: String;
	CompanyCode: String;
	Customer: String;
	key EquipId: String;
	Issued: String;
	LastGoodsMvtDate: DateTime;
	LastSerialNumber: String;
	MasterBatchNumber: String;
	MaterialNum: String;
	Plant: String;
	SalesOrder: String;
	SerialNumber: String;
	SpecialStock: String;
	StockType: String;
	StorageLocation: String;
	Vendor: String;
	WBSElement: Int64;
	Equipment: Association to one MyEquipments;
	Material: Association to one Materials;
	MaterialBatch_Nav: Association to many MaterialBatches on MaterialBatch_Nav.BatchNumber = $self;
}
entity MyEquipSystemStatuses 
 {
	EquipId: String;
	key ObjectNum: String;
	SequencePosition: String;
	SequencePriority: String;
	key Status: String;
	StatusInact: String;
	Equipment_Nav: Association to one MyEquipments;
	SystemStatus_Nav: Association to one SystemStatuses;
}
entity MyEquipSystemStatuses 
 {
	EquipId: String;
	key ObjectNum: String;
	SequencePosition: String;
	SequencePriority: String;
	key Status: String;
	StatusInact: String;
	Equipment_Nav: Association to one MyEquipments;
	SystemStatus_Nav: Association to one SystemStatuses;
}
entity MyEquipUserStatuses 
 {
	EquipId: String;
	key ObjectNum: String;
	SequencePosition: String;
	SequencePriority: String;
	key Status: String;
	StatusInact: String;
	StatusNum: String;
	StatusProfile: String;
	Equipment_Nav: Association to one MyEquipments;
	UserStatus_Nav: Association to one UserStatuses;
}
entity MyEquipUserStatuses 
 {
	EquipId: String;
	key ObjectNum: String;
	SequencePosition: String;
	SequencePriority: String;
	key Status: String;
	StatusInact: String;
	StatusNum: String;
	StatusProfile: String;
	Equipment_Nav: Association to one MyEquipments;
	UserStatus_Nav: Association to one UserStatuses;
}
entity MyEquipWarranties 
 {
	CreateDate: DateTime;
	CreateTime: Time;
	key EquipId: String;
	MasterWarrantyNum: String;
	ObjectNum: String;
	WarrantyDate: DateTime;
	WarrantyDesc: String;
	WarrantyEnd: DateTime;
	key WarrantyType: String;
	WarrantyTypeDesc: String;
	Equipment: Association to many MyEquipments on Equipment.EquipId = $self;
}
entity MyEquipWarranties 
 {
	CreateDate: DateTime;
	CreateTime: Time;
	key EquipId: String;
	MasterWarrantyNum: String;
	ObjectNum: String;
	WarrantyDate: DateTime;
	WarrantyDesc: String;
	WarrantyEnd: DateTime;
	key WarrantyType: String;
	WarrantyTypeDesc: String;
	Equipment: Association to many MyEquipments on Equipment.EquipId = $self;
}
entity MyEquipWarrantyLongTexts 
 {
	key MasterWarrantyNum: String;
	NewTextString: String;
	ObjectKey: String;
	TextId: String;
	TextObjType: String;
	TextString: String;
}
entity MyEquipWarrantyLongTexts 
 {
	key MasterWarrantyNum: String;
	NewTextString: String;
	ObjectKey: String;
	TextId: String;
	TextObjType: String;
	TextString: String;
}
entity MyEquipments 
 {
	AddressNum: String;
	BoMFlag: String;
	BusinessArea: String;
	CRObjectType: String;
	CatalogProfile: String;
	ConfigFlag: String;
	ConstMonth: String;
	ConstYear: String;
	ControllingArea: String;
	CopyClassification: String;
	CopyClassificationValues: String;
	CopyDocuments: String;
	CopyEquipId: String;
	CopyInstallLocation: String;
	CopyMeasuringPoints: String;
	CopyNote: String;
	CopyPartners: String;
	CostCenter: String;
	DismantleDate: DateTime;
	DismantleEquip: String;
	DismantleFuncLocIdIntern: String;
	DismantleTime: Time;
	EquipCategory: String;
	EquipDesc: String;
	EquipFlag: String;
	key EquipId: String;
	EquipType: String;
	FuncLocId: String;
	FuncLocIdIntern: String;
	ISUFlag: String;
	InstallDate: DateTime;
	InstallPosition: String;
	InstallTime: Time;
	InventoryNum: String;
	LAMObjectType: String;
	LAMTableKey: String;
	Language: String;
	Location: String;
	LongTextIndicator: String;
	MaintPlant: String;
	MaintWorkCenter: String;
	ManufCountry: String;
	ManufPartNo: String;
	ManufSerialNo: String;
	Manufacturer: String;
	ModelNum: String;
	ObjAuthGroup: String;
	ObjectNum: String;
	PMObjectType: String;
	PRTFlag: String;
	PlannerGroup: String;
	PlanningPlant: String;
	PlantSection: String;
	PrimaryLanguage: String;
	Room: String;
	SerialNoFlag: String;
	Size: String;
	StartDate: DateTime;
	SuperiorEquip: String;
	UpdateEquip: String;
	ValidDate: DateTime;
	VendorNumber: String;
	Weight: Decimal;
	WorkCenter: String;
	Address: Association to one Addresses;
	AssetCentralIndicators_Nav: Association to many AssetCentralEquipmentIndicators on AssetCentralIndicators_Nav.EquipId = $self;
	AssetCentralObjectLink_Nav: Association to many AssetCentralObjectLinks on AssetCentralObjectLink_Nav.EquipId = $self;
	ChecklistBusObject_Nav: Association to many ChecklistBusObjects on ChecklistBusObject_Nav.EquipId = $self;
	ClassCharValues: Association to many MyEquipClassCharValues on ClassCharValues.EquipId = $self;
	Classes: Association to many MyEquipClasses on Classes.EquipId = $self;
	Device: Association to many Devices on Device.EquipmentNum = $self;
	EquiBOMs_Nav: Association to many EquipmentBOMs on EquiBOMs_Nav.EquipId = $self;
	EquipDocuments: Association to many MyEquipDocuments on EquipDocuments.EquipId = $self;
	EquipGeometries: Association to many MyEquipGeometries on EquipGeometries.EquipId = $self;
	EquipObjectType_Nav: Association to one EquipObjectTypes;
	EquipmentCategory_Nav: Association to one EquipmentCategories;
	EquipmentLongText_Nav: Association to many MyEquipLongTexts on EquipmentLongText_Nav.EquipmentNum = $self;
	FunctionalLocation: Association to many MyFunctionalLocations on FunctionalLocation.FuncLocIdIntern = $self;
	Geometry_Nav: Association to many Geometries on Geometry_Nav.ObjectKey = $self;
	InspectionPoints_Nav: Association to many InspectionPoints on InspectionPoints_Nav.EquipNum = $self;
	LAMObjectDatum_Nav: Association to many LAMObjectData on LAMObjectDatum_Nav.EquipId = $self;
	Location_Nav: Association to one Locations;
	MeasuringPoints: Association to many MeasuringPoints on MeasuringPoints.EquipId = $self;
	NotifHistory_Nav: Association to many NotificationHistories on NotifHistory_Nav.EquipId = $self;
	NotificationHeader: Association to many MyNotificationHeaders on NotificationHeader.HeaderEquipment = $self;
	NotificationItem: Association to many MyNotificationItems on NotificationItem.ItemEquipment = $self;
	ObjectStatus_Nav: Association to one MyEquipObjectStatuses;
	Partners: Association to many MyEquipPartners on Partners.EquipId = $self;
	RelatedWOHistory: Association to many WorkOrderHistories on RelatedWOHistory.Equipment = $self;
	RouteStops: Association to many MyRouteStops on RouteStops.StopLocation = $self;
	RouteTechObjects: Association to many MyTechObjects on RouteTechObjects.Equipment = $self;
	SerialNumber: Association to many MyEquipSerialNumbers on SerialNumber.EquipId = $self;
	SystemStatuses_Nav: Association to many MyEquipSystemStatuses on SystemStatuses_Nav.EquipId = $self;
	UserStatuses_Nav: Association to many MyEquipUserStatuses on UserStatuses_Nav.EquipId = $self;
	WOObjectList_Nav: Association to many MyWorkOrderObjectLists on WOObjectList_Nav.EquipId = $self;
	Warranties: Association to many MyEquipWarranties on Warranties.EquipId = $self;
	WorkCenter_Main_Nav: Association to one WorkCenters;
	WorkCenter_Nav: Association to one WorkCenters;
	WorkOrderHeader: Association to many MyWorkOrderHeaders on WorkOrderHeader.HeaderEquipment = $self;
	WorkOrderOperation: Association to many MyWorkOrderOperations on WorkOrderOperation.OperationEquipment = $self;
	WorkOrderSubOperation: Association to many MyWorkOrderSubOperations on WorkOrderSubOperation.OperationEquipment = $self;
	WorkOrderTool: Association to many MyWorkOrderTools on WorkOrderTool.Equipment = $self;
}
entity MyEquipments 
 {
	AddressNum: String;
	BoMFlag: String;
	BusinessArea: String;
	CRObjectType: String;
	CatalogProfile: String;
	ConfigFlag: String;
	ConstMonth: String;
	ConstYear: String;
	ControllingArea: String;
	CopyClassification: String;
	CopyClassificationValues: String;
	CopyDocuments: String;
	CopyEquipId: String;
	CopyInstallLocation: String;
	CopyMeasuringPoints: String;
	CopyNote: String;
	CopyPartners: String;
	CostCenter: String;
	DismantleDate: DateTime;
	DismantleEquip: String;
	DismantleFuncLocIdIntern: String;
	DismantleTime: Time;
	EquipCategory: String;
	EquipDesc: String;
	EquipFlag: String;
	key EquipId: String;
	EquipType: String;
	FuncLocId: String;
	FuncLocIdIntern: String;
	ISUFlag: String;
	InstallDate: DateTime;
	InstallPosition: String;
	InstallTime: Time;
	InventoryNum: String;
	LAMObjectType: String;
	LAMTableKey: String;
	Language: String;
	Location: String;
	LongTextIndicator: String;
	MaintPlant: String;
	MaintWorkCenter: String;
	ManufCountry: String;
	ManufPartNo: String;
	ManufSerialNo: String;
	Manufacturer: String;
	ModelNum: String;
	ObjAuthGroup: String;
	ObjectNum: String;
	PMObjectType: String;
	PRTFlag: String;
	PlannerGroup: String;
	PlanningPlant: String;
	PlantSection: String;
	PrimaryLanguage: String;
	Room: String;
	SerialNoFlag: String;
	Size: String;
	StartDate: DateTime;
	SuperiorEquip: String;
	UpdateEquip: String;
	ValidDate: DateTime;
	VendorNumber: String;
	Weight: Decimal;
	WorkCenter: String;
	Address: Association to one Addresses;
	AssetCentralIndicators_Nav: Association to many AssetCentralEquipmentIndicators on AssetCentralIndicators_Nav.EquipId = $self;
	AssetCentralObjectLink_Nav: Association to many AssetCentralObjectLinks on AssetCentralObjectLink_Nav.EquipId = $self;
	ChecklistBusObject_Nav: Association to many ChecklistBusObjects on ChecklistBusObject_Nav.EquipId = $self;
	ClassCharValues: Association to many MyEquipClassCharValues on ClassCharValues.EquipId = $self;
	Classes: Association to many MyEquipClasses on Classes.EquipId = $self;
	Device: Association to many Devices on Device.EquipmentNum = $self;
	EquiBOMs_Nav: Association to many EquipmentBOMs on EquiBOMs_Nav.EquipId = $self;
	EquipDocuments: Association to many MyEquipDocuments on EquipDocuments.EquipId = $self;
	EquipGeometries: Association to many MyEquipGeometries on EquipGeometries.EquipId = $self;
	EquipObjectType_Nav: Association to one EquipObjectTypes;
	EquipmentCategory_Nav: Association to one EquipmentCategories;
	EquipmentLongText_Nav: Association to many MyEquipLongTexts on EquipmentLongText_Nav.EquipmentNum = $self;
	FunctionalLocation: Association to many MyFunctionalLocations on FunctionalLocation.FuncLocIdIntern = $self;
	Geometry_Nav: Association to many Geometries on Geometry_Nav.ObjectKey = $self;
	InspectionPoints_Nav: Association to many InspectionPoints on InspectionPoints_Nav.EquipNum = $self;
	LAMObjectDatum_Nav: Association to many LAMObjectData on LAMObjectDatum_Nav.EquipId = $self;
	Location_Nav: Association to one Locations;
	MeasuringPoints: Association to many MeasuringPoints on MeasuringPoints.EquipId = $self;
	NotifHistory_Nav: Association to many NotificationHistories on NotifHistory_Nav.EquipId = $self;
	NotificationHeader: Association to many MyNotificationHeaders on NotificationHeader.HeaderEquipment = $self;
	NotificationItem: Association to many MyNotificationItems on NotificationItem.ItemEquipment = $self;
	ObjectStatus_Nav: Association to one MyEquipObjectStatuses;
	Partners: Association to many MyEquipPartners on Partners.EquipId = $self;
	RelatedWOHistory: Association to many WorkOrderHistories on RelatedWOHistory.Equipment = $self;
	RouteStops: Association to many MyRouteStops on RouteStops.StopLocation = $self;
	RouteTechObjects: Association to many MyTechObjects on RouteTechObjects.Equipment = $self;
	SerialNumber: Association to many MyEquipSerialNumbers on SerialNumber.EquipId = $self;
	SystemStatuses_Nav: Association to many MyEquipSystemStatuses on SystemStatuses_Nav.EquipId = $self;
	UserStatuses_Nav: Association to many MyEquipUserStatuses on UserStatuses_Nav.EquipId = $self;
	WOObjectList_Nav: Association to many MyWorkOrderObjectLists on WOObjectList_Nav.EquipId = $self;
	Warranties: Association to many MyEquipWarranties on Warranties.EquipId = $self;
	WorkCenter_Main_Nav: Association to one WorkCenters;
	WorkCenter_Nav: Association to one WorkCenters;
	WorkOrderHeader: Association to many MyWorkOrderHeaders on WorkOrderHeader.HeaderEquipment = $self;
	WorkOrderOperation: Association to many MyWorkOrderOperations on WorkOrderOperation.OperationEquipment = $self;
	WorkOrderSubOperation: Association to many MyWorkOrderSubOperations on WorkOrderSubOperation.OperationEquipment = $self;
	WorkOrderTool: Association to many MyWorkOrderTools on WorkOrderTool.Equipment = $self;
}
entity MyFuncLocClassCharValues 
 {
	key CharId: String;
	key CharValCounter: String;
	CharValDesc: String;
	CharValFrom: Double;
	CharValTo: Double;
	CharValue: String;
	key ClassType: String;
	FuncLocIdIntern: String;
	key InternCounter: String;
	key ObjClassFlag: String;
	key ObjectKey: String;
	ValueRel: String;
	CharValCode_Nav: Association to many CharValueCodes on CharValCode_Nav.ValueRel = $self;
	Characteristic: Association to many Characteristics on Characteristic.CharId = $self;
	FunctionalLocation: Association to many MyFunctionalLocations on FunctionalLocation.FuncLocIdIntern = $self;
	LAMCharacteristicValue_Nav: Association to many LAMCharacteristicValues on LAMCharacteristicValue_Nav.InternCounter = $self;
}
entity MyFuncLocClassCharValues 
 {
	key CharId: String;
	key CharValCounter: String;
	CharValDesc: String;
	CharValFrom: Double;
	CharValTo: Double;
	CharValue: String;
	key ClassType: String;
	FuncLocIdIntern: String;
	key InternCounter: String;
	key ObjClassFlag: String;
	key ObjectKey: String;
	ValueRel: String;
	CharValCode_Nav: Association to many CharValueCodes on CharValCode_Nav.ValueRel = $self;
	Characteristic: Association to many Characteristics on Characteristic.CharId = $self;
	FunctionalLocation: Association to many MyFunctionalLocations on FunctionalLocation.FuncLocIdIntern = $self;
	LAMCharacteristicValue_Nav: Association to many LAMCharacteristicValues on LAMCharacteristicValue_Nav.InternCounter = $self;
}
entity MyFuncLocClasses 
 {
	ClassId: String;
	key ClassType: String;
	FuncLocIdIntern: String;
	key InternClassNum: String;
	key InternCount: String;
	key ObjClassFlag: String;
	key ObjectKey: String;
	ClassDefinition: Association to many ClassDefinitions on ClassDefinition.InternClassNum = $self;
	FunctionalLocation: Association to many MyFunctionalLocations on FunctionalLocation.FuncLocIdIntern = $self;
}
entity MyFuncLocClasses 
 {
	ClassId: String;
	key ClassType: String;
	FuncLocIdIntern: String;
	key InternClassNum: String;
	key InternCount: String;
	key ObjClassFlag: String;
	key ObjectKey: String;
	ClassDefinition: Association to many ClassDefinitions on ClassDefinition.InternClassNum = $self;
	FunctionalLocation: Association to many MyFunctionalLocations on FunctionalLocation.FuncLocIdIntern = $self;
}
entity MyFuncLocDocuments 
 {
	DocumentID: String;
	FuncLocIdIntern: String;
	key ObjectKey: String;
	key RelationshipID: String;
	Document: Association to many Documents on Document.DocumentID = $self;
	FunctionalLocation: Association to many MyFunctionalLocations on FunctionalLocation.FuncLocIdIntern = $self;
}
entity MyFuncLocDocuments 
 {
	DocumentID: String;
	FuncLocIdIntern: String;
	key ObjectKey: String;
	key RelationshipID: String;
	Document: Association to many Documents on Document.DocumentID = $self;
	FunctionalLocation: Association to many MyFunctionalLocations on FunctionalLocation.FuncLocIdIntern = $self;
}
entity MyFuncLocGeometries 
 {
	FuncLocId: String;
	FuncLocIdIntern: String;
	key LogicalSystem: String;
	key ObjectGroup: String;
	key ObjectGroup1: String;
	key ObjectKey: String;
	key ObjectType: String;
	SpacialGUId: String;
	SpacialId: String;
	FuncLoc_Nav: Association to many MyFunctionalLocations on FuncLoc_Nav.FuncLocIdIntern = $self;
	Geometry: Association to many Geometries on Geometry.ObjectGroup1 = $self;
}
entity MyFuncLocGeometries 
 {
	FuncLocId: String;
	FuncLocIdIntern: String;
	key LogicalSystem: String;
	key ObjectGroup: String;
	key ObjectGroup1: String;
	key ObjectKey: String;
	key ObjectType: String;
	SpacialGUId: String;
	SpacialId: String;
	FuncLoc_Nav: Association to many MyFunctionalLocations on FuncLoc_Nav.FuncLocIdIntern = $self;
	Geometry: Association to many Geometries on Geometry.ObjectGroup1 = $self;
}
entity MyFuncLocLongTexts 
 {
	FuncLocId: String;
	FuncLocIdIntern: String;
	key FuncLocNumber: String;
	NewTextString: String;
	ObjectKey: String;
	TextId: String;
	TextObjType: String;
	TextString: String;
	FunctionalLocation: Association to one MyFunctionalLocations;
}
entity MyFuncLocLongTexts 
 {
	FuncLocId: String;
	FuncLocIdIntern: String;
	key FuncLocNumber: String;
	NewTextString: String;
	ObjectKey: String;
	TextId: String;
	TextObjType: String;
	TextString: String;
	FunctionalLocation: Association to one MyFunctionalLocations;
}
entity MyFuncLocObjectStatuses 
 {
	FuncLocIdIntern: String;
	key ObjectKey: String;
	Status: String;
	FunctionalLocation_Nav: Association to one MyFunctionalLocations;
	SystemStatus_Nav: Association to one SystemStatuses;
}
entity MyFuncLocObjectStatuses 
 {
	FuncLocIdIntern: String;
	key ObjectKey: String;
	Status: String;
	FunctionalLocation_Nav: Association to one MyFunctionalLocations;
	SystemStatus_Nav: Association to one SystemStatuses;
}
entity MyFuncLocPartners 
 {
	AddressNum: String;
	BPNum: String;
	key Counter: String;
	key FuncLocIdIntern: String;
	ObjectCategory: String;
	ObjectNum: String;
	key PartnerFunction: String;
	PartnerNum: String;
	PersonNum: String;
	PersonnelNum: String;
	AddressAtWork_Nav: Association to one AddressesAtWork;
	Address_Nav: Association to one Addresses;
	Employee_Nav: Association to one Employees;
	FunctionalLocation: Association to many MyFunctionalLocations on FunctionalLocation.FuncLocIdIntern = $self;
	PartnerFunction_Nav: Association to one PartnerFunctions;
}
entity MyFuncLocPartners 
 {
	AddressNum: String;
	BPNum: String;
	key Counter: String;
	key FuncLocIdIntern: String;
	ObjectCategory: String;
	ObjectNum: String;
	key PartnerFunction: String;
	PartnerNum: String;
	PersonNum: String;
	PersonnelNum: String;
	AddressAtWork_Nav: Association to one AddressesAtWork;
	Address_Nav: Association to one Addresses;
	Employee_Nav: Association to one Employees;
	FunctionalLocation: Association to many MyFunctionalLocations on FunctionalLocation.FuncLocIdIntern = $self;
	PartnerFunction_Nav: Association to one PartnerFunctions;
}
entity MyFuncLocSystemStatuses 
 {
	FuncLocIdIntern: String;
	key ObjectNum: String;
	SequencePosition: String;
	SequencePriority: String;
	key Status: String;
	StatusInact: String;
	FunctionalLocation_Nav: Association to one MyFunctionalLocations;
	SystemStatus_Nav: Association to one SystemStatuses;
}
entity MyFuncLocSystemStatuses 
 {
	FuncLocIdIntern: String;
	key ObjectNum: String;
	SequencePosition: String;
	SequencePriority: String;
	key Status: String;
	StatusInact: String;
	FunctionalLocation_Nav: Association to one MyFunctionalLocations;
	SystemStatus_Nav: Association to one SystemStatuses;
}
entity MyFuncLocUserStatuses 
 {
	FuncLocIdIntern: String;
	key ObjectNum: String;
	SequencePosition: String;
	SequencePriority: String;
	key Status: String;
	StatusInact: String;
	StatusNum: String;
	StatusProfile: String;
	FunctionalLocation_Nav: Association to one MyFunctionalLocations;
	UserStatus_Nav: Association to one UserStatuses;
}
entity MyFuncLocUserStatuses 
 {
	FuncLocIdIntern: String;
	key ObjectNum: String;
	SequencePosition: String;
	SequencePriority: String;
	key Status: String;
	StatusInact: String;
	StatusNum: String;
	StatusProfile: String;
	FunctionalLocation_Nav: Association to one MyFunctionalLocations;
	UserStatus_Nav: Association to one UserStatuses;
}
entity MyFunctionalLocations 
 {
	AddressNum: String;
	AuthorizationGroup: String;
	BoMFlag: String;
	BusinessArea: String;
	CRObjectType: String;
	CatalogProfile: String;
	CompanyCode: String;
	ConstMonth: String;
	ConstYear: String;
	ControllingArea: String;
	CopyClassification: String;
	CopyDocuments: String;
	CopyFuncLocIdIntern: String;
	CopyMeasuringPoints: String;
	CopyNote: String;
	CopyPartners: String;
	EquipAllowed: String;
	EquipType: String;
	FuncLocDesc: String;
	FuncLocId: String;
	key FuncLocIdIntern: String;
	FuncLocLabel: String;
	FuncLocStructInd: String;
	FuncLocType: String;
	InventoryNumber: String;
	LAMObjectType: String;
	LAMTableKey: String;
	LocAssignment: String;
	Location: String;
	LongTextIndicator: String;
	MaintPlant: String;
	MaintWorkCenter: String;
	Manufacturer: String;
	MasterLanguage: String;
	ModelNumber: String;
	ObjectNum: String;
	PMObjectType: String;
	PartNumber: String;
	PlanningPlant: String;
	RefFuncLocIdIntern: String;
	Room: String;
	Section: String;
	SerialNumber: String;
	SingleInstall: String;
	StartDate: DateTime;
	SuperiorFuncLoc: String;
	SuperiorFuncLocInternId: String;
	WorkCenter: String;
	Address: Association to one Addresses;
	AssetCentralObjectLink_Nav: Association to many AssetCentralObjectLinks on AssetCentralObjectLink_Nav.FuncLocIdIntern = $self;
	ChecklistBusObject_Nav: Association to many ChecklistBusObjects on ChecklistBusObject_Nav.FuncLocIdIntern = $self;
	ClassCharValues: Association to many MyFuncLocClassCharValues on ClassCharValues.FuncLocIdIntern = $self;
	Classes: Association to many MyFuncLocClasses on Classes.FuncLocIdIntern = $self;
	ConnectionObject: Association to many ConnectionObjects on ConnectionObject.ConnectionObject = $self;
	DeviceLocation: Association to many DeviceLocations on DeviceLocation.DeviceLocation = $self;
	Equipments: Association to many MyEquipments on Equipments.FuncLocIdIntern = $self;
	FLocBOMs_Nav: Association to many FunctionalLocationBOMs on FLocBOMs_Nav.FuncLocIdIntern = $self;
	FuncLocCategory_Nav: Association to one FuncLocCategories;
	FuncLocDocuments: Association to many MyFuncLocDocuments on FuncLocDocuments.FuncLocIdIntern = $self;
	FuncLocGeometries: Association to many MyFuncLocGeometries on FuncLocGeometries.FuncLocIdIntern = $self;
	FuncLocLongText_Nav: Association to many MyFuncLocLongTexts on FuncLocLongText_Nav.FuncLocIdIntern = $self;
	Geometry_Nav: Association to many Geometries on Geometry_Nav.ObjectKey = $self;
	InspectionPoints_Nav: Association to many InspectionPoints on InspectionPoints_Nav.FuncLocIntern = $self;
	LAMObjectDatum_Nav: Association to many LAMObjectData on LAMObjectDatum_Nav.FuncLocIdIntern = $self;
	Location_Nav: Association to one Locations;
	MeasuringPoints: Association to many MeasuringPoints on MeasuringPoints.FuncLocIdIntern = $self;
	NotifHistory_Nav: Association to many NotificationHistories on NotifHistory_Nav.FuncLocIdIntern = $self;
	NotificationHeader: Association to many MyNotificationHeaders on NotificationHeader.HeaderFunctionLocation = $self;
	NotificationItem: Association to many MyNotificationItems on NotificationItem.ItemFunctionLocation = $self;
	ObjectStatus_Nav: Association to many MyFuncLocObjectStatuses on ObjectStatus_Nav.FuncLocIdIntern = $self;
	Partners: Association to many MyFuncLocPartners on Partners.FuncLocIdIntern = $self;
	RelatedWOHistory: Association to many WorkOrderHistories on RelatedWOHistory.FunctionalLocation = $self;
	RouteStops: Association to many MyRouteStops on RouteStops.StopLocation = $self;
	RouteTechObjects: Association to many MyTechObjects on RouteTechObjects.FuncLocID = $self;
	SystemStatuses_Nav: Association to many MyFuncLocSystemStatuses on SystemStatuses_Nav.FuncLocIdIntern = $self;
	UserStatuses_Nav: Association to many MyFuncLocUserStatuses on UserStatuses_Nav.FuncLocIdIntern = $self;
	WOObjectList_Nav: Association to many MyWorkOrderObjectLists on WOObjectList_Nav.FuncLocIdIntern = $self;
	WorkCenter_Main_Nav: Association to one WorkCenters;
	WorkCenter_Nav: Association to one WorkCenters;
	WorkOrderHeader: Association to many MyWorkOrderHeaders on WorkOrderHeader.HeaderFunctionLocation = $self;
	WorkOrderOperation: Association to many MyWorkOrderOperations on WorkOrderOperation.OperationFunctionLocation = $self;
	WorkOrderSubOperation: Association to many MyWorkOrderSubOperations on WorkOrderSubOperation.OperationFunctionLocation = $self;
}
entity MyFunctionalLocations 
 {
	AddressNum: String;
	AuthorizationGroup: String;
	BoMFlag: String;
	BusinessArea: String;
	CRObjectType: String;
	CatalogProfile: String;
	CompanyCode: String;
	ConstMonth: String;
	ConstYear: String;
	ControllingArea: String;
	CopyClassification: String;
	CopyDocuments: String;
	CopyFuncLocIdIntern: String;
	CopyMeasuringPoints: String;
	CopyNote: String;
	CopyPartners: String;
	EquipAllowed: String;
	EquipType: String;
	FuncLocDesc: String;
	FuncLocId: String;
	key FuncLocIdIntern: String;
	FuncLocLabel: String;
	FuncLocStructInd: String;
	FuncLocType: String;
	InventoryNumber: String;
	LAMObjectType: String;
	LAMTableKey: String;
	LocAssignment: String;
	Location: String;
	LongTextIndicator: String;
	MaintPlant: String;
	MaintWorkCenter: String;
	Manufacturer: String;
	MasterLanguage: String;
	ModelNumber: String;
	ObjectNum: String;
	PMObjectType: String;
	PartNumber: String;
	PlanningPlant: String;
	RefFuncLocIdIntern: String;
	Room: String;
	Section: String;
	SerialNumber: String;
	SingleInstall: String;
	StartDate: DateTime;
	SuperiorFuncLoc: String;
	SuperiorFuncLocInternId: String;
	WorkCenter: String;
	Address: Association to one Addresses;
	AssetCentralObjectLink_Nav: Association to many AssetCentralObjectLinks on AssetCentralObjectLink_Nav.FuncLocIdIntern = $self;
	ChecklistBusObject_Nav: Association to many ChecklistBusObjects on ChecklistBusObject_Nav.FuncLocIdIntern = $self;
	ClassCharValues: Association to many MyFuncLocClassCharValues on ClassCharValues.FuncLocIdIntern = $self;
	Classes: Association to many MyFuncLocClasses on Classes.FuncLocIdIntern = $self;
	ConnectionObject: Association to many ConnectionObjects on ConnectionObject.ConnectionObject = $self;
	DeviceLocation: Association to many DeviceLocations on DeviceLocation.DeviceLocation = $self;
	Equipments: Association to many MyEquipments on Equipments.FuncLocIdIntern = $self;
	FLocBOMs_Nav: Association to many FunctionalLocationBOMs on FLocBOMs_Nav.FuncLocIdIntern = $self;
	FuncLocCategory_Nav: Association to one FuncLocCategories;
	FuncLocDocuments: Association to many MyFuncLocDocuments on FuncLocDocuments.FuncLocIdIntern = $self;
	FuncLocGeometries: Association to many MyFuncLocGeometries on FuncLocGeometries.FuncLocIdIntern = $self;
	FuncLocLongText_Nav: Association to many MyFuncLocLongTexts on FuncLocLongText_Nav.FuncLocIdIntern = $self;
	Geometry_Nav: Association to many Geometries on Geometry_Nav.ObjectKey = $self;
	InspectionPoints_Nav: Association to many InspectionPoints on InspectionPoints_Nav.FuncLocIntern = $self;
	LAMObjectDatum_Nav: Association to many LAMObjectData on LAMObjectDatum_Nav.FuncLocIdIntern = $self;
	Location_Nav: Association to one Locations;
	MeasuringPoints: Association to many MeasuringPoints on MeasuringPoints.FuncLocIdIntern = $self;
	NotifHistory_Nav: Association to many NotificationHistories on NotifHistory_Nav.FuncLocIdIntern = $self;
	NotificationHeader: Association to many MyNotificationHeaders on NotificationHeader.HeaderFunctionLocation = $self;
	NotificationItem: Association to many MyNotificationItems on NotificationItem.ItemFunctionLocation = $self;
	ObjectStatus_Nav: Association to many MyFuncLocObjectStatuses on ObjectStatus_Nav.FuncLocIdIntern = $self;
	Partners: Association to many MyFuncLocPartners on Partners.FuncLocIdIntern = $self;
	RelatedWOHistory: Association to many WorkOrderHistories on RelatedWOHistory.FunctionalLocation = $self;
	RouteStops: Association to many MyRouteStops on RouteStops.StopLocation = $self;
	RouteTechObjects: Association to many MyTechObjects on RouteTechObjects.FuncLocID = $self;
	SystemStatuses_Nav: Association to many MyFuncLocSystemStatuses on SystemStatuses_Nav.FuncLocIdIntern = $self;
	UserStatuses_Nav: Association to many MyFuncLocUserStatuses on UserStatuses_Nav.FuncLocIdIntern = $self;
	WOObjectList_Nav: Association to many MyWorkOrderObjectLists on WOObjectList_Nav.FuncLocIdIntern = $self;
	WorkCenter_Main_Nav: Association to one WorkCenters;
	WorkCenter_Nav: Association to one WorkCenters;
	WorkOrderHeader: Association to many MyWorkOrderHeaders on WorkOrderHeader.HeaderFunctionLocation = $self;
	WorkOrderOperation: Association to many MyWorkOrderOperations on WorkOrderOperation.OperationFunctionLocation = $self;
	WorkOrderSubOperation: Association to many MyWorkOrderSubOperations on WorkOrderSubOperation.OperationFunctionLocation = $self;
}
entity MyInventoryObjects 
 {
	key IMObject: String;
	ItemCount: String;
	ObjectDate: DateTime;
	key ObjectId: String;
	ObjectIdExtn: String;
	ObjectType: String;
	InboundDelivery_Nav: Association to many InboundDeliveries on InboundDelivery_Nav.ObjectId = $self;
	OutboundDelivery_Nav: Association to many OutboundDeliveries on OutboundDelivery_Nav.ObjectId = $self;
	PhysicalInventoryDocHeader_Nav: Association to many PhysicalInventoryDocHeaders on PhysicalInventoryDocHeader_Nav.ObjectIdExtn = $self;
	PurchaseOrderHeader_Nav: Association to many PurchaseOrderHeaders on PurchaseOrderHeader_Nav.ObjectId = $self;
	ReservationHeader_Nav: Association to many ReservationHeaders on ReservationHeader_Nav.ObjectId = $self;
	StockTransportOrderHeader_Nav: Association to many StockTransportOrderHeaders on StockTransportOrderHeader_Nav.ObjectId = $self;
}
entity MyInventoryObjects 
 {
	key IMObject: String;
	ItemCount: String;
	ObjectDate: DateTime;
	key ObjectId: String;
	ObjectIdExtn: String;
	ObjectType: String;
	InboundDelivery_Nav: Association to many InboundDeliveries on InboundDelivery_Nav.ObjectId = $self;
	OutboundDelivery_Nav: Association to many OutboundDeliveries on OutboundDelivery_Nav.ObjectId = $self;
	PhysicalInventoryDocHeader_Nav: Association to many PhysicalInventoryDocHeaders on PhysicalInventoryDocHeader_Nav.ObjectIdExtn = $self;
	PurchaseOrderHeader_Nav: Association to many PurchaseOrderHeaders on PurchaseOrderHeader_Nav.ObjectId = $self;
	ReservationHeader_Nav: Association to many ReservationHeaders on ReservationHeader_Nav.ObjectId = $self;
	StockTransportOrderHeader_Nav: Association to many StockTransportOrderHeaders on StockTransportOrderHeader_Nav.ObjectId = $self;
}
entity MyNotifActivityLongTexts 
 {
	key ActivitySequenceNumber: String;
	NewTextString: String;
	key NotificationNumber: String;
	ObjectKey: String;
	TextId: String;
	TextObjType: String;
	TextString: String;
	NotificationActivity: Association to one MyNotificationActivities;
}
entity MyNotifActivityLongTexts 
 {
	key ActivitySequenceNumber: String;
	NewTextString: String;
	key NotificationNumber: String;
	ObjectKey: String;
	TextId: String;
	TextObjType: String;
	TextString: String;
	NotificationActivity: Association to one MyNotificationActivities;
}
entity MyNotifDocuments 
 {
	DocumentID: String;
	NotificationNumber: String;
	key ObjectKey: String;
	key RelationshipID: String;
	Document: Association to many Documents on Document.DocumentID = $self;
	NotifHeader: Association to many MyNotificationHeaders on NotifHeader.NotificationNumber = $self;
}
entity MyNotifDocuments 
 {
	DocumentID: String;
	NotificationNumber: String;
	key ObjectKey: String;
	key RelationshipID: String;
	Document: Association to many Documents on Document.DocumentID = $self;
	NotifHeader: Association to many MyNotificationHeaders on NotifHeader.NotificationNumber = $self;
}
entity MyNotifGeometries 
 {
	key LogicalSystem: String;
	NotificationNumber: String;
	key ObjectGroup: String;
	key ObjectGroup1: String;
	key ObjectKey: String;
	key ObjectType: String;
	SpacialGUId: String;
	SpacialId: String;
	Geometry: Association to many Geometries on Geometry.SpacialGUId = $self;
	NotifHeader: Association to many MyNotificationHeaders on NotifHeader.NotificationNumber = $self;
}
entity MyNotifGeometries 
 {
	key LogicalSystem: String;
	NotificationNumber: String;
	key ObjectGroup: String;
	key ObjectGroup1: String;
	key ObjectKey: String;
	key ObjectType: String;
	SpacialGUId: String;
	SpacialId: String;
	Geometry: Association to many Geometries on Geometry.SpacialGUId = $self;
	NotifHeader: Association to many MyNotificationHeaders on NotifHeader.NotificationNumber = $self;
}
entity MyNotifHeaderLongTexts 
 {
	NewTextString: String;
	key NotificationNumber: String;
	ObjectKey: String;
	TextId: String;
	TextObjType: String;
	TextString: String;
	Notification: Association to one MyNotificationHeaders;
}
entity MyNotifHeaderLongTexts 
 {
	NewTextString: String;
	key NotificationNumber: String;
	ObjectKey: String;
	TextId: String;
	TextObjType: String;
	TextString: String;
	Notification: Association to one MyNotificationHeaders;
}
entity MyNotifItemActivityLongTexts 
 {
	key ActivitySequenceNumber: String;
	key ItemNumber: String;
	NewTextString: String;
	key NotificationNumber: String;
	ObjectKey: String;
	TextId: String;
	TextObjType: String;
	TextString: String;
	NotificationItemActivity: Association to one MyNotificationItemActivities;
}
entity MyNotifItemActivityLongTexts 
 {
	key ActivitySequenceNumber: String;
	key ItemNumber: String;
	NewTextString: String;
	key NotificationNumber: String;
	ObjectKey: String;
	TextId: String;
	TextObjType: String;
	TextString: String;
	NotificationItemActivity: Association to one MyNotificationItemActivities;
}
entity MyNotifItemCauseLongTexts 
 {
	key CauseSequenceNumber: String;
	key ItemNumber: String;
	NewTextString: String;
	key NotificationNumber: String;
	ObjectKey: String;
	TextId: String;
	TextObjType: String;
	TextString: String;
	NotificationItemCause: Association to one MyNotificationItemCauses;
}
entity MyNotifItemCauseLongTexts 
 {
	key CauseSequenceNumber: String;
	key ItemNumber: String;
	NewTextString: String;
	key NotificationNumber: String;
	ObjectKey: String;
	TextId: String;
	TextObjType: String;
	TextString: String;
	NotificationItemCause: Association to one MyNotificationItemCauses;
}
entity MyNotifItemLongTexts 
 {
	key ItemNumber: String;
	NewTextString: String;
	key NotificationNumber: String;
	ObjectKey: String;
	TextId: String;
	TextObjType: String;
	TextString: String;
	NotificationItem: Association to one MyNotificationItems;
}
entity MyNotifItemLongTexts 
 {
	key ItemNumber: String;
	NewTextString: String;
	key NotificationNumber: String;
	ObjectKey: String;
	TextId: String;
	TextObjType: String;
	TextString: String;
	NotificationItem: Association to one MyNotificationItems;
}
entity MyNotifItemTaskLongTexts 
 {
	key ItemNumber: String;
	NewTextString: String;
	key NotificationNumber: String;
	ObjectKey: String;
	key TaskSequenceNumber: String;
	TextId: String;
	TextObjType: String;
	TextString: String;
	NotificationItemTask: Association to one MyNotificationItemTasks;
}
entity MyNotifItemTaskLongTexts 
 {
	key ItemNumber: String;
	NewTextString: String;
	key NotificationNumber: String;
	ObjectKey: String;
	key TaskSequenceNumber: String;
	TextId: String;
	TextObjType: String;
	TextString: String;
	NotificationItemTask: Association to one MyNotificationItemTasks;
}
entity MyNotifTaskLongTexts 
 {
	NewTextString: String;
	key NotificationNumber: String;
	ObjectKey: String;
	key TaskSequenceNumber: String;
	TextId: String;
	TextObjType: String;
	TextString: String;
	NotificationTask: Association to one MyNotificationTasks;
}
entity MyNotifTaskLongTexts 
 {
	NewTextString: String;
	key NotificationNumber: String;
	ObjectKey: String;
	key TaskSequenceNumber: String;
	TextId: String;
	TextObjType: String;
	TextString: String;
	NotificationTask: Association to one MyNotificationTasks;
}
entity MyNotificationActivities 
 {
	ActivityCatalogType: String;
	ActivityCode: String;
	ActivityCodeGroup: String;
	key ActivitySequenceNumber: String;
	ActivitySortNumber: String;
	ActivityText: String;
	ChangedBy: String;
	ChangedDate: DateTime;
	ChangedTime: Time;
	CreatedBy: String;
	CreationDate: DateTime;
	CreationTime: Time;
	Deleted: String;
	Language: String;
	LongTextFlag: String;
	key NotificationNumber: String;
	PlannedFinishDate: DateTime;
	PlannedFinishTime: Time;
	PlannedStartDate: DateTime;
	PlannedStartTime: Time;
	QuantityFactor: String;
	Version: String;
	ActivityLongText: Association to many MyNotifActivityLongTexts on ActivityLongText.ActivitySequenceNumber = $self;
	Notification: Association to one MyNotificationHeaders;
}
entity MyNotificationActivities 
 {
	ActivityCatalogType: String;
	ActivityCode: String;
	ActivityCodeGroup: String;
	key ActivitySequenceNumber: String;
	ActivitySortNumber: String;
	ActivityText: String;
	ChangedBy: String;
	ChangedDate: DateTime;
	ChangedTime: Time;
	CreatedBy: String;
	CreationDate: DateTime;
	CreationTime: Time;
	Deleted: String;
	Language: String;
	LongTextFlag: String;
	key NotificationNumber: String;
	PlannedFinishDate: DateTime;
	PlannedFinishTime: Time;
	PlannedStartDate: DateTime;
	PlannedStartTime: Time;
	QuantityFactor: String;
	Version: String;
	ActivityLongText: Association to many MyNotifActivityLongTexts on ActivityLongText.ActivitySequenceNumber = $self;
	Notification: Association to one MyNotificationHeaders;
}
entity MyNotificationHeaders 
 {
	AddressNum: String;
	Assembly: String;
	BreakdownIndicator: Boolean;
	BusinessArea: String;
	ControllingArea: String;
	CreationDate: DateTime;
	CreationTime: Time;
	DateForCompletion: DateTime;
	DetectionCatalog: String;
	DetectionCode: String;
	DetectionCodeGroup: String;
	Effect: String;
	ExternalWorkCenterId: String;
	HeaderEquipment: String;
	HeaderFunctionLocation: String;
	InspectionLot: String;
	LAMObjectType: String;
	LAMTableKey: String;
	LastChangeTime: Time;
	MainWorkCenter: String;
	MainWorkCenterPlant: String;
	MaintenancePlant: String;
	MalfunctionEndDate: DateTime;
	MalfunctionEndTime: Time;
	MalfunctionStartDate: DateTime;
	MalfunctionStartTime: Time;
	NotificationDescription: String;
	key NotificationNumber: String;
	NotificationType: String;
	ObjectKey: String;
	ObjectNumber: String;
	OrderCurrency: String;
	OrderId: String;
	Phase: String;
	PlanningGroup: String;
	PlanningPlant: String;
	Priority: String;
	PriorityType: String;
	QMCatalog: String;
	QMCode: String;
	QMCodeGroup: String;
	RefObjectKey: String;
	RefObjectType: String;
	ReportedBy: String;
	RequiredEndDate: DateTime;
	RequiredStartDate: DateTime;
	SortField: String;
	Subphase: String;
	Activities: Association to many MyNotificationActivities on Activities.NotificationNumber = $self;
	Address: Association to one Addresses;
	Assembly_Nav: Association to many Materials on Assembly_Nav.Assembly = $self;
	DetectionCode_Nav: Association to many DetectionCodes on DetectionCode_Nav.DetectionCodeGroup = $self;
	DetectionGroup_Nav: Association to many DetectionGroups on DetectionGroup_Nav.DetectionCodeGroup = $self;
	Equipment: Association to many MyEquipments on Equipment.HeaderEquipment = $self;
	FunctionalLocation: Association to many MyFunctionalLocations on FunctionalLocation.HeaderFunctionLocation = $self;
	Geometry_Nav: Association to many Geometries on Geometry_Nav.ObjectKey = $self;
	HeaderLongText: Association to many MyNotifHeaderLongTexts on HeaderLongText.NotificationNumber = $self;
	InspectionLot_Nav: Association to many InspectionLots on InspectionLot_Nav.InspectionLot = $self;
	Items: Association to many MyNotificationItems on Items.NotificationNumber = $self;
	LAMObjectDatum_Nav: Association to many LAMObjectData on LAMObjectDatum_Nav.NotificationNumber = $self;
	NotifDocuments: Association to many MyNotifDocuments on NotifDocuments.NotificationNumber = $self;
	NotifGeometries: Association to many MyNotifGeometries on NotifGeometries.NotificationNumber = $self;
	NotifHistory_Nav: Association to many NotificationHistories on NotifHistory_Nav.NotificationNumber = $self;
	NotifMobileStatus_Nav: Association to many PMMobileStatuses on NotifMobileStatus_Nav.SortField = $self;
	NotifPriority: Association to many Priorities on NotifPriority.Priority = $self;
	Partners: Association to many MyNotificationPartners on Partners.NotificationNumber = $self;
	RelatedWO_Nav: Association to many WorkOrderHistories on RelatedWO_Nav.NotifNum = $self;
	Sales_Nav: Association to many MyNotificationSales on Sales_Nav.NotificationNumber = $self;
	Tasks: Association to many MyNotificationTasks on Tasks.NotificationNumber = $self;
	WOHeader_Nav: Association to many MyWorkOrderHeaders on WOHeader_Nav.OrderId = $self;
	WOObjectList_Nav: Association to many MyWorkOrderObjectLists on WOObjectList_Nav.NotifNum = $self;
	WOOperation_Nav: Association to many MyWorkOrderOperations on WOOperation_Nav.NotifNum = $self;
	WOSubOperation_Nav: Association to many MyWorkOrderSubOperations on WOSubOperation_Nav.NotifNum = $self;
	WorkOrder: Association to many MyWorkOrderHeaders on WorkOrder.NotificationNumber = $self;
	WorkRequestConsequence_Nav: Association to many WorkRequestConsequences on WorkRequestConsequence_Nav.Notification = $self;
}
entity MyNotificationHeaders 
 {
	AddressNum: String;
	Assembly: String;
	BreakdownIndicator: Boolean;
	BusinessArea: String;
	ControllingArea: String;
	CreationDate: DateTime;
	CreationTime: Time;
	DateForCompletion: DateTime;
	DetectionCatalog: String;
	DetectionCode: String;
	DetectionCodeGroup: String;
	Effect: String;
	ExternalWorkCenterId: String;
	HeaderEquipment: String;
	HeaderFunctionLocation: String;
	InspectionLot: String;
	LAMObjectType: String;
	LAMTableKey: String;
	LastChangeTime: Time;
	MainWorkCenter: String;
	MainWorkCenterPlant: String;
	MaintenancePlant: String;
	MalfunctionEndDate: DateTime;
	MalfunctionEndTime: Time;
	MalfunctionStartDate: DateTime;
	MalfunctionStartTime: Time;
	NotificationDescription: String;
	key NotificationNumber: String;
	NotificationType: String;
	ObjectKey: String;
	ObjectNumber: String;
	OrderCurrency: String;
	OrderId: String;
	Phase: String;
	PlanningGroup: String;
	PlanningPlant: String;
	Priority: String;
	PriorityType: String;
	QMCatalog: String;
	QMCode: String;
	QMCodeGroup: String;
	RefObjectKey: String;
	RefObjectType: String;
	ReportedBy: String;
	RequiredEndDate: DateTime;
	RequiredStartDate: DateTime;
	SortField: String;
	Subphase: String;
	Activities: Association to many MyNotificationActivities on Activities.NotificationNumber = $self;
	Address: Association to one Addresses;
	Assembly_Nav: Association to many Materials on Assembly_Nav.Assembly = $self;
	DetectionCode_Nav: Association to many DetectionCodes on DetectionCode_Nav.DetectionCodeGroup = $self;
	DetectionGroup_Nav: Association to many DetectionGroups on DetectionGroup_Nav.DetectionCodeGroup = $self;
	Equipment: Association to many MyEquipments on Equipment.HeaderEquipment = $self;
	FunctionalLocation: Association to many MyFunctionalLocations on FunctionalLocation.HeaderFunctionLocation = $self;
	Geometry_Nav: Association to many Geometries on Geometry_Nav.ObjectKey = $self;
	HeaderLongText: Association to many MyNotifHeaderLongTexts on HeaderLongText.NotificationNumber = $self;
	InspectionLot_Nav: Association to many InspectionLots on InspectionLot_Nav.InspectionLot = $self;
	Items: Association to many MyNotificationItems on Items.NotificationNumber = $self;
	LAMObjectDatum_Nav: Association to many LAMObjectData on LAMObjectDatum_Nav.NotificationNumber = $self;
	NotifDocuments: Association to many MyNotifDocuments on NotifDocuments.NotificationNumber = $self;
	NotifGeometries: Association to many MyNotifGeometries on NotifGeometries.NotificationNumber = $self;
	NotifHistory_Nav: Association to many NotificationHistories on NotifHistory_Nav.NotificationNumber = $self;
	NotifMobileStatus_Nav: Association to many PMMobileStatuses on NotifMobileStatus_Nav.SortField = $self;
	NotifPriority: Association to many Priorities on NotifPriority.Priority = $self;
	Partners: Association to many MyNotificationPartners on Partners.NotificationNumber = $self;
	RelatedWO_Nav: Association to many WorkOrderHistories on RelatedWO_Nav.NotifNum = $self;
	Sales_Nav: Association to many MyNotificationSales on Sales_Nav.NotificationNumber = $self;
	Tasks: Association to many MyNotificationTasks on Tasks.NotificationNumber = $self;
	WOHeader_Nav: Association to many MyWorkOrderHeaders on WOHeader_Nav.OrderId = $self;
	WOObjectList_Nav: Association to many MyWorkOrderObjectLists on WOObjectList_Nav.NotifNum = $self;
	WOOperation_Nav: Association to many MyWorkOrderOperations on WOOperation_Nav.NotifNum = $self;
	WOSubOperation_Nav: Association to many MyWorkOrderSubOperations on WOSubOperation_Nav.NotifNum = $self;
	WorkOrder: Association to many MyWorkOrderHeaders on WorkOrder.NotificationNumber = $self;
	WorkRequestConsequence_Nav: Association to many WorkRequestConsequences on WorkRequestConsequence_Nav.Notification = $self;
}
entity MyNotificationItemActivities 
 {
	ActivityCatalogType: String;
	ActivityCode: String;
	ActivityCodeGroup: String;
	key ActivitySequenceNumber: String;
	ActivitySortNumber: String;
	ActivityText: String;
	CauseSequenceNumber: String;
	ChangedBy: String;
	ChangedDate: DateTime;
	ChangedTime: Time;
	CreatedBy: String;
	CreationDate: DateTime;
	CreationTime: Time;
	Deleted: String;
	key ItemNumber: String;
	ItemSortNumber: String;
	Language: String;
	LongTextFlag: String;
	key NotificationNumber: String;
	PlannedFinishDate: DateTime;
	PlannedFinishTime: Time;
	PlannedStartDate: DateTime;
	PlannedStartTime: Time;
	QuantityFactor: String;
	Version: String;
	Item: Association to one MyNotificationItems;
	ItemActivityLongText: Association to many MyNotifItemActivityLongTexts on ItemActivityLongText.ActivitySequenceNumber = $self;
}
entity MyNotificationItemActivities 
 {
	ActivityCatalogType: String;
	ActivityCode: String;
	ActivityCodeGroup: String;
	key ActivitySequenceNumber: String;
	ActivitySortNumber: String;
	ActivityText: String;
	CauseSequenceNumber: String;
	ChangedBy: String;
	ChangedDate: DateTime;
	ChangedTime: Time;
	CreatedBy: String;
	CreationDate: DateTime;
	CreationTime: Time;
	Deleted: String;
	key ItemNumber: String;
	ItemSortNumber: String;
	Language: String;
	LongTextFlag: String;
	key NotificationNumber: String;
	PlannedFinishDate: DateTime;
	PlannedFinishTime: Time;
	PlannedStartDate: DateTime;
	PlannedStartTime: Time;
	QuantityFactor: String;
	Version: String;
	Item: Association to one MyNotificationItems;
	ItemActivityLongText: Association to many MyNotifItemActivityLongTexts on ItemActivityLongText.ActivitySequenceNumber = $self;
}
entity MyNotificationItemCauses 
 {
	CauseCatalogType: String;
	CauseCode: String;
	CauseCodeGroup: String;
	key CauseSequenceNumber: String;
	CauseSortNumber: String;
	CauseText: String;
	ChangedBy: String;
	ChangedDate: DateTime;
	ChangedTime: Time;
	CreatedBy: String;
	CreationDate: DateTime;
	CreationTime: Time;
	key ItemNumber: String;
	ItemSortNumber: String;
	Language: String;
	LongTextFlag: String;
	key NotificationNumber: String;
	PartyRespCodeGroup: String;
	Quantity: Decimal;
	Item: Association to one MyNotificationItems;
	ItemCauseLongText: Association to many MyNotifItemCauseLongTexts on ItemCauseLongText.NotificationNumber = $self;
}
entity MyNotificationItemCauses 
 {
	CauseCatalogType: String;
	CauseCode: String;
	CauseCodeGroup: String;
	key CauseSequenceNumber: String;
	CauseSortNumber: String;
	CauseText: String;
	ChangedBy: String;
	ChangedDate: DateTime;
	ChangedTime: Time;
	CreatedBy: String;
	CreationDate: DateTime;
	CreationTime: Time;
	key ItemNumber: String;
	ItemSortNumber: String;
	Language: String;
	LongTextFlag: String;
	key NotificationNumber: String;
	PartyRespCodeGroup: String;
	Quantity: Decimal;
	Item: Association to one MyNotificationItems;
	ItemCauseLongText: Association to many MyNotifItemCauseLongTexts on ItemCauseLongText.NotificationNumber = $self;
}
entity MyNotificationItemTasks 
 {
	ChangedBy: String;
	ChangedDate: DateTime;
	ChangedTime: Time;
	CreatedBy: String;
	CreationDate: DateTime;
	CreationTime: Time;
	Deleted: String;
	GlobalIdentifier: String;
	key ItemNumber: String;
	ItemSortNumber: String;
	KeysForFunction: String;
	Language: String;
	LongTextFlag: String;
	key NotificationNumber: String;
	ObjectKey: String;
	ObjectNumber: String;
	PlannedFinishDate: DateTime;
	PlannedFinishTime: Time;
	PlannedStartDate: DateTime;
	PlannedStartTime: Time;
	Quantity: Decimal;
	RespPartnerFunction: String;
	ResponsiblePartner: String;
	TaskCatalogType: String;
	TaskCode: String;
	TaskCodeGroup: String;
	key TaskSequenceNumber: String;
	TaskSortNumber: String;
	TaskText: String;
	Template: String;
	UnitOfMeasure: String;
	Item: Association to one MyNotificationItems;
	ItemTaskLongText: Association to many MyNotifItemTaskLongTexts on ItemTaskLongText.ItemNumber = $self;
	ItemTaskMobileStatus_Nav: Association to many PMMobileStatuses on ItemTaskMobileStatus_Nav.TaskNum = $self;
}
entity MyNotificationItemTasks 
 {
	ChangedBy: String;
	ChangedDate: DateTime;
	ChangedTime: Time;
	CreatedBy: String;
	CreationDate: DateTime;
	CreationTime: Time;
	Deleted: String;
	GlobalIdentifier: String;
	key ItemNumber: String;
	ItemSortNumber: String;
	KeysForFunction: String;
	Language: String;
	LongTextFlag: String;
	key NotificationNumber: String;
	ObjectKey: String;
	ObjectNumber: String;
	PlannedFinishDate: DateTime;
	PlannedFinishTime: Time;
	PlannedStartDate: DateTime;
	PlannedStartTime: Time;
	Quantity: Decimal;
	RespPartnerFunction: String;
	ResponsiblePartner: String;
	TaskCatalogType: String;
	TaskCode: String;
	TaskCodeGroup: String;
	key TaskSequenceNumber: String;
	TaskSortNumber: String;
	TaskText: String;
	Template: String;
	UnitOfMeasure: String;
	Item: Association to one MyNotificationItems;
	ItemTaskLongText: Association to many MyNotifItemTaskLongTexts on ItemTaskLongText.ItemNumber = $self;
	ItemTaskMobileStatus_Nav: Association to many PMMobileStatuses on ItemTaskMobileStatus_Nav.TaskNum = $self;
}
entity MyNotificationItems 
 {
	ActivityType: String;
	Assembly: String;
	ChangedBy: String;
	ChangedDate: DateTime;
	ChangedTime: Time;
	CodeGroup: String;
	CreatedBy: String;
	CreationDate: DateTime;
	CreationTime: Time;
	DamageCode: String;
	DefectClass: String;
	DefectType: String;
	DefectValuationUnit: String;
	Deleted: String;
	InspectionChar: String;
	InspectionLot: String;
	InspectionNode: String;
	InspectionSample: String;
	ItemEquipment: String;
	ItemFuncLocExtern: String;
	ItemFunctionLocation: String;
	key ItemNumber: String;
	ItemSortNumber: String;
	ItemText: String;
	LAMObjectType: String;
	LAMTableKey: String;
	Language: String;
	LongTextFlag: String;
	MainWorkCenter: String;
	MaintenancePlant: String;
	MaterialNumber: String;
	key NotificationNumber: String;
	NumDefects: Decimal;
	ObjectPart: String;
	ObjectPartCatalogType: String;
	ObjectPartCodeGroup: String;
	ObjectType: String;
	OperationNo: String;
	OrderId: String;
	ReportType: String;
	Version: String;
	WorkCenterPlant: String;
	DefectClass_Nav: Association to many DefectClasses on DefectClass_Nav.DefectClass = $self;
	Equipment: Association to many MyEquipments on Equipment.ItemEquipment = $self;
	FunctionalLocation: Association to many MyFunctionalLocations on FunctionalLocation.ItemFunctionLocation = $self;
	InspectionChar_Nav: Association to many InspectionCharacteristics on InspectionChar_Nav.InspectionNode = $self;
	InspectionPoint_Nav: Association to many InspectionPoints on InspectionPoint_Nav.InspectionSample = $self;
	ItemActivities: Association to many MyNotificationItemActivities on ItemActivities.NotificationNumber = $self;
	ItemCauses: Association to many MyNotificationItemCauses on ItemCauses.NotificationNumber = $self;
	ItemLongText: Association to many MyNotifItemLongTexts on ItemLongText.NotificationNumber = $self;
	ItemTasks: Association to many MyNotificationItemTasks on ItemTasks.NotificationNumber = $self;
	LAMObjectDatum_Nav: Association to many LAMObjectData on LAMObjectDatum_Nav.NotifItemNumber = $self;
	Notification: Association to one MyNotificationHeaders;
}
entity MyNotificationItems 
 {
	ActivityType: String;
	Assembly: String;
	ChangedBy: String;
	ChangedDate: DateTime;
	ChangedTime: Time;
	CodeGroup: String;
	CreatedBy: String;
	CreationDate: DateTime;
	CreationTime: Time;
	DamageCode: String;
	DefectClass: String;
	DefectType: String;
	DefectValuationUnit: String;
	Deleted: String;
	InspectionChar: String;
	InspectionLot: String;
	InspectionNode: String;
	InspectionSample: String;
	ItemEquipment: String;
	ItemFuncLocExtern: String;
	ItemFunctionLocation: String;
	key ItemNumber: String;
	ItemSortNumber: String;
	ItemText: String;
	LAMObjectType: String;
	LAMTableKey: String;
	Language: String;
	LongTextFlag: String;
	MainWorkCenter: String;
	MaintenancePlant: String;
	MaterialNumber: String;
	key NotificationNumber: String;
	NumDefects: Decimal;
	ObjectPart: String;
	ObjectPartCatalogType: String;
	ObjectPartCodeGroup: String;
	ObjectType: String;
	OperationNo: String;
	OrderId: String;
	ReportType: String;
	Version: String;
	WorkCenterPlant: String;
	DefectClass_Nav: Association to many DefectClasses on DefectClass_Nav.DefectClass = $self;
	Equipment: Association to many MyEquipments on Equipment.ItemEquipment = $self;
	FunctionalLocation: Association to many MyFunctionalLocations on FunctionalLocation.ItemFunctionLocation = $self;
	InspectionChar_Nav: Association to many InspectionCharacteristics on InspectionChar_Nav.InspectionNode = $self;
	InspectionPoint_Nav: Association to many InspectionPoints on InspectionPoint_Nav.InspectionSample = $self;
	ItemActivities: Association to many MyNotificationItemActivities on ItemActivities.NotificationNumber = $self;
	ItemCauses: Association to many MyNotificationItemCauses on ItemCauses.NotificationNumber = $self;
	ItemLongText: Association to many MyNotifItemLongTexts on ItemLongText.NotificationNumber = $self;
	ItemTasks: Association to many MyNotificationItemTasks on ItemTasks.NotificationNumber = $self;
	LAMObjectDatum_Nav: Association to many LAMObjectData on LAMObjectDatum_Nav.NotifItemNumber = $self;
	Notification: Association to one MyNotificationHeaders;
}
entity MyNotificationPartners 
 {
	AddressNum: String;
	BPNum: String;
	key Counter: String;
	key NotificationNumber: String;
	ObjectCategory: String;
	ObjectNum: String;
	OldPartner: String;
	OneTimeAddress: String;
	key PartnerFunction: String;
	PartnerNum: String;
	PersonNum: String;
	PersonnelNum: String;
	AddressAtWork_Nav: Association to one AddressesAtWork;
	Address_Nav: Association to one Addresses;
	Employee_Nav: Association to one Employees;
	Notification: Association to one MyNotificationHeaders;
	PartnerFunction_Nav: Association to one PartnerFunctions;
}
entity MyNotificationPartners 
 {
	AddressNum: String;
	BPNum: String;
	key Counter: String;
	key NotificationNumber: String;
	ObjectCategory: String;
	ObjectNum: String;
	OldPartner: String;
	OneTimeAddress: String;
	key PartnerFunction: String;
	PartnerNum: String;
	PersonNum: String;
	PersonnelNum: String;
	AddressAtWork_Nav: Association to one AddressesAtWork;
	Address_Nav: Association to one Addresses;
	Employee_Nav: Association to one Employees;
	Notification: Association to one MyNotificationHeaders;
	PartnerFunction_Nav: Association to one PartnerFunctions;
}
entity MyNotificationSales 
 {
	ContractDateFrom: DateTime;
	ContractDateTo: DateTime;
	ContractDesc: String;
	ContractItemNum: String;
	Customer: String;
	CustomerReference: String;
	CustomerReferenceDate: DateTime;
	DistributionChannel: String;
	Division: String;
	key NotificationNumber: String;
	SalesOrg: String;
	ServiceContract: String;
	Customer_Nav: Association to one Customers;
	NotifHeader_Nav: Association to one MyNotificationHeaders;
}
entity MyNotificationSales 
 {
	ContractDateFrom: DateTime;
	ContractDateTo: DateTime;
	ContractDesc: String;
	ContractItemNum: String;
	Customer: String;
	CustomerReference: String;
	CustomerReferenceDate: DateTime;
	DistributionChannel: String;
	Division: String;
	key NotificationNumber: String;
	SalesOrg: String;
	ServiceContract: String;
	Customer_Nav: Association to one Customers;
	NotifHeader_Nav: Association to one MyNotificationHeaders;
}
entity MyNotificationTasks 
 {
	ChangedBy: String;
	ChangedDate: DateTime;
	ChangedTime: Time;
	CreatedBy: String;
	CreationDate: DateTime;
	CreationTime: Time;
	Deleted: String;
	GlobalIdentifier: String;
	KeysForFunction: String;
	Language: String;
	LongTextFlag: String;
	key NotificationNumber: String;
	ObjectKey: String;
	ObjectNumber: String;
	PlannedFinishDate: DateTime;
	PlannedFinishTime: Time;
	PlannedStartDate: DateTime;
	PlannedStartTime: Time;
	Quantity: Decimal;
	RespPartnerFunction: String;
	ResponsiblePartner: String;
	TaskCatalogType: String;
	TaskCode: String;
	TaskCodeGroup: String;
	key TaskSequenceNumber: String;
	TaskSortNumber: String;
	TaskText: String;
	Template: String;
	UnitOfMeasure: String;
	Notification: Association to many MyNotificationHeaders on Notification.NotificationNumber = $self;
	TaskLongText: Association to many MyNotifTaskLongTexts on TaskLongText.NotificationNumber = $self;
	TaskMobileStatus_Nav: Association to many PMMobileStatuses on TaskMobileStatus_Nav.TaskNum = $self;
}
entity MyNotificationTasks 
 {
	ChangedBy: String;
	ChangedDate: DateTime;
	ChangedTime: Time;
	CreatedBy: String;
	CreationDate: DateTime;
	CreationTime: Time;
	Deleted: String;
	GlobalIdentifier: String;
	KeysForFunction: String;
	Language: String;
	LongTextFlag: String;
	key NotificationNumber: String;
	ObjectKey: String;
	ObjectNumber: String;
	PlannedFinishDate: DateTime;
	PlannedFinishTime: Time;
	PlannedStartDate: DateTime;
	PlannedStartTime: Time;
	Quantity: Decimal;
	RespPartnerFunction: String;
	ResponsiblePartner: String;
	TaskCatalogType: String;
	TaskCode: String;
	TaskCodeGroup: String;
	key TaskSequenceNumber: String;
	TaskSortNumber: String;
	TaskText: String;
	Template: String;
	UnitOfMeasure: String;
	Notification: Association to many MyNotificationHeaders on Notification.NotificationNumber = $self;
	TaskLongText: Association to many MyNotifTaskLongTexts on TaskLongText.NotificationNumber = $self;
	TaskMobileStatus_Nav: Association to many PMMobileStatuses on TaskMobileStatus_Nav.TaskNum = $self;
}
entity MyRoutePoints 
 {
	Equipment: String;
	FuncLocID: String;
	Obligated: String;
	PRTPoint: String;
	key Point: String;
	key RouteID: String;
	SequenceNum: Int64;
	key StopID: String;
	MeasuringPoint: Association to one MeasuringPoints;
	Stops: Association to many MyRouteStops on Stops.StopID = $self;
	TechObject: Association to many MyTechObjects on TechObject.FuncLocID = $self;
}
entity MyRoutePoints 
 {
	Equipment: String;
	FuncLocID: String;
	Obligated: String;
	PRTPoint: String;
	key Point: String;
	key RouteID: String;
	SequenceNum: Int64;
	key StopID: String;
	MeasuringPoint: Association to one MeasuringPoints;
	Stops: Association to many MyRouteStops on Stops.StopID = $self;
	TechObject: Association to many MyTechObjects on TechObject.FuncLocID = $self;
}
entity MyRouteStops 
 {
	AddressNum: String;
	Description: String;
	key RouteID: String;
	Status: String;
	key StopID: String;
	StopLocation: String;
	Address: Association to many Addresses on Address.AddressNum = $self;
	Equipment: Association to many MyEquipments on Equipment.StopLocation = $self;
	FuncLoc: Association to many MyFunctionalLocations on FuncLoc.StopLocation = $self;
	Operation: Association to many MyWorkOrderOperations on Operation.StopID = $self;
	Points: Association to many MyRoutePoints on Points.StopID = $self;
	Route: Association to many MyRoutes on Route.RouteID = $self;
	TechObjects: Association to many MyTechObjects on TechObjects.RouteID = $self;
}
entity MyRouteStops 
 {
	AddressNum: String;
	Description: String;
	key RouteID: String;
	Status: String;
	key StopID: String;
	StopLocation: String;
	Address: Association to many Addresses on Address.AddressNum = $self;
	Equipment: Association to many MyEquipments on Equipment.StopLocation = $self;
	FuncLoc: Association to many MyFunctionalLocations on FuncLoc.StopLocation = $self;
	Operation: Association to many MyWorkOrderOperations on Operation.StopID = $self;
	Points: Association to many MyRoutePoints on Points.StopID = $self;
	Route: Association to many MyRoutes on Route.RouteID = $self;
	TechObjects: Association to many MyTechObjects on TechObjects.RouteID = $self;
}
entity MyRoutes 
 {
	Description: String;
	ReferenceID: String;
	ReferenceType: String;
	key RouteID: String;
	Status: String;
	Stops: Association to many MyRouteStops on Stops.RouteID = $self;
	WorkOrder: Association to many MyWorkOrderHeaders on WorkOrder.RouteID = $self;
}
entity MyRoutes 
 {
	Description: String;
	ReferenceID: String;
	ReferenceType: String;
	key RouteID: String;
	Status: String;
	Stops: Association to many MyRouteStops on Stops.RouteID = $self;
	WorkOrder: Association to many MyWorkOrderHeaders on WorkOrder.RouteID = $self;
}
entity MyTechObjects 
 {
	EquipDesc: String;
	key Equipment: String;
	FuncLocDesc: String;
	key FuncLocID: String;
	key RouteID: String;
	key StopID: String;
	Equip: Association to many MyEquipments on Equip.Equipment = $self;
	FuncLoc: Association to many MyFunctionalLocations on FuncLoc.FuncLocID = $self;
	Operation: Association to many MyWorkOrderOperations on Operation.RouteID = $self;
	Points: Association to many MyRoutePoints on Points.FuncLocID = $self;
	Stops: Association to many MyRouteStops on Stops.RouteID = $self;
}
entity MyTechObjects 
 {
	EquipDesc: String;
	key Equipment: String;
	FuncLocDesc: String;
	key FuncLocID: String;
	key RouteID: String;
	key StopID: String;
	Equip: Association to many MyEquipments on Equip.Equipment = $self;
	FuncLoc: Association to many MyFunctionalLocations on FuncLoc.FuncLocID = $self;
	Operation: Association to many MyWorkOrderOperations on Operation.RouteID = $self;
	Points: Association to many MyRoutePoints on Points.FuncLocID = $self;
	Stops: Association to many MyRouteStops on Stops.RouteID = $self;
}
entity MyWorkOrderComponentLongTexts 
 {
	key ItemNumber: String;
	NewTextString: String;
	ObjectKey: String;
	key OperationNo: String;
	key OrderId: String;
	key RecordType: String;
	RequirementNumber: String;
	TextId: String;
	TextObjType: String;
	TextString: String;
	WorkOrderComponent: Association to one MyWorkOrderComponents;
}
entity MyWorkOrderComponentLongTexts 
 {
	key ItemNumber: String;
	NewTextString: String;
	ObjectKey: String;
	key OperationNo: String;
	key OrderId: String;
	key RecordType: String;
	RequirementNumber: String;
	TextId: String;
	TextObjType: String;
	TextString: String;
	WorkOrderComponent: Association to one MyWorkOrderComponents;
}
entity MyWorkOrderComponentMatDocs 
 {
	ItemNumber: String;
	key MatDocItem: String;
	key MaterialDocNumber: String;
	key MaterialDocYear: String;
	OperationNo: String;
	OrderId: String;
	RecordType: String;
	MaterialDocItem: Association to one MaterialDocItems;
	WorkOrderComponent: Association to one MyWorkOrderComponents;
}
entity MyWorkOrderComponentMatDocs 
 {
	ItemNumber: String;
	key MatDocItem: String;
	key MaterialDocNumber: String;
	key MaterialDocYear: String;
	OperationNo: String;
	OrderId: String;
	RecordType: String;
	MaterialDocItem: Association to one MaterialDocItems;
	WorkOrderComponent: Association to one MyWorkOrderComponents;
}
entity MyWorkOrderComponents 
 {
	Batch: String;
	CommittedQuantity: Decimal;
	ComponentDesc: String;
	ItemCategory: String;
	ItemCategoryDesc: String;
	key ItemNumber: String;
	MaterialNum: String;
	OperationDesc: String;
	key OperationNo: String;
	key OrderId: String;
	Plant: String;
	QuantityUnE: Decimal;
	RecordType: String;
	RequirementNumber: String;
	RequirementQuantity: Decimal;
	SerialNoProfile: String;
	StorageLocation: String;
	TextTypeDesc: String;
	UnitOfEntry: String;
	UnitOfMeasure: String;
	WithdrawnQuantity: Decimal;
	WithdrawnQuantityOrig: Decimal;
	ComponentLongText: Association to many MyWorkOrderComponentLongTexts on ComponentLongText.OrderId = $self;
	ItemCategory_Nav: Association to many ItemCategories on ItemCategory_Nav.ItemCategory = $self;
	Material: Association to one Materials;
	MaterialBatch_Nav: Association to many MaterialBatches on MaterialBatch_Nav.MaterialNum = $self;
	MaterialDoc: Association to many MyWorkOrderComponentMatDocs on MaterialDoc.OrderId = $self;
	WOHeader: Association to many MyWorkOrderHeaders on WOHeader.OrderId = $self;
	WOOperation: Association to many MyWorkOrderOperations on WOOperation.OrderId = $self;
}
entity MyWorkOrderComponents 
 {
	Batch: String;
	CommittedQuantity: Decimal;
	ComponentDesc: String;
	ItemCategory: String;
	ItemCategoryDesc: String;
	key ItemNumber: String;
	MaterialNum: String;
	OperationDesc: String;
	key OperationNo: String;
	key OrderId: String;
	Plant: String;
	QuantityUnE: Decimal;
	RecordType: String;
	RequirementNumber: String;
	RequirementQuantity: Decimal;
	SerialNoProfile: String;
	StorageLocation: String;
	TextTypeDesc: String;
	UnitOfEntry: String;
	UnitOfMeasure: String;
	WithdrawnQuantity: Decimal;
	WithdrawnQuantityOrig: Decimal;
	ComponentLongText: Association to many MyWorkOrderComponentLongTexts on ComponentLongText.OrderId = $self;
	ItemCategory_Nav: Association to many ItemCategories on ItemCategory_Nav.ItemCategory = $self;
	Material: Association to one Materials;
	MaterialBatch_Nav: Association to many MaterialBatches on MaterialBatch_Nav.MaterialNum = $self;
	MaterialDoc: Association to many MyWorkOrderComponentMatDocs on MaterialDoc.OrderId = $self;
	WOHeader: Association to many MyWorkOrderHeaders on WOHeader.OrderId = $self;
	WOOperation: Association to many MyWorkOrderOperations on WOOperation.OrderId = $self;
}
entity MyWorkOrderDocuments 
 {
	DocumentID: String;
	key ObjectKey: String;
	OperationNo: String;
	OrderId: String;
	key RelationshipID: String;
	Document: Association to many Documents on Document.DocumentID = $self;
	WOHeader: Association to many MyWorkOrderHeaders on WOHeader.OrderId = $self;
	WOOperation_Nav: Association to many MyWorkOrderOperations on WOOperation_Nav.OrderId = $self;
}
entity MyWorkOrderDocuments 
 {
	DocumentID: String;
	key ObjectKey: String;
	OperationNo: String;
	OrderId: String;
	key RelationshipID: String;
	Document: Association to many Documents on Document.DocumentID = $self;
	WOHeader: Association to many MyWorkOrderHeaders on WOHeader.OrderId = $self;
	WOOperation_Nav: Association to many MyWorkOrderOperations on WOOperation_Nav.OrderId = $self;
}
entity MyWorkOrderGeometries 
 {
	key LogicalSystem: String;
	key ObjectGroup: String;
	key ObjectGroup1: String;
	key ObjectKey: String;
	key ObjectType: String;
	OrderId: String;
	SpacialGUId: String;
	SpacialId: String;
	Geometry: Association to many Geometries on Geometry.SpacialId = $self;
	WOHeader_Nav: Association to many MyWorkOrderHeaders on WOHeader_Nav.OrderId = $self;
}
entity MyWorkOrderGeometries 
 {
	key LogicalSystem: String;
	key ObjectGroup: String;
	key ObjectGroup1: String;
	key ObjectKey: String;
	key ObjectType: String;
	OrderId: String;
	SpacialGUId: String;
	SpacialId: String;
	Geometry: Association to many Geometries on Geometry.SpacialId = $self;
	WOHeader_Nav: Association to many MyWorkOrderHeaders on WOHeader_Nav.OrderId = $self;
}
entity MyWorkOrderHeaderLongTexts 
 {
	NewTextString: String;
	ObjectKey: String;
	key OrderId: String;
	TextId: String;
	TextObjType: String;
	TextString: String;
	WorkOrderHeader: Association to one MyWorkOrderHeaders;
}
entity MyWorkOrderHeaderLongTexts 
 {
	NewTextString: String;
	ObjectKey: String;
	key OrderId: String;
	TextId: String;
	TextObjType: String;
	TextString: String;
	WorkOrderHeader: Association to one MyWorkOrderHeaders;
}
entity MyWorkOrderHeaders 
 {
	AccountingIndicator: String;
	AddressNum: String;
	Assembly: String;
	BusinessArea: String;
	ControllingArea: String;
	CostCenter: String;
	CreationDate: DateTime;
	CreationTime: Time;
	DueDate: DateTime;
	HeaderEquipment: String;
	HeaderFunctionLocation: String;
	LAMObjectType: String;
	LAMTableKey: String;
	LastChangeTime: DateTime;
	MainWorkCenter: String;
	MainWorkCenterPlant: String;
	MaintenanceActivityType: String;
	MaintenancePlant: String;
	NotificationNumber: String;
	ObjectKey: String;
	ObjectNumber: String;
	ObjectType: String;
	OrderCategory: String;
	OrderCurrency: String;
	OrderDescription: String;
	key OrderId: String;
	OrderType: String;
	Phase: String;
	PlannerGroup: String;
	PlanningPlant: String;
	Priority: String;
	PriorityType: String;
	ReferenceOrder: String;
	RequestStartDate: DateTime;
	ScheduledEndDate: DateTime;
	ScheduledStartDate: DateTime;
	Subphase: String;
	WorkCenterInternalId: String;
	Address: Association to one Addresses;
	Assembly_nav: Association to many Materials on Assembly_nav.Assembly = $self;
	Components: Association to many MyWorkOrderComponents on Components.OrderId = $self;
	Confirmations: Association to many Confirmations on Confirmations.OrderID = $self;
	DisconnectActivity_Nav: Association to many DisconnectionActivities on DisconnectActivity_Nav.OrderId = $self;
	Equipment: Association to many MyEquipments on Equipment.HeaderEquipment = $self;
	FunctionalLocation: Association to many MyFunctionalLocations on FunctionalLocation.HeaderFunctionLocation = $self;
	Geometry_Nav: Association to many Geometries on Geometry_Nav.ObjectKey = $self;
	HeaderLongText: Association to many MyWorkOrderHeaderLongTexts on HeaderLongText.OrderId = $self;
	InspectionLot_Nav: Association to many InspectionLots on InspectionLot_Nav.OrderId = $self;
	LAMObjectDatum_Nav: Association to many LAMObjectData on LAMObjectDatum_Nav.OrderId = $self;
	MarkedJob: Association to many MarkedJobs on MarkedJob.OrderId = $self;
	MaterialDocItem: Association to one MaterialDocItems;
	NotifHeader_Nav: Association to many MyNotificationHeaders on NotifHeader_Nav.OrderId = $self;
	Notification: Association to many MyNotificationHeaders on Notification.NotificationNumber = $self;
	Operations: Association to many MyWorkOrderOperations on Operations.OrderId = $self;
	OrderISULinks: Association to many OrderISULinks on OrderISULinks.OrderNum = $self;
	OrderMobileStatus_Nav: Association to many PMMobileStatuses on OrderMobileStatus_Nav.SortField = $self;
	PMMobileStatusHistory_Nav: Association to many PMMobileStatusHistories on PMMobileStatusHistory_Nav.OrderId = $self;
	RelatedNotif_Nav: Association to many NotificationHistories on RelatedNotif_Nav.OrderId = $self;
	RelatedWOHistory: Association to many WorkOrderHistories on RelatedWOHistory.OrderId = $self;
	Route: Association to many MyRoutes on Route.RouteID = $self;
	UserTimeEntry_Nav: Association to many UserTimeEntries on UserTimeEntry_Nav.OrderId = $self;
	WOCatsTimesheet: Association to many CatsTimesheets on WOCatsTimesheet.RecOrder = $self;
	WODocuments: Association to many MyWorkOrderDocuments on WODocuments.OrderId = $self;
	WOGeometries: Association to many MyWorkOrderGeometries on WOGeometries.OrderId = $self;
	WOObjectList_Nav: Association to many MyWorkOrderObjectLists on WOObjectList_Nav.OrderId = $self;
	WOPartners: Association to many MyWorkOrderPartners on WOPartners.OrderId = $self;
	WOPriority: Association to many Priorities on WOPriority.PriorityType = $self;
	WOSales_Nav: Association to many MyWorkOrderSales on WOSales_Nav.OrderId = $self;
	WOTransfer: Association to many WorkOrderTransfers on WOTransfer.OrderId = $self;
}
entity MyWorkOrderHeaders 
 {
	AccountingIndicator: String;
	AddressNum: String;
	Assembly: String;
	BusinessArea: String;
	ControllingArea: String;
	CostCenter: String;
	CreationDate: DateTime;
	CreationTime: Time;
	DueDate: DateTime;
	HeaderEquipment: String;
	HeaderFunctionLocation: String;
	LAMObjectType: String;
	LAMTableKey: String;
	LastChangeTime: DateTime;
	MainWorkCenter: String;
	MainWorkCenterPlant: String;
	MaintenanceActivityType: String;
	MaintenancePlant: String;
	NotificationNumber: String;
	ObjectKey: String;
	ObjectNumber: String;
	ObjectType: String;
	OrderCategory: String;
	OrderCurrency: String;
	OrderDescription: String;
	key OrderId: String;
	OrderType: String;
	Phase: String;
	PlannerGroup: String;
	PlanningPlant: String;
	Priority: String;
	PriorityType: String;
	ReferenceOrder: String;
	RequestStartDate: DateTime;
	ScheduledEndDate: DateTime;
	ScheduledStartDate: DateTime;
	Subphase: String;
	WorkCenterInternalId: String;
	Address: Association to one Addresses;
	Assembly_nav: Association to many Materials on Assembly_nav.Assembly = $self;
	Components: Association to many MyWorkOrderComponents on Components.OrderId = $self;
	Confirmations: Association to many Confirmations on Confirmations.OrderID = $self;
	DisconnectActivity_Nav: Association to many DisconnectionActivities on DisconnectActivity_Nav.OrderId = $self;
	Equipment: Association to many MyEquipments on Equipment.HeaderEquipment = $self;
	FunctionalLocation: Association to many MyFunctionalLocations on FunctionalLocation.HeaderFunctionLocation = $self;
	Geometry_Nav: Association to many Geometries on Geometry_Nav.ObjectKey = $self;
	HeaderLongText: Association to many MyWorkOrderHeaderLongTexts on HeaderLongText.OrderId = $self;
	InspectionLot_Nav: Association to many InspectionLots on InspectionLot_Nav.OrderId = $self;
	LAMObjectDatum_Nav: Association to many LAMObjectData on LAMObjectDatum_Nav.OrderId = $self;
	MarkedJob: Association to many MarkedJobs on MarkedJob.OrderId = $self;
	MaterialDocItem: Association to one MaterialDocItems;
	NotifHeader_Nav: Association to many MyNotificationHeaders on NotifHeader_Nav.OrderId = $self;
	Notification: Association to many MyNotificationHeaders on Notification.NotificationNumber = $self;
	Operations: Association to many MyWorkOrderOperations on Operations.OrderId = $self;
	OrderISULinks: Association to many OrderISULinks on OrderISULinks.OrderNum = $self;
	OrderMobileStatus_Nav: Association to many PMMobileStatuses on OrderMobileStatus_Nav.SortField = $self;
	PMMobileStatusHistory_Nav: Association to many PMMobileStatusHistories on PMMobileStatusHistory_Nav.OrderId = $self;
	RelatedNotif_Nav: Association to many NotificationHistories on RelatedNotif_Nav.OrderId = $self;
	RelatedWOHistory: Association to many WorkOrderHistories on RelatedWOHistory.OrderId = $self;
	Route: Association to many MyRoutes on Route.RouteID = $self;
	UserTimeEntry_Nav: Association to many UserTimeEntries on UserTimeEntry_Nav.OrderId = $self;
	WOCatsTimesheet: Association to many CatsTimesheets on WOCatsTimesheet.RecOrder = $self;
	WODocuments: Association to many MyWorkOrderDocuments on WODocuments.OrderId = $self;
	WOGeometries: Association to many MyWorkOrderGeometries on WOGeometries.OrderId = $self;
	WOObjectList_Nav: Association to many MyWorkOrderObjectLists on WOObjectList_Nav.OrderId = $self;
	WOPartners: Association to many MyWorkOrderPartners on WOPartners.OrderId = $self;
	WOPriority: Association to many Priorities on WOPriority.PriorityType = $self;
	WOSales_Nav: Association to many MyWorkOrderSales on WOSales_Nav.OrderId = $self;
	WOTransfer: Association to many WorkOrderTransfers on WOTransfer.OrderId = $self;
}
entity MyWorkOrderObjectLists 
 {
	Assembly: String;
	Date: DateTime;
	EquipId: String;
	FuncLocIdIntern: String;
	LocAssignment: String;
	MaterialNum: String;
	NotifNum: String;
	ObjectCounter: Int32;
	key ObjectListCounter: String;
	key ObjectListNum: String;
	ObjectListUsage: String;
	ObjectNum: Int64;
	key OperationNo: String;
	key OrderId: String;
	ProcessingInd: String;
	SerialNum: String;
	SerialNumTable: String;
	key SubOperationNo: String;
	Equipment_Nav: Association to many MyEquipments on Equipment_Nav.EquipId = $self;
	FuncLoc_Nav: Association to many MyFunctionalLocations on FuncLoc_Nav.FuncLocIdIntern = $self;
	Material_Nav: Association to many Materials;
	NotifHeader_Nav: Association to one MyNotificationHeaders;
	WOHeader_Nav: Association to one MyWorkOrderHeaders;
	WOOperation_Nav: Association to one MyWorkOrderOperations;
	WOSubOperation_Nav: Association to one MyWorkOrderSubOperations;
}
entity MyWorkOrderObjectLists 
 {
	Assembly: String;
	Date: DateTime;
	EquipId: String;
	FuncLocIdIntern: String;
	LocAssignment: String;
	MaterialNum: String;
	NotifNum: String;
	ObjectCounter: Int32;
	key ObjectListCounter: String;
	key ObjectListNum: String;
	ObjectListUsage: String;
	ObjectNum: Int64;
	key OperationNo: String;
	key OrderId: String;
	ProcessingInd: String;
	SerialNum: String;
	SerialNumTable: String;
	key SubOperationNo: String;
	Equipment_Nav: Association to many MyEquipments on Equipment_Nav.EquipId = $self;
	FuncLoc_Nav: Association to many MyFunctionalLocations on FuncLoc_Nav.FuncLocIdIntern = $self;
	Material_Nav: Association to many Materials;
	NotifHeader_Nav: Association to one MyNotificationHeaders;
	WOHeader_Nav: Association to one MyWorkOrderHeaders;
	WOOperation_Nav: Association to one MyWorkOrderOperations;
	WOSubOperation_Nav: Association to one MyWorkOrderSubOperations;
}
entity MyWorkOrderOperationLongTexts 
 {
	NewTextString: String;
	ObjectKey: String;
	key OperationNo: String;
	key OrderId: String;
	TextId: String;
	TextObjType: String;
	TextString: String;
	WorkOrderOperation: Association to one MyWorkOrderOperations;
}
entity MyWorkOrderOperationLongTexts 
 {
	NewTextString: String;
	ObjectKey: String;
	key OperationNo: String;
	key OrderId: String;
	TextId: String;
	TextObjType: String;
	TextString: String;
	WorkOrderOperation: Association to one MyWorkOrderOperations;
}
entity MyWorkOrderOperations 
 {
	ActivityType: String;
	Assembly: String;
	ChecklistType: String;
	ControlKey: String;
	Duration: Decimal;
	DurationUOM: String;
	LAMObjectType: String;
	LAMTableKey: String;
	MainWorkCenter: String;
	MainWorkCenterPlant: String;
	MaintenancePlant: String;
	NotifNum: String;
	NumberOfCapacities: Byte;
	ObjectKey: String;
	ObjectNumber: String;
	ObjectType: String;
	OperationCategory: String;
	OperationEquipment: String;
	OperationFunctionLocation: String;
	key OperationNo: String;
	OperationShortText: String;
	key OrderId: String;
	PersonNum: String;
	Phase: String;
	SchedEarliestEndDate: DateTime;
	SchedEarliestStartDate: DateTime;
	SchedLatestEndDate: DateTime;
	SchedLatestStartDate: DateTime;
	Subphase: String;
	Work: Decimal;
	WorkCenterInternalId: String;
	WorkUnit: String;
	Assembly_Nav: Association to many Materials on Assembly_Nav.Assembly = $self;
	Components: Association to many MyWorkOrderComponents on Components.OrderId = $self;
	Confirmations: Association to many Confirmations on Confirmations.Operation = $self;
	Employee_Nav: Association to one Employees;
	EquipmentOperation: Association to many MyEquipments on EquipmentOperation.OperationEquipment = $self;
	FSMFormInstance_Nav: Association to many FSMFormInstances on FSMFormInstance_Nav.Operation = $self;
	FunctionalLocationOperation: Association to many MyFunctionalLocations on FunctionalLocationOperation.OperationFunctionLocation = $self;
	InspectionPoint_Nav: Association to many InspectionPoints on InspectionPoint_Nav.OrderId = $self;
	LAMObjectDatum_Nav: Association to many LAMObjectData on LAMObjectDatum_Nav.OperationNo = $self;
	NotifHeader_Nav: Association to many MyNotificationHeaders on NotifHeader_Nav.NotifNum = $self;
	OperationLongText: Association to many MyWorkOrderOperationLongTexts on OperationLongText.OrderId = $self;
	OperationMobileStatus_Nav: Association to many PMMobileStatuses on OperationMobileStatus_Nav.SortField = $self;
	RouteStop: Association to many MyRouteStops on RouteStop.StopID = $self;
	RouteTechObjects: Association to many MyTechObjects on RouteTechObjects.RouteID = $self;
	SubOperations: Association to many MyWorkOrderSubOperations on SubOperations.OperationNo = $self;
	Tools: Association to many MyWorkOrderTools on Tools.OrderId = $self;
	UserTimeEntry_Nav: Association to many UserTimeEntries on UserTimeEntry_Nav.OperationNo = $self;
	WOHeader: Association to one MyWorkOrderHeaders;
	WOObjectList_Nav: Association to many MyWorkOrderObjectLists on WOObjectList_Nav.OrderId = $self;
	WOOperationCatsTimesheet: Association to many CatsTimesheets on WOOperationCatsTimesheet.RecOrder = $self;
	WOOprDocuments_Nav: Association to many MyWorkOrderDocuments on WOOprDocuments_Nav.OrderId = $self;
	WOTransfer: Association to many WorkOrderTransfers on WOTransfer.OperationNo = $self;
}
entity MyWorkOrderOperations 
 {
	ActivityType: String;
	Assembly: String;
	ChecklistType: String;
	ControlKey: String;
	Duration: Decimal;
	DurationUOM: String;
	LAMObjectType: String;
	LAMTableKey: String;
	MainWorkCenter: String;
	MainWorkCenterPlant: String;
	MaintenancePlant: String;
	NotifNum: String;
	NumberOfCapacities: Byte;
	ObjectKey: String;
	ObjectNumber: String;
	ObjectType: String;
	OperationCategory: String;
	OperationEquipment: String;
	OperationFunctionLocation: String;
	key OperationNo: String;
	OperationShortText: String;
	key OrderId: String;
	PersonNum: String;
	Phase: String;
	SchedEarliestEndDate: DateTime;
	SchedEarliestStartDate: DateTime;
	SchedLatestEndDate: DateTime;
	SchedLatestStartDate: DateTime;
	Subphase: String;
	Work: Decimal;
	WorkCenterInternalId: String;
	WorkUnit: String;
	Assembly_Nav: Association to many Materials on Assembly_Nav.Assembly = $self;
	Components: Association to many MyWorkOrderComponents on Components.OrderId = $self;
	Confirmations: Association to many Confirmations on Confirmations.Operation = $self;
	Employee_Nav: Association to one Employees;
	EquipmentOperation: Association to many MyEquipments on EquipmentOperation.OperationEquipment = $self;
	FSMFormInstance_Nav: Association to many FSMFormInstances on FSMFormInstance_Nav.Operation = $self;
	FunctionalLocationOperation: Association to many MyFunctionalLocations on FunctionalLocationOperation.OperationFunctionLocation = $self;
	InspectionPoint_Nav: Association to many InspectionPoints on InspectionPoint_Nav.OrderId = $self;
	LAMObjectDatum_Nav: Association to many LAMObjectData on LAMObjectDatum_Nav.OperationNo = $self;
	NotifHeader_Nav: Association to many MyNotificationHeaders on NotifHeader_Nav.NotifNum = $self;
	OperationLongText: Association to many MyWorkOrderOperationLongTexts on OperationLongText.OrderId = $self;
	OperationMobileStatus_Nav: Association to many PMMobileStatuses on OperationMobileStatus_Nav.SortField = $self;
	RouteStop: Association to many MyRouteStops on RouteStop.StopID = $self;
	RouteTechObjects: Association to many MyTechObjects on RouteTechObjects.RouteID = $self;
	SubOperations: Association to many MyWorkOrderSubOperations on SubOperations.OperationNo = $self;
	Tools: Association to many MyWorkOrderTools on Tools.OrderId = $self;
	UserTimeEntry_Nav: Association to many UserTimeEntries on UserTimeEntry_Nav.OperationNo = $self;
	WOHeader: Association to one MyWorkOrderHeaders;
	WOObjectList_Nav: Association to many MyWorkOrderObjectLists on WOObjectList_Nav.OrderId = $self;
	WOOperationCatsTimesheet: Association to many CatsTimesheets on WOOperationCatsTimesheet.RecOrder = $self;
	WOOprDocuments_Nav: Association to many MyWorkOrderDocuments on WOOprDocuments_Nav.OrderId = $self;
	WOTransfer: Association to many WorkOrderTransfers on WOTransfer.OperationNo = $self;
}
entity MyWorkOrderPartners 
 {
	AddressNum: String;
	BPNum: String;
	key Counter: String;
	NewPartner: String;
	ObjectCategory: String;
	ObjectNum: String;
	OldPartner: String;
	OneTimeAddress: String;
	key OrderId: String;
	Partner: String;
	key PartnerFunction: String;
	PersonNum: String;
	PersonnelNum: String;
	AddressAtWork_Nav: Association to one AddressesAtWork;
	Address_Nav: Association to one Addresses;
	Employee_Nav: Association to one Employees;
	PartnerFunction_Nav: Association to one PartnerFunctions;
	WorkOrderHeader: Association to one MyWorkOrderHeaders;
}
entity MyWorkOrderPartners 
 {
	AddressNum: String;
	BPNum: String;
	key Counter: String;
	NewPartner: String;
	ObjectCategory: String;
	ObjectNum: String;
	OldPartner: String;
	OneTimeAddress: String;
	key OrderId: String;
	Partner: String;
	key PartnerFunction: String;
	PersonNum: String;
	PersonnelNum: String;
	AddressAtWork_Nav: Association to one AddressesAtWork;
	Address_Nav: Association to one Addresses;
	Employee_Nav: Association to one Employees;
	PartnerFunction_Nav: Association to one PartnerFunctions;
	WorkOrderHeader: Association to one MyWorkOrderHeaders;
}
entity MyWorkOrderSales 
 {
	AccountingIndicator: String;
	ContractDateFrom: DateTime;
	ContractDateTo: DateTime;
	ContractDesc: String;
	ContractItemNum: String;
	Customer: String;
	CustomerReference: String;
	CustomerReferenceDate: DateTime;
	DistributionChannel: String;
	Division: String;
	ObjectNum: String;
	key OrderId: String;
	ProductDesc: String;
	Quantity: Decimal;
	QuantityUOM: String;
	SalesGroup: String;
	SalesOrg: String;
	ServiceContract: String;
	ServiceProduct: String;
	Customer_Nav: Association to one Customers;
	WOHeader_Nav: Association to one MyWorkOrderHeaders;
}
entity MyWorkOrderSales 
 {
	AccountingIndicator: String;
	ContractDateFrom: DateTime;
	ContractDateTo: DateTime;
	ContractDesc: String;
	ContractItemNum: String;
	Customer: String;
	CustomerReference: String;
	CustomerReferenceDate: DateTime;
	DistributionChannel: String;
	Division: String;
	ObjectNum: String;
	key OrderId: String;
	ProductDesc: String;
	Quantity: Decimal;
	QuantityUOM: String;
	SalesGroup: String;
	SalesOrg: String;
	ServiceContract: String;
	ServiceProduct: String;
	Customer_Nav: Association to one Customers;
	WOHeader_Nav: Association to one MyWorkOrderHeaders;
}
entity MyWorkOrderSubOpLongTexts 
 {
	NewTextString: String;
	ObjectKey: String;
	key OperationNo: String;
	key OrderId: String;
	key SubOperationNo: String;
	TextId: String;
	TextObjType: String;
	TextString: String;
	WorkOrderSubOperation: Association to one MyWorkOrderSubOperations;
}
entity MyWorkOrderSubOpLongTexts 
 {
	NewTextString: String;
	ObjectKey: String;
	key OperationNo: String;
	key OrderId: String;
	key SubOperationNo: String;
	TextId: String;
	TextObjType: String;
	TextString: String;
	WorkOrderSubOperation: Association to one MyWorkOrderSubOperations;
}
entity MyWorkOrderSubOperations 
 {
	ActivityType: String;
	ControlKey: String;
	MainWorkCenter: String;
	MainWorkCenterPlant: String;
	MaintenancePlant: String;
	NotifNum: String;
	ObjectKey: String;
	ObjectType: String;
	OperationEquipment: String;
	OperationFunctionLocation: String;
	key OperationNo: String;
	OperationShortText: String;
	key OrderId: String;
	PersonNum: String;
	key SubOperationNo: String;
	WorkCenterInternalId: String;
	Confirmations: Association to many Confirmations on Confirmations.SubOperation = $self;
	EquipmentSubOperation: Association to many MyEquipments on EquipmentSubOperation.OperationEquipment = $self;
	FunctionalLocationSubOperation: Association to many MyFunctionalLocations on FunctionalLocationSubOperation.OperationFunctionLocation = $self;
	NotifHeader_Nav: Association to many MyNotificationHeaders on NotifHeader_Nav.NotifNum = $self;
	SubOpMobileStatus_Nav: Association to many PMMobileStatuses on SubOpMobileStatus_Nav.SubOperationNo = $self;
	SubOperationLongText: Association to many MyWorkOrderSubOpLongTexts on SubOperationLongText.SubOperationNo = $self;
	UserTimeEntry_Nav: Association to many UserTimeEntries on UserTimeEntry_Nav.OperationNo = $self;
	WOObjectList_Nav: Association to many MyWorkOrderObjectLists on WOObjectList_Nav.OperationNo = $self;
	WOSubOperationCatsTimesheet: Association to many CatsTimesheets on WOSubOperationCatsTimesheet.SubOperation = $self;
	WOTransfer: Association to many WorkOrderTransfers on WOTransfer.SubOperationNo = $self;
	WorkOrderOperation: Association to one MyWorkOrderOperations;
}
entity MyWorkOrderSubOperations 
 {
	ActivityType: String;
	ControlKey: String;
	MainWorkCenter: String;
	MainWorkCenterPlant: String;
	MaintenancePlant: String;
	NotifNum: String;
	ObjectKey: String;
	ObjectType: String;
	OperationEquipment: String;
	OperationFunctionLocation: String;
	key OperationNo: String;
	OperationShortText: String;
	key OrderId: String;
	PersonNum: String;
	key SubOperationNo: String;
	WorkCenterInternalId: String;
	Confirmations: Association to many Confirmations on Confirmations.SubOperation = $self;
	EquipmentSubOperation: Association to many MyEquipments on EquipmentSubOperation.OperationEquipment = $self;
	FunctionalLocationSubOperation: Association to many MyFunctionalLocations on FunctionalLocationSubOperation.OperationFunctionLocation = $self;
	NotifHeader_Nav: Association to many MyNotificationHeaders on NotifHeader_Nav.NotifNum = $self;
	SubOpMobileStatus_Nav: Association to many PMMobileStatuses on SubOpMobileStatus_Nav.SubOperationNo = $self;
	SubOperationLongText: Association to many MyWorkOrderSubOpLongTexts on SubOperationLongText.SubOperationNo = $self;
	UserTimeEntry_Nav: Association to many UserTimeEntries on UserTimeEntry_Nav.OperationNo = $self;
	WOObjectList_Nav: Association to many MyWorkOrderObjectLists on WOObjectList_Nav.OperationNo = $self;
	WOSubOperationCatsTimesheet: Association to many CatsTimesheets on WOSubOperationCatsTimesheet.SubOperation = $self;
	WOTransfer: Association to many WorkOrderTransfers on WOTransfer.SubOperationNo = $self;
	WorkOrderOperation: Association to one MyWorkOrderOperations;
}
entity MyWorkOrderToolLongTexts 
 {
	key ItemCounter: String;
	NewTextString: String;
	ObjectKey: String;
	key OperationNo: String;
	key OrderId: String;
	PRTNo: String;
	TextId: String;
	TextObjectType: String;
	TextString: String;
	WOTool_Nav: Association to one MyWorkOrderTools;
}
entity MyWorkOrderToolLongTexts 
 {
	key ItemCounter: String;
	NewTextString: String;
	ObjectKey: String;
	key OperationNo: String;
	key OrderId: String;
	PRTNo: String;
	TextId: String;
	TextObjectType: String;
	TextString: String;
	WOTool_Nav: Association to one MyWorkOrderTools;
}
entity MyWorkOrderTools 
 {
	ControlKey: String;
	Description: String;
	DocumentID: String;
	DocumentNumber: String;
	DocumentPart: String;
	DocumentType: String;
	DocumentVersion: String;
	Duration: Decimal;
	Equipment: String;
	key ItemCounter: String;
	ItemCounterChar: String;
	ItemNum: String;
	Material: String;
	ObjectId: String;
	ObjectNum: String;
	ObjectType: String;
	key OperationNo: String;
	key OrderId: String;
	PRTCategory: String;
	PRTNumber: String;
	PRTPlant: String;
	PRTText: String;
	PRTTool: String;
	Point: String;
	Quantity: Decimal;
	QuantityUOM: String;
	UsageUOM: String;
	UsageValue: Decimal;
	PRTDocument: Association to many Documents on PRTDocument.DocumentID = $self;
	PRTEquipment: Association to many MyEquipments on PRTEquipment.Equipment = $self;
	PRTMaterial: Association to one Materials;
	PRTPoint: Association to one MeasuringPoints;
	WOOperation_Nav: Association to one MyWorkOrderOperations;
	WOToolLongText_Nav: Association to many MyWorkOrderToolLongTexts on WOToolLongText_Nav.ItemCounter = $self;
}
entity MyWorkOrderTools 
 {
	ControlKey: String;
	Description: String;
	DocumentID: String;
	DocumentNumber: String;
	DocumentPart: String;
	DocumentType: String;
	DocumentVersion: String;
	Duration: Decimal;
	Equipment: String;
	key ItemCounter: String;
	ItemCounterChar: String;
	ItemNum: String;
	Material: String;
	ObjectId: String;
	ObjectNum: String;
	ObjectType: String;
	key OperationNo: String;
	key OrderId: String;
	PRTCategory: String;
	PRTNumber: String;
	PRTPlant: String;
	PRTText: String;
	PRTTool: String;
	Point: String;
	Quantity: Decimal;
	QuantityUOM: String;
	UsageUOM: String;
	UsageValue: Decimal;
	PRTDocument: Association to many Documents on PRTDocument.DocumentID = $self;
	PRTEquipment: Association to many MyEquipments on PRTEquipment.Equipment = $self;
	PRTMaterial: Association to one Materials;
	PRTPoint: Association to one MeasuringPoints;
	WOOperation_Nav: Association to one MyWorkOrderOperations;
	WOToolLongText_Nav: Association to many MyWorkOrderToolLongTexts on WOToolLongText_Nav.ItemCounter = $self;
}
entity NotifPartnerDetProcs 
 {
	IsUnique: String;
	MaintainAppointments: String;
	NoChangePossible: String;
	NotifCategory: String;
	NotifCategoryDesc: String;
	NotifOrigin: String;
	key NotifType: String;
	NotifTypeDesc: String;
	OriginTable: String;
	PartnerDetAtEnd: String;
	PartnerDeterminationDescription: String;
	PartnerDeterminationProcedure: String;
	key PartnerFunction: String;
	PartnerIsMandatory: String;
	Sequence: Int16;
	SourceFunction: String;
	NotifType_Nav: Association to one NotificationTypes;
	PartnerFunction_Nav: Association to one PartnerFunctions;
}
entity NotifPartnerDetProcs 
 {
	IsUnique: String;
	MaintainAppointments: String;
	NoChangePossible: String;
	NotifCategory: String;
	NotifCategoryDesc: String;
	NotifOrigin: String;
	key NotifType: String;
	NotifTypeDesc: String;
	OriginTable: String;
	PartnerDetAtEnd: String;
	PartnerDeterminationDescription: String;
	PartnerDeterminationProcedure: String;
	key PartnerFunction: String;
	PartnerIsMandatory: String;
	Sequence: Int16;
	SourceFunction: String;
	NotifType_Nav: Association to one NotificationTypes;
	PartnerFunction_Nav: Association to one PartnerFunctions;
}
entity NotificationHistories 
 {
	BreakDown: String;
	CompletionDate: DateTime;
	CompletionTime: Time;
	Description: String;
	EquipId: String;
	FuncLocIdIntern: String;
	MainWorkCenter: String;
	MalfunctionEndDate: DateTime;
	MalfunctionEndTime: Time;
	MalfunctionStartDate: DateTime;
	MalfunctionStartTime: Time;
	key NotificationNumber: String;
	NotificationType: String;
	OrderId: String;
	PM_OBJTY: String;
	PersonRespName: String;
	PersonRespNum: String;
	PlannerGroup: String;
	PlanningPlant: String;
	Priority: String;
	PriorityType: String;
	key ReferenceType: String;
	RequiredEndDate: DateTime;
	RequiredEndTime: Time;
	RequiredStartDate: DateTime;
	RequiredStartTime: Time;
	key TechObject: String;
	WorkCenter: String;
	Employee_Nav: Association to one Employees;
	Equipment_Nav: Association to many MyEquipments on Equipment_Nav.EquipId = $self;
	FuncLoc_Nav: Association to many MyFunctionalLocations on FuncLoc_Nav.FuncLocIdIntern = $self;
	HistoryLongText_Nav: Association to one NotificationHistoryTexts;
	HistoryPriority_Nav: Association to many Priorities on HistoryPriority_Nav.Priority = $self;
	NotificationHeader_Nav: Association to one MyNotificationHeaders;
	PlannerGroup_Nav: Association to one PlannerGroups;
	RelatedWO_Nav: Association to many MyWorkOrderHeaders on RelatedWO_Nav.OrderId = $self;
	WorkCenter_Nav: Association to one WorkCenters;
}
entity NotificationHistories 
 {
	BreakDown: String;
	CompletionDate: DateTime;
	CompletionTime: Time;
	Description: String;
	EquipId: String;
	FuncLocIdIntern: String;
	MainWorkCenter: String;
	MalfunctionEndDate: DateTime;
	MalfunctionEndTime: Time;
	MalfunctionStartDate: DateTime;
	MalfunctionStartTime: Time;
	key NotificationNumber: String;
	NotificationType: String;
	OrderId: String;
	PM_OBJTY: String;
	PersonRespName: String;
	PersonRespNum: String;
	PlannerGroup: String;
	PlanningPlant: String;
	Priority: String;
	PriorityType: String;
	key ReferenceType: String;
	RequiredEndDate: DateTime;
	RequiredEndTime: Time;
	RequiredStartDate: DateTime;
	RequiredStartTime: Time;
	key TechObject: String;
	WorkCenter: String;
	Employee_Nav: Association to one Employees;
	Equipment_Nav: Association to many MyEquipments on Equipment_Nav.EquipId = $self;
	FuncLoc_Nav: Association to many MyFunctionalLocations on FuncLoc_Nav.FuncLocIdIntern = $self;
	HistoryLongText_Nav: Association to one NotificationHistoryTexts;
	HistoryPriority_Nav: Association to many Priorities on HistoryPriority_Nav.Priority = $self;
	NotificationHeader_Nav: Association to one MyNotificationHeaders;
	PlannerGroup_Nav: Association to one PlannerGroups;
	RelatedWO_Nav: Association to many MyWorkOrderHeaders on RelatedWO_Nav.OrderId = $self;
	WorkCenter_Nav: Association to one WorkCenters;
}
entity NotificationHistoryTexts 
 {
	key NotificationNumber: String;
	ObjectKey: String;
	TextId: String;
	TextObjectType: String;
	TextString: String;
	NotifHistory_Nav: Association to one NotificationHistories;
}
entity NotificationHistoryTexts 
 {
	key NotificationNumber: String;
	ObjectKey: String;
	TextId: String;
	TextObjectType: String;
	TextString: String;
	NotifHistory_Nav: Association to one NotificationHistories;
}
entity NotificationTypes 
 {
	CatTypeActivities: String;
	CatTypeCauses: String;
	CatTypeCoding: String;
	CatTypeDefects: String;
	CatTypeObjectParts: String;
	CatTypeTasks: String;
	CatalogProfile: String;
	Description: String;
	EAMOverallStatusProfile: String;
	NotifCategory: String;
	key NotifType: String;
	OrderType: String;
	PriorityType: String;
	PartnerDetProc_Nav: Association to many NotifPartnerDetProcs on PartnerDetProc_Nav.NotifType = $self;
}
entity NotificationTypes 
 {
	CatTypeActivities: String;
	CatTypeCauses: String;
	CatTypeCoding: String;
	CatTypeDefects: String;
	CatTypeObjectParts: String;
	CatTypeTasks: String;
	CatalogProfile: String;
	Description: String;
	EAMOverallStatusProfile: String;
	NotifCategory: String;
	key NotifType: String;
	OrderType: String;
	PriorityType: String;
	PartnerDetProc_Nav: Association to many NotifPartnerDetProcs on PartnerDetProc_Nav.NotifType = $self;
}
entity ObjectFormCategories 
 {
	EquipId: String;
	key FormCategory: String;
	FormCategoryDesc: String;
	FuncLocIdIntern: String;
	key ObjectId: String;
	PublishedAssessCount: String;
	UnPublishedAssessCount: String;
	EquipmentFormCategory_Nav: Association to many MyEquipments on EquipmentFormCategory_Nav.EquipId = $self;
	FormCategoryTemplates_Nav: Association to many ObjectFormTemplate on FormCategoryTemplates_Nav.ObjectId = $self;
	FuncLocFormCategory_Nav: Association to many MyFunctionalLocations on FuncLocFormCategory_Nav.FuncLocIdIntern = $self;
}
entity OnDemandObjects 
 {
	Action: String;
	key ObjectId: String;
	key ObjectType: String;
}
entity OnDemandObjects 
 {
	Action: String;
	key ObjectId: String;
	key ObjectType: String;
}
entity OrderActivityTypes 
 {
	key ActivityType: String;
	key OrderType: String;
}
entity OrderActivityTypes 
 {
	key ActivityType: String;
	key OrderType: String;
}
entity OrderISULinks 
 {
	key ConnectionObject: String;
	key DeviceCategory: String;
	key DeviceLocation: String;
	key DisconnectionNum: String;
	key EquipmentNum: String;
	key FunctionalLoc: String;
	key ISUProcess: String;
	key Installation: String;
	key OrderNum: String;
	key Premise: String;
	key SerialNum: String;
	ConnectionObject_Nav: Association to many ConnectionObjects on ConnectionObject_Nav.ConnectionObject = $self;
	DeviceCategory_Nav: Association to one DeviceCategories;
	DeviceLocation_Nav: Association to many DeviceLocations on DeviceLocation_Nav.DeviceLocation = $self;
	Device_Nav: Association to one Devices;
	Installation_Nav: Association to many Installations on Installation_Nav.Installation = $self;
	Premise_Nav: Association to many Premises on Premise_Nav.Premise = $self;
	Workorder_Nav: Association to one MyWorkOrderHeaders;
}
entity OrderTypePartners 
 {
	key OrderType: String;
	OrderType_Nav: Association to many OrderTypes on OrderType_Nav.OrderType = $self;
	PartnerDetProc_Nav: Association to many PartnerDetProcs on PartnerDetProc_Nav.OrderType = $self;
}
entity OrderTypePartners 
 {
	key OrderType: String;
	OrderType_Nav: Association to many OrderTypes on OrderType_Nav.OrderType = $self;
	PartnerDetProc_Nav: Association to many PartnerDetProcs on PartnerDetProc_Nav.OrderType = $self;
}
entity OrderTypes 
 {
	AutChecklistGen: String;
	AutObjectListGen: String;
	ControlKey: String;
	DocumentType: String;
	EAMNotifType: String;
	EAMOverallStatusProfile: String;
	InspectionType: String;
	MaintActType: String;
	NotifType: String;
	ObjectListAssignment: String;
	OneQNotifPerLotFlag: String;
	key OrderType: String;
	OrderTypeDesc: String;
	key PlanningPlant: String;
	PlantDescription: String;
	PriorityType: String;
	QMNotifType: String;
	ServiceType: String;
	ShopPaper: String;
	StorageCategory: String;
	UDCodeVersion: String;
	UDSelectedSet: String;
	ValauationArea: String;
	OrderTypePartner_Nav: Association to one OrderTypePartners;
}
entity OrderTypes 
 {
	AutChecklistGen: String;
	AutObjectListGen: String;
	ControlKey: String;
	DocumentType: String;
	EAMNotifType: String;
	EAMOverallStatusProfile: String;
	InspectionType: String;
	MaintActType: String;
	NotifType: String;
	ObjectListAssignment: String;
	OneQNotifPerLotFlag: String;
	key OrderType: String;
	OrderTypeDesc: String;
	key PlanningPlant: String;
	PlantDescription: String;
	PriorityType: String;
	QMNotifType: String;
	ServiceType: String;
	ShopPaper: String;
	StorageCategory: String;
	UDCodeVersion: String;
	UDSelectedSet: String;
	ValauationArea: String;
	OrderTypePartner_Nav: Association to one OrderTypePartners;
}
entity OutboundDeliveries 
 {
	ActualGoodsMvtDate: DateTime;
	DeliveryBlock: String;
	DeliveryDate: DateTime;
	key DeliveryNum: String;
	DeliveryPriority: String;
	DeliveryType: String;
	DocumentCategory: String;
	GoodsMvtStatus: String;
	NumPackages: Int32;
	OverallStatus: String;
	ReceivingPlant: String;
	ShipToParty: String;
	ShippingConditions: String;
	ShippingPoint: String;
	TotalWeight: Decimal;
	UnloadingPoint: String;
	Vendor: String;
	WeightUnit: String;
	BlockingStatus_Nav: Association to many BlockingStatuses on BlockingStatus_Nav.DeliveryBlock = $self;
	Customer_Nav: Association to many Customers on Customer_Nav.ShipToParty = $self;
	DeliveryPriority_Nav: Association to many DeliveryPriorities on DeliveryPriority_Nav.DeliveryPriority = $self;
	Items_Nav: Association to many OutboundDeliveryItems on Items_Nav.DeliveryNum = $self;
	MaterialDocItem_Nav: Association to many MaterialDocItems on MaterialDocItem_Nav.Delivery = $self;
	MyInventoryObject_Nav: Association to one MyInventoryObjects;
}
entity OutboundDeliveries 
 {
	ActualGoodsMvtDate: DateTime;
	DeliveryBlock: String;
	DeliveryDate: DateTime;
	key DeliveryNum: String;
	DeliveryPriority: String;
	DeliveryType: String;
	DocumentCategory: String;
	GoodsMvtStatus: String;
	NumPackages: Int32;
	OverallStatus: String;
	ReceivingPlant: String;
	ShipToParty: String;
	ShippingConditions: String;
	ShippingPoint: String;
	TotalWeight: Decimal;
	UnloadingPoint: String;
	Vendor: String;
	WeightUnit: String;
	BlockingStatus_Nav: Association to many BlockingStatuses on BlockingStatus_Nav.DeliveryBlock = $self;
	Customer_Nav: Association to many Customers on Customer_Nav.ShipToParty = $self;
	DeliveryPriority_Nav: Association to many DeliveryPriorities on DeliveryPriority_Nav.DeliveryPriority = $self;
	Items_Nav: Association to many OutboundDeliveryItems on Items_Nav.DeliveryNum = $self;
	MaterialDocItem_Nav: Association to many MaterialDocItems on MaterialDocItem_Nav.Delivery = $self;
	MyInventoryObject_Nav: Association to one MyInventoryObjects;
}
entity OutboundDeliveryItems 
 {
	Batch: String;
	key DeliveryNum: String;
	DenominatorConvertSKU: Decimal;
	GoodsMvmtStatus: String;
	key Item: String;
	ItemCategory: String;
	ItemGMRelevant: String;
	ItemType: String;
	Material: String;
	MovementType: String;
	NumeratorConvertSKU: Decimal;
	PickedDiffQuantity: Decimal;
	PickedQuantity: Decimal;
	Plant: String;
	Quantity: Decimal;
	ReasonForMovement: String;
	SalesUnit: String;
	StorageBin: String;
	StorageLocation: String;
	UOM: String;
	WMStatus: String;
	MaterialDocItem_Nav: Association to many MaterialDocItems on MaterialDocItem_Nav.DeliveryItem = $self;
	MaterialPlant_Nav: Association to many MaterialPlants on MaterialPlant_Nav.Plant = $self;
	Material_Nav: Association to one Materials;
	OutboundDeliverySerial_Nav: Association to many OutboundDeliverySerials on OutboundDeliverySerial_Nav.DeliveryNum = $self;
	OutboundDelivery_Nav: Association to one OutboundDeliveries;
}
entity OutboundDeliveryItems 
 {
	Batch: String;
	key DeliveryNum: String;
	DenominatorConvertSKU: Decimal;
	GoodsMvmtStatus: String;
	key Item: String;
	ItemCategory: String;
	ItemGMRelevant: String;
	ItemType: String;
	Material: String;
	MovementType: String;
	NumeratorConvertSKU: Decimal;
	PickedDiffQuantity: Decimal;
	PickedQuantity: Decimal;
	Plant: String;
	Quantity: Decimal;
	ReasonForMovement: String;
	SalesUnit: String;
	StorageBin: String;
	StorageLocation: String;
	UOM: String;
	WMStatus: String;
	MaterialDocItem_Nav: Association to many MaterialDocItems on MaterialDocItem_Nav.DeliveryItem = $self;
	MaterialPlant_Nav: Association to many MaterialPlants on MaterialPlant_Nav.Plant = $self;
	Material_Nav: Association to one Materials;
	OutboundDeliverySerial_Nav: Association to many OutboundDeliverySerials on OutboundDeliverySerial_Nav.DeliveryNum = $self;
	OutboundDelivery_Nav: Association to one OutboundDeliveries;
}
entity OutboundDeliverySerials 
 {
	key DeliveryNum: String;
	key Item: String;
	key SerialNumber: String;
	OutboundDeliveryItem_Nav: Association to one OutboundDeliveryItems;
}
entity OutboundDeliverySerials 
 {
	key DeliveryNum: String;
	key Item: String;
	key SerialNumber: String;
	OutboundDeliveryItem_Nav: Association to one OutboundDeliveryItems;
}
entity PMAuthorizationGroups 
 {
	AuthGroupText: String;
	key AuthorizationGroup: String;
}
entity PMAuthorizationGroups 
 {
	AuthGroupText: String;
	key AuthorizationGroup: String;
}
entity PMCatalogCodes 
 {
	key Catalog: String;
	key Code: String;
	CodeDescription: String;
	key CodeGroup: String;
	CodeGroupDesc: String;
	CodeGroupStatus: String;
	DateChanged: DateTime;
	DateCreated: DateTime;
	DefectClass: String;
	ValidFromDate: DateTime;
	version: String;
	DefectClass_Nav: Association to many DefectClasses on DefectClass_Nav.DefectClass = $self;
}
entity PMCatalogCodes 
 {
	key Catalog: String;
	key Code: String;
	CodeDescription: String;
	key CodeGroup: String;
	CodeGroupDesc: String;
	CodeGroupStatus: String;
	DateChanged: DateTime;
	DateCreated: DateTime;
	DefectClass: String;
	ValidFromDate: DateTime;
	version: String;
	DefectClass_Nav: Association to many DefectClasses on DefectClass_Nav.DefectClass = $self;
}
entity PMCatalogProfiles 
 {
	key Catalog: String;
	CatalogClassif: String;
	key CatalogProfile: String;
	CatalogProfileDesc: String;
	key CodeGroup: String;
	CodeGroupStatus: String;
	Description: String;
	NotifCategory: String;
	Status: String;
}
entity PMCatalogProfiles 
 {
	key Catalog: String;
	CatalogClassif: String;
	key CatalogProfile: String;
	CatalogProfileDesc: String;
	key CodeGroup: String;
	CodeGroupStatus: String;
	Description: String;
	NotifCategory: String;
	Status: String;
}
entity PMMobileStatusHistories 
 {
	BeginTimeCounter: Int32;
	BusinessObjectType: String;
	CarriedOutBy: String;
	CarriedOutDate: DateTime;
	CarriedOutTime: Time;
	CreateUserGUID: String;
	CreateUserId: String;
	EAMOverallStatus: String;
	EAMOverallStatusProfile: String;
	EffectiveTimestamp: DateTime;
	EndTimeCounter: Int32;
	ItemNum: String;
	MobileStatus: String;
	NotifNum: String;
	NotificationRefDate: DateTime;
	NotificationRefTime: Time;
	key ObjectKey: String;
	ObjectType: String;
	OperationNo: String;
	OrderId: String;
	ReasonCode: String;
	key RecordNumber: String;
	S4ItemNum: String;
	S4ObjectID: String;
	S4ObjectTypeH: String;
	SortField: String;
	Status: String;
	StatusAttribute1: String;
	StatusAttribute2: String;
	SubOperationNo: String;
	TaskNum: String;
	UpdateUserGUID: String;
	WOHeader: String;
	MyWorkOrderHeader_Nav: Association to many MyWorkOrderHeaders on MyWorkOrderHeader_Nav.OrderId = $self;
	MyWorkOrderOperation_Nav: Association to many MyWorkOrderOperations on MyWorkOrderOperation_Nav.OperationNo = $self;
	MyWorkOrderSubOperation_Nav: Association to many MyWorkOrderSubOperations on MyWorkOrderSubOperation_Nav.OrderId = $self;
	PMMobileStatus_Nav: Association to one PMMobileStatuses;
}
entity PMMobileStatusHistories 
 {
	BeginTimeCounter: Int32;
	BusinessObjectType: String;
	CarriedOutBy: String;
	CarriedOutDate: DateTime;
	CarriedOutTime: Time;
	CreateUserGUID: String;
	CreateUserId: String;
	EAMOverallStatus: String;
	EAMOverallStatusProfile: String;
	EffectiveTimestamp: DateTime;
	EndTimeCounter: Int32;
	ItemNum: String;
	MobileStatus: String;
	NotifNum: String;
	NotificationRefDate: DateTime;
	NotificationRefTime: Time;
	key ObjectKey: String;
	ObjectType: String;
	OperationNo: String;
	OrderId: String;
	ReasonCode: String;
	key RecordNumber: String;
	S4ItemNum: String;
	S4ObjectID: String;
	S4ObjectTypeH: String;
	SortField: String;
	Status: String;
	StatusAttribute1: String;
	StatusAttribute2: String;
	SubOperationNo: String;
	TaskNum: String;
	UpdateUserGUID: String;
	WOHeader: String;
	MyWorkOrderHeader_Nav: Association to many MyWorkOrderHeaders on MyWorkOrderHeader_Nav.OrderId = $self;
	MyWorkOrderOperation_Nav: Association to many MyWorkOrderOperations on MyWorkOrderOperation_Nav.OperationNo = $self;
	MyWorkOrderSubOperation_Nav: Association to many MyWorkOrderSubOperations on MyWorkOrderSubOperation_Nav.OrderId = $self;
	PMMobileStatus_Nav: Association to one PMMobileStatuses;
}
entity PMMobileStatuses 
 {
	BeginTimeCounter: Int32;
	BusinessObjectType: String;
	CarriedOutBy: String;
	CarriedOutDate: DateTime;
	CarriedOutTime: Time;
	CreateUserGUID: String;
	CreateUserId: String;
	EAMOverallStatus: String;
	EAMOverallStatusProfile: String;
	EffectiveTimestamp: DateTime;
	EndTimeCounter: Int32;
	ItemNum: String;
	MobileStatus: String;
	NotifNum: String;
	NotificationRefDate: DateTime;
	NotificationRefTime: Time;
	key ObjectKey: String;
	ObjectType: String;
	OperationNo: String;
	OrderId: String;
	ReasonCode: String;
	RoleType: String;
	S4ItemNum: String;
	S4ObjectID: String;
	S4ObjectTypeH: String;
	S4RejectionCode: String;
	SortField: String;
	Status: String;
	StatusAttribute1: String;
	StatusAttribute2: String;
	StatusProfile: String;
	SubOperationNo: String;
	SystemStatus: String;
	SystemStatusCode: String;
	TaskNum: String;
	UpdateUserGUID: String;
	UserStatus: String;
	UserStatusCode: String;
	WOHeader: String;
	NotifHeader_Nav: Association to many MyNotificationHeaders on NotifHeader_Nav.SortField = $self;
	NotifItemTask_Nav: Association to many MyNotificationItemTasks on NotifItemTask_Nav.TaskNum = $self;
	NotifTask_Nav: Association to many MyNotificationTasks on NotifTask_Nav.TaskNum = $self;
	OverallStatusCfg_Nav: Association to one EAMOverallStatusConfigs;
	PMMobileStatusHistory_Nav: Association to many PMMobileStatusHistories on PMMobileStatusHistory_Nav.ObjectKey = $self;
	RejectionReason_Nav: Association to many RejectionReasons on RejectionReason_Nav.ReasonCode = $self;
	WOHeader_Nav: Association to many MyWorkOrderHeaders on WOHeader_Nav.SortField = $self;
	WOHistory_Nav: Association to one WorkOrderHistories;
	WOOperation_Nav: Association to many MyWorkOrderOperations on WOOperation_Nav.SortField = $self;
	WOSubOperation_Nav: Association to many MyWorkOrderSubOperations on WOSubOperation_Nav.SubOperationNo = $self;
}
entity PMMobileStatuses 
 {
	BeginTimeCounter: Int32;
	BusinessObjectType: String;
	CarriedOutBy: String;
	CarriedOutDate: DateTime;
	CarriedOutTime: Time;
	CreateUserGUID: String;
	CreateUserId: String;
	EAMOverallStatus: String;
	EAMOverallStatusProfile: String;
	EffectiveTimestamp: DateTime;
	EndTimeCounter: Int32;
	ItemNum: String;
	MobileStatus: String;
	NotifNum: String;
	NotificationRefDate: DateTime;
	NotificationRefTime: Time;
	key ObjectKey: String;
	ObjectType: String;
	OperationNo: String;
	OrderId: String;
	ReasonCode: String;
	RoleType: String;
	S4ItemNum: String;
	S4ObjectID: String;
	S4ObjectTypeH: String;
	S4RejectionCode: String;
	SortField: String;
	Status: String;
	StatusAttribute1: String;
	StatusAttribute2: String;
	StatusProfile: String;
	SubOperationNo: String;
	SystemStatus: String;
	SystemStatusCode: String;
	TaskNum: String;
	UpdateUserGUID: String;
	UserStatus: String;
	UserStatusCode: String;
	WOHeader: String;
	NotifHeader_Nav: Association to many MyNotificationHeaders on NotifHeader_Nav.SortField = $self;
	NotifItemTask_Nav: Association to many MyNotificationItemTasks on NotifItemTask_Nav.TaskNum = $self;
	NotifTask_Nav: Association to many MyNotificationTasks on NotifTask_Nav.TaskNum = $self;
	OverallStatusCfg_Nav: Association to one EAMOverallStatusConfigs;
	PMMobileStatusHistory_Nav: Association to many PMMobileStatusHistories on PMMobileStatusHistory_Nav.ObjectKey = $self;
	RejectionReason_Nav: Association to many RejectionReasons on RejectionReason_Nav.ReasonCode = $self;
	WOHeader_Nav: Association to many MyWorkOrderHeaders on WOHeader_Nav.SortField = $self;
	WOHistory_Nav: Association to one WorkOrderHistories;
	WOOperation_Nav: Association to many MyWorkOrderOperations on WOOperation_Nav.SortField = $self;
	WOSubOperation_Nav: Association to many MyWorkOrderSubOperations on WOSubOperation_Nav.SubOperationNo = $self;
}
entity PRTCategories 
 {
	key PRTCategory: String;
	PRTCategoryDesc: String;
	MyWorkOrderTools_Nav: Association to many MyWorkOrderTools on MyWorkOrderTools_Nav.PRTCategory = $self;
}
entity PRTCategories 
 {
	key PRTCategory: String;
	PRTCategoryDesc: String;
	MyWorkOrderTools_Nav: Association to many MyWorkOrderTools on MyWorkOrderTools_Nav.PRTCategory = $self;
}
entity PRTControlKeys 
 {
	key PRTControlKey: String;
	PRTControlKeyDesc: String;
	MyWorkOrderTools_Nav: Association to many MyWorkOrderTools on MyWorkOrderTools_Nav.ControlKey = $self;
}
entity PRTControlKeys 
 {
	key PRTControlKey: String;
	PRTControlKeyDesc: String;
	MyWorkOrderTools_Nav: Association to many MyWorkOrderTools on MyWorkOrderTools_Nav.ControlKey = $self;
}
entity PartnerDetProcs 
 {
	IsUnique: String;
	MaintainAppointments: String;
	NoChangePossible: String;
	OrderText: String;
	key OrderType: String;
	OriginTable: String;
	PartnerDetAtEnd: String;
	PartnerDeterminationDescription: String;
	PartnerDeterminationProcedure: String;
	key PartnerFunction: String;
	PartnerIsMandatory: String;
	Sequence: Int16;
	SourceFunction: String;
	OrderTypePartner_Nav: Association to one OrderTypePartners;
	PartnerFunction_Nav: Association to one PartnerFunctions;
}
entity PartnerDetProcs 
 {
	IsUnique: String;
	MaintainAppointments: String;
	NoChangePossible: String;
	OrderText: String;
	key OrderType: String;
	OriginTable: String;
	PartnerDetAtEnd: String;
	PartnerDeterminationDescription: String;
	PartnerDeterminationProcedure: String;
	key PartnerFunction: String;
	PartnerIsMandatory: String;
	Sequence: Int16;
	SourceFunction: String;
	OrderTypePartner_Nav: Association to one OrderTypePartners;
	PartnerFunction_Nav: Association to one PartnerFunctions;
}
entity PartnerFunctions 
 {
	Description: String;
	key PartnerFunction: String;
	PartnerType: String;
	MyEquipPartner_Nav: Association to many MyEquipPartners on MyEquipPartner_Nav.PartnerFunction = $self;
	MyFuncLocPartner_Nav: Association to many MyFuncLocPartners on MyFuncLocPartner_Nav.PartnerFunction = $self;
	MyNotifPartner_Nav: Association to many MyNotificationPartners on MyNotifPartner_Nav.PartnerFunction = $self;
	MyWorkOrderPartner_Nav: Association to many MyWorkOrderPartners on MyWorkOrderPartner_Nav.PartnerFunction = $self;
	NotifPartnerDetProc_Nav: Association to many NotifPartnerDetProcs on NotifPartnerDetProc_Nav.PartnerFunction = $self;
	PartnerDetProc_Nav: Association to many PartnerDetProcs on PartnerDetProc_Nav.PartnerFunction = $self;
}
entity PartnerFunctions 
 {
	Description: String;
	key PartnerFunction: String;
	PartnerType: String;
	MyEquipPartner_Nav: Association to many MyEquipPartners on MyEquipPartner_Nav.PartnerFunction = $self;
	MyFuncLocPartner_Nav: Association to many MyFuncLocPartners on MyFuncLocPartner_Nav.PartnerFunction = $self;
	MyNotifPartner_Nav: Association to many MyNotificationPartners on MyNotifPartner_Nav.PartnerFunction = $self;
	MyWorkOrderPartner_Nav: Association to many MyWorkOrderPartners on MyWorkOrderPartner_Nav.PartnerFunction = $self;
	NotifPartnerDetProc_Nav: Association to many NotifPartnerDetProcs on NotifPartnerDetProc_Nav.PartnerFunction = $self;
	PartnerDetProc_Nav: Association to many PartnerDetProcs on PartnerDetProc_Nav.PartnerFunction = $self;
}
entity PeriodicMeterReadings 
 {
	ActualMeterReadingDate: DateTime;
	ActualMeterReadingTime: String;
	DateMaxRead: DateTime;
	EquipmentNum: String;
	EstimatedResult: String;
	EstimatedResultFloat: Double;
	MeterReaderNote: String;
	MeterReaderNum: String;
	MeterReadingDate: DateTime;
	key MeterReadingDocID: String;
	MeterReadingReason: String;
	MeterReadingRecorded: Double;
	MeterReadingStatus: String;
	MeterReadingTime: String;
	MeterReadingType: String;
	MeterReadingUnit: String;
	OrderNum: String;
	PreviousReading: String;
	PreviousReadingDate: DateTime;
	PreviousReadingFloat: Double;
	PreviousReadingStatus: String;
	PreviousReadingTime: String;
	PreviousReadingTimestamp: DateTime;
	Register: String;
	RegisterGroup: String;
	SchedMeterReadingDate: DateTime;
	TimeMaxReading: String;
	Device_Nav: Association to many Devices on Device_Nav.EquipmentNum = $self;
	MeterReadingLimit_Nav: Association to many MeterReadingLimits on MeterReadingLimit_Nav.Register = $self;
	MeterReadingUnit_Nav: Association to many MeterReadingUnits on MeterReadingUnit_Nav.MeterReadingUnit = $self;
	RegisterGroup_Nav: Association to one RegisterGroups;
}
entity PhaseControlCodes 
 {
	AuthorizationKey: String;
	BlockingSubPhase: String;
	Description: String;
	EnteringPhase: String;
	EnteringSubPhase: String;
	key Entity: String;
	key OrderType: String;
	OvrlStsProfile: String;
	Phase: String;
	key PhaseControl: String;
	SetAutomatically: String;
	StatusProfile: String;
	Userstatus: String;
	PhaseControl_Nav: Association to many PhaseControls on PhaseControl_Nav.PhaseControl = $self;
}
entity PhaseControlKeys 
 {
	Description: String;
	key PhaseControlKey: String;
	PhaseControlSystemStatus_Nav: Association to many PhaseControlSystemStatuses on PhaseControlSystemStatus_Nav.PhaseControlKey = $self;
	PhaseControl_Nav: Association to many PhaseControls on PhaseControl_Nav.PhaseControlKey = $self;
	WOOperationPhaseControl_Nav: Association to many WorkOrderOperationPhaseControls on WOOperationPhaseControl_Nav.PhaseControlKey = $self;
	WorkOrderPhaseControl_Nav: Association to many WorkOrderPhaseControls on WorkOrderPhaseControl_Nav.PhaseControlKey = $self;
}
entity PhaseControlSystemStatuses 
 {
	Autocreated: String;
	key Entity: String;
	key OrderType: String;
	key PhaseControl: String;
	key PhaseControlKey: String;
	key SystemStatus: String;
	PhaseControlKey_Nav: Association to many PhaseControlKeys on PhaseControlKey_Nav.PhaseControlKey = $self;
	PhaseControl_Nav: Association to many PhaseControls on PhaseControl_Nav.OrderType = $self;
}
entity PhaseControls 
 {
	key Entity: String;
	key OrderType: String;
	key PhaseControl: String;
	key PhaseControlKey: String;
	ProcessPhase: String;
	ProcessSubPhase: String;
	PhaseControlCode_Nav: Association to many PhaseControlCodes on PhaseControlCode_Nav.PhaseControl = $self;
	PhaseControlKey_Nav: Association to many PhaseControlKeys on PhaseControlKey_Nav.PhaseControlKey = $self;
	PhaseControlSystemStatus_Nav: Association to many PhaseControlSystemStatuses on PhaseControlSystemStatus_Nav.OrderType = $self;
}
entity PhysicalInventoryDocHeaders 
 {
	AdjustStatus: String;
	CountDate: DateTime;
	CountOnCreate: String;
	CountStatus: String;
	Description: String;
	DocumentDate: DateTime;
	key FiscalYear: String;
	GroupingCriteria: String;
	GroupingType: String;
	key PhysInvDoc: String;
	PhysInvNo: String;
	PhysInvType: String;
	Physinventref: String;
	PlanCountdate: DateTime;
	Plant: String;
	PostingBlock: String;
	PostingDate: DateTime;
	SpecialStock: String;
	StorLocation: String;
	UpdateCountFlag: String;
	UserName: String;
	MyInventoryObject_Nav: Association to one MyInventoryObjects;
	PhysicalInventoryDocItem_Nav: Association to many PhysicalInventoryDocItems on PhysicalInventoryDocItem_Nav.PhysInvDoc = $self;
}
entity PhysicalInventoryDocHeaders 
 {
	AdjustStatus: String;
	CountDate: DateTime;
	CountOnCreate: String;
	CountStatus: String;
	Description: String;
	DocumentDate: DateTime;
	key FiscalYear: String;
	GroupingCriteria: String;
	GroupingType: String;
	key PhysInvDoc: String;
	PhysInvNo: String;
	PhysInvType: String;
	Physinventref: String;
	PlanCountdate: DateTime;
	Plant: String;
	PostingBlock: String;
	PostingDate: DateTime;
	SpecialStock: String;
	StorLocation: String;
	UpdateCountFlag: String;
	UserName: String;
	MyInventoryObject_Nav: Association to one MyInventoryObjects;
	PhysicalInventoryDocItem_Nav: Association to many PhysicalInventoryDocItems on PhysicalInventoryDocItem_Nav.PhysInvDoc = $self;
}
entity PhysicalInventoryDocItemSerials 
 {
	key FiscalYear: String;
	key Item: String;
	key PhysInvDoc: String;
	key SerialNumber: String;
	PhysicalInventoryDocItem_Nav: Association to many PhysicalInventoryDocItems on PhysicalInventoryDocItem_Nav.PhysInvDoc = $self;
}
entity PhysicalInventoryDocItemSerials 
 {
	key FiscalYear: String;
	key Item: String;
	key PhysInvDoc: String;
	key SerialNumber: String;
	PhysicalInventoryDocItem_Nav: Association to many PhysicalInventoryDocItems on PhysicalInventoryDocItem_Nav.PhysInvDoc = $self;
}
entity PhysicalInventoryDocItems 
 {
	BaseQuantity: Decimal;
	BaseUOM: String;
	Batch: String;
	BookQuantity: Decimal;
	CountDate: DateTime;
	CountedBy: String;
	Customer: String;
	Deleted: String;
	DifferenceAmt: Decimal;
	EntryQuantity: Decimal;
	EntryUOM: String;
	key FiscalYear: String;
	key Item: String;
	ItemCounted: String;
	MatDocItem: String;
	MatDocYear: String;
	Material: String;
	MaterialDoc: String;
	key PhysInvDoc: String;
	PhysInvRef: String;
	Plant: String;
	PostingDate: DateTime;
	Recount: String;
	RecountDoc: String;
	SOrderSchedule: String;
	SalesOrder: String;
	Salesorditem: String;
	SpecialStock: String;
	StockType: String;
	StorLocation: String;
	Supplier: String;
	ValuationCategory: String;
	ValuationType: String;
	WBSElement: String;
	ZeroCount: String;
	MaterialPlant_Nav: Association to many MaterialPlants on MaterialPlant_Nav.Plant = $self;
	MaterialSLoc_Nav: Association to one MaterialSLocs;
	Material_Nav: Association to one Materials;
	PhysicalInventoryDocHeader_Nav: Association to one PhysicalInventoryDocHeaders;
	PhysicalInventoryDocItemSerial_Nav: Association to many PhysicalInventoryDocItemSerials on PhysicalInventoryDocItemSerial_Nav.PhysInvDoc = $self;
	ValuationCategory_Nav: Association to many ValuationCategories on ValuationCategory_Nav.ValuationCategory = $self;
	ValuationType_Nav: Association to many ValuationTypes on ValuationType_Nav.Plant = $self;
}
entity PhysicalInventoryDocItems 
 {
	BaseQuantity: Decimal;
	BaseUOM: String;
	Batch: String;
	BookQuantity: Decimal;
	CountDate: DateTime;
	CountedBy: String;
	Customer: String;
	Deleted: String;
	DifferenceAmt: Decimal;
	EntryQuantity: Decimal;
	EntryUOM: String;
	key FiscalYear: String;
	key Item: String;
	ItemCounted: String;
	MatDocItem: String;
	MatDocYear: String;
	Material: String;
	MaterialDoc: String;
	key PhysInvDoc: String;
	PhysInvRef: String;
	Plant: String;
	PostingDate: DateTime;
	Recount: String;
	RecountDoc: String;
	SOrderSchedule: String;
	SalesOrder: String;
	Salesorditem: String;
	SpecialStock: String;
	StockType: String;
	StorLocation: String;
	Supplier: String;
	ValuationCategory: String;
	ValuationType: String;
	WBSElement: String;
	ZeroCount: String;
	MaterialPlant_Nav: Association to many MaterialPlants on MaterialPlant_Nav.Plant = $self;
	MaterialSLoc_Nav: Association to one MaterialSLocs;
	Material_Nav: Association to one Materials;
	PhysicalInventoryDocHeader_Nav: Association to one PhysicalInventoryDocHeaders;
	PhysicalInventoryDocItemSerial_Nav: Association to many PhysicalInventoryDocItemSerials on PhysicalInventoryDocItemSerial_Nav.PhysInvDoc = $self;
	ValuationCategory_Nav: Association to many ValuationCategories on ValuationCategory_Nav.ValuationCategory = $self;
	ValuationType_Nav: Association to many ValuationTypes on ValuationType_Nav.Plant = $self;
}
entity PhysicalInventoryStockTypes 
 {
	Language: String;
	StockTypeText: String;
	key Stocktype: String;
	PhysicalInventoryDocItem_Nav: Association to one PhysicalInventoryDocItems;
}
entity PlannerGroups 
 {
	OrderType: String;
	key PlannerGroup: String;
	PlannerGroupName: String;
	key PlanningPlant: String;
	NotificationHistory_Nav: Association to many NotificationHistories on NotificationHistory_Nav.PlannerGroup = $self;
	WorkOrderHistory_Nav: Association to many WorkOrderHistories on WorkOrderHistory_Nav.PlannerGroup = $self;
}
entity PlannerGroups 
 {
	OrderType: String;
	key PlannerGroup: String;
	PlannerGroupName: String;
	key PlanningPlant: String;
	NotificationHistory_Nav: Association to many NotificationHistories on NotificationHistory_Nav.PlannerGroup = $self;
	WorkOrderHistory_Nav: Association to many WorkOrderHistories on WorkOrderHistory_Nav.PlannerGroup = $self;
}
entity Plants 
 {
	CompanyCode: String;
	DistributionChannel: String;
	Division: String;
	InspPointValCode: String;
	InspPointValCodeGroup: String;
	InspPointValPlant: String;
	InspPointValSelectedSet: String;
	PlanningPlant: String;
	key Plant: String;
	PlantDescription: String;
	SalesOrganization: String;
	ValuationArea: String;
	Division_Nav: Association to one Divisions;
	ReceivingPoint_Nav: Association to many ReceivingPoints on ReceivingPoint_Nav.Plant = $self;
	StorageLocations_Nav: Association to many StorageLocations on StorageLocations_Nav.Plant = $self;
	UserTrunkAssignment_Nav: Association to many UserTrunkAssignments on UserTrunkAssignment_Nav.Plant = $self;
}
entity Plants 
 {
	CompanyCode: String;
	DistributionChannel: String;
	Division: String;
	InspPointValCode: String;
	InspPointValCodeGroup: String;
	InspPointValPlant: String;
	InspPointValSelectedSet: String;
	PlanningPlant: String;
	key Plant: String;
	PlantDescription: String;
	SalesOrganization: String;
	ValuationArea: String;
	Division_Nav: Association to one Divisions;
	ReceivingPoint_Nav: Association to many ReceivingPoints on ReceivingPoint_Nav.Plant = $self;
	StorageLocations_Nav: Association to many StorageLocations on StorageLocations_Nav.Plant = $self;
	UserTrunkAssignment_Nav: Association to many UserTrunkAssignments on UserTrunkAssignment_Nav.Plant = $self;
}
entity PolRegStructElements 
 {
	key Country: String;
	PolRegStructElemText: String;
	key PolRegStructElement: String;
	ConnectionObjects_Nav: Association to many ConnectionObjects on ConnectionObjects_Nav.Country = $self;
}
entity Premises 
 {
	ConnectionObject: String;
	Floor: String;
	HouseNumSupplement: String;
	key Premise: String;
	RoomNumber: String;
	StreetSupplement1: String;
	StreetSupplement2: String;
	SupplementalDescription: String;
	ConnectionObject_Nav: Association to many ConnectionObjects on ConnectionObject_Nav.ConnectionObject = $self;
	DeviceLocations_Nav: Association to many DeviceLocations on DeviceLocations_Nav.Premise = $self;
	Installation_Nav: Association to many Installations on Installation_Nav.Premise = $self;
	OrderISULink_Nav: Association to many OrderISULinks on OrderISULink_Nav.Premise = $self;
}
entity Priorities 
 {
	EndDate: String;
	FinalDueDateDuration: String;
	FinalDueDateUoM: String;
	LanguageKey: String;
	key Priority: String;
	PriorityDescription: String;
	key PriorityType: String;
	StartDate: String;
	NotificationHeaders: Association to many MyNotificationHeaders on NotificationHeaders.Priority = $self;
	NotificationHistories_Nav: Association to many NotificationHistories on NotificationHistories_Nav.Priority = $self;
	WorkOrderHeaders: Association to many MyWorkOrderHeaders on WorkOrderHeaders.PriorityType = $self;
	WorkOrderHistories: Association to many WorkOrderHistories on WorkOrderHistories.PriorityType = $self;
}
entity Priorities 
 {
	EndDate: String;
	FinalDueDateDuration: String;
	FinalDueDateUoM: String;
	LanguageKey: String;
	key Priority: String;
	PriorityDescription: String;
	key PriorityType: String;
	StartDate: String;
	NotificationHeaders: Association to many MyNotificationHeaders on NotificationHeaders.Priority = $self;
	NotificationHistories_Nav: Association to many NotificationHistories on NotificationHistories_Nav.Priority = $self;
	WorkOrderHeaders: Association to many MyWorkOrderHeaders on WorkOrderHeaders.PriorityType = $self;
	WorkOrderHistories: Association to many WorkOrderHistories on WorkOrderHistories.PriorityType = $self;
}
entity PrioritizationProfileLinks 
 {
	key NotificationType: String;
	key Plant: String;
	PrioritizationProfileID: String;
	PrioritizationProfile_Nav: Association to many PrioritizationProfiles on PrioritizationProfile_Nav.PrioritizationProfileID = $self;
}
entity PrioritizationProfiles 
 {
	Label: String;
	key PrioritizationProfileId: String;
	ConsequenceGroup_Nav: Association to many ConsequenceGroups on ConsequenceGroup_Nav.PrioritizationProfileId = $self;
	PrioritizationProfileLink_Nav: Association to many PrioritizationProfileLinks on PrioritizationProfileLink_Nav.PrioritizationProfileID = $self;
}
entity ProcessVariants 
 {
	Description: String;
	key ProcessVariant: String;
	DisconnectDocument_Nav: Association to many DisconnectionDocuments on DisconnectDocument_Nav.ProcessVariant = $self;
}
entity ProductStatistics 
 {
	PRODUCTIONSYSTEM: String;
	key PRODUCTNAME: String;
	STATSCATEGORY: String;
	key STATSDATE: String;
	STATSNAME: String;
	SYSTEMINSTANCE: String;
	VALUEDAYTOTAL: String;
}
entity ProductStatistics 
 {
	PRODUCTIONSYSTEM: String;
	key PRODUCTNAME: String;
	STATSCATEGORY: String;
	key STATSDATE: String;
	STATSNAME: String;
	SYSTEMINSTANCE: String;
	VALUEDAYTOTAL: String;
}
entity ProductionOrderComponents 
 {
	BackFlushIndicator: String;
	Batch: String;
	Completed: String;
	Counter: String;
	key ItemNum: String;
	MaterialNum: String;
	MovementType: String;
	OperationNumber: String;
	key OrderId: String;
	QuantityUnE: Decimal;
	key RecordType: String;
	RequirementDate: DateTime;
	RequirementQuantity: Decimal;
	RequirementUOM: String;
	key Reservation: String;
	RoutingNumber: String;
	SpecialStock: String;
	StorageBin: String;
	SupplyPlant: String;
	SupplyStorageLocation: String;
	UnitOfEntry: String;
	WithdrawalQuantity: Decimal;
	MaterialDocItem_Nav: Association to many MaterialDocItems on MaterialDocItem_Nav.ResvRecordType = $self;
	MaterialPlant_Nav: Association to many MaterialPlants on MaterialPlant_Nav.SupplyPlant = $self;
	ProductionOrderHeader_Nav: Association to one ProductionOrderHeaders;
}
entity ProductionOrderHeaders 
 {
	BasicStartDate: DateTime;
	CompanyCode: String;
	Description: String;
	EnteredBy: String;
	ObjectNumber: String;
	OrderCategory: String;
	key OrderId: String;
	OrderType: String;
	ProductionPlant: String;
	Reservation: String;
	RoutingNumber: String;
	ScheduledStartDate: DateTime;
	SystemStatus: String;
	SystemStatusCode: String;
	UserStatus: String;
	UserStatusCode: String;
	ProductionOrderComponent_Nav: Association to many ProductionOrderComponents on ProductionOrderComponent_Nav.OrderId = $self;
	ProductionOrderItem_Nav: Association to many ProductionOrderItems on ProductionOrderItem_Nav.OrderId = $self;
	ProductionOrderOperation_Nav: Association to many ProductionOrderOperations on ProductionOrderOperation_Nav.OrderID = $self;
	ProductionOrderSequence_Nav: Association to many ProductionOrderSequences on ProductionOrderSequence_Nav.OrderID = $self;
	ProductionOrderText_Nav: Association to many ProductionOrderTexts on ProductionOrderText_Nav.OrderID = $self;
}
entity ProductionOrderItems 
 {
	Batch: String;
	DeliveryCompletedFlag: String;
	key ItemNum: String;
	MaterialNum: String;
	key OrderId: String;
	OrderQuantity: Decimal;
	OrderUOM: String;
	PlanningPlant: String;
	ProductionPlant: String;
	ReceivedQuantity: Decimal;
	SerialNoProfile: String;
	SpecialStock: String;
	StockType: String;
	ValuationCategory: String;
	ValuationType: String;
	MaterialDocItem_Nav: Association to many MaterialDocItems on MaterialDocItem_Nav.OrderItemNumber = $self;
	MaterialPlant_Nav: Association to one MaterialPlants;
	Material_Nav: Association to one Materials;
	ProductionOrderHeader_Nav: Association to one ProductionOrderHeaders;
	ProductionOrderSerial_Nav: Association to many ProductionOrderSerials on ProductionOrderSerial_Nav.ItemNo = $self;
}
entity ProductionOrderOperations 
 {
	key Counter: String;
	Description: String;
	OperationNumber: String;
	key OrderID: String;
	key RoutingNumber: String;
	Sequence: String;
	TaskNode: String;
	ProductionOrderHeader_Nav: Association to one ProductionOrderHeaders;
}
entity ProductionOrderSequences 
 {
	key Counter: String;
	key OrderID: String;
	key RoutingNumber: String;
	Sequence: String;
	SequenceDesc: String;
	TaskListType: String;
	ProductionOrderHeader_Nav: Association to one ProductionOrderHeaders;
}
entity ProductionOrderSerials 
 {
	key ItemNo: String;
	key OrderID: String;
	key SerialNumber: String;
	key UII: String;
	ProductionOrderItem_Nav: Association to one ProductionOrderItems;
}
entity ProductionOrderTexts 
 {
	NewTextString: String;
	key ObjectKey: String;
	key OrderID: String;
	key TextID: String;
	TextObjectType: String;
	TextString: String;
	ProductionOrderHeader_Nav: Association to one ProductionOrderHeaders;
}
entity PurchaseGroups 
 {
	key PurchasingGroup: String;
	PurchasingGroupDesc: String;
}
entity PurchaseGroups 
 {
	key PurchasingGroup: String;
	PurchasingGroupDesc: String;
}
entity PurchaseOrderHeaderLongTexts 
 {
	NewTextString: String;
	ObjectKey: String;
	key PurchaseOrderNum: String;
	TextId: String;
	TextObjType: String;
	TextString: String;
	PurchaseOrder_Nav: Association to one PurchaseOrderHeaders;
}
entity PurchaseOrderHeaderLongTexts 
 {
	NewTextString: String;
	ObjectKey: String;
	key PurchaseOrderNum: String;
	TextId: String;
	TextObjType: String;
	TextString: String;
	PurchaseOrder_Nav: Association to one PurchaseOrderHeaders;
}
entity PurchaseOrderHeaders 
 {
	DocumentCategory: String;
	DocumentDate: DateTime;
	DocumentStatus: String;
	DocumentType: String;
	key PurchaseOrderId: String;
	SupplyingPlant: String;
	Vendor: String;
	MaterialDocItem_Nav: Association to many MaterialDocItems on MaterialDocItem_Nav.PurchaseOrderNumber = $self;
	MyInventoryObject_Nav: Association to one MyInventoryObjects;
	PurchaseOrderHeaderLongText_Nav: Association to many PurchaseOrderHeaderLongTexts on PurchaseOrderHeaderLongText_Nav.PurchaseOrderNum = $self;
	PurchaseOrderItem_Nav: Association to many PurchaseOrderItems on PurchaseOrderItem_Nav.PurchaseOrderId = $self;
	Vendor_Nav: Association to many Vendors on Vendor_Nav.Vendor = $self;
}
entity PurchaseOrderHeaders 
 {
	DocumentCategory: String;
	DocumentDate: DateTime;
	DocumentStatus: String;
	DocumentType: String;
	key PurchaseOrderId: String;
	SupplyingPlant: String;
	Vendor: String;
	MaterialDocItem_Nav: Association to many MaterialDocItems on MaterialDocItem_Nav.PurchaseOrderNumber = $self;
	MyInventoryObject_Nav: Association to one MyInventoryObjects;
	PurchaseOrderHeaderLongText_Nav: Association to many PurchaseOrderHeaderLongTexts on PurchaseOrderHeaderLongText_Nav.PurchaseOrderNum = $self;
	PurchaseOrderItem_Nav: Association to many PurchaseOrderItems on PurchaseOrderItem_Nav.PurchaseOrderId = $self;
	Vendor_Nav: Association to many Vendors on Vendor_Nav.Vendor = $self;
}
entity PurchaseOrderItems 
 {
	CRofOrigin: String;
	CostCenter: String;
	DeliveryCompletedFlag: String;
	FinalDeliveryFlag: String;
	GLAccount: String;
	key ItemNum: String;
	ItemText: String;
	MaterialNum: String;
	Network: String;
	NetworkActivity: String;
	OpenQtyValBlocked: Decimal;
	OpenQuantity: Decimal;
	OpenQuantityBlocked: Decimal;
	Order: String;
	OrderQuantity: Decimal;
	OrderUOM: String;
	OrderWBSElement: String;
	OverDeliveryTol: Decimal;
	Plant: String;
	key PurchaseOrderId: String;
	ReceivedQuantity: Decimal;
	RemShelfLife: String;
	StockType: String;
	StorageLoc: String;
	SupplierMaterialNum: String;
	UnderDeliveryTol: Decimal;
	UnlimitedTol: String;
	WBSElement: String;
	MaterialDocItem_Nav: Association to many MaterialDocItems on MaterialDocItem_Nav.PurchaseOrderItem = $self;
	MaterialPlant_Nav: Association to many MaterialPlants on MaterialPlant_Nav.MaterialNum = $self;
	Material_Nav: Association to one Materials;
	POSerialNumber_Nav: Association to many PurchaseOrderSerialNumbers on POSerialNumber_Nav.PurchaseOrderId = $self;
	PurchaseOrderHeader_Nav: Association to one PurchaseOrderHeaders;
	ScheduleLine_Nav: Association to many ScheduleLines on ScheduleLine_Nav.ItemNum = $self;
}
entity PurchaseOrderItems 
 {
	CRofOrigin: String;
	CostCenter: String;
	DeliveryCompletedFlag: String;
	FinalDeliveryFlag: String;
	GLAccount: String;
	key ItemNum: String;
	ItemText: String;
	MaterialNum: String;
	Network: String;
	NetworkActivity: String;
	OpenQtyValBlocked: Decimal;
	OpenQuantity: Decimal;
	OpenQuantityBlocked: Decimal;
	Order: String;
	OrderQuantity: Decimal;
	OrderUOM: String;
	OrderWBSElement: String;
	OverDeliveryTol: Decimal;
	Plant: String;
	key PurchaseOrderId: String;
	ReceivedQuantity: Decimal;
	RemShelfLife: String;
	StockType: String;
	StorageLoc: String;
	SupplierMaterialNum: String;
	UnderDeliveryTol: Decimal;
	UnlimitedTol: String;
	WBSElement: String;
	MaterialDocItem_Nav: Association to many MaterialDocItems on MaterialDocItem_Nav.PurchaseOrderItem = $self;
	MaterialPlant_Nav: Association to many MaterialPlants on MaterialPlant_Nav.MaterialNum = $self;
	Material_Nav: Association to one Materials;
	POSerialNumber_Nav: Association to many PurchaseOrderSerialNumbers on POSerialNumber_Nav.PurchaseOrderId = $self;
	PurchaseOrderHeader_Nav: Association to one PurchaseOrderHeaders;
	ScheduleLine_Nav: Association to many ScheduleLines on ScheduleLine_Nav.ItemNum = $self;
}
entity PurchaseOrderSerialNumbers 
 {
	key ItemNumber: String;
	key PurchaseOrderId: String;
	key SerialNumber: String;
	POItem_Nav: Association to one PurchaseOrderItems;
}
entity PurchaseOrderSerialNumbers 
 {
	key ItemNumber: String;
	key PurchaseOrderId: String;
	key SerialNumber: String;
	POItem_Nav: Association to one PurchaseOrderItems;
}
entity PurchaseOrganizations 
 {
	key CompanyCode: String;
	key PurchasingOrg: String;
	PurchasingOrgDesc: String;
}
entity PurchaseOrganizations 
 {
	key CompanyCode: String;
	key PurchasingOrg: String;
	PurchasingOrgDesc: String;
}
entity PurchaseRequisitionAcctAsgns 
 {
	ActivityType: String;
	Asset: String;
	AssetSubnumber: String;
	BusinessArea: String;
	BusinessProcess: String;
	COArea: String;
	CostCenter: String;
	Distribution: String;
	GLAccount: String;
	Item: String;
	NetValue: Decimal;
	Network: String;
	Order: String;
	Partner: String;
	key PurchaseReqItemNo: String;
	key PurchaseReqNo: String;
	Quantity: Decimal;
	SDDocument: String;
	ScheduleLine: String;
	key Sernoaccass: String;
	WBSElement: String;
	PurchaseRequisitionItem_Nav: Association to one PurchaseRequisitionItems;
}
entity PurchaseRequisitionAddresses 
 {
	key AddressNumber: String;
	BuildingCode: String;
	Buildingcode: String;
	COName: String;
	CheckStatus: String;
	City: String;
	CityCode: String;
	CityCode1: String;
	CommMethod: String;
	CompanyPostCd: String;
	Country: String;
	DeliveryDist: String;
	District: String;
	District1: String;
	EmailAddress: String;
	Extension: String;
	Extension1: String;
	Fax: String;
	Floor: String;
	FormOfAddress: String;
	HouseNumber: String;
	ISOCode: String;
	Language: String;
	LanguageCode: String;
	Name: String;
	Name2: String;
	Name3: String;
	Name4: String;
	Notes: String;
	POBox: String;
	POBoxCity: String;
	POBoxPostCde: String;
	PostalCode: String;
	key PurchaseReqItemNo: String;
	key PurchaseReqNo: String;
	Region: String;
	RoomNumber: String;
	SearchTerm1: String;
	SearchTerm2: String;
	Street: String;
	Street1: String;
	Street2: String;
	Street3: String;
	Street4: String;
	Street5: String;
	StreetAbbrev: String;
	StreetCode: String;
	StructureGroup: String;
	Supplement: String;
	TaxJurisdiction: String;
	Telephone: String;
	TimeZone: String;
	Title: String;
	TransportZone: String;
	Address_Nav: Association to one Addresses;
	PurchaseRequisitionItem_Nav: Association to one PurchaseRequisitionItems;
}
entity PurchaseRequisitionDocTypes 
 {
	Description: String;
	key DocCategory: String;
	key DocumentType: String;
	PurchaseRequisitionItem_Nav: Association to one PurchaseRequisitionItems;
}
entity PurchaseRequisitionHeaders 
 {
	key PurchaseReqNo: String;
	PurchaseRequisitionItem_Nav: Association to many PurchaseRequisitionItems on PurchaseRequisitionItem_Nav.PurchaseReqNo = $self;
	PurchaseRequisitionLongText_Nav: Association to many PurchaseRequisitionLongTexts on PurchaseRequisitionLongText_Nav.PurchaseReqNo = $self;
}
entity PurchaseRequisitionItems 
 {
	AccAsgnCategory: String;
	BaseUOM: String;
	Batch: String;
	Currency: String;
	DeliveryDate: DateTime;
	DesiredVendor: String;
	DocCategory: String;
	DocType: String;
	FixedVendor: String;
	ItemCategory: String;
	ItemQuantity: String;
	Material: String;
	MaterialGroup: String;
	PackNo: String;
	Plant: String;
	PurchaseGroup: String;
	PurchaseOrderItemNo: String;
	PurchaseOrderNo: String;
	PurchaseOrg: String;
	key PurchaseReqItemNo: String;
	key PurchaseReqNo: String;
	RequisitionDate: DateTime;
	Requisitioner: String;
	ShortText: String;
	StorageLocation: String;
	ValuationPrice: String;
	ValuationPriceUnit: String;
	ValuationType: String;
	PurchaseRequisitionAcctAsgn_Nav: Association to many PurchaseRequisitionAcctAsgns on PurchaseRequisitionAcctAsgn_Nav.PurchaseReqNo = $self;
	PurchaseRequisitionAddress_Nav: Association to many PurchaseRequisitionAddresses on PurchaseRequisitionAddress_Nav.PurchaseReqNo = $self;
	PurchaseRequisitionDocType_Nav: Association to many PurchaseRequisitionDocTypes;
	PurchaseRequisitionHeader_Nav: Association to many PurchaseRequisitionHeaders on PurchaseRequisitionHeader_Nav.PurchaseReqNo = $self;
	PurchaseRequisitionLongText_Nav: Association to many PurchaseRequisitionLongTexts on PurchaseRequisitionLongText_Nav.PurchaseReqNo = $self;
	PurchaseRequisitionServMgmntHdr_Nav: Association to many PurchaseRequisitionServMgmntHdrs on PurchaseRequisitionServMgmntHdr_Nav.PackNo = $self;
	PurchaseRequisitionSrvLimitHdr_Nav: Association to many PurchaseRequisitionSrvLimitHdrs on PurchaseRequisitionSrvLimitHdr_Nav.PackNo = $self;
}
entity PurchaseRequisitionLongTexts 
 {
	NewTextString: String;
	key ObjectKey: String;
	key PurchaseReqItemNo: String;
	key PurchaseReqNo: String;
	key TextId: String;
	TextObjType: String;
	TextString: String;
	PurchaseRequisitionHeader_Nav: Association to many PurchaseRequisitionHeaders on PurchaseRequisitionHeader_Nav.PurchaseReqNo = $self;
	PurchaseRequisitionItem_Nav: Association to one PurchaseRequisitionItems;
}
entity PurchaseRequisitionServMgmntHdrs 
 {
	ConditionDocNo: String;
	Currency: String;
	DocCategory: String;
	DocumentCat: String;
	HighestPackageNo: String;
	InternalObjectNo: String;
	InternalServiceUse: String;
	InternalWork: Decimal;
	NetValue: Decimal;
	key PackageNo: String;
	ParentPackageNo: String;
	PurchasingDoc: String;
	PurchasingDocItem: String;
	SDDocument: String;
	SDDocumentItem: String;
	UnitForWork: String;
	PurchaseRequisitionItem_Nav: Association to many PurchaseRequisitionItems on PurchaseRequisitionItem_Nav.PackNo = $self;
	PurchaseRequisitionServMgmntItem_Nav: Association to many PurchaseRequisitionServMgmntItems on PurchaseRequisitionServMgmntItem_Nav.PackageNo = $self;
	PurchaseRequisitionSrvAccctAsgn_Nav: Association to many PurchaseRequisitionSrvAccctAsgns on PurchaseRequisitionSrvAccctAsgn_Nav.PackageNo = $self;
}
entity PurchaseRequisitionServMgmntItems 
 {
	Activitynumber: String;
	ExtServNo: String;
	ExternalLineNumber: String;
	key InternalLineNo: String;
	NetValue: Decimal;
	key PackageNo: String;
	Quantity: Decimal;
	ServiceAssgt: String;
	ServiceType: String;
	SubPackageNo: String;
	PurchaseRequisitionServMgmntHdr_Nav: Association to many PurchaseRequisitionServMgmntHdrs on PurchaseRequisitionServMgmntHdr_Nav.PackageNo = $self;
}
entity PurchaseRequisitionSrvAccctAsgns 
 {
	ActualQuantity: Decimal;
	Enteredvalue: Decimal;
	FinalAccAsgn: String;
	FinalAccAsgnQuantity: Decimal;
	FinalAccAsgnReason: String;
	HighestPackageNo: String;
	InvoiceQuantity: Decimal;
	key Line: String;
	NetValue: Decimal;
	key PackageNo: String;
	Quantity: Decimal;
	key SeqNoAA: String;
	SeqNoAccAss: String;
}
entity PurchaseRequisitionSrvLimitHdrs 
 {
	ActualValue: Decimal;
	Currency: String;
	ExpectedValue: Decimal;
	Limit: Decimal;
	NoLimit: String;
	OverallLimit: Decimal;
	key PackageNo: String;
	ServiceType: String;
	SourcePackageNo: String;
	PurchaseRequisitionItem_Nav: Association to many PurchaseRequisitionItems on PurchaseRequisitionItem_Nav.PackNo = $self;
	PurchaseRequisitionSrvLimitItem_Nav: Association to many PurchaseRequisitionSrvLimitItems on PurchaseRequisitionSrvLimitItem_Nav.PackageNo = $self;
}
entity PurchaseRequisitionSrvLimitItems 
 {
	ActualValue: Decimal;
	key InternalLineNo: String;
	OverallLimit: Decimal;
	key PackageNo: String;
	PurchasingDoc: String;
	PurchasingDocItem: String;
	ShortText: String;
	SubPackageNo: String;
}
entity ReceivingPoints 
 {
	key Plant: String;
	key ReceivingPoint: String;
	SequenceNum: String;
	key StorageLoc: String;
	Plant_Nav: Association to one Plants;
	ShippingPoint_Nav: Association to one ShippingPoints;
}
entity ReceivingPoints 
 {
	key Plant: String;
	key ReceivingPoint: String;
	SequenceNum: String;
	key StorageLoc: String;
	Plant_Nav: Association to one Plants;
	ShippingPoint_Nav: Association to one ShippingPoints;
}
entity Regions 
 {
	key Country: String;
	Description: String;
	key Region: String;
	Addresses_Nav: Association to many Addresses on Addresses_Nav.Region = $self;
	Country_Nav: Association to one Countries;
}
entity Regions 
 {
	key Country: String;
	Description: String;
	key Region: String;
	Addresses_Nav: Association to many Addresses on Addresses_Nav.Region = $self;
	Country_Nav: Association to one Countries;
}
entity RegisterGroups 
 {
	AuthorizationGroup: String;
	Division: String;
	key RegisterGroup: String;
	RegisterInfo: String;
	Devices_Nav: Association to one Devices;
	Division_Nav: Association to one Divisions;
	MeterReadings_Nav: Association to many MeterReadings on MeterReadings_Nav.RegisterGroup = $self;
	PeriodicMeterReadings_Nav: Association to many PeriodicMeterReadings on PeriodicMeterReadings_Nav.RegisterGroup = $self;
	Registers_Nav: Association to many Registers on Registers_Nav.RegisterGroup = $self;
}
entity Registers 
 {
	DecimalAfter: String;
	DecimalBefore: String;
	DoNotReadRegister: String;
	NonMeteringRegister: String;
	RegisterCode: String;
	key RegisterGroup: String;
	RegisterInfoFld: String;
	key RegisterNum: String;
	RegisterType: String;
	UnitOfMeasureMR: String;
	RegisterGroup_Nav: Association to one RegisterGroups;
}
entity RejectionReasons 
 {
	key ReasonCode: String;
	ReasonDescription: String;
	PMMobileStatus_Nav: Association to many PMMobileStatuses on PMMobileStatus_Nav.ReasonCode = $self;
}
entity RejectionReasons 
 {
	key ReasonCode: String;
	ReasonDescription: String;
	PMMobileStatus_Nav: Association to many PMMobileStatuses on PMMobileStatus_Nav.ReasonCode = $self;
}
entity ReportTemplates 
 {
	key DocumentID: String;
	ObjectKey: String;
	RelationshipID: String;
	Document_Nav: Association to many Documents on Document_Nav.DocumentID = $self;
}
entity ReportTemplates 
 {
	key DocumentID: String;
	ObjectKey: String;
	RelationshipID: String;
	Document_Nav: Association to many Documents on Document_Nav.DocumentID = $self;
}
entity ReservationHeaders 
 {
	ControllingArea: String;
	CostCenter: String;
	DocumentStatus: String;
	Network: String;
	ObjType: String;
	OrderId: String;
	PurchaseOrderId: String;
	ReceivingPlant: String;
	ReceivingStorageLocation: String;
	ReservationDate: DateTime;
	key ReservationNum: String;
	SalesOrder: String;
	SalesOrderItem: String;
	SalesOrderSchedule: String;
	WBSElement: String;
	MaterialDocItem_Nav: Association to many MaterialDocItems on MaterialDocItem_Nav.ReservationNumber = $self;
	MyInventoryObject_Nav: Association to one MyInventoryObjects;
	ReservationItem_Nav: Association to many ReservationItems on ReservationItem_Nav.ReservationNum = $self;
	ScheduleLine_Nav: Association to many ScheduleLines on ScheduleLine_Nav.ReservationNum = $self;
}
entity ReservationHeaders 
 {
	ControllingArea: String;
	CostCenter: String;
	DocumentStatus: String;
	Network: String;
	ObjType: String;
	OrderId: String;
	PurchaseOrderId: String;
	ReceivingPlant: String;
	ReceivingStorageLocation: String;
	ReservationDate: DateTime;
	key ReservationNum: String;
	SalesOrder: String;
	SalesOrderItem: String;
	SalesOrderSchedule: String;
	WBSElement: String;
	MaterialDocItem_Nav: Association to many MaterialDocItems on MaterialDocItem_Nav.ReservationNumber = $self;
	MyInventoryObject_Nav: Association to one MyInventoryObjects;
	ReservationItem_Nav: Association to many ReservationItems on ReservationItem_Nav.ReservationNum = $self;
	ScheduleLine_Nav: Association to many ScheduleLines on ScheduleLine_Nav.ReservationNum = $self;
}
entity ReservationItems 
 {
	AccountAssignmentCategory: String;
	Batch: String;
	BusinessArea: String;
	Completed: String;
	GLAccount: String;
	key ItemNum: String;
	MaterialNum: String;
	MovementAllowed: String;
	MovementType: String;
	OrderId: String;
	OrderOperationNo: String;
	key RecordType: String;
	RequirementDate: DateTime;
	RequirementQuantity: Decimal;
	RequirementUOM: String;
	key ReservationNum: String;
	SalesOrder: String;
	SalesOrderItem: String;
	SalesOrderSchedule: String;
	StorageBin: String;
	SupplyPlant: String;
	SupplyStorageLocation: String;
	WBSElement: String;
	WithdrawalQuantity: Decimal;
	MaterialDocItem_Nav: Association to many MaterialDocItems on MaterialDocItem_Nav.ReservationItemNumber = $self;
	MaterialPlant_Nav: Association to many MaterialPlants on MaterialPlant_Nav.SupplyPlant = $self;
	ReservationHeader_Nav: Association to one ReservationHeaders;
}
entity ReservationItems 
 {
	AccountAssignmentCategory: String;
	Batch: String;
	BusinessArea: String;
	Completed: String;
	GLAccount: String;
	key ItemNum: String;
	MaterialNum: String;
	MovementAllowed: String;
	MovementType: String;
	OrderId: String;
	OrderOperationNo: String;
	key RecordType: String;
	RequirementDate: DateTime;
	RequirementQuantity: Decimal;
	RequirementUOM: String;
	key ReservationNum: String;
	SalesOrder: String;
	SalesOrderItem: String;
	SalesOrderSchedule: String;
	StorageBin: String;
	SupplyPlant: String;
	SupplyStorageLocation: String;
	WBSElement: String;
	WithdrawalQuantity: Decimal;
	MaterialDocItem_Nav: Association to many MaterialDocItems on MaterialDocItem_Nav.ReservationItemNumber = $self;
	MaterialPlant_Nav: Association to many MaterialPlants on MaterialPlant_Nav.SupplyPlant = $self;
	ReservationHeader_Nav: Association to one ReservationHeaders;
}
entity S4BPOrgs 
 {
	key BusinessPartner: String;
	key OrgId: String;
	key OrgType: String;
	key TransactionType: String;
	SalesOrg_Nav: Association to many SalesOrgs on SalesOrg_Nav.OrgId = $self;
	ServiceOrg_Nav: Association to many ServiceOrgs on ServiceOrg_Nav.OrgId = $self;
}
entity S4BPRelationships 
 {
	key BusinessPartnerFrom: String;
	key BusinessPartnerTo: String;
	key RelType: String;
	S4BusinessPartner_Nav: Association to one S4BusinessPartners;
}
entity S4BPSalesAreas 
 {
	key BusinessPartner: String;
	key DistributionChannel: String;
	key Division: String;
	key ProcessType: String;
	key SalesGroup: String;
	SalesGroupShort: String;
	key SalesOffice: String;
	SalesOfficeShort: String;
	key SalesOrg: String;
	SalesOrgShort: String;
	key SalesRespOrg: String;
	SalesRespOrgShort: String;
	DistributionChannel_Nav: Association to many DistributionChannels on DistributionChannel_Nav.DistributionChannel = $self;
	Division_Nav: Association to many Divisions on Division_Nav.Division = $self;
	SalesGroup_Nav: Association to many SalesGroups on SalesGroup_Nav.SalesGroup = $self;
	SalesOffice_Nav: Association to many SalesOffices on SalesOffice_Nav.SalesOffice = $self;
	SalesOrg_Nav: Association to many SalesOrgs on SalesOrg_Nav.SalesOrg = $self;
	SalesRespOrg_Nav: Association to many SalesRespOrgs on SalesRespOrg_Nav.SalesRespOrg = $self;
}
entity S4BusinessPartners 
 {
	AddressNum: String;
	key BPNum: String;
	BPType: String;
	CostCenter: String;
	Customer: String;
	FirstName: String;
	FullName: String;
	LastName: String;
	OrgName1: String;
	OrgName2: String;
	PersonNum: String;
	UserName: String;
	Vendor: String;
	Address_Nav: Association to one Addresses;
	Customer_Nav: Association to many Customers on Customer_Nav.PartnerNum = $self;
	S4ConfirmationPartner_Nav: Association to many S4ServiceConfirmationPartners on S4ConfirmationPartner_Nav.BusinessPartnerID = $self;
	S4Confirmation_Nav: Association to many S4ServiceConfirmations on S4Confirmation_Nav.SoldToParty = $self;
	S4OrderEmpResp_Nav: Association to many S4ServiceOrders on S4OrderEmpResp_Nav.EmployeeResp = $self;
	S4OrderPartner_Nav: Association to many S4ServiceOrderPartners on S4OrderPartner_Nav.BusinessPartnerID = $self;
	S4Order_Nav: Association to many S4ServiceOrders on S4Order_Nav.SoldToParty = $self;
	S4Request_Nav: Association to many S4ServiceRequests on S4Request_Nav.SoldToParty = $self;
}
entity S4PartnerFunctions 
 {
	Description: String;
	FunctionCategory: String;
	HidePartnerFunc: String;
	key PartnerFunction: String;
	RelationshpType: String;
	RelatshpCat: String;
	ShortDescription: String;
	Usage: String;
	S4ConfirmationPartner_Nav: Association to many S4ServiceConfirmationPartners on S4ConfirmationPartner_Nav.PrevPartnerFunction = $self;
	S4OrderPartner_Nav: Association to many S4ServiceOrderPartners on S4OrderPartner_Nav.PartnerFunction = $self;
}
entity S4ServiceConfirmationDocuments 
 {
	DocumentID: String;
	HeaderID: String;
	ItemNo: String;
	ObjectID: String;
	key ObjectKey: String;
	ObjectType: String;
	key RelationshipID: String;
	Document: Association to many Documents on Document.DocumentID = $self;
	S4ServiceConfirmationItem_Nav: Association to one S4ServiceConfirmationItems;
	S4ServiceConfirmation_Nav: Association to one S4ServiceConfirmations;
}
entity S4ServiceConfirmationItems 
 {
	AccountingInd: String;
	Amount: Decimal;
	CatalogType: String;
	Category1: Guid;
	Category2: Guid;
	Category3: Guid;
	Category4: Guid;
	CategoryID: String;
	Code: String;
	CodeGroup: String;
	ContractAccount: String;
	ContractEnd: DateTime;
	ContractID: String;
	ContractItem: Guid;
	ContractStart: DateTime;
	Currency: String;
	DistributionChannel: String;
	Division: String;
	DueBy: DateTime;
	Duration: Decimal;
	DurationUOM: String;
	ItemCategory: String;
	ItemCategoryUsage: String;
	ItemDesc: String;
	ItemGUID: Guid;
	ItemGUID32: String;
	key ItemNo: String;
	ItemObjectType: String;
	NetValue: String;
	key ObjectID: String;
	key ObjectType: String;
	ProductID: String;
	ProductName: String;
	Quantity: Decimal;
	QuantityUOM: String;
	RequestedEnd: DateTime;
	RequestedStart: DateTime;
	ResponseProfile: String;
	SalesGroup: String;
	SalesOffice: String;
	SalesOrg: String;
	SalesRespOrg: String;
	SchemaGUID: Guid;
	SchemaID: String;
	ServiceEmployee: String;
	ServiceOrg: String;
	ServiceProfile: String;
	ServiceRespOrg: String;
	ServiceTeam: String;
	ServiceType: String;
	StartOfWork: DateTime;
	SubjectProfile: String;
	ValuationType: String;
	WarrantyID: String;
	AccountingInd_Nav: Association to one AcctIndicators;
	Category1_Nav: Association to many CategorizationSchemas on Category1_Nav.SchemaGUID = $self;
	Category2_Nav: Association to many CategorizationSchemas on Category2_Nav.SchemaGUID = $self;
	Category3_Nav: Association to many CategorizationSchemas on Category3_Nav.SchemaGUID = $self;
	Category4_Nav: Association to many CategorizationSchemas on Category4_Nav.Category4 = $self;
	Currency_Nav: Association to one Currencies;
	DistributionChannel_Nav: Association to many DistributionChannels on DistributionChannel_Nav.DistributionChannel = $self;
	Division_Nav: Association to many Divisions on Division_Nav.Division = $self;
	Document: Association to many S4ServiceConfirmationDocuments on Document.ItemNo = $self;
	LongText_Nav: Association to many S4ServiceConfirmationLongTexts on LongText_Nav.ObjectType = $self;
	MobileStatusHistory_Nav: Association to many PMMobileStatusHistories on MobileStatusHistory_Nav.SortField = $self;
	MobileStatus_Nav: Association to many PMMobileStatuses on MobileStatus_Nav.SortField = $self;
	Partner_Nav: Association to many S4ServiceConfirmationPartners on Partner_Nav.ItemNo = $self;
	Product_Nav: Association to many Materials on Product_Nav.ProductID = $self;
	RefObjects_Nav: Association to many S4ServiceConfirmationRefObjs on RefObjects_Nav.ObjectType = $self;
	S4ServiceConfirmation_Nav: Association to one S4ServiceConfirmations;
	SalesOrg_Nav: Association to many SalesOrgs on SalesOrg_Nav.SalesOrg = $self;
	SalesRespOrg_Nav: Association to many SalesRespOrgs on SalesRespOrg_Nav.SalesRespOrg = $self;
	ServiceItemCategorySchema_Nav: Association to one ServiceItemCategorySchemas;
	ServiceOrg_Nav: Association to many ServiceOrgs on ServiceOrg_Nav.ServiceOrg = $self;
	ServiceRespOrg_Nav: Association to many ServiceRespOrgs;
	ServiceType_Nav: Association to many ServiceTypes on ServiceType_Nav.ServiceType = $self;
	TransHistories_Nav: Association to many S4ServiceConfirmationTranHistories on TransHistories_Nav.ItemNo = $self;
	ValuationType_Nav: Association to many ServiceValuationTypes on ValuationType_Nav.ValuationType = $self;
}
entity S4ServiceConfirmationLongTexts 
 {
	HeaderID: String;
	key ItemNo: String;
	NewTextString: String;
	key ObjectID: String;
	ObjectKey: String;
	key ObjectType: String;
	key TextID: String;
	TextObjType: String;
	TextString: String;
	S4ServiceConfirmationItem_Nav: Association to one S4ServiceConfirmationItems;
	S4ServiceConfirmation_Nav: Association to one S4ServiceConfirmations;
}
entity S4ServiceConfirmationPartners 
 {
	AddressNum: String;
	BusinessPartnerID: String;
	DisplayType: String;
	HeaderID: String;
	key ItemNo: String;
	MainPartner: String;
	key ObjectID: String;
	key ObjectType: String;
	key PartnerFunction: String;
	key PartnerNo: String;
	key PartnerNoType: String;
	PrevPartnerFunction: String;
	PrevPartnerNo: String;
	BusinessPartner_Nav: Association to one S4BusinessPartners;
	S4PartnerFunc_Nav: Association to many S4PartnerFunctions on S4PartnerFunc_Nav.PrevPartnerFunction = $self;
	S4ServiceConfirmationItem_Nav: Association to one S4ServiceConfirmationItems;
	S4ServiceConfirmation_Nav: Association to one S4ServiceConfirmations;
}
entity S4ServiceConfirmationRefObjs 
 {
	key Counter: String;
	EquipID: String;
	FLocID: String;
	HeaderID: String;
	key ItemNo: String;
	MainObject: String;
	key ObjectID: String;
	key ObjectType: String;
	ProductID: String;
	ReferenceType: String;
	SerialNum: String;
	Material_Nav: Association to many Materials on Material_Nav.ProductID = $self;
	MyEquipment_Nav: Association to many MyEquipments on MyEquipment_Nav.EquipID = $self;
	MyFunctionalLocation_Nav: Association to many MyFunctionalLocations on MyFunctionalLocation_Nav.FLocID = $self;
	S4ServiceConfirmationItem_Nav: Association to one S4ServiceConfirmationItems;
	S4ServiceConfirmation_Nav: Association to one S4ServiceConfirmations;
}
entity S4ServiceConfirmationTranHistories 
 {
	HeaderID: String;
	HeaderObjectType: String;
	key ItemNo: String;
	key ObjectID: String;
	key ObjectType: String;
	RelatedHeaderObjType: String;
	key RelatedItemNo: String;
	key RelatedObjectID: String;
	key RelatedObjectType: String;
	S4ServiceConfirmationItem_Nav: Association to one S4ServiceConfirmationItems;
	S4ServiceConfirmation_Nav: Association to many S4ServiceConfirmations on S4ServiceConfirmation_Nav.ObjectType = $self;
	S4ServiceContractItem_Nav: Association to one S4ServiceContractItems;
	S4ServiceContract_Nav: Association to one S4ServiceContracts;
	S4ServiceItem_Nav: Association to one S4ServiceItems;
	S4ServiceOrder_Nav: Association to one S4ServiceOrders;
}
entity S4ServiceConfirmations 
 {
	ActivityCategory: String;
	CatalogType: String;
	Category1: Guid;
	Category2: Guid;
	Category3: Guid;
	Category4: Guid;
	CategoryID: String;
	Code: String;
	CodeGroup: String;
	ContractAccount: String;
	CreatedBy: String;
	Description: String;
	DistributionChannel: String;
	Division: String;
	DueBy: DateTime;
	EmployeeResp: String;
	FinalConfirmation: String;
	HeaderGUID: Guid;
	HeaderGUID32: String;
	Impact: String;
	key ObjectID: String;
	key ObjectType: String;
	Priority: String;
	ProcessType: String;
	RequestedEnd: DateTime;
	RequestedStart: DateTime;
	SalesGroup: String;
	SalesOffice: String;
	SalesOrg: String;
	SalesRespOrg: String;
	SchemaGUID: Guid;
	SchemaID: String;
	ServiceEmployee: String;
	ServiceOrg: String;
	ServiceRespOrg: String;
	ServiceTeam: String;
	SoldToParty: String;
	Status: String;
	StatusDesc: String;
	SubjectProfile: String;
	Urgency: String;
	WarrantyDesc: String;
	WarrantyID: String;
	Category1_Nav: Association to many CategorizationSchemas on Category1_Nav.Category1 = $self;
	Category2_Nav: Association to many CategorizationSchemas on Category2_Nav.SchemaGUID = $self;
	Category3_Nav: Association to many CategorizationSchemas on Category3_Nav.SchemaGUID = $self;
	Category4_Nav: Association to many CategorizationSchemas on Category4_Nav.Category4 = $self;
	Customer_Nav: Association to one S4BusinessPartners;
	DistributionChannel_Nav: Association to many DistributionChannels on DistributionChannel_Nav.DistributionChannel = $self;
	Division_Nav: Association to many Divisions on Division_Nav.Division = $self;
	Document: Association to many S4ServiceConfirmationDocuments on Document.HeaderID = $self;
	LongText_Nav: Association to many S4ServiceConfirmationLongTexts on LongText_Nav.HeaderID = $self;
	MobileStatusHistory_Nav: Association to many PMMobileStatusHistories on MobileStatusHistory_Nav.SortField = $self;
	MobileStatus_Nav: Association to many PMMobileStatuses on MobileStatus_Nav.SortField = $self;
	OrderTransHistory_Nav: Association to many S4ServiceOrderTranHistories on OrderTransHistory_Nav.RelatedObjectID = $self;
	Partners_Nav: Association to many S4ServiceConfirmationPartners on Partners_Nav.ObjectType = $self;
	RefObjects_Nav: Association to many S4ServiceConfirmationRefObjs on RefObjects_Nav.HeaderID = $self;
	SalesOffice_Nav: Association to many SalesOffices on SalesOffice_Nav.SalesOffice = $self;
	SalesOrg_Nav: Association to many SalesOrgs on SalesOrg_Nav.SalesOrg = $self;
	SalesRespOrg_Nav: Association to many SalesRespOrgs on SalesRespOrg_Nav.SalesRespOrg = $self;
	ServiceConfirmationItems_Nav: Association to many S4ServiceConfirmationItems on ServiceConfirmationItems_Nav.ObjectID = $self;
	ServiceOrg_Nav: Association to many SalesRespOrgs on ServiceOrg_Nav.SalesRespOrg = $self;
	ServiceRespOrg_Nav: Association to many ServiceRespOrgs;
	TransHistories_Nav: Association to many S4ServiceConfirmationTranHistories on TransHistories_Nav.ObjectType = $self;
}
entity S4ServiceContractDocuments 
 {
	DocumentID: String;
	HeaderID: String;
	ItemNo: String;
	ObjectID: String;
	key ObjectKey: String;
	ObjectType: String;
	key RelationshipID: String;
	Document: Association to many Documents on Document.DocumentID = $self;
	S4ServiceContractItem_Nav: Association to one S4ServiceContractItems;
	S4ServiceContract_Nav: Association to one S4ServiceContracts;
}
entity S4ServiceContractItems 
 {
	AccountingInd: String;
	CatalogType: String;
	Category1: Guid;
	Category2: Guid;
	Category3: Guid;
	Category4: Guid;
	CategoryID: String;
	Code: String;
	CodeGroup: String;
	ContractAccount: String;
	ContractEnd: DateTime;
	ContractID: String;
	ContractItem: Guid;
	ContractStart: DateTime;
	Currency: String;
	DueBy: DateTime;
	Duration: Decimal;
	DurationUOM: String;
	ItemCategory: String;
	ItemCategoryUsage: String;
	ItemDesc: String;
	ItemGUID: Guid;
	ItemGUID32: String;
	key ItemNo: String;
	ItemObjectType: String;
	NetValue: String;
	key ObjectID: String;
	key ObjectType: String;
	ProductID: String;
	ProductName: String;
	Quantity: Decimal;
	QuantityUOM: String;
	RequestedEnd: DateTime;
	RequestedStart: DateTime;
	ResponseProfile: String;
	SalesGroup: String;
	SalesOffice: String;
	SalesOrg: String;
	SalesRespOrg: String;
	SchemaGUID: Guid;
	SchemaID: String;
	ServiceEmployee: String;
	ServiceOrg: String;
	ServiceProfile: String;
	ServiceRespOrg: String;
	ServiceTeam: String;
	ServiceType: String;
	SubjectProfile: String;
	ValuationType: String;
	WarrantyDesc: String;
	WarrantyID: String;
	AccountingInd_Nav: Association to one AcctIndicators;
	Contract_Nav: Association to one S4ServiceContracts;
	Currency_Nav: Association to one Currencies;
	Document: Association to many S4ServiceContractDocuments on Document.ItemNo = $self;
	LongText_Nav: Association to many S4ServiceContractLongTexts on LongText_Nav.ObjectID = $self;
	Material_Nav: Association to many Materials on Material_Nav.ProductID = $self;
	RefObj_Nav: Association to many S4ServiceContractRefObjs on RefObj_Nav.ObjectID = $self;
	RespOrg_Nav: Association to many ServiceRespOrgs on RespOrg_Nav.ServiceRespOrg = $self;
	S4ServiceConfirmationTranHistory_Nav: Association to many S4ServiceConfirmationTranHistories on S4ServiceConfirmationTranHistory_Nav.RelatedItemNo = $self;
	ServiceOrg_Nav: Association to many ServiceOrgs on ServiceOrg_Nav.ServiceOrg = $self;
	ServiceType_Nav: Association to many ServiceTypes on ServiceType_Nav.ServiceType = $self;
	TranHistory_Nav: Association to many S4ServiceContractTranHistories on TranHistory_Nav.HeaderObjectType = $self;
}
entity S4ServiceContractLongTexts 
 {
	HeaderID: String;
	key ItemNo: String;
	NewTextString: String;
	key ObjectID: String;
	ObjectKey: String;
	key ObjectType: String;
	key TextID: String;
	TextObjType: String;
	TextString: String;
	S4ServiceContractItem_Nav: Association to one S4ServiceContractItems;
	S4ServiceContract_Nav: Association to one S4ServiceContracts;
}
entity S4ServiceContractRefObjs 
 {
	key Counter: String;
	EquipID: String;
	FLocID: String;
	HeaderID: String;
	key ItemNo: String;
	MainObject: String;
	key ObjectID: String;
	key ObjectType: String;
	ProductID: String;
	ReferenceType: String;
	SerialNum: String;
	Material_Nav: Association to many Materials on Material_Nav.ProductID = $self;
	MyEquipment_Nav: Association to many MyEquipments on MyEquipment_Nav.EquipID = $self;
	MyFunctionalLocation_Nav: Association to many MyFunctionalLocations on MyFunctionalLocation_Nav.FLocID = $self;
	S4ServiceContractItem_Nav: Association to one S4ServiceContractItems;
	S4ServiceContract_Nav: Association to one S4ServiceContracts;
}
entity S4ServiceContractTranHistories 
 {
	HeaderID: String;
	HeaderObjectType: String;
	key ItemNo: String;
	key ObjectID: String;
	key ObjectType: String;
	RelatedHeaderObjType: String;
	key RelatedItemNo: String;
	key RelatedObjectID: String;
	key RelatedObjectType: String;
	S4ServiceContractItem_Nav: Association to one S4ServiceContractItems;
	S4ServiceContract_Nav: Association to one S4ServiceContracts;
	S4ServiceItems_Nav: Association to one S4ServiceItems;
	S4ServiceOrders_Nav: Association to one S4ServiceOrders;
}
entity S4ServiceContracts 
 {
	ContactPers: String;
	ContractEndDate: DateTime;
	ContractStartDate: DateTime;
	CreatedOn: DateTime;
	Description: String;
	EmployeeResp: String;
	LifeCycleStatus: String;
	key ObjectID: String;
	key ObjectType: String;
	SalesOrg: String;
	ServiceOrg: String;
	SoldToParty: String;
	StatusDesc: String;
	ContactPerson_Nav: Association to one S4BusinessPartners;
	ContractItem_Nav: Association to many S4ServiceContractItems on ContractItem_Nav.ObjectType = $self;
	Customer_Nav: Association to one S4BusinessPartners;
	Document: Association to many S4ServiceContractDocuments on Document.HeaderID = $self;
	EmpResp_Nav: Association to one S4BusinessPartners;
	LongText_Nav: Association to many S4ServiceContractLongTexts on LongText_Nav.ObjectType = $self;
	RefObj_Nav: Association to many S4ServiceContractRefObjs on RefObj_Nav.HeaderID = $self;
	S4ServiceConfirmationTranHistory_Nav: Association to many S4ServiceConfirmationTranHistories on S4ServiceConfirmationTranHistory_Nav.RelatedObjectType = $self;
	S4ServiceContractItem_Nav: Association to many S4ServiceContractItems on S4ServiceContractItem_Nav.ObjectType = $self;
	TranHistory_Nav: Association to many S4ServiceContractTranHistories on TranHistory_Nav.HeaderID = $self;
}
entity S4ServiceItems 
 {
	AccountingInd: String;
	Amount: Decimal;
	CatalogType: String;
	Category1: Guid;
	Category2: Guid;
	Category3: Guid;
	Category4: Guid;
	CategoryID: String;
	Code: String;
	CodeGroup: String;
	ContractAccount: String;
	ContractEnd: DateTime;
	ContractID: String;
	ContractItem: Guid;
	ContractStart: DateTime;
	Currency: String;
	DueBy: DateTime;
	Duration: Decimal;
	DurationUOM: String;
	ItemCategory: String;
	ItemCategoryUsage: String;
	ItemDesc: String;
	ItemGUID: Guid;
	ItemGUID32: String;
	key ItemNo: String;
	ItemObjectType: String;
	NetValue: String;
	key ObjectID: String;
	key ObjectType: String;
	ProductID: String;
	ProductName: String;
	Quantity: Decimal;
	QuantityUOM: String;
	RequestedEnd: DateTime;
	RequestedStart: DateTime;
	ResponseProfile: String;
	SalesGroup: String;
	SalesOffice: String;
	SalesOrg: String;
	SalesRespOrg: String;
	SchemaGUID: Guid;
	SchemaID: String;
	ServiceEmployee: String;
	ServiceOrg: String;
	ServiceProfile: String;
	ServiceRespOrg: String;
	ServiceTeam: String;
	ServiceType: String;
	SubjectProfile: String;
	ValuationType: String;
	WarrantyDesc: String;
	WarrantyID: String;
	AccountingInd_Nav: Association to one AcctIndicators;
	Category1_Nav: Association to many CategorizationSchemas on Category1_Nav.SchemaGUID = $self;
	Category2_Nav: Association to many CategorizationSchemas on Category2_Nav.SchemaGUID = $self;
	Category3_Nav: Association to many CategorizationSchemas on Category3_Nav.Category3 = $self;
	Category4_Nav: Association to many CategorizationSchemas on Category4_Nav.Category4 = $self;
	Currency_Nav: Association to one Currencies;
	Document: Association to many S4ServiceOrderDocuments on Document.ObjectID = $self;
	ItemCategory_Nav: Association to many ServiceItemCategories on ItemCategory_Nav.ItemCategory = $self;
	LongText_Nav: Association to many S4ServiceOrderLongTexts on LongText_Nav.ObjectID = $self;
	MobileStatusHistory_Nav: Association to many PMMobileStatusHistories on MobileStatusHistory_Nav.SortField = $self;
	MobileStatus_Nav: Association to many PMMobileStatuses on MobileStatus_Nav.S4ObjectTypeH = $self;
	Partners_Nav: Association to many S4ServiceOrderPartners on Partners_Nav.ItemNo = $self;
	Product_Nav: Association to many Materials on Product_Nav.ProductID = $self;
	RefObjects_Nav: Association to many S4ServiceOrderRefObjs on RefObjects_Nav.ObjectID = $self;
	ResponseSchema_Nav: Association to many ServiceResponseSchemas on ResponseSchema_Nav.ResponseProfile = $self;
	S4ServiceOrder_Nav: Association to one S4ServiceOrders;
	SalesOffice_Nav: Association to many SalesOffices on SalesOffice_Nav.SalesOffice = $self;
	SalesOrg_Nav: Association to many SalesOrgs on SalesOrg_Nav.SalesOrg = $self;
	SalesRespOrg_Nav: Association to many SalesRespOrgs on SalesRespOrg_Nav.SalesRespOrg = $self;
	ServiceItemCategorySchema_Nav: Association to one ServiceItemCategorySchemas;
	ServiceOrg_Nav: Association to many ServiceOrgs on ServiceOrg_Nav.ServiceOrg = $self;
	ServiceProfile_Nav: Association to many ServiceAvailabilityProfiles on ServiceProfile_Nav.ServiceProfile = $self;
	ServiceRespOrg_Nav: Association to many ServiceRespOrgs on ServiceRespOrg_Nav.ServiceRespOrg = $self;
	ServiceType_Nav: Association to many ServiceTypes on ServiceType_Nav.ServiceType = $self;
	TransHistories_Nav: Association to many S4ServiceOrderTranHistories on TransHistories_Nav.ItemNo = $self;
	ValuationType_Nav: Association to many ServiceValuationTypes on ValuationType_Nav.ValuationType = $self;
}
entity S4ServiceOrderDocuments 
 {
	DocumentID: String;
	HeaderID: String;
	ItemNo: String;
	ObjectID: String;
	key ObjectKey: String;
	ObjectType: String;
	key RelationshipID: String;
	Document: Association to many Documents on Document.DocumentID = $self;
	S4ServiceItem_Nav: Association to one S4ServiceItems;
	S4ServiceOrder_Nav: Association to one S4ServiceOrders;
}
entity S4ServiceOrderLongTexts 
 {
	HeaderID: String;
	key ItemNo: String;
	NewTextString: String;
	key ObjectID: String;
	ObjectKey: String;
	key ObjectType: String;
	key TextID: String;
	TextObjType: String;
	TextString: String;
	S4ServiceItem_Nav: Association to one S4ServiceItems;
	S4ServiceOrder_Nav: Association to one S4ServiceOrders;
}
entity S4ServiceOrderPartners 
 {
	AddressNum: String;
	BusinessPartnerID: String;
	DisplayType: String;
	HeaderID: String;
	key ItemNo: String;
	MainPartner: String;
	key ObjectID: String;
	key ObjectType: String;
	key PartnerFunction: String;
	key PartnerGUID: String;
	key PartnerNoType: String;
	PrevPartnerFunction: String;
	PrevPartnerNo: String;
	BusinessPartner_Nav: Association to one S4BusinessPartners;
	S4PartnerFunc_Nav: Association to many S4PartnerFunctions on S4PartnerFunc_Nav.PartnerFunction = $self;
	S4ServiceItem_Nav: Association to one S4ServiceItems;
	S4ServiceOrder_Nav: Association to one S4ServiceOrders;
}
entity S4ServiceOrderRefObjs 
 {
	key Counter: String;
	EquipID: String;
	FLocID: String;
	HeaderID: String;
	key ItemNo: String;
	MainObject: String;
	key ObjectID: String;
	key ObjectType: String;
	ProductID: String;
	ReferenceType: String;
	SerialNum: String;
	Equipment_Nav: Association to many MyEquipments on Equipment_Nav.EquipID = $self;
	FuncLoc_Nav: Association to many MyFunctionalLocations on FuncLoc_Nav.FLocID = $self;
	Material_Nav: Association to many Materials on Material_Nav.ProductID = $self;
	S4ServiceItem_Nav: Association to one S4ServiceItems;
	S4ServiceOrder_Nav: Association to one S4ServiceOrders;
}
entity S4ServiceOrderTranHistories 
 {
	HeaderID: String;
	HeaderObjectType: String;
	key ItemNo: String;
	key ObjectID: String;
	key ObjectType: String;
	RelatedHeaderObjType: String;
	key RelatedItemNo: String;
	key RelatedObjectID: String;
	key RelatedObjectType: String;
	S4ServiceConfirmItem_Nav: Association to one S4ServiceConfirmationItems;
	S4ServiceConfirms_Nav: Association to many S4ServiceConfirmations on S4ServiceConfirms_Nav.RelatedObjectID = $self;
	S4ServiceContractItem_Nav: Association to one S4ServiceContractItems;
	S4ServiceContract_Nav: Association to one S4ServiceContracts;
	S4ServiceItem_Nav: Association to one S4ServiceItems;
	S4ServiceOrder_Nav: Association to one S4ServiceOrders;
	S4ServiceRequest_Nav: Association to many S4ServiceRequests on S4ServiceRequest_Nav.RelatedObjectID = $self;
}
entity S4ServiceOrders 
 {
	ActivityCategory: String;
	BillToParty: String;
	CatalogType: String;
	Category1: Guid;
	Category2: Guid;
	Category3: Guid;
	Category4: Guid;
	CategoryID: String;
	Code: String;
	CodeGroup: String;
	ContactPerson: String;
	ContractAccount: String;
	Description: String;
	DistributionChannel: String;
	Division: String;
	DueBy: DateTime;
	EmployeeResp: String;
	HeaderGUID: Guid;
	HeaderGUID32: String;
	Impact: String;
	key ObjectID: String;
	key ObjectType: String;
	Priority: String;
	ProcessType: String;
	RequestedEnd: DateTime;
	RequestedStart: DateTime;
	SalesGroup: String;
	SalesOffice: String;
	SalesOrg: String;
	SalesRespOrg: String;
	SchemaGUID: Guid;
	SchemaID: String;
	ServiceEmployee: String;
	ServiceOrg: String;
	ServiceRespOrg: String;
	ServiceTeam: String;
	SoldToParty: String;
	StatusDesc: String;
	SubjectProfile: String;
	Urgency: String;
	WarrantyDesc: String;
	WarrantyID: String;
	BillToParty_Nav: Association to one S4BusinessPartners;
	Category1_Nav: Association to many CategorizationSchemas on Category1_Nav.Category1 = $self;
	Category2_Nav: Association to many CategorizationSchemas on Category2_Nav.Category2 = $self;
	Category3_Nav: Association to many CategorizationSchemas on Category3_Nav.SchemaGUID = $self;
	Category4_Nav: Association to many CategorizationSchemas on Category4_Nav.Category4 = $self;
	ContactPerson_Nav: Association to one S4BusinessPartners;
	Customer_Nav: Association to one S4BusinessPartners;
	Document: Association to many S4ServiceOrderDocuments on Document.HeaderID = $self;
	EmpResp_Nav: Association to one S4BusinessPartners;
	LongText_Nav: Association to many S4ServiceOrderLongTexts on LongText_Nav.HeaderID = $self;
	MobileStatusHistory_Nav: Association to many PMMobileStatusHistories on MobileStatusHistory_Nav.S4ObjectTypeH = $self;
	MobileStatus_Nav: Association to many PMMobileStatuses on MobileStatus_Nav.S4ObjectTypeH = $self;
	Partners_Nav: Association to many S4ServiceOrderPartners on Partners_Nav.ObjectType = $self;
	Priority_Nav: Association to many ServicePriorities on Priority_Nav.Priority = $self;
	RefObjects_Nav: Association to many S4ServiceOrderRefObjs on RefObjects_Nav.ObjectType = $self;
	S4ServiceConfirmationTranHistory_Nav: Association to many S4ServiceConfirmationTranHistories on S4ServiceConfirmationTranHistory_Nav.RelatedObjectID = $self;
	SalesOffice_Nav: Association to many SalesOffices on SalesOffice_Nav.SalesOffice = $self;
	SalesOrg_Nav: Association to many SalesOrgs on SalesOrg_Nav.SalesOrg = $self;
	SalesRespOrg_Nav: Association to many SalesRespOrgs on SalesRespOrg_Nav.SalesRespOrg = $self;
	ServiceImpact_Nav: Association to many ServiceImpactSet on ServiceImpact_Nav.Impact = $self;
	ServiceItems_Nav: Association to many S4ServiceItems on ServiceItems_Nav.ObjectType = $self;
	ServiceOrg_Nav: Association to many ServiceOrgs on ServiceOrg_Nav.ServiceOrg = $self;
	ServiceRespOrg_Nav: Association to many ServiceRespOrgs on ServiceRespOrg_Nav.ServiceRespOrg = $self;
	ServiceUrgency_Nav: Association to many ServiceUrgencySet on ServiceUrgency_Nav.Urgency = $self;
	TransHistories_Nav: Association to many S4ServiceOrderTranHistories on TransHistories_Nav.ObjectType = $self;
}
entity S4ServiceRequestDocuments 
 {
	DocumentID: String;
	HeaderID: String;
	ItemNo: String;
	ObjectID: String;
	key ObjectKey: String;
	ObjectType: String;
	key RelationshipID: String;
	Document: Association to many Documents on Document.DocumentID = $self;
	S4ServiceRequest_Nav: Association to one S4ServiceRequests;
}
entity S4ServiceRequestLongTexts 
 {
	HeaderID: String;
	key ItemNo: String;
	NewTextString: String;
	key ObjectID: String;
	ObjectKey: String;
	key ObjectType: String;
	key TextID: String;
	TextObjType: String;
	TextString: String;
	S4ServiceRequest_Nav: Association to one S4ServiceRequests;
}
entity S4ServiceRequestPartners 
 {
	AddressNum: String;
	BusinessPartnerID: String;
	DisplayType: String;
	HeaderID: String;
	key ItemNo: String;
	MainPartner: String;
	key ObjectID: String;
	key ObjectType: String;
	key PartnerFunction: String;
	key PartnerNoType: String;
	PrevPartnerFunction: String;
	PrevPartnerNo: String;
	BusinessPartner_Nav: Association to one S4BusinessPartners;
	S4PartnerFunction_Nav: Association to many S4PartnerFunctions on S4PartnerFunction_Nav.PartnerFunction = $self;
	S4ServiceRequest_Nav: Association to one S4ServiceRequests;
}
entity S4ServiceRequestRefObjs 
 {
	key Counter: String;
	EquipID: String;
	FLocID: String;
	HeaderID: String;
	key ItemNo: String;
	MainObject: String;
	key ObjectID: String;
	key ObjectType: String;
	ProductID: String;
	ReferenceType: String;
	SerialNum: String;
	Material_Nav: Association to many Materials on Material_Nav.ProductID = $self;
	MyEquipment_Nav: Association to many MyEquipments on MyEquipment_Nav.EquipID = $self;
	MyFunctionalLocation_Nav: Association to many MyFunctionalLocations on MyFunctionalLocation_Nav.FLocID = $self;
	S4ServiceRequest_Nav: Association to one S4ServiceRequests;
}
entity S4ServiceRequestTranHistories 
 {
	HeaderID: String;
	key ItemNo: String;
	key ObjectID: String;
	key ObjectType: String;
	key RelatedItemNo: String;
	key RelatedObjectID: String;
	key RelatedObjectType: String;
	S4ServiceOrder_Nav: Association to one S4ServiceOrders;
	S4ServiceRequest_Nav: Association to one S4ServiceRequests;
}
entity S4ServiceRequests 
 {
	ActivityCategory: String;
	CatalogType1: String;
	CatalogType2: String;
	CategoryID1: String;
	CategoryID2: String;
	Code1: String;
	Code2: String;
	CodeGroup1: String;
	CodeGroup2: String;
	ContactPers: String;
	ContractAccount: String;
	Description: String;
	DistributionChannel: String;
	Division: String;
	DueBy: DateTime;
	EmployeeResp: String;
	FirstResponseBy: DateTime;
	HeaderGUID: Guid;
	HeaderGUID32: String;
	Impact: String;
	key ObjectID: String;
	key ObjectType: String;
	Priority: String;
	ProcessType: String;
	ReasonCategory1: Guid;
	ReasonCategory2: Guid;
	ReasonCategory3: Guid;
	ReasonCategory4: Guid;
	RecommendedPriority: String;
	RequestedEnd: DateTime;
	RequestedStart: DateTime;
	SalesGroup: String;
	SalesOffice: String;
	SalesOrg: String;
	SalesRespOrg: String;
	SchemaGUID1: Guid;
	SchemaGUID2: Guid;
	SchemaID1: String;
	SchemaID2: String;
	ServiceEmployee: String;
	ServiceOrg: String;
	ServiceRespOrg: String;
	ServiceTeam: String;
	SoldToParty: String;
	StatusDesc: String;
	SubjCategory1: Guid;
	SubjCategory2: Guid;
	SubjCategory3: Guid;
	SubjCategory4: Guid;
	SubjectProfile1: String;
	SubjectProfile2: String;
	Urgency: String;
	Category1_1_Nav: Association to many CategorizationSchemas on Category1_1_Nav.ReasonCategory1 = $self;
	Category1_2_Nav: Association to many CategorizationSchemas on Category1_2_Nav.SchemaGUID2 = $self;
	Category2_1_Nav: Association to many CategorizationSchemas on Category2_1_Nav.SchemaGUID1 = $self;
	Category2_2_Nav: Association to many CategorizationSchemas on Category2_2_Nav.SubjCategory2 = $self;
	Category3_1_Nav: Association to many CategorizationSchemas on Category3_1_Nav.SchemaGUID1 = $self;
	Category3_2_Nav: Association to many CategorizationSchemas on Category3_2_Nav.SubjCategory3 = $self;
	Category4_1_Nav: Association to many CategorizationSchemas on Category4_1_Nav.ReasonCategory4 = $self;
	Category4_2_Nav: Association to many CategorizationSchemas on Category4_2_Nav.SchemaGUID2 = $self;
	ContactPerson_Nav: Association to one S4BusinessPartners;
	Customer_Nav: Association to one S4BusinessPartners;
	Document: Association to many S4ServiceRequestDocuments on Document.HeaderID = $self;
	EmpResp_Nav: Association to one S4BusinessPartners;
	Impact_Nav: Association to many ServiceImpactSet on Impact_Nav.Impact = $self;
	LongText_Nav: Association to many S4ServiceRequestLongTexts on LongText_Nav.HeaderID = $self;
	MobileStatusHistory_Nav: Association to many PMMobileStatusHistories on MobileStatusHistory_Nav.SortField = $self;
	MobileStatus_Nav: Association to many PMMobileStatuses on MobileStatus_Nav.S4ObjectTypeH = $self;
	OrderTransHistory_Nav: Association to many S4ServiceOrderTranHistories on OrderTransHistory_Nav.RelatedObjectID = $self;
	Partners_Nav: Association to many S4ServiceRequestPartners on Partners_Nav.ObjectType = $self;
	Priority_Nav: Association to many ServicePriorities on Priority_Nav.Priority = $self;
	RefObj_Nav: Association to many S4ServiceRequestRefObjs on RefObj_Nav.HeaderID = $self;
	SalesOffice_Nav: Association to many SalesOffices on SalesOffice_Nav.SalesOffice = $self;
	SalesOrg_Nav: Association to many SalesOrgs on SalesOrg_Nav.SalesOrg = $self;
	SalesRespOrg_Nav: Association to many SalesRespOrgs on SalesRespOrg_Nav.SalesRespOrg = $self;
	ServiceOrg_Nav: Association to many ServiceOrgs on ServiceOrg_Nav.ServiceOrg = $self;
	ServiceRespOrg_Nav: Association to many ServiceRespOrgs on ServiceRespOrg_Nav.ServiceRespOrg = $self;
	TranHistory_Nav: Association to many S4ServiceRequestTranHistories on TranHistory_Nav.ObjectType = $self;
	Urgency_Nav: Association to many ServiceUrgencySet on Urgency_Nav.Urgency = $self;
}
entity SAPUsers 
 {
	AddressNum: String;
	PersonNum: String;
	key UserId: String;
	UserName: String;
	AddressAtWork_Nav: Association to one AddressesAtWork;
}
entity SAPUsers 
 {
	AddressNum: String;
	PersonNum: String;
	key UserId: String;
	UserName: String;
	AddressAtWork_Nav: Association to one AddressesAtWork;
}
entity STOScheduleLines 
 {
	Batch: String;
	DeliveredQuantity: Decimal;
	DeliveryDate: DateTime;
	IssuedQuantity: Decimal;
	key ItemNum: String;
	ReservationNum: String;
	key ScheduleLine: String;
	key StockTransportOrderId: String;
	StockTransportOrderItem_Nav: Association to one StockTransportOrderItems;
}
entity STOScheduleLines 
 {
	Batch: String;
	DeliveredQuantity: Decimal;
	DeliveryDate: DateTime;
	IssuedQuantity: Decimal;
	key ItemNum: String;
	ReservationNum: String;
	key ScheduleLine: String;
	key StockTransportOrderId: String;
	StockTransportOrderItem_Nav: Association to one StockTransportOrderItems;
}
entity SalesGroups 
 {
	Description: String;
	key SalesGroup: String;
	ShortDescription: String;
	S4BPSalesArea_Nav: Association to many S4BPSalesAreas on S4BPSalesArea_Nav.SalesGroup = $self;
}
entity SalesOffices 
 {
	Description: String;
	key SalesOffice: String;
	ShortDescription: String;
	S4ServiceConfirmation_Nav: Association to many S4ServiceConfirmations on S4ServiceConfirmation_Nav.SalesOffice = $self;
	S4ServiceItem_Nav: Association to many S4ServiceItems on S4ServiceItem_Nav.SalesOffice = $self;
	S4ServiceOrder_Nav: Association to many S4ServiceOrders on S4ServiceOrder_Nav.SalesOffice = $self;
	S4ServiceRequest_Nav: Association to many S4ServiceRequests on S4ServiceRequest_Nav.SalesOffice = $self;
}
entity SalesOrgs 
 {
	Description: String;
	key SalesOrg: String;
	ShortDescription: String;
	S4ServiceConfirmationItem_Nav: Association to many S4ServiceConfirmationItems on S4ServiceConfirmationItem_Nav.SalesOrg = $self;
	S4ServiceConfirmation_Nav: Association to many S4ServiceConfirmations on S4ServiceConfirmation_Nav.SalesOrg = $self;
	S4ServiceItems_Nav: Association to many S4ServiceItems on S4ServiceItems_Nav.SalesOrg = $self;
	S4ServiceOrders_Nav: Association to many S4ServiceOrders on S4ServiceOrders_Nav.SalesOrg = $self;
	S4ServiceRequest_Nav: Association to many S4ServiceRequests on S4ServiceRequest_Nav.SalesOrg = $self;
}
entity SalesRespOrgs 
 {
	Description: String;
	key SalesRespOrg: String;
	ShortDescription: String;
	S4ServiceConfirmationItem_Nav: Association to many S4ServiceConfirmationItems on S4ServiceConfirmationItem_Nav.SalesRespOrg = $self;
	S4ServiceConfirmation_Nav: Association to many S4ServiceConfirmations on S4ServiceConfirmation_Nav.SalesRespOrg = $self;
	S4ServiceItems_Nav: Association to many S4ServiceItems on S4ServiceItems_Nav.SalesRespOrg = $self;
	S4ServiceOrders_Nav: Association to many S4ServiceOrders on S4ServiceOrders_Nav.SalesRespOrg = $self;
	S4ServiceRequest_Nav: Association to many S4ServiceRequests on S4ServiceRequest_Nav.SalesRespOrg = $self;
}
entity ScheduleLines 
 {
	Batch: String;
	DeliveredQuantity: Decimal;
	DeliveryDate: DateTime;
	IssuedQuantity: Decimal;
	key ItemNum: String;
	key PurchaseOrderId: String;
	ReservationNum: String;
	key ScheduleLine: String;
	PurchaseOrderItem_Nav: Association to one PurchaseOrderItems;
	ReservationHeader_Nav: Association to one ReservationHeaders;
}
entity ScheduleLines 
 {
	Batch: String;
	DeliveredQuantity: Decimal;
	DeliveryDate: DateTime;
	IssuedQuantity: Decimal;
	key ItemNum: String;
	key PurchaseOrderId: String;
	ReservationNum: String;
	key ScheduleLine: String;
	PurchaseOrderItem_Nav: Association to one PurchaseOrderItems;
	ReservationHeader_Nav: Association to one ReservationHeaders;
}
entity SearchConditions 
 {
	Active: String;
	High: String;
	Low: String;
	Name: String;
	Option: String;
	key RecordNum: String;
	Sign: String;
	key UserGuid: String;
	SearchType_Nav: Association to many SearchTypes on SearchType_Nav.Name = $self;
}
entity SearchConditions 
 {
	Active: String;
	High: String;
	Low: String;
	Name: String;
	Option: String;
	key RecordNum: String;
	Sign: String;
	key UserGuid: String;
	SearchType_Nav: Association to many SearchTypes on SearchType_Nav.Name = $self;
}
entity SearchTypes 
 {
	key Name: String;
	SearchCondition_Nav: Association to many SearchConditions on SearchCondition_Nav.Name = $self;
}
entity SearchTypes 
 {
	key Name: String;
	SearchCondition_Nav: Association to many SearchConditions on SearchCondition_Nav.Name = $self;
}
entity ServiceAvailabilityProfiles 
 {
	Description: String;
	RuleID: String;
	key ServiceProfile: String;
	SeviceItems_Nav: Association to many S4ServiceItems on SeviceItems_Nav.ServiceProfile = $self;
}
entity ServiceImpactSet 
 {
	Description: String;
	key Impact: String;
	S4ServiceOrders_Nav: Association to many S4ServiceOrders on S4ServiceOrders_Nav.Impact = $self;
	S4ServiceRequest_Nav: Association to many S4ServiceRequests on S4ServiceRequest_Nav.Impact = $self;
}
entity ServiceItemCategories 
 {
	APProcedure: String;
	ATPProf: String;
	ActionProfile: String;
	AssignCO: String;
	CondGroup: String;
	ConfProc: String;
	Confirmation: String;
	CounRuleName: String;
	DateProfile: String;
	DefaultConfig: String;
	DeliveryGroup: String;
	Description: String;
	DescriptionLong: String;
	EnhancementProf: String;
	FilterID: String;
	FixedDateQty: String;
	Inactive: String;
	IncompleteGroup: String;
	IndObject: String;
	InspectnRelvnt: String;
	key ItemCategory: String;
	Language: String;
	MandatPredecRef: String;
	ObjRefMand: String;
	ObjectType: String;
	OrgDataProf: String;
	PartnerDetProc: String;
	Profile: String;
	QuantityValueItem: String;
	Relevwgtvol: String;
	ReltoCosting: String;
	ResrcePlanning: String;
	SCRelev: String;
	ServiceType: String;
	ShortDescription: String;
	ShortDescriptionLong: String;
	StatusObjectType: String;
	StatusProfile: String;
	Structurescope: String;
	SubjectProfile: String;
	TerritoryCheck: String;
	TextDetProc: String;
	TimeRuleName: String;
	ValuationType: String;
	Varmatchact: String;
	Varmatching: String;
	WoutProduct: String;
	S4ServiceItems_Nav: Association to many S4ServiceItems on S4ServiceItems_Nav.ItemCategory = $self;
}
entity ServiceItemCategorySchemas 
 {
	CatalogTypeCAspectGUID: Guid;
	CatalogTypeDAspectGUID: Guid;
	key ItemCategory: String;
	key ParentObjectType: String;
	SubjectProfileAspectGUID: Guid;
	S4ServiceConfirmationItem_Nav: Association to many S4ServiceConfirmationItems on S4ServiceConfirmationItem_Nav.ItemCategory = $self;
	S4ServiceItem_Nav: Association to many S4ServiceItems on S4ServiceItem_Nav.ItemCategory = $self;
}
entity ServiceOrgs 
 {
	Description: String;
	key ServiceOrg: String;
	ShortDescription: String;
	S4ServiceContractItem_Nav: Association to many S4ServiceContractItems on S4ServiceContractItem_Nav.ServiceOrg = $self;
	S4ServiceContract_Nav: Association to many S4ServiceContracts on S4ServiceContract_Nav.ServiceOrg = $self;
	S4ServiceItems_Nav: Association to many S4ServiceItems on S4ServiceItems_Nav.ServiceOrg = $self;
	S4ServiceOrders_Nav: Association to many S4ServiceOrders on S4ServiceOrders_Nav.ServiceOrg = $self;
	S4ServiceRequest_Nav: Association to many S4ServiceRequests on S4ServiceRequest_Nav.ServiceOrg = $self;
}
entity ServicePriorities 
 {
	Description: String;
	key Priority: String;
}
entity ServiceProcessTypes 
 {
	CatalogTypeCAspectGUID: Guid;
	CatalogTypeDAspectGUID: Guid;
	Completerefer: String;
	Copyitemno: String;
	Description: String;
	ShortDescription: String;
	StatusProfile: String;
	key SubjectProfile: String;
	SubjectProfileAspectGUID: Guid;
	key TransCategory: String;
	key TransactionType: String;
	TransactionType1: String;
}
entity ServiceRespOrgs 
 {
	Description: String;
	key ServiceRespOrg: String;
	ShortDescription: String;
	S4ServiceItems_Nav: Association to many S4ServiceItems on S4ServiceItems_Nav.ServiceRespOrg = $self;
	S4ServiceOrders_Nav: Association to many S4ServiceOrders on S4ServiceOrders_Nav.ServiceRespOrg = $self;
}
entity ServiceResponseSchemas 
 {
	Description: String;
	key ResponseProf: String;
	S4ServiceItems_Nav: Association to many S4ServiceItems on S4ServiceItems_Nav.ResponseProfile = $self;
}
entity ServiceTypes 
 {
	Description: String;
	key ServiceType: String;
	ShortDescription: String;
	S4ConfirmItems_Nav: Association to many S4ServiceConfirmationItems on S4ConfirmItems_Nav.ServiceType = $self;
	S4ContractItems_Nav: Association to many S4ServiceContractItems on S4ContractItems_Nav.ServiceType = $self;
	S4ServiceItems_Nav: Association to many S4ServiceItems on S4ServiceItems_Nav.ServiceType = $self;
}
entity ServiceUrgencySet 
 {
	Description: String;
	key Urgency: String;
	S4ServiceOrders_Nav: Association to many S4ServiceOrders on S4ServiceOrders_Nav.Urgency = $self;
	S4ServiceRequest_Nav: Association to many S4ServiceRequests on S4ServiceRequest_Nav.Urgency = $self;
}
entity ServiceValuationTypes 
 {
	Description: String;
	key ValuationType: String;
	S4ConfirmationItem_Nav: Association to many S4ServiceConfirmationItems on S4ConfirmationItem_Nav.ValuationType = $self;
	S4ServiceItems_Nav: Association to many S4ServiceItems on S4ServiceItems_Nav.ValuationType = $self;
}
entity ShippingPoints 
 {
	Description: String;
	key ShippingPoint: String;
	ReceivingPoint_Nav: Association to many ReceivingPoints on ReceivingPoint_Nav.ReceivingPoint = $self;
}
entity ShippingPoints 
 {
	Description: String;
	key ShippingPoint: String;
	ReceivingPoint_Nav: Association to many ReceivingPoints on ReceivingPoint_Nav.ReceivingPoint = $self;
}
entity SpecialStockTexts 
 {
	Description: String;
	key SpecialStock: String;
}
entity StagingAreas 
 {
	DoorNum: String;
	key StagingArea: String;
	StagingAreaText: String;
	key WarehouseNum: String;
}
entity StagingAreas 
 {
	DoorNum: String;
	key StagingArea: String;
	StagingAreaText: String;
	key WarehouseNum: String;
}
entity StockTransportOrderHeaderLongTexts 
 {
	NewTextString: String;
	ObjectKey: String;
	key StockTransportOrderId: String;
	TextId: String;
	TextObjType: String;
	TextString: String;
	StockTransportOrderHeader_Nav: Association to one StockTransportOrderHeaders;
}
entity StockTransportOrderHeaderLongTexts 
 {
	NewTextString: String;
	ObjectKey: String;
	key StockTransportOrderId: String;
	TextId: String;
	TextObjType: String;
	TextString: String;
	StockTransportOrderHeader_Nav: Association to one StockTransportOrderHeaders;
}
entity StockTransportOrderHeaders 
 {
	DocumentCategory: String;
	DocumentDate: DateTime;
	DocumentStatus: String;
	DocumentType: String;
	key StockTransportOrderId: String;
	SupplyingPlant: String;
	Vendor: String;
	MaterialDocItem_Nav: Association to many MaterialDocItems on MaterialDocItem_Nav.PurchaseOrderNumber = $self;
	MyInventoryObject_Nav: Association to one MyInventoryObjects;
	StockTransportOrderHeaderLongText_Nav: Association to many StockTransportOrderHeaderLongTexts on StockTransportOrderHeaderLongText_Nav.StockTransportOrderId = $self;
	StockTransportOrderItem_Nav: Association to many StockTransportOrderItems on StockTransportOrderItem_Nav.StockTransportOrderId = $self;
	Vendor_Nav: Association to many Vendors on Vendor_Nav.Vendor = $self;
}
entity StockTransportOrderHeaders 
 {
	DocumentCategory: String;
	DocumentDate: DateTime;
	DocumentStatus: String;
	DocumentType: String;
	key StockTransportOrderId: String;
	SupplyingPlant: String;
	Vendor: String;
	MaterialDocItem_Nav: Association to many MaterialDocItems on MaterialDocItem_Nav.PurchaseOrderNumber = $self;
	MyInventoryObject_Nav: Association to one MyInventoryObjects;
	StockTransportOrderHeaderLongText_Nav: Association to many StockTransportOrderHeaderLongTexts on StockTransportOrderHeaderLongText_Nav.StockTransportOrderId = $self;
	StockTransportOrderItem_Nav: Association to many StockTransportOrderItems on StockTransportOrderItem_Nav.StockTransportOrderId = $self;
	Vendor_Nav: Association to many Vendors on Vendor_Nav.Vendor = $self;
}
entity StockTransportOrderItems 
 {
	DeliveryCompletedFlag: String;
	FinalDeliveryFlag: String;
	IssuedQuantity: Decimal;
	key ItemNum: String;
	ItemText: String;
	MaterialNum: String;
	OpenQuantity: Decimal;
	OrderQuantity: Decimal;
	OrderUOM: String;
	Plant: String;
	ReceivedQuantity: Decimal;
	key StockTransportOrderId: String;
	StockType: String;
	StorageLoc: String;
	SupplierMaterialNum: String;
	MaterialDocItem_Nav: Association to many MaterialDocItems on MaterialDocItem_Nav.PurchaseOrderNumber = $self;
	MaterialPlant_Nav: Association to many MaterialPlants on MaterialPlant_Nav.Plant = $self;
	Material_Nav: Association to one Materials;
	STOScheduleLine_Nav: Association to many STOScheduleLines on STOScheduleLine_Nav.ItemNum = $self;
	STOSerialNumber_Nav: Association to many StockTransportOrderSerialNumbers on STOSerialNumber_Nav.ItemNumber = $self;
	StockTransportOrderHeader_Nav: Association to one StockTransportOrderHeaders;
}
entity StockTransportOrderItems 
 {
	DeliveryCompletedFlag: String;
	FinalDeliveryFlag: String;
	IssuedQuantity: Decimal;
	key ItemNum: String;
	ItemText: String;
	MaterialNum: String;
	OpenQuantity: Decimal;
	OrderQuantity: Decimal;
	OrderUOM: String;
	Plant: String;
	ReceivedQuantity: Decimal;
	key StockTransportOrderId: String;
	StockType: String;
	StorageLoc: String;
	SupplierMaterialNum: String;
	MaterialDocItem_Nav: Association to many MaterialDocItems on MaterialDocItem_Nav.PurchaseOrderNumber = $self;
	MaterialPlant_Nav: Association to many MaterialPlants on MaterialPlant_Nav.Plant = $self;
	Material_Nav: Association to one Materials;
	STOScheduleLine_Nav: Association to many STOScheduleLines on STOScheduleLine_Nav.ItemNum = $self;
	STOSerialNumber_Nav: Association to many StockTransportOrderSerialNumbers on STOSerialNumber_Nav.ItemNumber = $self;
	StockTransportOrderHeader_Nav: Association to one StockTransportOrderHeaders;
}
entity StockTransportOrderSerialNumbers 
 {
	key ItemNumber: String;
	SerialNumber: String;
	key StockTransportOrderId: String;
	STOItem_Nav: Association to one StockTransportOrderItems;
}
entity StockTransportOrderSerialNumbers 
 {
	key ItemNumber: String;
	SerialNumber: String;
	key StockTransportOrderId: String;
	STOItem_Nav: Association to one StockTransportOrderItems;
}
entity StorageLocations 
 {
	key Plant: String;
	key StorageLocation: String;
	StorageLocationDesc: String;
	Plant_Nav: Association to one Plants;
	UserTrunkAssignment_Nav: Association to many UserTrunkAssignments on UserTrunkAssignment_Nav.Plant = $self;
}
entity StorageLocations 
 {
	key Plant: String;
	key StorageLocation: String;
	StorageLocationDesc: String;
	Plant_Nav: Association to one Plants;
	UserTrunkAssignment_Nav: Association to many UserTrunkAssignments on UserTrunkAssignment_Nav.Plant = $self;
}
entity StreetRouteConnectionObjects 
 {
	key ConnectionObject: String;
	key DeviceSet: Int16;
	key MeterReadingUnit: String;
	ConnectionObject_Nav: Association to one ConnectionObjects;
	MeterReadingUnit_Nav: Association to many MeterReadingUnits on MeterReadingUnit_Nav.MeterReadingUnit = $self;
	StreetRoute_Nav: Association to many StreetRoutes on StreetRoute_Nav.ConnectionObject = $self;
}
entity StreetRoutes 
 {
	BusinessPartner: String;
	ConnectionObject: String;
	DeviceSet: Int16;
	key EquipmentNum: String;
	MeterReader: String;
	MeterReadingUnit: String;
	key NextEquipmentNum: String;
	PersonnelNumber: String;
	key PreviousEquipmentNum: String;
	key RouteIndex: Int16;
	ConnectionObject_Nav: Association to many ConnectionObjects on ConnectionObject_Nav.ConnectionObject = $self;
	Device_Nav: Association to many Devices on Device_Nav.EquipmentNum = $self;
	MeterReadingUnit_Nav: Association to many MeterReadingUnits on MeterReadingUnit_Nav.MeterReadingUnit = $self;
	StreetRouteConnectionObject_Nav: Association to one StreetRouteConnectionObjects;
}
entity SystemStatuses 
 {
	Language: String;
	Status: String;
	StatusText: String;
	key SystemStatus: String;
	MyEquipObjectStatuses_Nav: Association to many MyEquipObjectStatuses on MyEquipObjectStatuses_Nav.Status = $self;
	MyEquipSystemStatuses_Nav: Association to many MyEquipSystemStatuses on MyEquipSystemStatuses_Nav.Status = $self;
	MyFuncLocObjectStatuses_Nav: Association to many MyFuncLocObjectStatuses on MyFuncLocObjectStatuses_Nav.Status = $self;
	MyFuncLocSystemStatuses_Nav: Association to many MyFuncLocSystemStatuses on MyFuncLocSystemStatuses_Nav.Status = $self;
}
entity SystemStatuses 
 {
	Language: String;
	Status: String;
	StatusText: String;
	key SystemStatus: String;
	MyEquipObjectStatuses_Nav: Association to many MyEquipObjectStatuses on MyEquipObjectStatuses_Nav.Status = $self;
	MyEquipSystemStatuses_Nav: Association to many MyEquipSystemStatuses on MyEquipSystemStatuses_Nav.Status = $self;
	MyFuncLocObjectStatuses_Nav: Association to many MyFuncLocObjectStatuses on MyFuncLocObjectStatuses_Nav.Status = $self;
	MyFuncLocSystemStatuses_Nav: Association to many MyFuncLocSystemStatuses on MyFuncLocSystemStatuses_Nav.Status = $self;
}
entity UsageUoMs 
 {
	Denominator: Int32;
	Description: String;
	Dimension: String;
	ExternalUoM: String;
	Numerator: Int32;
	key UoM: String;
}
entity UsageUoMs 
 {
	Denominator: Int32;
	Description: String;
	Dimension: String;
	ExternalUoM: String;
	Numerator: Int32;
	key UoM: String;
}
entity UserFeatures 
 {
	key UserFeature: String;
	key UserPersona: String;
}
entity UserFeatures 
 {
	key UserFeature: String;
	key UserPersona: String;
}
entity UserGeneralInfos 
 {
	CPMSRegistrationID: String;
	CPMSUserName: String;
	MobileApp: String;
	SAPUserName: String;
	key UserGuid: String;
}
entity UserGeneralInfos 
 {
	CPMSRegistrationID: String;
	CPMSUserName: String;
	MobileApp: String;
	SAPUserName: String;
	key UserGuid: String;
}
entity UserLocations 
 {
	CurrentTimeStamp: DateTime;
	GeometryValFormat: String;
	GeometryValue: String;
	MobileObjectStatus: String;
	ObjectGroup: String;
	ObjectGroup1: String;
	ObjectKey: String;
	ObjectType: String;
	StatusAttribute1: String;
	StatusAttribute2: String;
	key UserGUID: String;
}
entity UserLocations 
 {
	CurrentTimeStamp: DateTime;
	GeometryValFormat: String;
	GeometryValue: String;
	MobileObjectStatus: String;
	ObjectGroup: String;
	ObjectGroup1: String;
	ObjectKey: String;
	ObjectType: String;
	StatusAttribute1: String;
	StatusAttribute2: String;
	key UserGUID: String;
}
entity UserObjectTypes 
 {
	key Object: String;
	key Persona: String;
	key Type: String;
}
entity UserObjectTypes 
 {
	key Object: String;
	key Persona: String;
	key Type: String;
}
entity UserPersonas 
 {
	FlagDefault: String;
	key UserGUID: String;
	key UserPersona: String;
}
entity UserPersonas 
 {
	FlagDefault: String;
	key UserGUID: String;
	key UserPersona: String;
}
entity UserPreferences 
 {
	PreferenceGroup: String;
	PreferenceName: String;
	PreferenceValue: String;
	key RecordId: String;
	key UserGuid: String;
}
entity UserPreferences 
 {
	PreferenceGroup: String;
	PreferenceName: String;
	PreferenceValue: String;
	key RecordId: String;
	key UserGuid: String;
}
entity UserRoles 
 {
	ExternalWorkCenterId: String;
	ObjectType: String;
	key OrgId: String;
	OrgName: String;
	OrgNameShort: String;
	key PersonnelNo: String;
	key Plant: String;
	PositionName: String;
	PositionNameShort: String;
	key PositionOrgId: String;
	Role: String;
	key SAPUserId: String;
	UserGuid: String;
	UserNameLong: String;
	UserNameShort: String;
	key WorkCenterId: String;
}
entity UserRoles 
 {
	ExternalWorkCenterId: String;
	ObjectType: String;
	key OrgId: String;
	OrgName: String;
	OrgNameShort: String;
	key PersonnelNo: String;
	key Plant: String;
	PositionName: String;
	PositionNameShort: String;
	key PositionOrgId: String;
	Role: String;
	key SAPUserId: String;
	UserGuid: String;
	UserNameLong: String;
	UserNameShort: String;
	key WorkCenterId: String;
}
entity UserStatuses 
 {
	Language: String;
	Status: String;
	key StatusProfile: String;
	StatusText: String;
	key UserStatus: String;
	MyEquipUserStatuses_Nav: Association to many MyEquipUserStatuses on MyEquipUserStatuses_Nav.StatusProfile = $self;
	MyFuncLocUserStatuses_Nav: Association to many MyFuncLocUserStatuses on MyFuncLocUserStatuses_Nav.Status = $self;
}
entity UserStatuses 
 {
	Language: String;
	Status: String;
	key StatusProfile: String;
	StatusText: String;
	key UserStatus: String;
	MyEquipUserStatuses_Nav: Association to many MyEquipUserStatuses on MyEquipUserStatuses_Nav.StatusProfile = $self;
	MyFuncLocUserStatuses_Nav: Association to many MyFuncLocUserStatuses on MyFuncLocUserStatuses_Nav.Status = $self;
}
entity UserSystemInfos 
 {
	key RecordId: Int64;
	SystemSettingGroup: String;
	SystemSettingName: String;
	SystemSettingValue: String;
	key UserGuid: String;
}
entity UserSystemInfos 
 {
	key RecordId: Int64;
	SystemSettingGroup: String;
	SystemSettingName: String;
	SystemSettingValue: String;
	key UserGuid: String;
}
entity UserTimeEntries 
 {
	OperationNo: String;
	OrderId: String;
	PreferenceGroup: String;
	PreferenceName: String;
	PreferenceValue: String;
	key RecordId: String;
	SubOperationNo: String;
	key UserGUID: String;
	UserId: String;
	WOHeader_Nav: Association to many MyWorkOrderHeaders on WOHeader_Nav.OrderId = $self;
	WOOperation_Nav: Association to many MyWorkOrderOperations on WOOperation_Nav.OperationNo = $self;
	WOSubOperation_Nav: Association to one MyWorkOrderSubOperations;
}
entity UserTimeEntries 
 {
	OperationNo: String;
	OrderId: String;
	PreferenceGroup: String;
	PreferenceName: String;
	PreferenceValue: String;
	key RecordId: String;
	SubOperationNo: String;
	key UserGUID: String;
	UserId: String;
	WOHeader_Nav: Association to many MyWorkOrderHeaders on WOHeader_Nav.OrderId = $self;
	WOOperation_Nav: Association to many MyWorkOrderOperations on WOOperation_Nav.OperationNo = $self;
	WOSubOperation_Nav: Association to one MyWorkOrderSubOperations;
}
entity UserTrunkAssignments 
 {
	Active: String;
	AttributeName: String;
	Plant: String;
	key RecordNo: String;
	StorageLocation: String;
	key UserGuid: String;
	UserName: String;
	Plant_Nav: Association to many Plants on Plant_Nav.Plant = $self;
	StorageLocation_Nav: Association to many StorageLocations on StorageLocation_Nav.Plant = $self;
}
entity UserTrunkAssignments 
 {
	Active: String;
	AttributeName: String;
	Plant: String;
	key RecordNo: String;
	StorageLocation: String;
	key UserGuid: String;
	UserName: String;
	Plant_Nav: Association to many Plants on Plant_Nav.Plant = $self;
	StorageLocation_Nav: Association to many StorageLocations on StorageLocation_Nav.Plant = $self;
}
entity ValuationCategories 
 {
	Description: String;
	key ValuationCategory: String;
	MaterialDocItem_Nav: Association to many MaterialDocItems on MaterialDocItem_Nav.ValuationCategory = $self;
	MaterialPlant_Nav: Association to many MaterialPlants on MaterialPlant_Nav.ValuationCategory = $self;
	MaterialValuation_Nav: Association to many MaterialValuations on MaterialValuation_Nav.ValuationCategory = $self;
	PhysicalInventoryDocItem_Nav: Association to many PhysicalInventoryDocItems on PhysicalInventoryDocItem_Nav.ValuationCategory = $self;
}
entity ValuationCategories 
 {
	Description: String;
	key ValuationCategory: String;
	MaterialDocItem_Nav: Association to many MaterialDocItems on MaterialDocItem_Nav.ValuationCategory = $self;
	MaterialPlant_Nav: Association to many MaterialPlants on MaterialPlant_Nav.ValuationCategory = $self;
	MaterialValuation_Nav: Association to many MaterialValuations on MaterialValuation_Nav.ValuationCategory = $self;
	PhysicalInventoryDocItem_Nav: Association to many PhysicalInventoryDocItems on PhysicalInventoryDocItem_Nav.ValuationCategory = $self;
}
entity ValuationTypes 
 {
	Description: String;
	key ValuationArea: String;
	key ValuationCategory: String;
	key ValuationType: String;
	MaterialDocItem_Nav: Association to many MaterialDocItems on MaterialDocItem_Nav.Plant = $self;
	MaterialValuation_Nav: Association to many MaterialValuations on MaterialValuation_Nav.ValuationType = $self;
	PhysInvDocItem_Nav: Association to many PhysicalInventoryDocItems on PhysInvDocItem_Nav.Plant = $self;
}
entity ValuationTypes 
 {
	Description: String;
	key ValuationArea: String;
	key ValuationCategory: String;
	key ValuationType: String;
	MaterialDocItem_Nav: Association to many MaterialDocItems on MaterialDocItem_Nav.Plant = $self;
	MaterialValuation_Nav: Association to many MaterialValuations on MaterialValuation_Nav.ValuationType = $self;
	PhysInvDocItem_Nav: Association to many PhysicalInventoryDocItems on PhysInvDocItem_Nav.Plant = $self;
}
entity VarianceReasons 
 {
	key Plant: String;
	ReasonText: String;
	key VarianceReason: String;
	Confirmations: Association to many Confirmations on Confirmations.Plant = $self;
}
entity VarianceReasons 
 {
	key Plant: String;
	ReasonText: String;
	key VarianceReason: String;
	Confirmations: Association to many Confirmations on Confirmations.Plant = $self;
}
entity Vendors 
 {
	AddressNum: String;
	Name1: String;
	PartnerNum: String;
	PostingBlock: String;
	PurchaseBlock: String;
	key Vendor: String;
	Address_Nav: Association to one Addresses;
	PurchaseOrderHeader_Nav: Association to one PurchaseOrderHeaders;
	StockTransportOrderHeader_Nav: Association to one StockTransportOrderHeaders;
	VendorCompanyData_Nav: Association to many VendorsCompanyData on VendorCompanyData_Nav.Vendor = $self;
	VendorPurchaseOrgData_Nav: Association to many VendorsPurchaseOrgData on VendorPurchaseOrgData_Nav.Vendor = $self;
}
entity Vendors 
 {
	AddressNum: String;
	Name1: String;
	PartnerNum: String;
	PostingBlock: String;
	PurchaseBlock: String;
	key Vendor: String;
	Address_Nav: Association to one Addresses;
	PurchaseOrderHeader_Nav: Association to one PurchaseOrderHeaders;
	StockTransportOrderHeader_Nav: Association to one StockTransportOrderHeaders;
	VendorCompanyData_Nav: Association to many VendorsCompanyData on VendorCompanyData_Nav.Vendor = $self;
	VendorPurchaseOrgData_Nav: Association to many VendorsPurchaseOrgData on VendorPurchaseOrgData_Nav.Vendor = $self;
}
entity VendorsCompanyData 
 {
	CompanyBlock: String;
	key CompanyCode: String;
	key Vendor: String;
	Vendor_Nav: Association to one Vendors;
}
entity VendorsCompanyData 
 {
	CompanyBlock: String;
	key CompanyCode: String;
	key Vendor: String;
	Vendor_Nav: Association to one Vendors;
}
entity VendorsPurchaseOrgData 
 {
	PurchaseOrgBlock: String;
	key PurchasingOrg: String;
	key Vendor: String;
	Vendor_Nav: Association to one Vendors;
}
entity VendorsPurchaseOrgData 
 {
	PurchaseOrgBlock: String;
	key PurchasingOrg: String;
	key Vendor: String;
	Vendor_Nav: Association to one Vendors;
}
entity WCMApplicationAttachments 
 {
	DocumentID: String;
	key Objectkey: String;
	key RelationshipID: String;
	WCMApplication: String;
	Document: Association to many Documents on Document.DocumentID = $self;
	WCMApplications: Association to one WCMApplications;
}
entity WCMApplicationDocuments 
 {
	key WCMApplication: String;
	key WCMDocument: String;
	WCMApplications: Association to one WCMApplications;
	WCMDocumentHeaders: Association to one WCMDocumentHeaders;
}
entity WCMApplicationLongtexts 
 {
	Application: String;
	key ObjectNumber: String;
	key TextName: String;
	TextString: String;
	TextType: String;
	Textobject: String;
}
entity WCMApplicationOrders 
 {
	key Order: String;
	key WCMApplication: String;
	MyWorkOrderHeaders: Association to one MyWorkOrderHeaders;
	WCMApplications: Association to one WCMApplications;
}
entity WCMApplicationPartners 
 {
	AddressExists: String;
	AddressNumber: String;
	BPNum: String;
	key Counter: String;
	ObjectCategory: String;
	key ObjectNumber: String;
	OldPartner: String;
	key PartnerFunction: String;
	PartnerNum: String;
	PersonNum: String;
	PersonnelNum: String;
	WCMApplication: String;
	AddressAtWork_Nav: Association to one AddressesAtWork;
	Address_Nav: Association to one Addresses;
	BusinessPartner_Nav: Association to one BusinessPartners;
	Employee_Nav: Association to one Employees;
	WCMPartnerFunction_Nav: Association to one WCMPartnerFunctions;
}
entity WCMApplicationUsages 
 {
	DescriptUsage: String;
	ExtNoRange: String;
	Extension: Int32;
	IntNoRange: String;
	MaxExtension: Int32;
	Offset: Int32;
	key PlanningPlant: String;
	key Usage: String;
	UsageAutGen: String;
	UsageType: String;
	Validity: Int32;
	ViewProfile: String;
	WCMApplications: Association to many WCMApplications on WCMApplications.Usage = $self;
}
entity WCMApplications 
 {
	ActualSystemStatus: String;
	EquipId: String;
	Extension: Int32;
	FuncLocIdIntern: String;
	ObjectNumber: String;
	ObjectType: String;
	OrderId: String;
	PlannerGroup: String;
	PlanningPlant: String;
	Priority: String;
	TrafficLight: Int32;
	Usage: String;
	ValidFrom: DateTime;
	ValidFromTime: Time;
	ValidTo: DateTime;
	ValidToTime: Time;
	key WCMApplication: String;
	WCMApproval: String;
	WTIssuer: String;
	WorkCenterID: String;
	WorkCenterObjectType: String;
	WorkPermitDescr: String;
	MyEquipments: Association to many MyEquipments on MyEquipments.EquipId = $self;
	MyFunctionalLocations: Association to many MyFunctionalLocations on MyFunctionalLocations.FuncLocIdIntern = $self;
	WCMApplicationAttachments: Association to many WCMApplicationAttachments on WCMApplicationAttachments.WCMApplication = $self;
	WCMApplicationDocuments: Association to many WCMApplicationDocuments on WCMApplicationDocuments.WCMApplication = $self;
	WCMApplicationLongtext_Nav: Association to many WCMApplicationLongtexts on WCMApplicationLongtext_Nav.Application = $self;
	WCMApplicationOrders: Association to many WCMApplicationOrders on WCMApplicationOrders.WCMApplication = $self;
	WCMApplicationPartners: Association to many WCMApplicationPartners on WCMApplicationPartners.WCMApplication = $self;
	WCMApplicationUsages: Association to one WCMApplicationUsages;
	WCMApprovalApplications: Association to many WCMApprovalApplications on WCMApprovalApplications.WCMApplication = $self;
	WCMApprovalProcesses: Association to many WCMApprovalProcesses on WCMApprovalProcesses.WCMApplication = $self;
	WCMCatalogs: Association to many WCMCatalogs on WCMCatalogs.WCMApplication = $self;
	WCMRequirements: Association to one WCMRequirements;
	WCMSystemStatuses: Association to many WCMSystemStatuses on WCMSystemStatuses.WCMApplication = $self;
	WCMUserStatuses: Association to many WCMUserStatuses on WCMUserStatuses.WCMApplication = $self;
	WorkCenters: Association to one WorkCenters;
}
entity WCMApprovalApplications 
 {
	key WCMApplication: String;
	key WCMApproval: String;
	WCMApplications: Association to one WCMApplications;
	WCMApprovals: Association to one WCMApprovals;
}
entity WCMApprovalAttachments 
 {
	DocumentID: String;
	key Objectkey: String;
	key RelationshipID: String;
	WCMApproval: String;
	Document: Association to many Documents on Document.DocumentID = $self;
	WCMApprovals: Association to one WCMApprovals;
}
entity WCMApprovalLongtexts 
 {
	ObjectNumber: String;
	TextObject: String;
	TextString: String;
	key TextType: String;
	key WCMApproval: String;
	WCMApprovals: Association to one WCMApprovals;
}
entity WCMApprovalOrders 
 {
	key Order: String;
	key WCMApproval: String;
	MyWorkOrderHeaders: Association to one MyWorkOrderHeaders;
	WCMApprovals: Association to one WCMApprovals;
}
entity WCMApprovalPartners 
 {
	AddressExists: String;
	AddressNumber: String;
	BPNum: String;
	key Counter: String;
	ObjectCategory: String;
	key ObjectNumber: String;
	OldPartner: String;
	key PartnerFunction: String;
	PartnerNum: String;
	PersonNum: String;
	PersonnelNum: String;
	WCMWorkApproval: String;
	AddressAtWork_Nav: Association to one AddressesAtWork;
	Address_Nav: Association to one Addresses;
	BusinessPartner_Nav: Association to one BusinessPartners;
	Employee_Nav: Association to one Employees;
	PartnerFunctions: Association to one PartnerFunctions;
	WCMApprovals: Association to one WCMApprovals;
}
entity WCMApprovalProcessLongtexts 
 {
	key Counter: String;
	key ObjectNumber: String;
	TextObject: String;
	TextString: String;
	TextType: String;
	WCMApprovalProcess: Association to one WCMApprovalProcesses;
}
entity WCMApprovalProcessSegments 
 {
	AppFromDate: DateTime;
	AppFromTime: Time;
	AppToDate: DateTime;
	AppToTime: Time;
	ApprovedBy: String;
	key Counter: String;
	CreatedOn: DateTime;
	DeactivatedAt: Time;
	DeactivatedBy: String;
	DeactivatedOn: DateTime;
	EnteredAt: Time;
	EnteredBy: String;
	key ObjectNumber: String;
	key SegmentCounter: String;
	SegmentInactive: String;
	WCMApprovalProceses: Association to one WCMApprovalProcesses;
}
entity WCMApprovalProcesses 
 {
	ChangedBy: String;
	ChangedOn: DateTime;
	key Counter: String;
	CreatedBy: String;
	CreatedOn: DateTime;
	Longtext: String;
	key ObjectNumber: String;
	Permit: String;
	PermitCategory: String;
	WCMApplication: String;
	WCMDocument: String;
	WCMApplications: Association to one WCMApplications;
	WCMApprovalProcessLongtexts: Association to one WCMApprovalProcessLongtexts;
	WCMApprovalProcessSegments: Association to many WCMApprovalProcessSegments on WCMApprovalProcessSegments.ObjectNumber = $self;
	WCMDocumentHeaders: Association to one WCMDocumentHeaders;
}
entity WCMApprovals 
 {
	ActualSystemStatus: String;
	AuthorizGroup: String;
	CatalogExists: String;
	CatalogTwoExists: String;
	Delete: String;
	Equipment: String;
	FuncLoc: String;
	LongText: String;
	ObjListExists: String;
	ObjectNumber: String;
	OverallCondtn: String;
	PlannerGroup: String;
	PlanningPlant: String;
	Priority: String;
	RQTextExists: String;
	RecallTime: Decimal;
	ShortText: String;
	Train: String;
	Unit: String;
	Usage: String;
	ValidFrmTime: Time;
	ValidFrom: DateTime;
	ValidTo: DateTime;
	ValidToTime: Time;
	WCMApplication: String;
	key WCMApproval: String;
	WorkCenterID: String;
	WorkCenterObjectType: String;
	MyEquipments: Association to many MyEquipments on MyEquipments.Equipment = $self;
	MyFunctionalLocations: Association to many MyFunctionalLocations on MyFunctionalLocations.FuncLoc = $self;
	WCMApprovalApplications: Association to many WCMApprovalApplications on WCMApprovalApplications.WCMApproval = $self;
	WCMApprovalAttachments: Association to many WCMApprovalAttachments on WCMApprovalAttachments.WCMApproval = $self;
	WCMApprovalLongtexts: Association to many WCMApprovalLongtexts on WCMApprovalLongtexts.WCMApproval = $self;
	WCMApprovalOrders: Association to many WCMApprovalOrders on WCMApprovalOrders.WCMApproval = $self;
	WCMApprovalPartners: Association to many WCMApprovalPartners on WCMApprovalPartners.WCMWorkApproval = $self;
	WCMSystemStatuses: Association to many WCMSystemStatuses on WCMSystemStatuses.WCMApproval = $self;
	WCMUserStatuses: Association to many WCMUserStatuses on WCMUserStatuses.WCMApproval = $self;
	WorkCenters: Association to one WorkCenters;
}
entity WCMCatalogs 
 {
	Catalog: String;
	ChangedBy: String;
	Changedon: DateTime;
	Checkbox: String;
	Code: String;
	CodeGroup: String;
	key Counter: String;
	key Counter1: String;
	Createdat: Time;
	Createdby: String;
	Createdon: DateTime;
	DatabaseAction: String;
	LastChangedat: Time;
	LongText: String;
	key ObjectNumber: String;
	ShortText: String;
	Signature: String;
	Sortfield: String;
	Valuation: String;
	WCMApplication: String;
	WCMDocumentHeader: String;
	PMCatalogCode: Association to many PMCatalogCodes on PMCatalogCode.Catalog = $self;
	WCMApplication_Nav: Association to many WCMApplications on WCMApplication_Nav.WCMApplication = $self;
	WCMDocumentHeader_Nav: Association to many WCMDocumentHeaders on WCMDocumentHeader_Nav.WCMDocumentHeader = $self;
}
entity WCMDocumentHeaderAttachments 
 {
	DocumentID: String;
	key Objectkey: String;
	key RelationshipID: String;
	WCMDocument: String;
	Document: Association to many Documents on Document.DocumentID = $self;
	WCMDocumentHeaders: Association to one WCMDocumentHeaders;
}
entity WCMDocumentHeaderLongtexts 
 {
	ObjectNumber: String;
	TextObject: String;
	TextString: String;
	key TextType: String;
	key WCMDocument: String;
	WCMDocumentHeaders: Association to one WCMDocumentHeaders;
}
entity WCMDocumentHeaderPartners 
 {
	AddressExists: String;
	AddressNumber: String;
	BPNum: String;
	key Counter: String;
	ObjectCategory: String;
	key ObjectNumber: String;
	OldPartner: String;
	key PartnerFunction: String;
	PartnerNum: String;
	PersonNum: String;
	PersonnelNum: String;
	WCMDocument: String;
	AddressAtWork_Nav: Association to one AddressesAtWork;
	Address_Nav: Association to one Addresses;
	BusinessPartner_Nav: Association to one BusinessPartners;
	Employee_Nav: Association to one Employees;
	PartnerFunctions: Association to one PartnerFunctions;
	WCMDocumentHeaders: Association to one WCMDocumentHeaders;
}
entity WCMDocumentHeaders 
 {
	Activity: String;
	ActualFinishDate: DateTime;
	ActualFinishTime: Time;
	ActualStartDate: DateTime;
	ActualStartTime: Time;
	ActualSystemStatus: String;
	Application: String;
	Approvaltime: Time;
	Approvedon: DateTime;
	AuthorizGroup: String;
	BasicFinDate: DateTime;
	BasicFinTime: Time;
	Basstartdate: DateTime;
	CatalogFirstExists: String;
	CatalogSecondExists: String;
	ChangedBy: String;
	ChangedOn: DateTime;
	CreatedAt: Time;
	CreatedBy: String;
	CreatedOn: DateTime;
	DateEF: DateTime;
	DateES: DateTime;
	DateLF: DateTime;
	DateLS: DateTime;
	DatePF: DateTime;
	DatePS: DateTime;
	Delete: String;
	Description: String;
	DocumentLink: String;
	EndTime: Time;
	EquipId: String;
	FinishTime: Time;
	FuncLocIdIntern: String;
	IsSelVar: String;
	LastChangedat: Time;
	LongText: String;
	OTEndon: DateTime;
	OTGuardian: String;
	OTOperator: String;
	OTStarton: DateTime;
	ObjListExists: String;
	ObjectNumber: String;
	ObjectType: String;
	OnDutyResponsible: String;
	OpCardNo: String;
	OverallCondtn: String;
	PlannerGroup: String;
	PlanningPlant: String;
	Priority: String;
	RecallTime: Decimal;
	RemarksMt: String;
	RemarksOp: String;
	RevisionPhase: String;
	SchedFinish: DateTime;
	SchedStart: DateTime;
	SchedStartTime: Time;
	ShiftChief: String;
	ShortText: String;
	StartTime: Time;
	StatusProfile: String;
	StatusProfileItem: String;
	SubnetworkOf: String;
	TGTextExists: String;
	Template: String;
	TimeEF: Time;
	TimeES: Time;
	TimeLF: Time;
	TimeLS: Time;
	TimePF: Time;
	TimePS: Time;
	Timest: Time;
	TrafficLight: Int32;
	Train: String;
	UGTextExists: String;
	Unit: String;
	Usage: String;
	ValidFromDate: DateTime;
	ValidFromTime: Time;
	ValidToDate: DateTime;
	ValidToTime: Time;
	WBSElement: String;
	key WCMDocument: String;
	WorkCenterID: String;
	WorkCenterObjectType: String;
	MyEquipments: Association to many MyEquipments on MyEquipments.EquipId = $self;
	MyFunctionalLocations: Association to many MyFunctionalLocations on MyFunctionalLocations.FuncLocIdIntern = $self;
	PMMobileStatus: Association to one PMMobileStatuses;
	WCMApplicationDocuments: Association to many WCMApplicationDocuments on WCMApplicationDocuments.WCMDocument = $self;
	WCMApprovalProcesses: Association to many WCMApprovalProcesses on WCMApprovalProcesses.WCMDocument = $self;
	WCMCatalogs: Association to many WCMCatalogs on WCMCatalogs.WCMDocumentHeader = $self;
	WCMDocumentHeaderAttachments: Association to many WCMDocumentHeaderAttachments on WCMDocumentHeaderAttachments.WCMDocument = $self;
	WCMDocumentHeaderLongtexts: Association to many WCMDocumentHeaderLongtexts on WCMDocumentHeaderLongtexts.WCMDocument = $self;
	WCMDocumentItems: Association to many WCMDocumentItems on WCMDocumentItems.WCMDocument = $self;
	WCMDocumentPartners: Association to many WCMDocumentHeaderPartners on WCMDocumentPartners.WCMDocument = $self;
	WCMDocumentUsages: Association to one WCMDocumentUsages;
	WCMSystemStatuses: Association to many WCMSystemStatuses on WCMSystemStatuses.WCMDocument = $self;
	WCMUserStatuses: Association to many WCMUserStatuses on WCMUserStatuses.WCMDocument = $self;
	WorkCenters: Association to one WorkCenters;
}
entity WCMDocumentItemAttachments 
 {
	DocumentID: String;
	key Objectkey: String;
	key RelationshipID: String;
	WCMDocument: String;
	WCMDocumentItem: String;
	WCMDocumentItemObjNr: String;
	Document: Association to many Documents on Document.DocumentID = $self;
	WCMDocumentItems: Association to one WCMDocumentItems;
}
entity WCMDocumentItemLongtexts 
 {
	ObjectNumber: String;
	TextObject: String;
	TextString: String;
	key TextType: String;
	key WCMDocument: String;
	key WCMDocumentItem: String;
	WCMDocumentItems: Association to one WCMDocumentItems;
}
entity WCMDocumentItems 
 {
	BlockingType: String;
	Client: String;
	DocumentLink: String;
	Equipment: String;
	FCODE: String;
	FuncLoc: String;
	IsSelVar: String;
	ItemCategory: String;
	ItemCategoryCC: String;
	Location: String;
	LockNumber: String;
	LongText: String;
	Name: String;
	ObjectNumber: String;
	OpGroup: String;
	PhysBlocking: String;
	Predecessor: String;
	PrintFormatTag: String;
	PrintFormatUntag: String;
	Sequence: String;
	ShortText: String;
	Successor: String;
	SwitchingLoc: String;
	Tag: String;
	TagRequired: String;
	TagSequence: String;
	TaggingComment: String;
	TaggingCond: String;
	TaggingStep: String;
	TaggingType: String;
	TechObject: String;
	Template: String;
	TestTag: String;
	UntSequence: String;
	UntagComment: String;
	UntagCond: String;
	UntaggingStep: String;
	UntaggingType: String;
	key WCMDocument: String;
	key WCMDocumentItem: String;
	MyEquipments: Association to many MyEquipments on MyEquipments.Equipment = $self;
	MyFunctionalLocations: Association to many MyFunctionalLocations on MyFunctionalLocations.FuncLoc = $self;
	PMMobileStatus: Association to one PMMobileStatuses;
	WCMDocumentHeaders: Association to one WCMDocumentHeaders;
	WCMDocumentItemAttachments: Association to many WCMDocumentItemAttachments on WCMDocumentItemAttachments.WCMDocumentItem = $self;
	WCMDocumentItemLongtexts: Association to many WCMDocumentItemLongtexts on WCMDocumentItemLongtexts.WCMDocumentItem = $self;
	WCMDocumentTechnicalObjects: Association to many WCMDocumentTechnicalObjects on WCMDocumentTechnicalObjects.TechObject = $self;
	WCMOpGroup_Nav: Association to many WCMOpGroups on WCMOpGroup_Nav.OpGroup = $self;
	WCMSystemStatuses: Association to many WCMSystemStatuses on WCMSystemStatuses.WCMDocument = $self;
	WCMUserStatuses: Association to many WCMUserStatuses on WCMUserStatuses.WCMDocumentItem = $self;
}
entity WCMDocumentTechnicalObjects 
 {
	ItemCategory: String;
	ShortText: String;
	key TechObject: String;
	TechObjectExternal: String;
	TechObjectInternal: String;
	WCMDocumentItems: Association to many WCMDocumentItems on WCMDocumentItems.TechObject = $self;
}
entity WCMDocumentUsages 
 {
	BlAppUntag: String;
	BlApprTU: String;
	BlApprTag: String;
	BlockApproval: String;
	ExtNoRange: String;
	IntNoRange: String;
	MDTagging: String;
	MobProcessing: String;
	MultipleTag: String;
	OptnProtection: String;
	key PlanningPlant: String;
	PrintTag: String;
	PrintTestTag: String;
	Specification: String;
	Step: String;
	Tag: String;
	Untag: String;
	UntagTemp: String;
	key Usage: String;
	UsageAutGen: String;
	UsageDescription: String;
	UsageType: String;
	ViewProfile: String;
	WCMDocumentHeaders: Association to many WCMDocumentHeaders on WCMDocumentHeaders.PlanningPlant = $self;
}
entity WCMItemCategories 
 {
	key ItemCategoryCC: String;
	ItemCategoryText: String;
}
entity WCMOpConditions 
 {
	key OpCondition: String;
	OpConditionText: String;
}
entity WCMOpGroups 
 {
	key OpGroup: String;
	TextOpGroup: String;
	WCMDocumentItem_Nav: Association to many WCMDocumentItems on WCMDocumentItem_Nav.OpGroup = $self;
}
entity WCMPartnerFunctions 
 {
	Description: String;
	key PartnerFunction: String;
	PartnerType: String;
	WCMApplicationPartner_Nav: Association to many WCMApplicationPartners on WCMApplicationPartner_Nav.PartnerFunction = $self;
}
entity WCMPhysicalBlockingTypes 
 {
	key BlockingType: String;
	BlockingTypeText: String;
	key PlanningPlant: String;
}
entity WCMPrintFormatTags 
 {
	key PlanningPlant: String;
	key PrintCategory: String;
	key PrintFormat: String;
	ShortText: String;
}
entity WCMRequirements 
 {
	BarriersSigns: String;
	BlockCover: String;
	Checking: String;
	CleaningWork: String;
	ClngHCFreeing: String;
	CmHnSystems: String;
	DemolitionWork: String;
	Depress: String;
	DrngEmptg: String;
	Entry: String;
	Equipment: String;
	Explosives: String;
	ExternalBodies: String;
	ExtingMedia: String;
	Fire: String;
	FireWatch: String;
	GasMeas: String;
	GuardRadio: String;
	HSEDatasheet: String;
	HazardousSubs: String;
	HotWorkA: String;
	HotWorkB: String;
	InitialList: String;
	Instruction: String;
	Isolation: String;
	JSA: String;
	LiftingOps: String;
	LocateEarth: String;
	LockoutTagout: String;
	Manholes: String;
	More: String;
	Nightwork: String;
	key ObjectNumber: String;
	OilandGas: String;
	OpenSea: String;
	OtherActiv: String;
	OtherWork: String;
	OverheadWork: String;
	PA: String;
	PaintingWork: String;
	PressTesting: String;
	Radiation: String;
	RadioactMatl: String;
	RegularInsp: String;
	Replacement: String;
	ReqmtsHeight: String;
	ReqmtsSea: String;
	RestructWork: String;
	SafetyStaff: String;
	SecureInstall: String;
	SimultanWorks: String;
	VentgExtraVent: String;
	Ventilation: String;
	WaterSupply: String;
	Wells: String;
	Work: String;
	WorkatHeight: String;
	WCMApplications: Association to one WCMApplications;
}
entity WCMSwitchingDatas 
 {
	key OpGroup: String;
	PhysBlocking: String;
	key PlanningPlant: String;
	TagRequired: String;
	key TaggingCond: String;
	TaggingType: String;
	UntagCond: String;
	UntaggingType: String;
	Useas: String;
}
entity WCMSystemStatuses 
 {
	ChangeDate: DateTime;
	key ChangeNumber: String;
	ChangeTime: Time;
	key ObjectNumber: String;
	ObjectType: String;
	Position: String;
	Priority: String;
	key Status: String;
	StatusInact: String;
	StatusNumber: String;
	StatusProfile: String;
	WCMApplication: String;
	WCMApproval: String;
	WCMDocument: String;
	WCMDocumentItem: String;
	SystemStatuses: Association to one SystemStatuses;
	WCMApplications: Association to one WCMApplications;
	WCMApprovals: Association to one WCMApprovals;
	WCMDocumentHeaders: Association to one WCMDocumentHeaders;
	WCMDocumentItems: Association to one WCMDocumentItems;
}
entity WCMUserStatuses 
 {
	ChangeDate: DateTime;
	key ChangeNumber: String;
	ChangeTime: Time;
	key ObjectNumber: String;
	ObjectType: String;
	Position: String;
	Priority: String;
	key Status: String;
	StatusInact: String;
	StatusNumber: String;
	key StatusProfile: String;
	WCMApplication: String;
	WCMApproval: String;
	WCMDocument: String;
	WCMDocumentItem: String;
	UserStatus: Association to one UserStatuses;
	WCMApplications: Association to one WCMApplications;
	WCMApprovals: Association to one WCMApprovals;
	WCMDocumentHeaders: Association to one WCMDocumentHeaders;
}
entity WCMWorkReqTexts 
 {
	GroupId: String;
	GroupTitle: String;
	PlanningPlant: String;
	PropertyLabel: String;
	key PropertyName: String;
	PropertyVisible: String;
	UsageType: String;
}
entity WorkCenters 
 {
	CatalogProfile: String;
	ControllingArea: String;
	CostCenter: String;
	DefaultActivityType: String;
	ExternalWorkCenterId: String;
	key ObjectType: String;
	PMEquipFlag: String;
	PMFuncLocFlag: String;
	PlantId: String;
	QNotifTypeFlag: String;
	ReportType: String;
	ReportTypeDesc: String;
	WorkCenterDescr: String;
	key WorkCenterId: String;
	WorkCenterName: String;
	MyEquipments_Main_Nav: Association to many MyEquipments on MyEquipments_Main_Nav.PMObjectType = $self;
	MyEquipments_Nav: Association to many MyEquipments on MyEquipments_Nav.WorkCenter = $self;
	MyFunctionalLocations_Main_Nav: Association to many MyFunctionalLocations on MyFunctionalLocations_Main_Nav.PMObjectType = $self;
	MyFunctionalLocations_Nav: Association to many MyFunctionalLocations on MyFunctionalLocations_Nav.WorkCenter = $self;
	NotificationHistory_Nav: Association to many NotificationHistories on NotificationHistory_Nav.WorkCenter = $self;
	WorkOrderHistory_Nav: Association to many WorkOrderHistories on WorkOrderHistory_Nav.WorkCenter = $self;
}
entity WorkCenters 
 {
	CatalogProfile: String;
	ControllingArea: String;
	CostCenter: String;
	DefaultActivityType: String;
	ExternalWorkCenterId: String;
	key ObjectType: String;
	PMEquipFlag: String;
	PMFuncLocFlag: String;
	PlantId: String;
	QNotifTypeFlag: String;
	ReportType: String;
	ReportTypeDesc: String;
	WorkCenterDescr: String;
	key WorkCenterId: String;
	WorkCenterName: String;
	MyEquipments_Main_Nav: Association to many MyEquipments on MyEquipments_Main_Nav.PMObjectType = $self;
	MyEquipments_Nav: Association to many MyEquipments on MyEquipments_Nav.WorkCenter = $self;
	MyFunctionalLocations_Main_Nav: Association to many MyFunctionalLocations on MyFunctionalLocations_Main_Nav.PMObjectType = $self;
	MyFunctionalLocations_Nav: Association to many MyFunctionalLocations on MyFunctionalLocations_Nav.WorkCenter = $self;
	NotificationHistory_Nav: Association to many NotificationHistories on NotificationHistory_Nav.WorkCenter = $self;
	WorkOrderHistory_Nav: Association to many WorkOrderHistories on WorkOrderHistory_Nav.WorkCenter = $self;
}
entity WorkOrderHistories 
 {
	EndDate: DateTime;
	Equipment: String;
	FunctionalLocation: String;
	LongTextExists: String;
	MainWorkCenter: String;
	NotifNum: String;
	ObjectNumber: String;
	OrderDescription: String;
	key OrderId: String;
	OrderType: String;
	PM_OBJTY: String;
	PersonalNumber: String;
	PersonsName: String;
	PlannerGroup: String;
	PlanningPlant: String;
	Priority: String;
	PriorityType: String;
	key ReferenceType: String;
	ReferenceWorkOrder: String;
	StartDate: DateTime;
	key TechObject: String;
	WorkCenter: String;
	Employee_Nav: Association to one Employees;
	Equipment_Nav: Association to many MyEquipments on Equipment_Nav.Equipment = $self;
	FuncLoc_Nav: Association to many MyFunctionalLocations on FuncLoc_Nav.FunctionalLocation = $self;
	HistoryLongText: Association to one WorkOrderHistoryTexts;
	HistoryPriority: Association to many Priorities on HistoryPriority.PriorityType = $self;
	PMMobileStatus_Nav: Association to one PMMobileStatuses;
	PlannerGroup_Nav: Association to one PlannerGroups;
	RelatedNotif_Nav: Association to one MyNotificationHeaders;
	WorkCenter_Nav: Association to one WorkCenters;
	WorkOrderHeader: Association to one MyWorkOrderHeaders;
}
entity WorkOrderHistories 
 {
	EndDate: DateTime;
	Equipment: String;
	FunctionalLocation: String;
	LongTextExists: String;
	MainWorkCenter: String;
	NotifNum: String;
	ObjectNumber: String;
	OrderDescription: String;
	key OrderId: String;
	OrderType: String;
	PM_OBJTY: String;
	PersonalNumber: String;
	PersonsName: String;
	PlannerGroup: String;
	PlanningPlant: String;
	Priority: String;
	PriorityType: String;
	key ReferenceType: String;
	ReferenceWorkOrder: String;
	StartDate: DateTime;
	key TechObject: String;
	WorkCenter: String;
	Employee_Nav: Association to one Employees;
	Equipment_Nav: Association to many MyEquipments on Equipment_Nav.Equipment = $self;
	FuncLoc_Nav: Association to many MyFunctionalLocations on FuncLoc_Nav.FunctionalLocation = $self;
	HistoryLongText: Association to one WorkOrderHistoryTexts;
	HistoryPriority: Association to many Priorities on HistoryPriority.PriorityType = $self;
	PMMobileStatus_Nav: Association to one PMMobileStatuses;
	PlannerGroup_Nav: Association to one PlannerGroups;
	RelatedNotif_Nav: Association to one MyNotificationHeaders;
	WorkCenter_Nav: Association to one WorkCenters;
	WorkOrderHeader: Association to one MyWorkOrderHeaders;
}
entity WorkOrderHistoryTexts 
 {
	ObjectKey: String;
	key OrderId: String;
	TextId: String;
	TextObjectType: String;
	TextString: String;
	WOHistory: Association to one WorkOrderHistories;
}
entity WorkOrderHistoryTexts 
 {
	ObjectKey: String;
	key OrderId: String;
	TextId: String;
	TextObjectType: String;
	TextString: String;
	WOHistory: Association to one WorkOrderHistories;
}
entity WorkOrderOperationPhaseControls 
 {
	AuthorizationKey: String;
	Description: String;
	EntityType: String;
	IsActive: String;
	ObjectNumber: String;
	key OperationNo: String;
	key OrderId: String;
	OrderType: String;
	OvrlStsProfile: String;
	key PhaseControl: String;
	PhaseControlKey: String;
	PlanningPlant: String;
	ProcessPhase: String;
	ProcessSubphase: String;
	SetAutomatically: String;
	StatusProfile: String;
	key SubOperationNo: String;
	MyWorkOrderOperation_Nav: Association to many MyWorkOrderOperations on MyWorkOrderOperation_Nav.OperationNo = $self;
	PhaseControlKey_Nav: Association to many PhaseControlKeys on PhaseControlKey_Nav.PhaseControlKey = $self;
}
entity WorkOrderPhaseControls 
 {
	AuthorizationKey: String;
	Description: String;
	EntityType: String;
	IsActive: String;
	ObjectNumber: String;
	key OrderId: String;
	OrderType: String;
	OvrlStsProfile: String;
	key PhaseControl: String;
	PhaseControlKey: String;
	PhaseControlName: String;
	PlanningPlant: String;
	ProcessPhase: String;
	ProcessSubphase: String;
	SetAutomatically: String;
	StatusProfile: String;
	Userstatus: String;
	MyWorkOrderHeader_Nav: Association to many MyWorkOrderHeaders on MyWorkOrderHeader_Nav.OrderId = $self;
	PhaseControlKey_Nav: Association to many PhaseControlKeys on PhaseControlKey_Nav.PhaseControlKey = $self;
}
entity WorkOrderTransfers 
 {
	EffectiveTimestamp: DateTime;
	EmployeeFrom: String;
	EmployeeTo: String;
	HeaderNotes: String;
	IsSupervisor: String;
	key OperationNo: String;
	key OrderId: String;
	PlannerGroupFrom: String;
	PlannerGroupTo: String;
	key SubOperationNo: String;
	TransferReason: String;
	UserFrom: String;
	UserTo: String;
	WorkCenterFrom: String;
	WorkCenterTo: String;
	WOHeader: Association to one MyWorkOrderHeaders;
	WOOperation: Association to one MyWorkOrderOperations;
	WOSubOperation: Association to one MyWorkOrderSubOperations;
}
entity WorkOrderTransfers 
 {
	EffectiveTimestamp: DateTime;
	EmployeeFrom: String;
	EmployeeTo: String;
	HeaderNotes: String;
	IsSupervisor: String;
	key OperationNo: String;
	key OrderId: String;
	PlannerGroupFrom: String;
	PlannerGroupTo: String;
	key SubOperationNo: String;
	TransferReason: String;
	UserFrom: String;
	UserTo: String;
	WorkCenterFrom: String;
	WorkCenterTo: String;
	WOHeader: Association to one MyWorkOrderHeaders;
	WOOperation: Association to one MyWorkOrderOperations;
	WOSubOperation: Association to one MyWorkOrderSubOperations;
}
entity WorkRequestConsequences 
 {
	key CategoryId: String;
	ConsequenceId: String;
	GroupId: String;
	LeadingConsequence: String;
	LikelihoodId: String;
	key Notification: String;
	PrioritizationProfileId: String;
	MyNotificationHeader_Nav: Association to many MyNotificationHeaders on MyNotificationHeader_Nav.Notification = $self;
}