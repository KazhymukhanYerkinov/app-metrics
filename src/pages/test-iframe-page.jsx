import React, { useState } from "react";
import { connect } from "react-redux";

// import axios from "axios";

// import { Row, Col } from "antd";

import "./test-iframe-page.less";
import shortid from "shortid";
import { Fragment } from "react";

export const TestIframe = (props) => {
  const [iframeDataIndex, setIframeDataIndex] = useState([
    0, 3,
  ]);
  const [iframeData, ,] = useState([
    {
      siteURL: "http://klikmetrics.ru/",
      numberOfVisits: 12432,
      conversion: 8,
      ctr: 32068,
    },
    {
      siteURL: "http://klikmetrics.ru/",
      numberOfVisits: 9308,
      conversion: 90,
      ctr: 12045,
    },
    {
      siteURL: "http://klikmetrics.ru/",
      numberOfVisits: 7662,
      conversion: 34,
      ctr: 9001,
    },
    {
      siteURL: "http://klikmetrics.ru/",
      numberOfVisits: 1234,
    },
  ]);

  const handleSwichSlider = (direction) => {
    if (direction === "left") {
      let newIframeDataIndex = iframeDataIndex.map(
        (el) => el - 1
      );

      if (newIframeDataIndex[0] >= 0) {
        setIframeDataIndex(newIframeDataIndex);
      }
    } else {
      let newIframeDataIndex = iframeDataIndex.map(
        (el) => el + 1
      );

      if (iframeData.length >= newIframeDataIndex[1]) {
        setIframeDataIndex(newIframeDataIndex);
      }
    }
  };

  return (
    <section className="iframes">
      {iframeData
        .slice(iframeDataIndex[0], iframeDataIndex[1])
        .map((el, idx) => {
          // 有后续
          if (el.ctr && idx !== 2) {
            return (
              <Fragment key={shortid.generate()}>
                <div className="iframes__site-wrap">
                  <div className="site-wrap__site-name">
                    http://klikmetrics.ru/
                  </div>
                  <div className="site-wrap__site-info">
                    <div className="site-info__human-count">
                      <div className="human-count__icon">
                        <svg
                          width="26"
                          height="20"
                          viewBox="0 0 26 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12.8216 9.78136C15.2449 9.78136 17.2096 7.5917 17.2096 4.89071C17.2096 2.18966 16.5645 0 12.8216 0C9.07861 0 8.43359 2.18966 8.43359 4.89071C8.43366 7.5917 10.3983 9.78136 12.8216 9.78136Z"
                            fill="white"
                          />
                          <path
                            d="M21.0974 17.051C21.0162 12.3457 20.3465 11.005 15.2219 10.1562C15.2219 10.1562 14.5004 10.9997 12.8191 10.9997C11.1377 10.9997 10.4164 10.1562 10.4164 10.1562C5.34765 10.9957 4.63712 12.3166 4.54373 16.8981C4.53614 17.2723 4.53264 17.2919 4.53125 17.2484C4.53151 17.3298 4.53191 17.4803 4.53191 17.7428C4.53191 17.7428 5.75199 19.9997 12.8191 19.9997C19.8863 19.9997 21.1065 17.7428 21.1065 17.7428C21.1065 17.5742 21.1066 17.4569 21.1068 17.3772C21.1054 17.404 21.1025 17.3519 21.0974 17.051Z"
                            fill="white"
                          />
                          <path
                            d="M18.9073 8.90812C20.8755 8.90812 22.4711 7.12974 22.4711 4.93602C22.4711 2.74225 21.9472 0.963867 18.9073 0.963867C18.3959 0.963867 17.9559 1.01435 17.5774 1.1086C18.2795 2.29636 18.3758 3.73904 18.3758 4.89063C18.3758 6.19452 17.9906 7.43938 17.2812 8.47011C17.7688 8.74951 18.3213 8.90812 18.9073 8.90812Z"
                            fill="white"
                          />
                          <path
                            d="M25.6337 14.8127C25.5677 10.9911 25.0239 9.90223 20.8617 9.21289C20.8617 9.21289 20.2758 9.89799 18.9102 9.89799C18.8538 9.89799 18.799 9.89641 18.7451 9.89417C19.6128 10.2531 20.4021 10.753 20.9834 11.4844C21.9883 12.7488 22.2193 14.4474 22.267 16.9427C25.0672 16.435 25.6411 15.3746 25.6411 15.3746C25.6411 15.2365 25.6411 15.1417 25.6413 15.0769C25.6402 15.0997 25.6379 15.0588 25.6337 14.8127Z"
                            fill="white"
                          />
                          <path
                            d="M6.7297 8.90806C7.31574 8.90806 7.86809 8.74945 8.35584 8.47011C7.6465 7.43938 7.26132 6.19452 7.26132 4.89063C7.26132 3.73898 7.35755 2.2963 8.05956 1.1086C7.68111 1.01435 7.24117 0.963867 6.7297 0.963867C3.68977 0.963867 3.16602 2.74225 3.16602 4.93602C3.16602 7.12968 4.76158 8.90806 6.7297 8.90806Z"
                            fill="white"
                          />
                          <path
                            d="M6.89608 9.89417C6.84232 9.89641 6.78757 9.89799 6.73097 9.89799C5.36538 9.89799 4.77948 9.21289 4.77948 9.21289C0.617472 9.90223 0.0735101 10.9911 0.00759539 14.8127C0.00330234 15.0589 0.0011228 15.0997 0 15.0768C0.000132094 15.1416 0.000264187 15.2364 0.000264187 15.3746C0.000264187 15.3746 0.574211 16.4349 3.3742 16.9427C3.42209 14.4474 3.65298 12.7488 4.65802 11.4843C5.23923 10.753 6.02843 10.2531 6.89608 9.89417Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                      <div className="human-count__text">
                        Кол-во посещенний:{" "}
                        {el.numberOfVisits}
                      </div>
                    </div>
                    <div className="site-info__human-time">
                      <div className="human-time__icon">
                        <svg
                          width="23"
                          height="20"
                          viewBox="0 0 23 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M15.122 11.7659L12.0133 9.67449V5.41426C12.0133 4.9859 11.6272 4.63965 11.1497 4.63965C10.6721 4.63965 10.2861 4.9859 10.2861 5.41426V10.0618C10.2861 10.3058 10.4139 10.5359 10.6316 10.6815L14.0857 13.0053C14.2412 13.1099 14.4225 13.1602 14.603 13.1602C14.8664 13.1602 15.1254 13.0541 15.2947 12.8496C15.5815 12.508 15.5038 12.0223 15.122 11.7659Z"
                            fill="white"
                          />
                          <path
                            d="M11.1494 0C5.00177 0 0.000976562 4.48566 0.000976562 10C0.000976562 15.5143 5.00177 20 11.1494 20C17.297 20 22.2977 15.5143 22.2977 10C22.2977 4.48566 17.297 0 11.1494 0ZM11.1494 18.4508C5.95513 18.4508 1.72806 14.6592 1.72806 10C1.72806 5.34082 5.95513 1.54918 11.1494 1.54918C16.3445 1.54918 20.5707 5.34082 20.5707 10C20.5707 14.6592 16.3436 18.4508 11.1494 18.4508Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                      <div className="human-time__text">
                        Ср.время посещения
                      </div>
                    </div>
                  </div>
                  <div
                    className="site-wrap__site-view-statistic-btn"
                    onClick={() => {
                      alert("hi");
                    }}
                  >
                    <div className="site-view-statistic-btn__icon">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.00018 7.85547H0.715507C0.322187 7.85547 0.00418425 8.17354 0 8.57112V19.285C0 19.6826 0.322187 20.0007 0.715507 20.0007H5.00018C5.39768 20.0007 5.71568 19.6784 5.71568 19.285V8.57112C5.71568 8.17354 5.3935 7.85547 5.00018 7.85547Z"
                          fill="white"
                        />
                        <path
                          d="M12.1437 0H7.85906C7.46574 0 7.14355 0.318068 7.14355 0.711469V19.285C7.14355 19.6826 7.46574 20.0006 7.85906 20.0006H12.1437C12.5412 20.0006 12.8592 19.6784 12.8592 19.285V0.715654C12.8592 0.318068 12.5371 0 12.1437 0Z"
                          fill="white"
                        />
                        <path
                          d="M19.2844 5.71289H14.9997C14.6022 5.71289 14.2842 6.03096 14.2842 6.42854V19.2852C14.2842 19.6828 14.6064 20.0009 14.9997 20.0009H19.2844C19.6819 20.0009 19.9999 19.6786 19.9999 19.2852V6.42854C19.9999 6.03096 19.6777 5.71289 19.2844 5.71289Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <div className="site-view-statistic-btn__text">
                      Посмотреть статистику
                    </div>
                  </div>
                  <iframe
                    title="uuid-0"
                    style={{
                      // height: this.state.iFrameHeight,
                      overflow: "auto",
                    }}
                    // onLoad={() => {
                    // const obj = ReactDOM.findDOMNode(this);
                    // this.setState({
                    // "iFrameHeight":
                    // obj.contentWindow.document.body
                    // .scrollHeight + "px",
                    // });
                    // }}
                    // ref="iframe"
                    src={el.siteURL}
                    width="100%"
                    height="100%"
                    scrolling="auto"
                    frameBorder="0"
                  />
                </div>
                <div className="iframes__site-conversion">
                  <div className="site-conversion__icon">
                    <svg
                      width="172"
                      height="25"
                      viewBox="0 0 172 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 18.027C134.6 -27.7042 95 41.3898 170 18.0269"
                        stroke="url(#paint0_linear)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeDasharray="9 9"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear"
                          x1="10.4"
                          y1="2.12065"
                          x2="168.245"
                          y2="32.2039"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#71DDFF" />
                          <stop
                            offset="0.5"
                            stopColor="#489CFF"
                          />
                          <stop
                            offset="0.9999"
                            stopColor="#B67DFF"
                          />
                          <stop
                            offset="1"
                            stopColor="#B67DFF"
                          />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <p className="site-conversion__text">
                    <span>{el.conversion}% conversion</span>
                    <span>CTR</span>
                    <span>{el.ctr}</span>
                  </p>
                </div>
              </Fragment>
            );
          } else {
            return (
              <div
                className="iframes__site-wrap"
                key={shortid.generate()}
              >
                <div className="site-wrap__site-name">
                  http://klikmetrics.ru/
                </div>
                <div className="site-wrap__site-info">
                  <div className="site-info__human-count">
                    <div className="human-count__icon">
                      <svg
                        width="26"
                        height="20"
                        viewBox="0 0 26 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.8216 9.78136C15.2449 9.78136 17.2096 7.5917 17.2096 4.89071C17.2096 2.18966 16.5645 0 12.8216 0C9.07861 0 8.43359 2.18966 8.43359 4.89071C8.43366 7.5917 10.3983 9.78136 12.8216 9.78136Z"
                          fill="white"
                        />
                        <path
                          d="M21.0974 17.051C21.0162 12.3457 20.3465 11.005 15.2219 10.1562C15.2219 10.1562 14.5004 10.9997 12.8191 10.9997C11.1377 10.9997 10.4164 10.1562 10.4164 10.1562C5.34765 10.9957 4.63712 12.3166 4.54373 16.8981C4.53614 17.2723 4.53264 17.2919 4.53125 17.2484C4.53151 17.3298 4.53191 17.4803 4.53191 17.7428C4.53191 17.7428 5.75199 19.9997 12.8191 19.9997C19.8863 19.9997 21.1065 17.7428 21.1065 17.7428C21.1065 17.5742 21.1066 17.4569 21.1068 17.3772C21.1054 17.404 21.1025 17.3519 21.0974 17.051Z"
                          fill="white"
                        />
                        <path
                          d="M18.9073 8.90812C20.8755 8.90812 22.4711 7.12974 22.4711 4.93602C22.4711 2.74225 21.9472 0.963867 18.9073 0.963867C18.3959 0.963867 17.9559 1.01435 17.5774 1.1086C18.2795 2.29636 18.3758 3.73904 18.3758 4.89063C18.3758 6.19452 17.9906 7.43938 17.2812 8.47011C17.7688 8.74951 18.3213 8.90812 18.9073 8.90812Z"
                          fill="white"
                        />
                        <path
                          d="M25.6337 14.8127C25.5677 10.9911 25.0239 9.90223 20.8617 9.21289C20.8617 9.21289 20.2758 9.89799 18.9102 9.89799C18.8538 9.89799 18.799 9.89641 18.7451 9.89417C19.6128 10.2531 20.4021 10.753 20.9834 11.4844C21.9883 12.7488 22.2193 14.4474 22.267 16.9427C25.0672 16.435 25.6411 15.3746 25.6411 15.3746C25.6411 15.2365 25.6411 15.1417 25.6413 15.0769C25.6402 15.0997 25.6379 15.0588 25.6337 14.8127Z"
                          fill="white"
                        />
                        <path
                          d="M6.7297 8.90806C7.31574 8.90806 7.86809 8.74945 8.35584 8.47011C7.6465 7.43938 7.26132 6.19452 7.26132 4.89063C7.26132 3.73898 7.35755 2.2963 8.05956 1.1086C7.68111 1.01435 7.24117 0.963867 6.7297 0.963867C3.68977 0.963867 3.16602 2.74225 3.16602 4.93602C3.16602 7.12968 4.76158 8.90806 6.7297 8.90806Z"
                          fill="white"
                        />
                        <path
                          d="M6.89608 9.89417C6.84232 9.89641 6.78757 9.89799 6.73097 9.89799C5.36538 9.89799 4.77948 9.21289 4.77948 9.21289C0.617472 9.90223 0.0735101 10.9911 0.00759539 14.8127C0.00330234 15.0589 0.0011228 15.0997 0 15.0768C0.000132094 15.1416 0.000264187 15.2364 0.000264187 15.3746C0.000264187 15.3746 0.574211 16.4349 3.3742 16.9427C3.42209 14.4474 3.65298 12.7488 4.65802 11.4843C5.23923 10.753 6.02843 10.2531 6.89608 9.89417Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <div className="human-count__text">
                      Кол-во посещенний: {el.numberOfVisits}
                    </div>
                  </div>
                  <div className="site-info__human-time">
                    <div className="human-time__icon">
                      <svg
                        width="23"
                        height="20"
                        viewBox="0 0 23 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.122 11.7659L12.0133 9.67449V5.41426C12.0133 4.9859 11.6272 4.63965 11.1497 4.63965C10.6721 4.63965 10.2861 4.9859 10.2861 5.41426V10.0618C10.2861 10.3058 10.4139 10.5359 10.6316 10.6815L14.0857 13.0053C14.2412 13.1099 14.4225 13.1602 14.603 13.1602C14.8664 13.1602 15.1254 13.0541 15.2947 12.8496C15.5815 12.508 15.5038 12.0223 15.122 11.7659Z"
                          fill="white"
                        />
                        <path
                          d="M11.1494 0C5.00177 0 0.000976562 4.48566 0.000976562 10C0.000976562 15.5143 5.00177 20 11.1494 20C17.297 20 22.2977 15.5143 22.2977 10C22.2977 4.48566 17.297 0 11.1494 0ZM11.1494 18.4508C5.95513 18.4508 1.72806 14.6592 1.72806 10C1.72806 5.34082 5.95513 1.54918 11.1494 1.54918C16.3445 1.54918 20.5707 5.34082 20.5707 10C20.5707 14.6592 16.3436 18.4508 11.1494 18.4508Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <div className="human-time__text">
                      Ср.время посещения
                    </div>
                  </div>
                </div>
                <div
                  className="site-wrap__site-view-statistic-btn"
                  onClick={() => {
                    alert("hi");
                  }}
                >
                  <div className="site-view-statistic-btn__icon">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.00018 7.85547H0.715507C0.322187 7.85547 0.00418425 8.17354 0 8.57112V19.285C0 19.6826 0.322187 20.0007 0.715507 20.0007H5.00018C5.39768 20.0007 5.71568 19.6784 5.71568 19.285V8.57112C5.71568 8.17354 5.3935 7.85547 5.00018 7.85547Z"
                        fill="white"
                      />
                      <path
                        d="M12.1437 0H7.85906C7.46574 0 7.14355 0.318068 7.14355 0.711469V19.285C7.14355 19.6826 7.46574 20.0006 7.85906 20.0006H12.1437C12.5412 20.0006 12.8592 19.6784 12.8592 19.285V0.715654C12.8592 0.318068 12.5371 0 12.1437 0Z"
                        fill="white"
                      />
                      <path
                        d="M19.2844 5.71289H14.9997C14.6022 5.71289 14.2842 6.03096 14.2842 6.42854V19.2852C14.2842 19.6828 14.6064 20.0009 14.9997 20.0009H19.2844C19.6819 20.0009 19.9999 19.6786 19.9999 19.2852V6.42854C19.9999 6.03096 19.6777 5.71289 19.2844 5.71289Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  <div className="site-view-statistic-btn__text">
                    Посмотреть статистику
                  </div>
                </div>
                <iframe
                  title="uuid-0"
                  style={{
                    // height: this.state.iFrameHeight,
                    overflow: "auto",
                  }}
                  // onLoad={() => {
                  // const obj = ReactDOM.findDOMNode(this);
                  // this.setState({
                  // "iFrameHeight":
                  // obj.contentWindow.document.body
                  // .scrollHeight + "px",
                  // });
                  // }}
                  // ref="iframe"
                  src={el.siteURL}
                  width="100%"
                  height="100%"
                  scrolling="auto"
                  frameBorder="0"
                />
              </div>
            );
          }
        })}
      <div className="switch-slider-btn-wrap">
        <div
          className="left-btn"
          // disabled={(newIframeDataIndex[0] >= 0)}
          onClick={() => handleSwichSlider("left")}
        >
          <svg
            width="10"
            height="18"
            viewBox="0 0 10 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.16421 17.7123L9.72264 17.1227C9.89704 16.9371 9.99312 16.6902 9.99312 16.4264C9.99312 16.1627 9.89704 15.9155 9.72264 15.7299L3.39615 9.00402L9.72966 2.27036C9.90406 2.08509 10 1.83792 10 1.57421C10 1.3105 9.90406 1.06318 9.72966 0.877763L9.17467 0.288002C8.81376 -0.0960008 8.22588 -0.0960008 7.86497 0.288002L0.29704 8.30524C0.12278 8.49051 -8.49482e-07 8.73739 -8.46309e-07 9.00344L-8.46273e-07 9.00651C-8.43126e-07 9.27037 0.122918 9.51725 0.29704 9.70252L7.84446 17.7123C8.01872 17.8979 8.25795 17.9997 8.50599 18C8.75416 18 8.99009 17.8979 9.16421 17.7123Z"
              fill="white"
            />
          </svg>
        </div>
        <div className="split-line">
          <svg
            width="2"
            height="26"
            viewBox="0 0 2 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L1 25"
              stroke="#8AC2FF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div
          className="right-btn"
          onClick={() => handleSwichSlider("right")}
        >
          <svg
            width="10"
            height="18"
            viewBox="0 0 10 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.835787 0.28771L0.277357 0.877325C0.102959 1.06289 0.00688174 1.30977 0.00688175 1.57362C0.00688176 1.83733 0.102959 2.08451 0.277357 2.27007L6.60385 8.99598L0.270337 15.7296C0.0959395 15.9149 -8.03379e-08 16.1621 -6.88108e-08 16.4258C-5.72837e-08 16.6895 0.0959395 16.9368 0.270337 17.1222L0.825327 17.712C1.18624 18.096 1.77412 18.096 2.13503 17.712L9.70296 9.69476C9.87722 9.50949 10 9.26261 10 8.99656L10 8.99349C10 8.72963 9.87708 8.48275 9.70296 8.29748L2.15554 0.28771C1.98128 0.102148 1.74205 0.000293656 1.49401 -6.53054e-08C1.24584 -5.44572e-08 1.00991 0.102148 0.835787 0.28771Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestIframe);
