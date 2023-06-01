import React, { useContext, lazy, Suspense } from "react";

import { AppContext } from "../AppProvider";
import Frame from "../pages/configpages/Home/Frame";
import NoDashboard from "../pages/configpages/Home/NoDashboard";
import Loader from "../utilities/Loader";

const TabRender = ({ tab, tabKey }) => {
  const authUserId = useContext(AppContext).authUserId;

  let components = tab.internalLink;

  if (tab.allowExternalLink) {
    return (
      <Frame
        link={tab.externalLink}
        name={tab.displayName}
        authUserId={authUserId}
      />
    );
  } else if (!tab.internalLink) {
    return <NoDashboard />;
  }

  const RenderComponent = lazy(() =>
    import(`../pages/configpages/${components}`)
  );

  return (
    <AppContext.Consumer>
      {({ token, setAPICallErrors }) => {
        return (
          <Suspense
            fallback={
              <div
                className={`d-flex flex-wrap align-items-center justify-content-center pt-3 ml-4 mt-5`}
              >
                <Loader />
              </div>
            }
          >
            <RenderComponent
              tabKey={tabKey}
              token={token}
              setAPICallErrors={setAPICallErrors}
            />
          </Suspense>
        );
      }}
    </AppContext.Consumer>
  );
};

export default TabRender;
