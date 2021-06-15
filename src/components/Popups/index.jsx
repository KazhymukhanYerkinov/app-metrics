import React from "react";

import "./index.less";

export default function Popups({
  isOpen,
  setIsOpen,
  children,
}) {
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
      <div className="popups-wrap__popups">
        <div className="popups__close-btn-wrap">
          <div
            className="close-btn"
            onClick={() => setIsOpen(false)}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.30999 7.00044L13.6411 2.66935C14.1196 2.19081 14.1196 1.41498 13.6411 0.93719L13.0637 0.359802C12.585 -0.118887 11.8092 -0.118887 11.3314 0.359802L7.00044 4.69073L2.66935 0.358905C2.19081 -0.119635 1.41498 -0.119635 0.93719 0.358905L0.358905 0.936293C-0.119635 1.41498 -0.119635 2.19081 0.358905 2.66861L4.69073 7.00044L0.359802 11.3314C-0.118887 11.8101 -0.118887 12.5859 0.359802 13.0637L0.93719 13.6411C1.41573 14.1196 2.19156 14.1196 2.66935 13.6411L7.00044 9.30999L11.3314 13.6411C11.8101 14.1196 12.5859 14.1196 13.0637 13.6411L13.6411 13.0637C14.1196 12.585 14.1196 11.8092 13.6411 11.3314L9.30999 7.00044Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
