import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";

import shortid from "shortid";

import { sidebar as sidebarItems } from "@data/sidebar";
import SelectSite from "../Navbar/SelectSite";
import Notification from "../Navbar/Notification";
import UserActions from "../Navbar/UserActions";

import "./index.less";

export default function BottomNavigationBar({ viewMode }) {
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
        <li className="list-item">
          <div
            className={`actions__switch-mode-btn actions__switch-mode-btn--${viewMode}`}
          >
            <div className="switch-mode-btn__ball"></div>
          </div>
        </li>

        <li className="list-item">
          <ul className="sidebar__list">
            {sidebarItems.map((el) => (
              <li
                key={shortid.generate()}
                className="list-item"
                onClick={() => history.push(el.url)}
              >
                {el.image}
                <NavLink
                  className="list-item__text"
                  to={el.url}
                >
                  {el.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </li>

        <div className="list-item">
          <div className="sidebar__plan-box">
            <ul className="plan-box__list">
              <li className="list-item">
                <h3 className="list-item__title">
                  Credits
                </h3>
                <p className="list-item__text">993</p>
              </li>
              <li className="list-item">
                <h3 className="list-item__title">Plan</h3>
                <p className="list-item__text">Free</p>
              </li>
              <li className="list-item">
                <h3 className="list-item__title">Next</h3>
                <p className="list-item__text">7 days</p>
              </li>
            </ul>
            <div className="plan-box__upgrade-btn">
              Upgrade plan
            </div>
          </div>
        </div>
      </ul>
    </footer>
  );
}
