import React, {
  useState,
  useEffect,
  Fragment,
} from "react";

import shortid from "shortid";

import { notificationICON } from "@assets/icons";

import "./index.less";

export default function Notification({ className }) {
  const [
    notificationListCollapsed,
    setNotificationListCoolapsed,
  ] = useState(false);

  const notificationList = [
    {
      id: 1,
      title: "Notification Title",
      detail: "Notification detail".repeat(10),
    },
    {
      id: 2,
      title: "Notification Title",
      detail: "Notification detail".repeat(10),
    },
    {
      id: 3,
      title: "Notification Title",
      detail: "Notification detail".repeat(10),
    },
  ];

  useEffect(() => {
    const hideList = () => {
      setNotificationListCoolapsed(false);
    };

    window.addEventListener("click", hideList);

    return () => {
      window.removeEventListener("click", hideList);
    };
  });

  return (
    <div className={`notification ${className}`}>
      <img
        src={notificationICON}
        alt="notification"
        onClick={(e) => {
          e.nativeEvent.stopImmediatePropagation(e);
          setNotificationListCoolapsed(
            !notificationListCollapsed
          );
        }}
      />
      <ul
        className={`notification__notification-list ${
          notificationListCollapsed
            ? "notification__notification-list--collapsed"
            : ""
        }`}
      >
        {notificationList.map((el) => (
          <Fragment key={shortid.generate()}>
            <li className="notification-list__list-item">
              <h3 className="list-item__title">
                {el.title}
              </h3>
              <p className="list-item__detail">
                {el.detail}
              </p>
            </li>
            <div className="list-item__split-line"></div>
          </Fragment>
        ))}
      </ul>
    </div>
  );
}
