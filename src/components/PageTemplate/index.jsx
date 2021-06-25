import React, {
  useState,
  useEffect,
  createContext,
  lazy,
  Suspense,
} from "react";
import { connect } from "react-redux";

import "./index.less";

const Navbar = lazy(() =>
  import("@components/PageTemplate/Navbar")
);
const Sidebar = lazy(() =>
  import("@components/PageTemplate/Sidebar")
);
const BottomNavigationBar = lazy(() =>
  import("@components/PageTemplate/BottomNavigationBar")
);
const Content = lazy(() =>
  import("@components/PageTemplate/Content")
);

export const sidebarCollapsedContext = createContext();

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const updateSize = () =>
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

    window.addEventListener("resize", updateSize);
    return () =>
      window.removeEventListener("resize", updateSize);
  }, []);

  return windowSize;
}

function PageTemplate({ app: { viewMode }, children }) {
  const { width: windowWidth } = useWindowSize();
  const [sidebarCollapsed, setSidebarCollapsed] =
    useState(true);

  return (
    <div className="page-template">
      <sidebarCollapsedContext.Provider
        value={{ sidebarCollapsed, setSidebarCollapsed }}
      >
        <Suspense fallback={<></>}>
          {windowWidth >= 969 ? (
            <>
              <Navbar
                viewMode={viewMode}
                // changeViewMode={changeViewMode}
              />

              <Sidebar viewMode={viewMode} />
              <Content viewMode={viewMode}>
                {children}
              </Content>
            </>
          ) : (
            <>
              <Content
                className="content--mobile"
                viewMode={viewMode}
              >
                {children}
              </Content>
              <BottomNavigationBar viewMode={viewMode} />
            </>
          )}
        </Suspense>
      </sidebarCollapsedContext.Provider>
    </div>
  );
}

export default connect((state) => state, {})(PageTemplate);
