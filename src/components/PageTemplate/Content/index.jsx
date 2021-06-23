import React, { useContext } from "react";
import { sidebarCollapsedContext } from "@components/PageTemplate";

import "./index.less";

export default function Content({ className, children }) {
  const { sidebarCollapsed } = useContext(
    sidebarCollapsedContext
  );

  return (
    <main
      className={`content ${
        sidebarCollapsed ? "" : "content--full"
      } ${className}`}
    >
      {children}
    </main>
  );
}
