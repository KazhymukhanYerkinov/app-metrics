import React, { useState } from "react";

import Heatmap from "./Heatmap";
import Visitors from "./Visitors";
import { Button, Row, Col } from "antd";
import { Popups } from "@components";

import "./test-x-page.less";

const TestXPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button onClick={() => setIsOpen(true)}>
        Click me!
      </Button>

      <Popups isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="test-x">
          <Row justify="space-between" align="center">
            <Col sm={24} md={12} lg={12}>
              <div className="heatmap-container">
                <Heatmap />
              </div>
            </Col>
            <Col sm={24} md={12} lg={12}>
              <div className="chart-container"></div>
            </Col>
          </Row>
          <div className="video-container">
            <Visitors />
          </div>
        </div>
      </Popups>
    </div>
  );
};

export default TestXPage;
