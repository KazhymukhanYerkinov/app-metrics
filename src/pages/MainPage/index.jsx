import React from "react";

import { Row, Col } from "antd";
import {
  LineChart,
  Funnel,
  PieChart,
  BarChart,
  PageTemplate,
  GoogleAdsCard,
} from "@components";

import { TestIframe } from "@pages";

import "./index.less";

let pie_chart_1_data = [
  61.41, 11.84, 10.85, 4.67, 4.18, 7.05,
];
let pie_chart_1_labels = [
  "Chrome",
  "Internet Explorer",
  "Firefox",
  "Edge",
  "Safari",
  "Other",
];
let pie_chart_1_colors = [
  "#7CB5EC",
  "#434348",
  "#90ED7D",
  "#F7A35C",
  "#8085E9",
  "#F15C80",
];
let pie_chart_1_position = "right";

const Main = () => {
  return (
    <PageTemplate>
      <Row gutter={[0, 24]}>
        {/* Google & Facebook */}
        <Col span={24}>
          <Row justify="space-between" gutter={[0, 20]}>
            <Col sm={24} md={11}>
              <GoogleAdsCard />
            </Col>
            <Col sm={24} md={11}>
              <GoogleAdsCard />
            </Col>
          </Row>
        </Col>
        <div
          className=""
          style={{ width: "100%", height: "0.5rem" }}
        ></div>
        {/* iframes */}
        <Col span={24}>
          <TestIframe />
        </Col>
        <div
          className=""
          style={{ width: "100%", height: "3rem" }}
        ></div>
        {/* Funnel Revence & Ad conversion */}
        <Col span={24}>
          <Row justify="space-between" gutter={[0, 24]}>
            <Col sm={24} md={9}>
              <Funnel />
            </Col>
            <Col sm={24} md={14}>
              <LineChart />
            </Col>
          </Row>
        </Col>
        <div
          className=""
          style={{ width: "100%", height: "0.5rem" }}
        ></div>
        {/* Traffic overview & some chart */}
        <Col span={24}>
          <Row justify="space-between" gutter={[0, 24]}>
            <Col sm={24} md={14}>
              <BarChart />
            </Col>
            <Col sm={24} md={9} style={{ width: "100%" }}>
              <PieChart
                items={pie_chart_1_data}
                labels={pie_chart_1_labels}
                colors={pie_chart_1_colors}
                position={pie_chart_1_position}
              />
            </Col>
          </Row>
        </Col>
        <div
          className=""
          style={{ width: "100%", height: "0.5rem" }}
        ></div>
      </Row>
    </PageTemplate>
  );
};

export default Main;
