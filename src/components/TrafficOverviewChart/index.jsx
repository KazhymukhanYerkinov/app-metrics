import React, { useEffect } from "react";
import Highcharts from "highcharts";
import { data } from "src/data/data";

import "./index.less";

export default function TrafficOverviewChart() {
  useEffect(() => {
    Highcharts.chart("traffic-overview-chart", {
      chart: {
        zoomType: "x",
        backgroundColor: "transparent",
      },
      title: {
        text: null,
      },
      subtitle: {
        text: null,
      },
      xAxis: {
        labels: {
          style: {
            color: "#ffffff",
          },
        },
        type: "datetime",
      },
      yAxis: {
        labels: {
          style: {
            color: "#ffffff",
          },
        },
        title: {
          text: null,
        },
      },
      legend: {
        enabled: false,
      },
      plotOptions: {
        area: {
          fillColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1,
            },
            stops: [
              [0, Highcharts.getOptions().colors[0]],
              [
                1,
                Highcharts.color(
                  Highcharts.getOptions().colors[0]
                )
                  .setOpacity(0)
                  .get("rgba"),
              ],
            ],
          },
          marker: {
            radius: 2,
          },
          lineWidth: 1,
          states: {
            hover: {
              lineWidth: 1,
            },
          },
          threshold: null,
        },
      },

      series: [
        {
          type: "area",
          name: "Ad conversion",
          data: data,
        },
      ],
    });
  }, []);
  return (
    <div className="traffic-overview-chart">
      <div className="traffic-overview-chart__title">
        Traffic Overview
      </div>
      <figure className="traffic-overview-chart__body">
        <div id="traffic-overview-chart"></div>
      </figure>
    </div>
  );
}
