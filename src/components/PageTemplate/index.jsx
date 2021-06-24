import React, {
  useState,
  useEffect,
  createContext,
  lazy,
  Suspense,
} from "react";
import { connect } from "react-redux";

// import Navbar from "@components/PageTemplate/Navbar";
import Sidebar from "@components/PageTemplate/Sidebar";
import BottomNavigationBar from "@components/PageTemplate/BottomNavigationBar";
import Content from "@components/PageTemplate/Content";
import Popup from "@components/PageTemplate/Popup";

import "./index.less";
const Navbar = lazy(() =>
  import("@components/PageTemplate/Navbar")
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
        {windowWidth >= 969 ? (
          <>
            <Suspense fallback={<></>}>
              <Navbar
                viewMode={viewMode}
                // changeViewMode={changeViewMode}
              />
            </Suspense>
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
        <Popup />
      </sidebarCollapsedContext.Provider>
    </div>
  );
}

export default connect((state) => state, {})(PageTemplate);
