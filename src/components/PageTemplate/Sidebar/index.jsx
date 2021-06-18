import React from "react";
import { sidebar as sidebarItems } from "@data/sidebar";

import "./index.less";

export default function Sidebar() {
  const [sidebarHeight, setSidebarHeight] =
    React.useState(0);

  function calcSidebarHeight() {
    const { height: navbarHeight } = document
      .querySelector(
        "header[class='page-template__navbar']"
      )
      .getBoundingClientRect();

    const { height: pageTemplateHeight } = document
      .querySelector("div[class='page-template']")
      .getBoundingClientRect();

    setSidebarHeight(pageTemplateHeight - navbarHeight);
  }

  React.useState(() => {
    window.addEventListener("load", calcSidebarHeight);
    window.addEventListener("resize", calcSidebarHeight);
    return () => {
      window.removeEventListener("load", calcSidebarHeight);
      window.removeEventListener(
        "resize",
        calcSidebarHeight
      );
    };
  });

  return (
    <aside
      className="page-template__sidebar"
      style={{ height: sidebarHeight }}
    >
      <div className="sidebar">
        <div className="sidebar__inner">
          <div className="sidebar__items">
            {sidebarItems.map((item, index) => (
              <div key={index} className="sidebar__item">
                <div className="sidebar__item--image">
                  {" "}
                  {item.image}{" "}
                </div>
                <div className="sidebar__item--name">
                  {" "}
                  {item.name}{" "}
                </div>
              </div>
            ))}
          </div>

          <div className="sidebar__pay">
            <div className="sidebar__pay--inner">
              <div className="sidebar__credits">
                <div> Credits </div>
                <div> 993 </div>
              </div>

              <div className="sidebar__plan">
                <div> Plan </div>
                <div> Free </div>
              </div>

              <div className="sidebar__refill">
                <div> Next refill </div>
                <div> 7 days </div>
              </div>

              <button className="sidebar__button">
                {" "}
                Upgrade plan{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
