import React, { Component } from "react";
import { CONTEXT } from "../../../config";
import axios from "axios";
import { Select, Upload, message, Button, Icon } from "antd";
import {
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon,
  MDBModalBody,
  MDBModalFooter,
  MDBContainer,
  MDBLink,
} from "mdbreact";

const { Option } = Select;
const textInput = React.createRef();

const props = {
  name: 'file',
  action: 'http://localhost:8000/upload',
  headers: {"Access-Control-Allow-Origin": "*"  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modelType: "",
      modelId: "",
      modelName: "",
      businessSponsor: "",
      developer: "",
      validator: "",

      materialityStatus: "",
      status: "",
      repository: "",
      creationDate: "",
      objective: "",
      comments: "",
      lastDateOfImplementation: "",
      riskManager: "",
      bank: "",
      addListInput: false,
      modelTypeOptions: [
        { label: "Risk", value: "Risk" },
        { label: "Market Risk", value: "Market Risk" },
        { label: "Marketing", value: "Marketing" },
      ],
    };
  }

  componentDidUpdate() {
    //console.log("component", this.props);
    if (this.state.currentModelId !== this.props.invState.currentModelId) {
      const currentModel =
        this.props.invState.currentModelId === null
          ? null
          : this.props.invState.invModels.filter(
              (item) => item.modelId === this.props.invState.currentModelId
            )[0];
      //console.log('current121',currentModel);
      this.setState({
        currentModelId: currentModel
          ? this.props.invState.currentModelId
          : null,
        modelId: currentModel ? this.props.invState.currentModelId : null,
        modelName: currentModel ? currentModel.modelName : "",
        modelType: currentModel ? currentModel.modelType : "",
        businessSponsor: currentModel ? currentModel.businessSponsor : "",
        developer: currentModel ? currentModel.developer : "",
        validator: currentModel ? currentModel.validator : "",
        creationDate: currentModel ? currentModel.creationDate : "",
        lastDateOfImplementation: currentModel
          ? currentModel.lastDateOfImplementation
          : "",
        objective: currentModel ? currentModel.objective : "",
        comments: currentModel ? currentModel.comments : "",
        materialityStatus: currentModel ? currentModel.materialityStatus : "",
        riskManager: currentModel ? currentModel.riskManager : "",
        bank: currentModel ? currentModel.bank : "",
      });
    }
  }

  sendModelParams=()=>{
    axios({
      method: "post",
      url: 'http://localhost:8000/modelparams' ,
      data: {
        modellist: [{"preg":'(float, 0.0)'}, {"ref":'(float, 0.0)'}]
      },
      responseType: "json",
    }).then((res) => {
      console.log(res);
    })
  }

  changeHandler = (event, fieldName = null) => {
    if (
      fieldName === "modelType" ||
      fieldName === "materialityStatus" ||
      fieldName === "bank"
    ) {
      this.setState({ [fieldName]: event });
    } else {
      let name = event.target.name;
      let fieldValue = event.target.value;
      this.setState({ [name]: fieldValue });
    }
  };

  saveChange = (addModelList) => {
    let { modelId, modelName, modelType, materialityStatus, bank } = this.state;

    if (modelType === "" || modelType === null) {
      alert("Please select Business Function.");
      return false;
    } else if (materialityStatus === "" || materialityStatus === null) {
      alert("Please select Materiality");
    } else if (modelId === "" || modelId === null) {
      alert("Model Id can't be empty.");
      return false;
    } else if (modelName === "" || modelName === null) {
      alert("Model name can't be empty.");
      return false;
    } else if (bank === "" || bank === null) {
      alert("Please select Bank.");
      return false;
    } else {
      addModelList(this.state);
      if (this.state.currentModelId) {
        alert("Model edit request was successful.");
      } else {
        alert("Model add request was successful.");
      }
    }
  };

  handleAddListItem = () => {
    this.setState({
      addListInput: true,
    });
  };
  addListItem = () => {
    let val = textInput.current.value;
    this.setState({
      modelTypeOptions: [
        ...this.state.modelTypeOptions,
        { label: val, value: val },
      ],
      addListInput: false,
    });
  };

  render() {
    console.log("Add Components Props", this.props.invState.currentModelId);
    return (
      <React.Fragment>
        <MDBContainer fluid flexCenter className="mb-4">
          <div className="d-flex flex-row justify-content-between">
            <h3 style={{ margin: "1rem", color: "#0e4b71" }}>Add Model</h3>
            <div className="d-flex flex-row">
              <MDBLink to="/">
                <MDBBtn color="light">Close</MDBBtn>
              </MDBLink>
              <MDBLink to="/">
                <MDBBtn color="primary">Save changes</MDBBtn>
              </MDBLink>
            </div>
          </div>
          <MDBModalBody>
            <form className="grey-text text-left m-2" id="modalForm">
              <MDBRow>
                {/* {this.props.invState.currentModelId === null ? ( */}
                <MDBCol size="4">
                  <div className="form-group">
                    <label htmlFor="modelName" className="m-0 addModelLbl">
                      Business Function<sup>*</sup>
                    </label>
                    <div className="d-flex">
                      <Select
                        value={this.state.modelType}
                        name="modelType"
                        onChange={(ev) => this.changeHandler(ev, "modelType")}
                        style={{ width: "200px" }}
                      >
                        <Option value="">Select Business Function</Option>
                        {this.state.modelTypeOptions.map((opt, i) => {
                          return (
                            <Option
                              key={i}
                              className="text-capitalize"
                              value={opt.value}
                            >
                              {opt.label}
                            </Option>
                          );
                        })}
                      </Select>
                      <Upload {...props}>     
                      <input
                        type="button"
                        value="+"
                        title="Add new item"
                        className="form-control ml-2 h-auto"
                        // onClick={this.handleAddListItem}
                      />
                      </Upload>
                      
                      <input
                        type="button"
                        value="+++++"
                        title="Add new item"
                        className="form-control ml-2 h-auto"
                        onClick={this.sendModelParams}
                      />

                    </div>
                  </div>
                  {this.state.addListInput ? (
                    <div className="form-group d-flex">
                      <input
                        type="text"
                        ref={textInput}
                        className="form-control"
                        placeholder="Type here..."
                      />
                      <input
                        type="button"
                        value="Add"
                        className="form-control w-25 ml-2"
                        onClick={this.addListItem}
                      />
                    </div>
                  ) : null}
                </MDBCol>
              </MDBRow>
              <MDBRow>
                {!this.props.invState.currentModelId ? (
                  <MDBCol size="4">
                    <div className="form-group">
                      <label htmlFor="modelId" className="m-0 addModelLbl">
                        Model Id<sup>*</sup>
                      </label>
                      <input
                        autoComplete="off"
                        type="text"
                        id="modelId"
                        className="form-control"
                        name="modelId"
                        onChange={this.changeHandler}
                        value={this.state.modelId}
                      ></input>
                    </div>
                  </MDBCol>
                ) : null}
                <MDBCol size="8">
                  <div className="form-group">
                    <label htmlFor="modelName" className="m-0 addModelLbl">
                      Model Name<sup>*</sup>
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      id="modelName"
                      className="form-control"
                      name="modelName"
                      onChange={this.changeHandler}
                      value={this.state.modelName}
                    ></input>
                  </div>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol>
                  <div className="form-group">
                    <label
                      htmlFor="businessSponsor"
                      className="m-0 addModelLbl"
                    >
                      Business Sponsor
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      id="businessSponsor"
                      className="form-control"
                      name="businessSponsor"
                      onChange={this.changeHandler}
                      value={this.state.businessSponsor}
                    ></input>
                  </div>
                </MDBCol>
                <MDBCol>
                  <div className="form-group">
                    <label htmlFor="modelValidator" className="m-0 addModelLbl">
                      Model Developer
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      id="modelDeveloper"
                      className="form-control"
                      name="developer"
                      onChange={this.changeHandler}
                      value={this.state.developer}
                    ></input>
                  </div>
                </MDBCol>
                <MDBCol>
                  <div className="form-group">
                    <label htmlFor="modelValidator" className="m-0 addModelLbl">
                      Model Validator
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      id="modelValidator"
                      className="form-control"
                      name="validator"
                      onChange={this.changeHandler}
                      value={this.state.validator}
                    ></input>
                  </div>
                </MDBCol>
              </MDBRow>

              <MDBRow>
                <MDBCol size="4">
                  <div className="form-group">
                    <label htmlFor="creationDate" className="m-0 addModelLbl">
                      Model Creation Date
                    </label>
                    <input
                      autoComplete="off"
                      type="date"
                      id="creationDate"
                      className="form-control"
                      name="creationDate"
                      onChange={this.changeHandler}
                      value={this.state.creationDate}
                    ></input>
                  </div>
                </MDBCol>
                <MDBCol size="4">
                  <div className="form-group">
                    <label
                      htmlFor="lastDateOfImplementation"
                      className="m-0 addModelLbl"
                    >
                      Last Date of Implementation
                    </label>
                    <input
                      autoComplete="off"
                      type="date"
                      id="lastDateOfImplementation"
                      className="form-control"
                      name="lastDateOfImplementation"
                      onChange={this.changeHandler}
                      value={this.state.lastDateOfImplementation}
                    ></input>
                  </div>
                </MDBCol>
              </MDBRow>

              <MDBRow>
                <MDBCol>
                  <div className="form-group">
                    <label htmlFor="modelObjective" className="m-0 addModelLbl">
                      Model Objective
                    </label>
                    <textarea
                      className="form-control"
                      id="modelObjective"
                      rows="2"
                      name="objective"
                      onChange={this.changeHandler}
                      value={this.state.objective}
                    />
                  </div>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol>
                  <div className="form-group">
                    <label htmlFor="comment" className="m-0 addModelLbl">
                      Comments
                    </label>
                    <textarea
                      className="form-control"
                      id="comments"
                      rows="2"
                      name="comments"
                      onChange={this.changeHandler}
                      value={this.state.comments}
                    />
                  </div>
                </MDBCol>
              </MDBRow>
              <div style={{ fontSize: 9, float: "right" }}>
                All fields marked with * are mandatory.
              </div>
              <div style={{ float: "clear" }}>&nbsp;</div>
              <div style={{ fontSize: 9, float: "right" }}>
                <a
                  style={{ fontSize: 9 }}
                  href={`..${CONTEXT}/mrm/Template_Development.xlsx`}
                  target="_blank"
                  key="1"
                  download
                >
                  Download Model Baseline Metrics template.{" "}
                  <MDBIcon
                    icon="file-excel"
                    style={{ fontSize: 9, color: "green" }}
                  />
                </a>
              </div>
            </form>
          </MDBModalBody>
          <MDBModalFooter></MDBModalFooter>
          {/* </MDBModal> */}
        </MDBContainer>
      </React.Fragment>
    );
  }
}
