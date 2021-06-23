import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";

import shortid from "shortid";

import { sidebar as sidebarItems } from "@data/sidebar";
import { sidebarCollapsedContext } from "@components/PageTemplate";

import "./index.less";

export default function Sidebar() {
  const { sidebarCollapsed } = useContext(
    sidebarCollapsedContext
  );
  const history = useHistory();

  return sidebarCollapsed ? (
    <aside className="sidebar">
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

      <div className="sidebar__plan-box">
        <ul className="plan-box__list">
          <li className="list-item">
            <h3 className="list-item__title">Credits</h3>
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
    </aside>
  ) : (
    <aside className="sidebar sidebar--collapsed">
      <ul className="sidebar__list">
        {sidebarItems.map((el) => (
          <li
            key={shortid.generate()}
            className="list-item"
            onClick={() => history.push(el.url)}
            title={el.name}
          >
            {el.image}
          </li>
        ))}
      </ul>
    </aside>
  );
}
