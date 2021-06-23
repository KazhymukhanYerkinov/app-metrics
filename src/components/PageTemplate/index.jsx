import React, {
  useState,
  useEffect,
  createContext,
} from "react";
import { connect } from "react-redux";

import Navbar from "@components/PageTemplate/Navbar";
import Sidebar from "@components/PageTemplate/Sidebar";
import BottomNavigationBar from "@components/PageTemplate/BottomNavigationBar";
import Content from "@components/PageTemplate/Content";

import "./index.less";

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
            <Content className="content--mobile" viewMode={viewMode}>
              {children}
            </Content>
            <BottomNavigationBar viewMode={viewMode} />
          </>
        )}
      </sidebarCollapsedContext.Provider>
    </div>
  );
}

export default connect((state) => state, {})(PageTemplate);
