import React, { useState } from "react";
import {
  MDBRow,
  MDBIcon,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBCard,
  MDBCardBody,
  MDBCardGroup,
  MDBCardText,
  MDBCardTitle,
  MDBContainer,
} from "mdbreact";

import OverviewChart from "./utilities/ApexBarModelOverviewChart";
import ROCChart from "./utilities/ApexLineROCChart2";

import GainsChart from "./utilities/ApexLineGainsChart";
import PredictedChart from "./utilities/ApexLinePredictedChart";

import FeatureChart from "./utilities/ApexBarFeatureListChart";
import EventChart from "./utilities/ApexLineModelEvent";
import EventBarChart from "./utilities/ApexBarModelEvent";
import "antd/dist/antd.css";
import { Select } from "antd";
const { Option } = Select;

const data_model = {
  columns: [
    {
      label: "Model ID",
      field: "modelid",
    },
    {
      label: "Prediction Type",
      field: "predictiontype",
    },
    {
      label: "Model Type",
      field: "modeltype",
    },
    {
      label: "Created On",
      field: "created",
    },
  ],
  rows: [
    {
      modelid: "MRM190006",
      predictiontype: "Binary Classification",
      modeltype: "XGB Classifier",
      created: "24/04/2023 14:16:01",
    },
  ],
};

const data_performance = {
  columns: [
    {
      label: "Metrics",
      field: "metrics",
    },
    {
      label: "Score",
      field: "score",
    },
  ],

  rows: [
    {
      metrics: "Accuracy",
      score: "0.89",
    },
    {
      metrics: "Sensitivity",
      score: "0.79",
    },
    {
      metrics: "Specificity",
      score: "0.90",
    },
    {
      metrics: "F1 Score",
      score: "0.60",
    },
    {
      metrics: "Precision",
      score: "0.49",
    },

    {
      metrics: "ROC AUC",
      score: "0.87",
    },
    {
      metrics: "KS",
      score: "0.48",
    },
    {
      metrics: "Overall MAPE",
      score: "0.11",
    },
  ],
};



const data_matrix = {
  rows: [
    {
      label: "Accuracy",
      value: "0.89",
      icon: [
        <MDBIcon
          icon="circle"
          className="mr-2 green-text"
          aria-hidden="true"
        />,
      ],
    },
    {
      label: "Sensitivity",
      value: "0.79",
      icon: [
        <MDBIcon
          icon="circle"
          className="mr-2 green-text"
          aria-hidden="true"
        />,
      ],
    },
    {
      label: "Specificity",
      value: "0.90",
      icon: [
        <MDBIcon
          icon="circle"
          className="mr-2 green-text"
          aria-hidden="true"
        />,
      ],
    },
    {
      label: "F1 Score",
      value: "0.60",
      icon: [
        <MDBIcon
          icon="circle"
          className="mr-2 green-text"
          aria-hidden="true"
        />,
      ],
    },
    {
      label: "Precision",
      value: "0.49",
      icon: [
        <MDBIcon
          icon="circle"
          className="mr-2 green-text"
          aria-hidden="true"
        />,
      ],
    },
  ],
};

