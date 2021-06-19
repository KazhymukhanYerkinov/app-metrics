import React, { useState } from "react";

import { Button } from "antd";
import { Heatmap, Visitors } from "@pages";
import {
  Popups,
  TestXChart,
  PageTemplate,
} from "@components";

import "./test-x-page.less";

const TestXPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <PageTemplate>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button onClick={() => setIsOpen(true)}>
          Click me!
        </Button>

        <Popups isOpen={isOpen} setIsOpen={setIsOpen}>
          <div className="test-x">
            <div className="test-x__row-box">
              <div className="heatmap-container">
                <Heatmap />
              </div>

              <div className="chart-container">
                {/* <TestXChart /> */}
              </div>
            </div>

            <div className="video-container">
              <Visitors />
            </div>
          </div>
        </Popups>
      </div>
    </PageTemplate>
  );
};

export default TestXPage;
