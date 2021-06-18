import React from "react";

import Navbar from "@components/PageTemplate/Navbar";
import Sidebar from "@components/PageTemplate/Sidebar";
import Content from "@components/PageTemplate/Content";

import "./index.less";

export default function PageTemplate({ children }) {
  return (
    <div className="page-template">
      <Navbar />
      <div className="flex-row">
        <Sidebar />
        <Content>{children}</Content>
      </div>
    </div>
  );
}
