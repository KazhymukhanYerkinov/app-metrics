import React, { useState } from "react";

import { TrafficOverviewChart } from "@components";

import "./index.less";

const TestXChart = () => {
  const tabs = [<div />, <TrafficOverviewChart />, <div />];
  const [activeTab, setActiveTab] = useState(1);

  React.useEffect(() => {}, []);

  return (
    <div className="text-x-chart">
      <div className="text-x-chart__tabs">
        <div
          className={`tabs__item ${
            activeTab === 0 ? "tabs__item--active" : ""
          }`}
          onClick={() => setActiveTab(0)}
        >
          <span>Page Conversion</span>
        </div>
        <div
          className={`tabs__item ${
            activeTab === 1 ? "tabs__item--active" : ""
          }`}
          onClick={() => setActiveTab(1)}
        >
          <span>Traffic Overview</span>
          <span>(кол-во посещений)</span>
        </div>
        <div
          className={`tabs__item ${
            activeTab === 2 ? "tabs__item--active" : ""
          }`}
          onClick={() => setActiveTab(2)}
        >
          <span>Traffic Sources</span>
          <span>(источники посещений)</span>
        </div>
      </div>
      <div className="text-x-chart__body">
        {tabs[activeTab]}
      </div>
    </div>
  );
};

export default TestXChart;
