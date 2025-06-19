namespace sap.ui.lcnc;
using { managed, Country, Currency } from '@sap/cds/common';
using com.sap.workflow.common.model from './WorkflowObject';
 

  entity Capex : managed {
    key ID : UUID  @( Core.Computed : true );
    requestid : String;
    title : String;
    firstname : String;
    lastname : String;
    email : String;
    userid : String;
    comments : String;
    totalcost : String;
    type : Association to CapexType;
    capex : String;
    opex : String;
    currency : Currency;
    roi : String;
    irr : String;
    country : Country;
    business_unit : Association to BusinessUnits;
    description : String;
    energy_efficiency : String;
    co2_efficiency : String;
    energy_cost_savings : String;
    water_savings : String;
  }
  entity CapexType : managed {
    key type : String;
    typedescription : String;
  }
  entity BusinessUnits : managed {
    key business_unit : String;
    name : String;
  }

  entity CAPEXWorkflow: model.WorkflowObject, Capex {}

  entity CAPEXWorkflowStartParameters as
    projection on CAPEXWorkflow
    {
        ID,
        taskInstanceID,
        taskDecisionID,
        firstname as firstName,
        lastname as lastName,
        totalcost as totalCost,
        currency.code as currency
    }

