entity BusinessPartners 
 {
	key BusinessPartner: String;
	LastName: String;
	FirstName: String;
}
entity Mitigations 
 {
	createdAt: DateTimeOffset;
	createdBy: String;
	modifiedAt: DateTimeOffset;
	modifiedBy: String;
	key ID: Guid;
	description: String;
	owner: String;
	timeline: String;
	key IsActiveEntity: Boolean;
	HasActiveEntity: Boolean;
	HasDraftEntity: Boolean;
	risks: Association to many Risks on risks.miti = $self;
	DraftAdministrativeData: Association to one DraftAdministrativeData;
	SiblingEntity: Association to one Mitigations;
}
entity Risks 
 {
	createdAt: DateTimeOffset;
	createdBy: String;
	modifiedAt: DateTimeOffset;
	modifiedBy: String;
	key ID: Guid;
	title: String;
	owner: String;
	prio: String;
	descr: String;
	miti_ID: Guid;
	impact: Int32;
	criticality: Int32;
	key IsActiveEntity: Boolean;
	HasActiveEntity: Boolean;
	HasDraftEntity: Boolean;
	miti: Association to one Mitigations;
	DraftAdministrativeData: Association to one DraftAdministrativeData;
	SiblingEntity: Association to one Risks;
}