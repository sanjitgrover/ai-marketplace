import React from 'react';
import { MDBContainer } from 'mdbreact';
import SwaggerUI from "swagger-ui-react";

import "swagger-ui-react/swagger-ui.css";


const ModelTryout = () => {
	return (
		<MDBContainer fluid flexCenter>
			 <SwaggerUI url="models/openapi.json" />
		</MDBContainer>
	);
};
export default ModelTryout;


