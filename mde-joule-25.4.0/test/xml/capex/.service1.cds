entity BusinessUnits 
 {
	createdAt: DateTimeOffset;
	createdBy: String;
	modifiedAt: DateTimeOffset;
	modifiedBy: String;
	key business_unit: String;
	name: String;
}
entity Capex 
 {
	createdAt: DateTimeOffset;
	createdBy: String;
	modifiedAt: DateTimeOffset;
	modifiedBy: String;
	key ID: Guid;
	requestid: String;
	title: String;
	firstname: String;
	lastname: String;
	email: String;
	userid: String;
	comments: String;
	totalcost: String;
	type_type: String;
	capex: String;
	opex: String;
	currency_code: String;
	roi: String;
	irr: String;
	country_code: String;
	business_unit_business_unit: String;
	description: String;
	energy_efficiency: String;
	co2_efficiency: String;
	energy_cost_savings: String;
	water_savings: String;
	key IsActiveEntity: Boolean;
	HasActiveEntity: Boolean;
	HasDraftEntity: Boolean;
	type: Association to one CapexType;
	currency: Association to one Currencies;
	country: Association to one Countries;
	business_unit: Association to one BusinessUnits;
	DraftAdministrativeData: Association to one DraftAdministrativeData;
	SiblingEntity: Association to one Capex;
}
entity CapexType 
 {
	createdAt: DateTimeOffset;
	createdBy: String;
	modifiedAt: DateTimeOffset;
	modifiedBy: String;
	key type: String;
	typedescription: String;
}
entity Countries 
 {
	name: String;
	descr: String;
	key code: String;
	texts: Association to many Countries_texts;
	localized: Association to one Countries_texts;
}
entity Currencies 
 {
	name: String;
	descr: String;
	key code: String;
	symbol: String;
	texts: Association to many Currencies_texts;
	localized: Association to one Currencies_texts;
}
entity Countries_texts 
 {
	key locale: String;
	name: String;
	descr: String;
	key code: String;
}
entity Currencies_texts 
 {
	key locale: String;
	name: String;
	descr: String;
	key code: String;
}