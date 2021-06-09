import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import axios from "axios";

import { Row, Col } from "antd";

import "./test-iframe-page.less";

export const TestIframe = (props) => {
  return (
    <div className="test-iframe-page">
      <h2 className="test-iframe-page__page-title">
        Test iframe Page
      </h2>

      <section className="test-iframe-page__iframes">
        <Row>
          <Col sm={24} md={24} lg={5} xl={6}>
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
                    Кол-во посещенний: 12 432
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
                src="http://klikmetrics.ru/"
                width="100%"
                height="100%"
                scrolling="auto"
                frameBorder="0"
              />
            </div>
          </Col>
          <Col sm={24} md={24} lg={4.5} xl={3}>
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
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-dasharray="9 9"
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
                      <stop stop-color="#71DDFF" />
                      <stop
                        offset="0.5"
                        stop-color="#489CFF"
                      />
                      <stop
                        offset="0.9999"
                        stop-color="#B67DFF"
                      />
                      <stop
                        offset="1"
                        stop-color="#B67DFF"
                      />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <p className="site-conversion__text">
                <span>8% conversion</span>
                <span>CTR</span>
                <span>32 068</span>
              </p>
            </div>
          </Col>
          <Col sm={24} md={24} lg={5} xl={6}>
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
                    Кол-во посещенний: 12 432
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
                title="uuid-1"
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
                src="http://klikmetrics.ru/"
                width="100%"
                height="100%"
                scrolling="auto"
                frameBorder="0"
              />
            </div>
          </Col>
          <Col sm={24} md={24} lg={4.5} xl={3}>
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
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-dasharray="9 9"
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
                      <stop stop-color="#71DDFF" />
                      <stop
                        offset="0.5"
                        stop-color="#489CFF"
                      />
                      <stop
                        offset="0.9999"
                        stop-color="#B67DFF"
                      />
                      <stop
                        offset="1"
                        stop-color="#B67DFF"
                      />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <p className="site-conversion__text">
                <span>90% conversion</span>
                <span>CTR</span>
                <span>12 045</span>
              </p>
            </div>
          </Col>
          <Col sm={24} md={24} lg={5} xl={6}>
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
                    Кол-во посещенний: 12 432
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
                title="uuid-2"
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
                src="http://klikmetrics.ru/"
                width="100%"
                height="100%"
                scrolling="auto"
                frameBorder="0"
              />
            </div>
          </Col>
        </Row>
      </section>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestIframe);
