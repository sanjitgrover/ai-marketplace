import React from "react";
import { MDBContainer, MDBRow } from "mdbreact";
import { AppContext } from "../../../AppProvider";
import Card from "../../../utilities/Card";

import PageTitle from "../../../utilities/PageTitle";
import NoHomeForUser from "./NoHomeForUser";
import { CONTEXT } from "../../../config";
import Crumb from "../../../utilities/CardBreadcrumbs";

const icons = [
  require("../../../assets/homeIcon/price.svg"),
  require("../../../assets/homeIcon/gear.svg"),
  require("../../../assets/homeIcon/PA.svg"),
  require("../../../assets/homeIcon/CRS.svg"),
  require("../../../assets/homeIcon/price.svg"),
  require("../../../assets/homeIcon/gear.svg"),
];



const Home = (props) => {
  const setTab = (setSiderKey, siderKey) => {
    setSiderKey(siderKey);
  };

  

  return (
    <AppContext.Consumer>
      {({ setSiderKey, menuContent, hasRights,  navigationType}) => {
        let homePage = [];
       
        const processChildren = (children) => {
          children.length > 0 &&
            children.forEach((child) => processChild(child));
        };

        const processChild = (menu) => {
          if (CONTEXT + menu.link === props.pageUrl) {
            homePage.push(menu);
          } else {
            menu.children &&
              menu.children.length > 0 &&
              processChildren(menu.children);
          }
        };

        menuContent.forEach((menu) => {
          if (CONTEXT + menu.link === props.pageUrl) {
            homePage.push(menu);
          } else {
            menu.children &&
              menu.children.length > 0 &&
              processChildren(menu.children);
          }
        });

        let newChildren = [];

        if (
          homePage.length > 0 &&
          homePage[0].children &&
          homePage[0].children.length > 1
        ) {
          homePage[0].children.forEach((tab) => {
            let foundGroup = false;
            if (tab.userGroups) {
              tab.userGroups.forEach((group) => {
                if (hasRights.includes(group)) {
                  foundGroup = true;
                }
              });
            } else {
              foundGroup = true;
            }
            if (foundGroup) {
              newChildren.push({ ...tab });
            }
          });
          homePage[0].children = [...newChildren];
        }
        return (
          <React.Fragment>
            {navigationType==="Sidebar" && <PageTitle
              title={homePage.length > 0 ? homePage[0].displayName : "Home"}
            />}
            <MDBContainer>
              {homePage.length > 0 && homePage[0].children ? (
                homePage[0].children.length > 0 ? (
                  homePage[0].children.map((item, index) => {
                    const icon = icons[Math.floor(Math.random() * 6)];
                    {
                    return  homePage[0].displayName === "Model Hub"?
                    (
                      <Crumb
                        key={index}
                        icon={icon}
                        onClick={() => {
                          setTab(setSiderKey, [item.menuKey]);
                        }}
                        title={item.displayName}
                        navLinkTo={CONTEXT + item.link}
                       
                      />
                    )
                    :(
                      <Card
                        key={index}
                        icon={icon}
                        onClick={() => {
                          setTab(setSiderKey, [item.menuKey]);
                        }}
                        title={item.displayName}
                        navLinkTo={CONTEXT + item.link}
                       
                      />
                    );}
                  })
                ) : homePage[0].allowHome ? (
                  <NoHomeForUser title={"No Home Page"} />
                ) : (
                  <Card icon={icons[1]} title={"No Models"} navLinkTo={"#"} />
                )
              ) : (
                <Card icon={icons[1]} title={"No Models"} navLinkTo={"#"} />
              )}
            </MDBContainer>
          </React.Fragment>
        );
      }}
    </AppContext.Consumer>
  );
};
export default Home;
