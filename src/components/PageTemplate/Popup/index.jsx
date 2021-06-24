import React, { useState } from "react";

import "./index.less";

export default function Popup({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`popup ${isOpen ? "popup--active" : ""}`}
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
        <div className="content-wrap__content">
          {children}
        </div>
      </div>
    </div>
  );
}
