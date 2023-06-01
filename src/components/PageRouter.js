import React, { useContext, useEffect, lazy, Suspense } from "react";

import { AppContext } from "../AppProvider";
import Frame from "../pages/configpages/Home/Frame";
import { CONTEXT } from "../config";

import Loader from "../utilities/Loader";

const linkToOpen = (page) => {
  if (page.link === "/") {
    return "/Home/home";
  }

  if (page.allowSubmenu) {
    return "/Home/home";
  } else {
    if (page.internalLink) {
      return `/${page.internalLink}`;
    } else {
      return "/Home/NoLink";
    }
  }
};

const PageRouter = (props) => {
  const {
    location: { pathname },
  } = props;

  const getContext = useContext(AppContext);
  let { token, setAPICallErrors, pageContent, authUser, currentPageName } =
    getContext;

  const selectedRoute = () => {
    let page = getContext.pageContent
      ? getContext.pageContent.filter(
          (path) => CONTEXT + path.link === pathname
        )
      : null;
    getContext.setRoute(page);
  };

  let t0 = performance.now();
  const page = pageContent
    ? pageContent.filter((page) => CONTEXT + page.link === pathname)
    : null;

  useEffect(() => {
    if (currentPageName !== page[0].displayName) {
      selectedRoute();
    }
  }, [currentPageName]);

  if (page[0].allowExternalLink) {
    return <Frame link={page[0].externalLink} />;
  }

  const RenderComponent = lazy(() =>
    import(`../pages/configpages${linkToOpen(page[0])}.js`)
  );

  let t1 = performance.now();
  console.log(
    `${currentPageName} ---Call to ${page[0].displayName} took  ${
      t1 - t0
    } milliseconds.`
  );

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
        token={token}
        setAPICallErrors={setAPICallErrors}
        authUser={authUser}
        pageUrl={pathname}
      />
    </Suspense>
  );
};

export default PageRouter;
