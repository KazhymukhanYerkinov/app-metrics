import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import SelectSite from "../Navbar/SelectSite";
import Notification from "../Navbar/Notification";
import UserActions from "../Navbar/UserActions";

import "./index.less";

export default function BottomNavigationBar() {
  const history = useHistory();
  const [
    bottomNavListCollapsed,
    setBottomNavListCollapsed,
  ] = useState(false);

  useEffect(() => {
    const hideList = () => {
      setBottomNavListCollapsed(false);
    };

    window.addEventListener("click", hideList);

    return () => {
      window.removeEventListener("click", hideList);
    };
  });

  return (
    <footer className="bottom-navbar">
      <div
        className={`bottom-navbar__burger-btn ${
          bottomNavListCollapsed
            ? "bottom-navbar__burger-btn--active"
            : ""
        }`}
        onClick={(e) => {
          e.nativeEvent.stopImmediatePropagation(e);
          setBottomNavListCollapsed(
            !bottomNavListCollapsed
          );
        }}
      >
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      <SelectSite
        mobile={true}
        className="actions__select-site-btn"
      />
      <Notification
        mobile={true}
        className="actions__notification"
      />
      <UserActions
        mobile={true}
        className="actions__user-actions"
      />

      <ul
        className={`bottom-navbar__list ${
          bottomNavListCollapsed
            ? "bottom-navbar__list--collapsed"
            : ""
        }`}
      >
        <li className="list-item"></li>
      </ul>
    </footer>
  );
}
