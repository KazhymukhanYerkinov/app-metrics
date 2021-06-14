import React from "react";

import "./index.less";

export default function Popups({ isOpen, setIsOpen }) {
  return (
    <div
      className={`popups-wrap ${
        isOpen ? "popups-wrap--active" : ""
      }`}
    >
      <div
        className="popups-wrap__mask"
        onClick={() => {
          setIsOpen(false);
        }}
      ></div>
      <div className="popups-wrap__popups"></div>
    </div>
  );
}
