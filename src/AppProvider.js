import React, { Component } from "react";
import axios from "axios";
import { ACCESS_GROUPS } from "./config";

import menuService from "./services/menuService";
import themeService from "./services/themeService";
import { themeStyles } from "./utilities/AllTables";

import { SnackBarProvider } from "./components/Snackbar";
export const AppContext = React.createContext();

export default class AppProvider extends Component {
  constructor() {
    super();
    this.snackbarRef = React.createRef();
    this.state = {
      //SSO
      SSOType: "",
      setSSOType: this.setSSOType,
      // Contents
      domain: "",

      getAuthenticatedUser: this.getAuthenticatedUser,
      authUser: null,
      hasRights: [],
      //domainAccess:[], //SI-34 User's access to domain
      token: null,
      changeLoginStatus: this.changeLoginStatus,
      setAPICallErrors: this.setAPICallErrors,

      route: [],
      setRoute: this.setRoute,
      useSnackBar: this.useSnackBar,

      currentTheme: 1,
      theme: {
        color1: "#696969",
        color2: "#7D7D7D",
        color3: "#F0F0F0",
        color4: "#FFFFFF", //white - menu Background color
        color5: "#BDBDBD", //grey  - menu Border color
        //color5: "#F0F0F0",
        color6: "#111111", //black - font color
        color7: "#000000", //black
        color10: "#FFFFFF",
        color11: "#0E4B71", //bluish    - Page Title
        color12: "#FFFFFF",
        font: "Roboto",
        size: "1rem",
      },

      applyUserSettings: this.applyUserSettings,
      themeLoading: false,

      treeData: [
        {
          menuKey: "12",
          displayName: "Admin",
          link: "/",
          icon: "chess-rook",
          allowExternalLink: false,
          allowDashboard: false,
          allowHome: false,
          allowTabs: false,
          allowSubmenu: true,
          userGroups: ["Admin"],
          onlyAdmin: true,
          expanded: true,
          children: [
            {
              menuKey: "14",
              displayName: "Menu Configurations",
              link: "/QWRtaW4tTWVudSBDb25maWd1cmF0aW9ucw==",
              icon: "",
              allowExternalLink: false,
              allowDashboard: false,
              allowHome: false,
              allowTabs: false,
              userGroups: ["Admin"],
              onlyAdmin: true,
              children: [],
              internalLink: "Menu/AdminMenuConfigurations",
            },
          ],
        },
      ],
      pageContent: [
        {
          menuKey: "12",
          displayName: "Admin",
          link: "/",
          icon: "chess-rook",
          onlyAdmin: true,
          userGroups: ["Admin"],
          allowExternalLink: false,
          allowDashboard: false,
          allowHome: true,
          allowTabs: false,
          allowSubmenu: true,
          expanded: true,
        },
        {
          displayName: "Admin-Menu Configurations",
          link: "/QWRtaW4tTWVudSBDb25maWd1cmF0aW9ucw==",
          onlyAdmin: true,
          userGroups: ["Admin"],
          allowExternalLink: false,
          allowDashboard: false,
          allowHome: false,
          allowTabs: false,
          allowSubmenu: false,
          tabs: [],
          internalLink: "Menu/AdminMenuConfigurations",
        },
      ],
      menuContent: [
        {
          menuKey: "12",
          displayName: "Admin",
          link: "/",
          icon: "chess-rook",
          onlyAdmin: true,
          userGroups: ["Admin"],
          allowExternalLink: false,
          allowDashboard: false,
          allowHome: true,
          allowTabs: false,
          allowSubmenu: true,
          expanded: true,
          children: [
            {
              menuKey: "13",
              displayName: "Menu Configurations",
              link: "/QWRtaW4tTWVudSBDb25maWd1cmF0aW9ucw==",
              icon: "",
              internalLink: "Menu/AdminMenuConfigurations",
              onlyAdmin: true,
              userGroups: ["Admin"],
              allowExternalLink: false,
              allowDashboard: false,
              allowHome: false,
              allowTabs: false,
              allowSubmenu: false,
              children: [],
            },
          ],
        },
      ],

      mainMenuLoading: true,
      getContent: this.getContent,

      loadingMenu: false,

      username: "",
      setUsername: this.setUsername,

      //Sider key selection
      siderKey: null,
      setSiderKey: this.setSiderKey,
      openedKeys: null,
      onOpenChange: this.onOpenChange,

      //Tab Pills Selection
      activeItemPills: 1,
      togglePills: this.togglePills,

      allUserGroups: ACCESS_GROUPS,

      navigationType: "Sidebar",
      // Show SOI Domain based Header

      currentPageName: "",
      setCurrentPageName: this.setCurrentPageName,

    
    };
  }

  setRoute = (route) => {
    this.setState({ route });
  };

  //SSO Changes
  setSSOType = (type) => {
    this.setState({ SSOType: type });
  };

  setUsername = (name) => {
    this.setState({ username: name });
  };

