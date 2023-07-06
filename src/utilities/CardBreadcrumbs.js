import React from "react";
import "./CardBreadcrumbs.css";
import { MDBNavLink , MDBBtn} from "mdbreact";

const Crumb = (props) => {
  return (
    <>
      <div className="verticals ten offset-by-one">
	  { props.title !== "Add Model"?
        <ol className="crumb crumb-fill2 style1">
          <li>
            {/* <img src={props.icon} style={{ height: "1rem", width: "1rem" }} /> */}
			<li><i className="fa fa-home"></i></li>
          </li>
         
			<li>
            <MDBNavLink
              onClick={props.onClick}
              style={{ display: "inline", paddingLeft: "0px" }}
              exact
              to={props.navLinkTo}
            >
              <h5 className="text-center text-white">{props.title}</h5>
            </MDBNavLink>
          </li>
        </ol>
		:
			<MDBBtn size="md" color="primary" >
			<MDBNavLink
              onClick={props.onClick}
              style={{ display: "inline", padding: "0px", margin: "0px" }}
              exact
              to={props.navLinkTo}
            >
              <h5 className="text-center text-white mb-0">{props.title}</h5>
            </MDBNavLink>
			</MDBBtn>}
      </div>

      {/* <div className="verticals ten offset-by-one">
			<ol className="crumb crumb-fill2 style2">
			<li><i className="fa fa-home"></i></li>
			<li>Behavioral Model</li>
			</ol>
		</div>
		
		<div className="verticals ten offset-by-one">
			<ol className="crumb crumb-fill2 style3">
			<li><i className="fa fa-home"></i></li>
			<li>Behavioral Model</li>
			</ol>
		</div>
		
		<div className="verticals ten offset-by-one">
			<ol className="crumb crumb-fill2 style4">
				<li><a href="javascript:void(0);"><i className="fa fa-home"></i></a></li>
				<li><a href="javascript:void(0);">Library</a></li>
				<li><a href="javascript:void(0);">Data</a></li>
				<li><a href="javascript:void(0);">Meta Data</a></li>
				<li><a href="javascript:void(0);">Multimeta Data</a></li>
				<li className="active">Detail</li>
			</ol>
		</div>
		*/}
    </>
  );
};
export default Crumb;
