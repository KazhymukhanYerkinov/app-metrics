import React from "react";
import {
  Header,
  Sidebar,
  LineChart,
  Funnel,
  PieChart,
  BarChart,
  FunnelChart,
  Youtube,
  IframeVideo,
} from "@components";

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

let pie_chart_2_data = [10, 10, 80];
let pie_chart_2_labels = ["ПК", "Планшет", "Мобильный"];
let pie_chart_2_colors = ["#7486E7", "#F4F7F9", "#1B7FF5"];
let pie_chart_2_position = "bottom";

const Main = () => {

  // 重写页面
  return (
    <div className="main">
      <Header />

      <div className="main__inner">
        <Sidebar />

        <div className="main__content">
          {/* <div className = 'main__block'>
            <LineChart fill = {false} borderColor = '#F08C2F' />
          </div>

          <div className = 'main__block'>
            <Funnel />
          </div>

          <div className = 'main__block'>
            <PieChart
              items = { pie_chart_1_data } 
              labels = { pie_chart_1_labels }
              colors = { pie_chart_1_colors }
              position = { pie_chart_1_position }
            />
          </div>

          <div className = 'main__block'>
            <BarChart />
          </div>

          <div className = 'main__block'>
            <PieChart
              items = { pie_chart_2_data } 
              labels = { pie_chart_2_labels }
              colors = { pie_chart_2_colors }
              position = { pie_chart_2_position }
            />
          </div>

          <div className = 'main__block'>
            <LineChart 
              fill = {true}
              borderColor = '#7CB5EC'
            />
          </div>

          <div className = 'main__block'>
            <FunnelChart />
          </div>

          <div className = 'main__block'>
            <Youtube />
          </div>

          <div className = 'main__block'>
            <IframeVideo />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Main;