  applyUserSettings = () => {
    this.setState({ themeLoading: true });
    themeService.getTheme().then((settings) => {
      if (settings.data.code === 200) {
        let userSettings = JSON.parse(settings.data.response);
        let themeId = userSettings.theme === "Dark" || "" ? 0 : 1;
        console.log("applyUserSettings", settings.data);

        this.setState({
          themeLoading: false,
          currentTheme: themeId,
          theme: { ...themeStyles[themeId] },

          navigationType: "Sidebar",
        });
      } else {
        this.setState({ themeLoading: false });
      }
    });
  };

  setSiderKey = (key) => {
    let { siderKey } = this.state;
    this.setState({ siderKey: key, activeItemPills: 1 });
  };

  onOpenChange = (openKeys) => {
    const latestOpenKey = this.state.openedKeys
      ? openKeys.find((key) => this.state.openedKeys.indexOf(key) === -1)
      : openKeys[0];
    this.setState({ openedKeys: latestOpenKey ? [latestOpenKey] : [] });
  };

  togglePills = (tab) => () => {
    const { activePills } = this.state.activeItemPills;
    if (activePills !== tab) {
      this.setState({ activeItemPills: tab });
    }
  };

  //Get Main Menu Items
  getContent = () => {
    this.setState({ mainMenuLoading: true });
    // menuService
    //   .getContent(this.props.domain)
    axios.get(`/contentmenu.json`, { "Access-Control-Allow-Origin": "*", })
      .then((res) => {
        if (res.data.code === 200) {
          let allContent = JSON.parse(res.data.response);

          let treeData = allContent.menuContent;
          let openedKeys = null;
          let siderKey = null;
          const processAllChildren = (children) => {
            let childrenObjects = [];
            children.forEach((child) =>
              childrenObjects.push(processChild(child))
            );
            return childrenObjects;
          };

          const processChild = (child) => {
            let childObj = [...child.children];
            if (child.allowTabs) {
              // console.log(" menu CHILD with tabs", child);
              childObj.push(
                ...allContent.pageContent.filter(
                  (page) => page.link === child.link
                )[0].tabs
              );
            } else if (childObj.length > 0) {
              childObj = [...processAllChildren(childObj)];
            }
            let newNode = { ...child };
            newNode.children = [...childObj];
            return newNode;
          };
          treeData.forEach((node) => {
            if (node.allowHome === true) {
              openedKeys = [node.menuKey];
              // siderKey = [`${node.menuKey}`];
            }
            // Change to add Tabs on level 1-- start
            if (node.allowTabs) {
              let tabPageLink = allContent.pageContent.filter(
                (page) => page.link === node.link
              );

              if (tabPageLink.length > 0 && tabPageLink[0].tabs) {
                node.children = tabPageLink[0].tabs;
              }
            } else {
              // Change to add Tabs on level 1 -- ends
              node.children.forEach((child) => {
                if (child.allowTabs === true) {
                  child.children.push(
                    ...allContent.pageContent.filter(
                      (page) => page.link === child.link
                    )[0].tabs
                  );
                } else if (child.children.length > 0) {
                  child.children = [...processAllChildren(child.children)];
                }
              });
            }
          });

          // this.updateMenus(allContent.menuContent, allContent.pageContent);
          console.log(
            "MENU ARE:",
            allContent.menuContent,
            allContent.pageContent,
            treeData
          );
          this.setState(
            {
              menuContent: allContent.menuContent,
              pageContent: allContent.pageContent,

              treeData: treeData,
              loadingMenu: false,
              openedKeys,
              siderKey,
              mainMenuLoading: false,
            }
            //Reconsider this call while doing KPI Folder Refactor
            // ()=>{this.getPublishedKPIsForSelectedDomain("")}
          );
        } else {
          console.log("Error in calling Menu:", res.statusText);
          this.setState({ mainMenuLoading: false });
        }
      })
      .catch(
        (error) => console.log(error.message),
        this.setState({ mainMenuLoading: false })
      );
  };

  changeLoginStatus = () => {
    this.props.resetLoggedIn();
  };

  useSnackBar = (obj) => {
    this.snackbarRef.current.show(obj);
  };

  componentDidMount() {
    this.setState({
      domain: this.props.domain,
    });
  }

  componentDidUpdate() {
    try {
      let hasRights = [];

      if (this.props.domain !== this.state.domain && this.props.token) {
        for (const group in ACCESS_GROUPS) {
          ACCESS_GROUPS[group].forEach((grp) => {
            this.props.loginData.memberOf.forEach((access) => {
              if (grp === access) {
                hasRights.push(group);
              }
            });
          });
        }
        hasRights = [...new Set(hasRights)];

        this.setState({
          // SSOType: this.props.SSOType === "SSO" ? "SSO" : "",
          domain: this.props.domain,
          authUser: this.props.loginData.name,
          hasRights: hasRights,

          token: this.props.token,
          userPosition: this.props.loginData.position,
          userPic: this.props.loginData.profilePic,
          userMail: this.props.loginData.mail,
          setAPICallErrors: this.props.setAPICallErrors,
        });
        this.getContent();
        this.applyUserSettings();
      }
    } catch (error) {
      console.log("Catch", error);
    }
  }

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
        <SnackBarProvider ref={this.snackbarRef} />
      </AppContext.Provider>
    );
  }
}
