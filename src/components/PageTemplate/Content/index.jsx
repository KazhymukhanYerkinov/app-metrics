import React from "react";

import "./index.less";

export default function Content({ children }) {
  return (
    <main className="page-template__content">
      {children}
    </main>
  );
}
