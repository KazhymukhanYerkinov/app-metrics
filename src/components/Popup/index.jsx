import React from "react";

import "./index.less";

export default function Popup({
  isOpen,
  setIsOpen,
  children,
}) {
  return (
    <div
      className={`popup ${isOpen ? "popup--active" : ""}`}
      onClick={() => setIsOpen(false)}
    >
      <div className="popup__mask"></div>
      <div className="popup__content-wrap">
        <div className="content-wrap__close-btn-wrap">
          <div
            className="close-btn-wrap__close-btn"
            onClick={() => setIsOpen(false)}
          >
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </div>
        <div
          className="content-wrap__content"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
