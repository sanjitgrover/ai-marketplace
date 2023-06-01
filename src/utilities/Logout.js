import React, { Fragment, useState } from "react";

import {API_ROOT, CONTEXT} from '../config';

import {
  MDBIcon,
  MDBCardBody,
  MDBCard,
  MDBCardImage,
  MDBCardFooter,
} from "mdbreact";
import axios from "axios";
import Icon from '@material-ui/core/Icon';
import { Modal } from "antd";

function Logout({ logout, authUser, userPosition, userPic, userMail, hasRights, SSOType }) {

  const [open, setOpen] = useState(false);

  const changePasswordHandler = () => {
    // axios(`${API_ROOT}changePasswordRequest`)
    //   .then((res) => {
    //     console.log(res);
    //     let redirectURL = window.location.origin;
    //     let changePasswordURL = `${API_ROOT}changePassword?token=${res.data.response}&redirect_uri=${redirectURL}${CONTEXT}`;
    //     window.sessionStorage["resp"] = "";
    //     window.location=changePasswordURL;
    //   })
    console.log("Request Submitted");
  }

  const changePasswordConfirmation = () => {
    setOpen(true);
  }
  return (
    <Fragment>
    <MDBCard className="m-0">
      <MDBCardBody className="text-center">
        {userPic ? (
          <MDBCardImage
            src={`data:image/jpeg;base64,${userPic}`}
            style={{ borderRadius: "2rem", margin: "auto" }}
          />
        ) : (
          <MDBIcon
            className=""
            style={{ fontSize: "5rem" }}
            size="lg"
            icon="user-circle"
          />
        )}

        {/* <img
          src={`data:image/jpeg;base64,${userPic}`}
          style={{ height: "20px", width: "20px" }}
        /> */}
        <h6 className="mt-2 mb-0 text-capitalize">{authUser}</h6>
        <div>{userMail}</div>
        <div>{userPosition}</div>
        <div>Groups:</div>
        {hasRights.map((right, index)=><div key={index}>{right}</div>)}
      </MDBCardBody>
      <MDBCardFooter>
        <a onClick={changePasswordConfirmation} className="row d-flex pl-2">
          <Icon>lock_reset</Icon>
          Change Password
        </a>
        {SSOType!=='SSO'?<div
          style={{ textAlign: "left" }}
          onClick={(e) => {
            // history.push("/");
            logout();
          }}
        >
          <i className="fas fa-sign-out-alt" style={{ marginRight: 5 }}></i>
            <a>Logout</a>
        </div>:null}
      </MDBCardFooter>
    </MDBCard>
      <Modal
        className="action-modal"
        width="500px"
        visible={open}
        onCancel={() => setOpen(false)}
        okText="Yes"
        onOk={changePasswordHandler}
      >
        Are you sure you want to change password?
      </Modal>
    </Fragment>
  );
}

export default Logout;