const ModelPerformance = () => {
  const [selectedData, setSelectedData] = useState([
    { data: [11.9, 14.8, 15.4, 13.1, 12.5, 10.4, 9.2, 8.3, 7.4, 6.6] },
  ]);
  const [selectedChart, setSelectedChart] = useState("Line");
  const [selectedBarChart, setSelectedBarChart] = useState("");

  const changeData = (e) => {
    if (e == "marseg") {
      setSelectedChart("Bar");
      setSelectedData([
        {
          name: "Market Segment",
          data: [8, 12],
        },
      ]);
      setSelectedBarChart(e);
    }
    if (e == "numproava") {
      setSelectedChart("Bar");
      setSelectedData([
        {
          name: "No. of Products availed",
          data: [7, 9, 12],
        },
      ]);
      setSelectedBarChart(e);
    }
    if (e == "creshawal") {
      setSelectedChart("Line");
      setSelectedData([
        { data: [5.6, 5.8, 6.2, 7.5, 8.1, 9.1, 10.0, 11.9, 12.4, 14.8] },
      ]);
    }
    if (e == "lenrel") {
      setSelectedChart("Line");
      setSelectedData([
        { data: [5.2, 5.6, 6.7, 7.2, 8.4, 9.5, 10.1, 12.5, 13.1, 15.2] },
      ]);
    }
    if (e == "totloaout") {
      setSelectedChart("Line");
      setSelectedData([
        { data: [5.2, 5.7, 6.3, 7.2, 8.8, 10.2, 13.7, 14.9, 11.7, 9.5] },
      ]);
    }
    if (e == "debincrat") {
      setSelectedChart("Line");
      setSelectedData([
        { data: [5.1, 5.6, 6.3, 7.3, 8.3, 9.9, 11.6, 13.2, 14.8, 14.7] },
      ]);
    }
    if (e == "balexicar") {
      setSelectedChart("Line");
      setSelectedData([
        { data: [5.3, 6.7, 7.4, 8.1, 8.2, 8.9, 9.9, 11.1, 12.4, 14.5] },
      ]);
    }
    if (e == "complaints") {
      setSelectedChart("Line");
      setSelectedData([
        { data: [15.2, 14.3, 12.8, 10.9, 9.7, 8.5, 8.1, 7.9, 7.5, 6.1] },
      ]);
    }
    if (e == "behave") {
      setSelectedChart("Line");
      setSelectedData([
        { data: [11.9, 14.8, 15.4, 13.1, 12.5, 10.4, 9.2, 8.3, 7.4, 6.6] },
      ]);
    }
    if (e == "others") {
      setSelectedData([
        { data: [1.1, 2.1, 2.6, 2.4, 3.1, 3.8, 3.9, 4.5, 4.6, 5.1] },
      ]);
    }
  };

  return (
    <MDBContainer fluid flexCenter>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "90% auto",
          alignItems: "right",
        }}
      >
        <div></div>
        <div>
          <img
            src="/word-grey.png"
            style={{
              height: "1.2rem",
              width: "1.2rem",
              backgroundColor: "white",
              marginRight: "1rem",
            }}
          />
          <img
            src="/code-grey.png"
            style={{ height: "1.2rem", width: "1.2rem" }}
          />
        </div>
      </div>
      <MDBRow>
        <MDBCardGroup deck className="mt-1">
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

      <MDBRow>
        <MDBCardGroup deck className="mt-3">
          <MDBCard style={{ width: "32.5rem" }}>
            <MDBCardBody className="pb-1">
              <MDBCardTitle
                tag="h5"
                className="text-center"
                style={{ color: "black" }}
              >
                Modeling Data Overview
              </MDBCardTitle>
              <MDBCardText>
                <OverviewChart />
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    textAlign: "center",
                  }}
                >
                  <h6>Sample Size=8000</h6>
                  <h6>Event Rate=10%</h6>
                </div>
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>

          <MDBCard style={{ width: "32.5rem" }}>
            <MDBCardBody className="pb-1">
              <MDBCardTitle
                tag="h5"
                className="text-center"
                style={{ color: "black" }}
              >
                Performance Stats
              </MDBCardTitle>
              <MDBCardText>
                <MDBRow>
                  <MDBCard style={{ width: "15rem" }}>
                    <MDBCardText>
                      <MDBTable striped responsive className="condensed-table">
                        <MDBTableHead
                          columns={data_performance.columns}
                          style={{ fontWeight: "bold" }}
                        />
                        <MDBTableBody rows={data_performance.rows} />
                      </MDBTable>
                    </MDBCardText>
                  </MDBCard>

                  <MDBCard style={{ width: "15rem" }}>
                    <MDBCardText>
                      <ROCChart />
                    </MDBCardText>
                  </MDBCard>
                </MDBRow>
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCardGroup>
      </MDBRow>

      <MDBRow>
        <MDBCardGroup deck className="mt-3">
          <MDBCard style={{ width: "24rem" }} className="pl-1">
            <MDBCardBody className="pl-1 pr-1">
              <MDBCardTitle
                tag="h5"
                style={{ color: "black" }}
                className="text-center "
              >
                Confusion Matrix
              </MDBCardTitle>
              <MDBCardText>
                <div style={{ textAlign: "center", marginTop: "3.5rem" }}>
                  Predicted
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "7% 93%",
                    gridTemplateRows: "100%",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      writingMode: "vertical-lr",
                      transform: "rotate(180deg)",
                    }}
                  >
                    Actual
                  </div>
                  <div className="row-2-col-2">
                    <div />
                    {/* <div className="segment-col"> */}
                    <button className="segment-header-button segment-data23 no-border">
                      <p className="segment-p">0</p>
                    </button>
                    {/* </div> */}
                    {/* <div className="segment-col">1</div> */}
                    <button className="segment-header-button segment-data23 no-border">
                      <p className="segment-p">1</p>
                    </button>

                    <div className="segment-row segment-data23">
                      <p className="segment-q">0</p>
                    </div>
                    <button className="segment-button segment-data11 no-border">
                      <p className="segment-p">6518(TN)</p>
                    </button>

                    <button className="segment-button segment-data11 no-border">
                      <p className="segment-p">669(FP)</p>
                    </button>

                    <div className="segment-row segment-data23">
                      <p className="segment-q">1</p>
                    </div>
                    <button className="segment-button segment-data21 no-border">
                      <p className="segment-p">166(FN)</p>
                    </button>

                    <button className="segment-button segment-data21 no-border">
                      <p className="segment-p">647(TP)</p>
                    </button>
                  </div>
                </div>
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>

          <MDBCard style={{ width: "24rem" }} className="pl-1">
            <MDBCardBody className="pl-1 pr-1">
              <MDBCardTitle
                tag="h5"
                style={{ color: "black" }}
                className="text-center"
              >
                Gains Chart
              </MDBCardTitle>

              <GainsChart />
            </MDBCardBody>
          </MDBCard>

          <MDBCard style={{ width: "24rem" }}>
            <MDBCardBody className="pl-1 pr-1">
              <MDBCardTitle
                tag="h5"
                style={{ color: "black" }}
                className="text-center"
              >
                ROC Curve
              </MDBCardTitle>
              <MDBCardText></MDBCardText>
              {/* <LineChart line={line2} options={options1} /> */}
              <ROCChart />
            </MDBCardBody>
          </MDBCard>

          <MDBCard style={{ width: "24rem" }}>
            <MDBCardBody className="pl-1 pr-1">
              <MDBCardTitle
                tag="h6"
                style={{ color: "black", fontSize: "1.2rem" }}
                className="text-center"
              >
                Actual vs Predicted Error
              </MDBCardTitle>
              <MDBCardText></MDBCardText>
              {/* <LineChart line={line3} options={options1}/> */}
              <PredictedChart />
            </MDBCardBody>
          </MDBCard>
        </MDBCardGroup>
      </MDBRow>

      <MDBRow>
        <MDBCardGroup deck className="mt-3">
          <MDBCard style={{ width: "24rem" }}>
            <MDBCardBody>
             
              <MDBCardText>
                <MDBTable borderless responsive className="condensed-table">
                 
                  <MDBTableBody rows={data_matrix.rows} />
                </MDBTable>
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>

          <MDBCard style={{ minWidth: "32.1rem", marginLeft: "1.3rem" }}>
            <MDBCardBody>
            
              <MDBCardText>
                <h6>
                  <strong>Gains Chart</strong>
                  <MDBIcon
                    icon="circle"
                    className="ml-2 green-text"
                    aria-hidden="true"
                  />
                </h6>
                <p>
                  75% events captured by targeting 45% population. KS at 48%
                </p>

                <h6 className="mt-10">
                  <strong>ROC Curve</strong>
                  <MDBIcon
                    icon="circle"
                    className="ml-2 green-text"
                    aria-hidden="true"
                  />
                </h6>
                <p>Area under Curve (AUC) – 0.87</p>
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>

          <MDBCard style={{ width: "24rem" }}>
            <MDBCardBody>
              <MDBCardText>
                <h6>
                  MAPE
                  <MDBIcon
                    icon="circle"
                    className="mr-3 green-text"
                    style={{ float: "right" }}
                    aria-hidden="true"
                  />
                </h6>
                <p className="mt-1" style={{ fontSize: "0.6rem" }}>
                  Mean Average percentage error
                </p>
                <p>Overall MAPE - 11%</p>
                <p>Decile level MAPE - 7%</p>
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCardGroup>
      </MDBRow>

      <MDBRow>
        <MDBCardGroup deck className="mt-3">
          <MDBCard style={{ width: "32.5rem" }} className="pl-1">
            <MDBCardBody className="pl-1 pr-1">
              <MDBCardTitle
                tag="h5"
                style={{ color: "black" }}
                className="text-center "
              >
                Significant Feature List
              </MDBCardTitle>
              <MDBCardText>
                <FeatureChart />
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>

          <MDBCard style={{ width: "32.5rem" }} className="pl-1">
            <MDBCardBody className="pl-1 pr-1">
              <MDBCardTitle
                tag="h5"
                style={{ color: "black" }}
                className="text-center"
              >
                Relationship with Model Event
              </MDBCardTitle>
              <div
                style={{ display: "grid", gridTemplateColumns: "0.92fr auto" }}
              >
                <h6 className="pt-2 pl-4">
                  Select Feature
                  <img
                    src="./right.svg"
                    style={{
                      height: "1rem",
                      width: "1rem",
                      marginLeft: "0.5rem",
                    }}
                  />
                </h6>
                <Select
                  defaultValue="behave"
                  style={{ width: 240 }}
                  onChange={(e) => changeData(e)}
                >
                  <Option value="behave">Behavior score</Option>
                  <Option value="debincrat">Debt to Income ratio</Option>
                  <Option value="lenrel">Length of Relationship</Option>
                  <Option value="creshawal">Credit Share of Wallet</Option>
                  <Option value="marseg">Market Segment</Option>
                  <Option value="balexicar">Balance on existing card</Option>
                  <Option value="complaints">
                    Complaints in the last 6 months
                  </Option>
                  <Option value="numproava">Number of products owned</Option>
                  <Option value="totloaout">Total loan outstanding</Option>
                  {/* <Option value="others">Others</Option> */}
                </Select>
              </div>
              {selectedChart == "Line" ? (
                <EventChart data={selectedData} />
              ) : (
                <EventBarChart
                  series={selectedData}
                  chartName={selectedBarChart}
                />
              )}
            </MDBCardBody>
          </MDBCard>
        </MDBCardGroup>
      </MDBRow>
    </MDBContainer>
  );
};
export default ModelPerformance;
