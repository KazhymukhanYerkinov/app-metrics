import React, { useState } from "react";
import { connect } from "react-redux";

import { Row, Col } from "antd";
import { PageTemplate, Popup } from "@components";

import "./index.less";

export const MainPage = () => {
  return (
    <PageTemplate>
      <Row
        className="ads-cards"
        justify="space-between"
        align="middle"
        gutter={[0, 24]}
      >
        <Col
          className="ads-cards__google-ads-container"
          xs={{ span: 24 }}
          md={{ span: 11 }}
        ></Col>
        <Col
          className="ads-cards__facebook-ads-container"
          xs={{ span: 24 }}
          md={{ span: 11 }}
        ></Col>
      </Row>

      <div className="" style={{ height: "2rem" }}></div>

      <Row
        className="iframes"
        justify="space-between"
        align="middle"
      >
        <Col
          className="iframes__iframe-slider-container"
          span={24}
        ></Col>
      </Row>
    </PageTemplate>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);
