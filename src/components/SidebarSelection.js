import React from "react";
import { AppContext } from "../AppProvider";
import Sidebar from "./Sidebar";
import { GATEWAYBASED } from "../config";

const SidebarSelection = (_props) => {
  return (
    <AppContext.Consumer>
      {({
        navigationType,
        menuContent,
        mainMenuLoading,
        themeLoading,
        gatewayMenuContent,
      }) =>
        navigationType === "Sidebar" && (
          <Sidebar
            menuContent={GATEWAYBASED ? gatewayMenuContent : menuContent}
            mainMenuLoading={mainMenuLoading}
            themeLoading={themeLoading}
          />
        )
      }
    </AppContext.Consumer>
  );
};

export default SidebarSelection;
