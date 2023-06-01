import React, { useState, useEffect } from "react";
import axios from "axios";
import AppProvider from "./AppProvider";
import { BrowserRouter as Router } from "react-router-dom";
import { API_ROOT, PROJECT_ID } from "./config";
import Routes from "./Routes";
import LoginModal from "./pages/LoginPage";
import LoginCard from "./components/LoginCard";
import SidebarSelection from "./components/SidebarSelection";
import Header from "./components/Header";

import Card from "./utilities/Card";
import Alert from "./assets/KPI/danger-alert.svg";
import MenuProvider from "./context/MenuContext";

import { CONTEXT } from "./config";


const App = () => {
  let appConfig = window.globalConfig;
  const [loggedIn, setLogin] = useState(false);
  const [domain, setDomain] = useState("");
  const [token, setToken] = useState(null);
  const [loginData, setLoginData] = useState(null);
  const [errors, setErrors] = useState("");
  const [SSOType, setSSOType] = useState("SSO"); //initially SSO only

  const contextLogged = CONTEXT===''?'Dev':CONTEXT.replace('/','').toUpperCase();
  
  
  useEffect(() => {
    document.title = `${contextLogged} - Incedo AI Marketplace`
    let lsData = window.sessionStorage["resp"];
    if (lsData) {
      lsData = JSON.parse(lsData);
      setLogin(lsData.isLogged === contextLogged ? true : false);
      setToken(lsData.token || "");
      setLoginData(lsData.response || "");
      setDomain(lsData.isLogged === contextLogged ? appConfig.projectId : "");
    }

    if (SSOType === "SSO") {
      console.log("Handle this token");
      handleSSO();
    }
    handleVerifyToken();
  }, []);

  const handleVerifyToken = async () =>{

      let lsData = window.sessionStorage["resp"];
      if (lsData) {
        lsData = JSON.parse(lsData);
        await axios({
          method: `GET`,
              // url: API_ROOT + `userProfile/`,
              url: `/userProfile.json`,
              headers: { "Access-Control-Allow-Origin": "*", }
        }).then((res)=>{
          if(res.data.code !== 200)
          {
            resetLoggedIn();
          }
        }).catch((e)=>{
          resetLoggedIn();
        });
      }
      else{
        resetLoggedIn();
      }
  }

  const handleSSO = async () => {
    setErrors([]);
    try {
      let response = await axios({
        method: "get",
        // url: API_ROOT + "getSSOUser",
        url: `/getSSOUser.json`,
        headers: { "Access-Control-Allow-Origin": "*", 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
        timeout: 30000,
      });
      console.log("SSO Data", response.data);
      if (response.status === 200) {
        
        setSSOType(response.data.loginType);
        window.sessionStorage["version"] = response.data.version;
       

        if (response.data.loginType === "SSO") {
        
          const apiResponse = response.data;
        
          setLoggedIn(apiResponse.token, apiResponse);

          if (PROJECT_ID) {
            setDomain(PROJECT_ID);
          }
        }
      } else {
        setErrors([response.data.message]);
      }
    } catch (err) {
      console.log(err);
      setErrors(["Error in Loading Application"]);
     
    }
  };

  const setAPICallErrors = (error) => {
    setErrors(error);
    setDomain("");
    setLogin(false);
    setToken(null);
    setLoginData(null);
  };
  const setLoggedIn = (token, response) => {
    let lsData = JSON.stringify({ isLogged: contextLogged, token, response });
    window.sessionStorage["resp"] = lsData;
    setDomain(appConfig.projectId);

    setLogin(true);
    setToken(token);
    setLoginData(response);
  };
  const resetLoggedIn = () => {
    window.sessionStorage["resp"] = "";

    setDomain("");
    setLogin(false);
    setToken(null);
    setLoginData(null);
    
    if (loggedIn) {
      window.location = CONTEXT + "/"
    }
  };

  const changeDomain = (domain) => {
    setDomain(domain);
  };

  return (
    <AppProvider
      domain={domain}
      resetLoggedIn={resetLoggedIn}
      token={token}
      loginData={loginData}
      setAPICallErrors={setAPICallErrors}
      setToken={setToken}
      SSOType={SSOType}
    >
      <MenuProvider>
        <Router>
          {loggedIn === false || domain < 0 ? (
            SSOType !== "SSO" ? (
              <LoginModal
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
                resetLoggedIn={resetLoggedIn}
                setDomain={changeDomain}
                errorFromAPIcall={errors}
              />
            ) : errors.length > 0 ? (
              <div className="d-flex flex-row align-items-center justify-content-center">
                <Card
                  icon={Alert}
                  title={errors[0]}
                  navLinkTo={""}
                  subTitle={"Contact Technical Team"}
                />
              </div>
            ) : (
             
              <div className="row w-100 my-5 justify-content-center">
                <div className="col-md-4 text-center">
                  <h3 className="loading">Loading</h3>
                 
                </div>
              </div>
            )
          ) : (
            <div className="flyout">
              <Header className="header" />
              <div className="midarea">
                <SidebarSelection domain={domain} />
                <main className="main">
                  <Routes/>
                </main>
              </div>
              <LoginCard loginData={loginData} resetLoggedIn={resetLoggedIn} contextLogged={contextLogged} />
              <footer className="footer d-none">
                <p className="footer-copyright mb-0 py-2">
                  &copy; {new Date().getFullYear()} Copyright:
                  <a href="https://www.incedoinc.com"> Incedoinc.com </a>
                </p>
              </footer>
            </div>
          )}
        </Router>
      </MenuProvider>
    </AppProvider>
  );
};

export default App;
