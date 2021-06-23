import React, { useState, useEffect } from "react";

import { userICON, downArrowICON } from "@assets/icons";

import "./index.less";

export default function UserActions({ className, mobile }) {
  //   Fake data
  const userInfo = {
    firstName: "Нурлан",
    lastName: "Асланбек",
  };

  const [
    userActionListCollapsed,
    setUserActionListCollapsed,
  ] = useState(false);

  useEffect(() => {
    const hideList = () => {
      setUserActionListCollapsed(false);
    };

    window.addEventListener("click", hideList);

    return () => {
      window.removeEventListener("click", hideList);
    };
  });

  return (
    <div
      className={`user-actions ${className} ${
        mobile ? "user-actions--mobile" : ""
      }`}
    >
      <div
        className="user-actions__user-icon"
        onClick={(e) => {
          e.nativeEvent.stopImmediatePropagation(e);
          setUserActionListCollapsed(
            !userActionListCollapsed
          );
        }}
      >
        <img src={userICON} alt="user-icon" />
      </div>
      {mobile ? null : (
        <>
          <p
            className="user-actions__username"
            onClick={(e) => {
              e.nativeEvent.stopImmediatePropagation(e);
              setUserActionListCollapsed(
                !userActionListCollapsed
              );
            }}
          >
            {`${userInfo.firstName} ${userInfo.lastName[0]}.`}
          </p>
          <img
            src={downArrowICON}
            alt="down-arrow"
            style={{
              transform: userActionListCollapsed
                ? "rotate(180deg)"
                : "",
            }}
            onClick={(e) => {
              e.nativeEvent.stopImmediatePropagation(e);
              setUserActionListCollapsed(
                !userActionListCollapsed
              );
            }}
          />
        </>
      )}
      <ul
        className={`user-actions__list ${
          userActionListCollapsed
            ? "user-actions__list--collapsed"
            : ""
        }`}
      >
        <li className="list-item">Профиль</li>
        <li className="list-item">Выход</li>
      </ul>
    </div>
  );
}
