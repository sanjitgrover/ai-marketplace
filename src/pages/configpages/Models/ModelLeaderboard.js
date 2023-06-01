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
  MDBIcon,
} from "mdbreact";

import { Popover } from "antd";

const ModelLeaderboard = () => {
  const model_board = {
    columns: [
      {
        label: "Id",
        field: "modelId",
      },
      {
        label: "Estimator",
        field: "estimator",
      },
      {
        label: "Accuracy",
        field: "accuracy",
      },
      {
        label: "KS Statistic",
        field: "ksstatistic",
      },
      {
        label: "AUC ROC",
        field: "aucroc",
      },
      {
        label: "Status",
        field: "status",
      },
    ],
    rows: [
      {
        modelId: "MRM190006",
        estimator: "XGB Classifier",
        accuracy: "0.89",
        ksstatistic: "0.48",
        aucroc: "0.87",
        status: (
          <Popover
            content={
              <div className="px-2 py-1">
                <p>Active</p>
              </div>
            }
          >
            <MDBIcon icon="circle" label="Active" className="text-success" />
          </Popover>
        ),
      },
      {
        modelId: "MRM190001",
        estimator: "XGB Classifier",
        accuracy: "0.78",
        ksstatistic: "0.41",
        aucroc: "0.88",
        status: (
          <Popover
            content={
              <div className="px-2 py-1">
                <p>Development</p>
              </div>
            }
          >
            <MDBIcon icon="circle" label="Active" className="text-warning" />
          </Popover>
        ),
      },

      {
        modelId: "RFC190004",
        estimator: "Random Forest Classifier",
        accuracy: "0.90",
        ksstatistic: "0.40",
        aucroc: "0.80",
        status: (
          <Popover
            content={
              <div className="px-2 py-1">
                <p>Development</p>
              </div>
            }
          >
            <MDBIcon icon="circle" label="Active" className="text-warning" />
          </Popover>
        ),
      },
      {
        modelId: "ADA180100",
        estimator: "AdaBoost Classifier",
        accuracy: "0.87",
        ksstatistic: "0.38",
        aucroc: "0.79",
        status: (
          <Popover
            content={
              <div className="px-2 py-1">
                <p>Archived</p>
              </div>
            }
          >
            <MDBIcon
              icon="circle"
              label="Active"
              style={{ color: "#808080" }}
            />
          </Popover>
        ),
      },
      {
        modelId: "LOG160900",
        estimator: "Logistic Regression Classifier",
        accuracy: "0.67",
        ksstatistic: "0.32",
        aucroc: "0.76",
        status: (
          <Popover
            content={
              <div className="px-2 py-1">
                <p>Archived</p>
              </div>
            }
          >
            <MDBIcon
              icon="circle"
              label="Active"
              style={{ color: "#808080" }}
            />
          </Popover>
        ),
      },
    ],
  };

  return (
    <MDBContainer fluid flexCenter className="mt-4 mb-3">
      <MDBRow>
        <MDBCardGroup deck className="mt-1 ml-3">
          <MDBCard style={{ width: "66.5rem" }} className="pl-1">
            <MDBCardBody className="pl-1 pr-1 pt-0 pb-0">
              {/* <MDBCardTitle tag="h6" style={{ color: 'black' }}>
								Model ID: 12345
								
							</MDBCardTitle> */}
              <MDBCardText>
                <MDBTable responsive striped className="pl-3 pt-0">
                  <MDBTableHead columns={model_board.columns} />
                  <MDBTableBody rows={model_board.rows} />
                </MDBTable>
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCardGroup>
      </MDBRow>
    </MDBContainer>
  );
};

export default ModelLeaderboard;
