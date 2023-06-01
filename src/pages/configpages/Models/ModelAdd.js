/** Model Inventory - list of all model */
import React, { Component } from "react";
import axios from "axios";

import { API_ROOT, CONTEXT, STATICMRM } from "../../../config";

import Loader from "../../../utilities/Loader";
import ModelAddComponent from "./ModelAddComponent";



class ModelInventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResponse: null,
      modelsList: null,
      invModels: null,
      invSelected: '',
      setModelSelected: null,
      modal: false,
      bankSelected: '',
      commentModel: false,
      commentText: null,
      repoModel: false,
      repoText: null
    };
  }

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  /** call at once when component render */
  componentDidMount() {
    this.getModelList();
  }

  /** get all list of models by calling API */
  getModelList = async () => {
    this.setState({
      apiResponse: null,
      invModels: null,
      modelsList: null,
    });
    try {
      
      let filename = "data.json";
      let url = `${CONTEXT}/mrm/` + filename;
      axios({
        method: "get",
        url: url,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((result) => {
          result.data.response.sort((a,b)=>a.modelId.localeCompare(b.modelId));
          result.data.response.forEach((v,i)=>{
            v.key=i+'';
          });

          this.setState({ filteredData: result.data.response })
         
          if (result.data.code === 200) {
            this.setState({
              apiResponse: 200,
              invModels: result.data.response.length > 0 ? result.data.response : null,
              modelsList: result.data.response,
            });
          } else {
            this.setState({
              apiResponse: 400,
            });
          }
        })
        .catch((err) => {
          console.error("error1212", err);
          this.setState({
            apiResponse: 400,
          });
        });
    } catch (error) {
      console.log("error121", error);
      this.setState({
        apiResponse: 400,
      });
    }
  };




 

  /** open edit model pop-up */
  handleEditModel = (modelId) => {
    this.setState((state) => ({
      modal: !state.modal,
      currentModelId: modelId,
    }));
  };

 

  /** remove model by call API */


  /** call the edit/save function on modelId condition */
  addModelList = (data) => {
    if (data.currentModelId) {
      this.editModel(data);
    } else {
      this.saveModel(data);
    }

  };

 

  editModel = async (data) => {
    //console.log("testdata", data);
    const bodyFormData = { ...data };
    //console.log("data121", bodyFormData);
    let url = API_ROOT + `modelDataedit/${this.props.token}`;

    axios({
      method: "post",
      url: url,
      data: bodyFormData,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }).then((result) => {
      console.log("editModel", result);
	  this.getModelList();
    });
  };

  /** update model's value */
  updateModel = async (record) => {
    const response = window.confirm("Are you sure you want to update?");
    if (response) {
      let data = { "modelType": record.modelType, "modelId": record.modelId, "bank": record.bank };
      let url = API_ROOT + `modelDataupdate/${this.props.token}`;
      axios({
        method: "post",
        url: url,
        data,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((result) => {
          console.log("updateModel", result);
          this.getModelList();
        })
        .catch((err) => {
          console.error("error1212", err);
        });
    }
  };

  /** save model by calling api */
  saveModel = async (data) => {
    const bodyFormData = { ...data };
    
    let url = API_ROOT + `modelDatapost/${this.props.token}`; //s3Url("addModel");

    axios({
      method: "post",
      url: url,
      data: bodyFormData,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }).then((result) => {
      if (result.data.code === 400) {
        window.alert(result.data.message)
      }else{
		this.getModelList();
	  }
      console.log("saveModelResp121", result);
    });
  };

 


  render() {
    

   
    // const businessOptions = ['Risk', 'Market Risk', 'Marketing'];

    return (
      <>
      
      
          {this.state.apiResponse ? (
            <ModelAddComponent
            modal={this.state.modal}
            toggleModal={this.toggleModal}
            addModelList={this.addModelList}
            invState={this.state}
          />
          ): (
            <Loader />
          )}
          
       
       
      </>
     
    );
  }
}

export default ModelInventory;
