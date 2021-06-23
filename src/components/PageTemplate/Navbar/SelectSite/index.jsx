import React, { useState, useEffect } from "react";

import shortid from "shortid";

import "./index.less";

export default function SelectSite({ className, mobile }) {
  const [
    selecSiteListCollapsed,
    setSelectSiteListCoolapsed,
  ] = useState(false);

  const [activeSiteIdx, setActiveSiteIdx] = useState(0);
  // Test Data
  const siteList = [
    { id: 1, siteName: "devel.kz" },
    { id: 2, siteName: "upskill.kz" },
    { id: 3, siteName: "klik.kz" },
  ];

  useEffect(() => {
    const hideList = () => {
      setSelectSiteListCoolapsed(false);
    };

    window.addEventListener("click", hideList);

    return () => {
      window.removeEventListener("click", hideList);
    };
  });

  return (
    <div
      className={`select-site ${className} ${
        mobile ? "select-site--mobile" : ""
      }`}
    >
      <div
        className="select-site__current-site"
        onClick={(e) => {
          e.nativeEvent.stopImmediatePropagation(e);
          setSelectSiteListCoolapsed(
            !selecSiteListCollapsed
          );
        }}
      >
        devel.kz
      </div>
      <ul
        className={`select-site__site-list ${
          selecSiteListCollapsed
            ? "select-site__site-list--collapsed"
            : ""
        }`}
      >
        {siteList.map((el, idx) => (
          <li
            key={shortid.generate()}
            onClick={() => setActiveSiteIdx(idx)}
            className={`site-list__list-item ${
              siteList[activeSiteIdx] === el
                ? "site-list__list-item--active"
                : ""
            }`}
          >
            {el.siteName}
          </li>
        ))}
      </ul>
    </div>
  );
}
