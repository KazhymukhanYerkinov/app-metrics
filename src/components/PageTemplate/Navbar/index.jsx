import React from "react";
import { useHistory } from "react-router-dom";

import SelectSite from "./SelectSite";
import Notification from "./Notification";
import UserActions from "./UserActions";
import { logoICON } from "@assets/icons";

import "./index.less";

export default function TopNavbar({ viewMode }) {
  const history = useHistory();

  return (
    <header className="top-navbar">
      <div
        className="top-navbar__logo"
        onClick={() => history.push("/")}
      >
        <img src={logoICON} alt="site-logo" />
      </div>

      <div className="top-navbar__actions">
        <div
          className={`actions__switch-mode-btn actions__switch-mode-btn--${viewMode}`}
        >
          <div className="switch-mode-btn__ball"></div>
        </div>
        <SelectSite className="actions__select-site-btn" />
        <Notification className="actions__notification" />
        <UserActions className="actions__user-actions" />
      </div>
    </header>
  );
}
