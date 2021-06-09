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
                src="https://blog.adityasui.com/article/5cf78838bdf2a956b9dbcad1"
                width="100%"
                height="100%"
                scrolling="auto"
                frameBorder="0"
              />
            </div>
          </Col>
          <Col sm={24} md={24} lg={4.5} xl={3}>
            <div className="iframes__site-conversion"></div>
          </Col>
          <Col sm={24} md={24} lg={5} xl={6}>
            <div className="iframes__site-conversion"></div>
          </Col>
          <Col sm={24} md={24} lg={4.5} xl={3}></Col>
          <Col sm={24} md={24} lg={5} xl={6}>
            <div className="iframes__site-wrap"></div>
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
