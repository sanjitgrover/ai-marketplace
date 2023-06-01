import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCardGroup,
  MDBCardText,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdbreact";

const data_model = {
  columns: [
    {
      label: "Model Attributes",
      field: "modelattributes",
    },
    {
      label: "Details",
      field: "details",
    },
    
  ],
  rows: [
    {
      modelattributes: "ID",
      details: "MRM190006"
    },  
    {  
      modelattributes: "Name",
    details: "Custom Behavioral Scorecard - Consumer Card"
    },
    {modelattributes: "Status",
      details: "In Production"},
      {
        modelattributes: "Version",
      details: "1.0"},
      {modelattributes: "Owner(s)",
        details: "Paul Thomas"},
      {modelattributes: "Developer(s)",
        details: "Eric Ren, Gang Zhang"},
      {modelattributes: "Product(s)/Asset Class(es) for Which Model will be Used",
        details: "Credit Card"},
      {modelattributes: "Short Description",
        details: "The redeveloped Retail Behavioral Consumer Card model is a part of the effort to enhance the PNC’s analytical capability to manage the consumer credit card portfolio. This model will be used in, but not limited to, account management and portfolio management programs such as credit line management (CLI and CLD), authorization strategy, convenience checks, and payment defender. The goal of the newly developed model is to improve the risk separation and ensure a robust performance in production."},
      {modelattributes: "API Endpoint",
        details: "/xgb_classifier/mrm190006"},
      {modelattributes: "Github URL",
        details: "https://github.com/pnc-aimarketplace.git"}
    
  ],
};

const ModelDescription = () => {
  return (
    <MDBContainer fluid flexCenter className="mt-4">
      <MDBRow>
        <MDBCardGroup deck className="mt-1 ml-3">
          <MDBCard style={{ width: "66.8rem" }} className="pl-1">
            <MDBCardBody className="pl-1 pr-1 pb-0 pt-0">
              <MDBCardText>
                <MDBTable className="pb-0 condensed-table" responsive striped>
                  <MDBTableHead
                    className="pb-0 pt-2"
                    columns={data_model.columns}
                    style={{ fontWeight: "bold" }}
                  />
                  <MDBTableBody rows={data_model.rows} />
                </MDBTable>
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCardGroup>
      </MDBRow>
    </MDBContainer>
  );
};
export default ModelDescription;
