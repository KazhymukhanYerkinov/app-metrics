import React, { useEffect } from "react";

import axios from "axios";
import Highcharts from "highcharts";

import "./test-chart-page.less";

const TestChart = () => {
  // visitors-chart
  useEffect(() => {
    Highcharts.chart("visitors-chart", {
      chart: {
        borderWidth: 0,
        plotBackgroundColor: "#334169",
        plotBorderWidth: 0,
        type: "pie",
        width: 650,
        height: 400,
        spacingLeft: 10,
      },
      title: {
        text: null,
      },
      tooltip: {
        pointFormat:
          "<strong>{point.percentage:.1f}%</strong>",
      },
      plotOptions: {
        pie: {
          size: 200,
          center: [300, 150],
          allowPointSelect: false,
          cursor: "pointer",
          dataLabels: {
            enabled: false,
          },
        },
      },
      series: [
        {
          name: "Browsers",
          colorByPoint: false,
          data: [
            {
              name: "Chrome",
              y: 100 * 0.62,
              color: "rgba(124, 181, 236, 1)",
            },
            {
              name: "Internet Explorer",
              y: 100 * 0.11,
              color: "rgba(67, 67, 72, 1)",
            },
            {
              name: "Firefox",
              y: 100 * 0.11,
              color: "rgba(144, 237, 125, 1)",
            },
            {
              name: "Edge",
              y: 100 * 0.05,
              color: "rgba(247, 163, 92, 1)",
            },
            {
              name: "Safari",
              y: 100 * 0.05,
              color: "rgba(128, 133, 233, 1)",
            },
            {
              name: "Other",
              y: 100 * 0.06,
              color: "rgba(241, 92, 128, 1)",
            },
          ],
        },
      ],
    });
  }, []);

  //   ad-conversion-chart
  useEffect(() => {
    Highcharts.chart("ad-conversion-chart", {
      chart: {
        zoomType: "x",
        plotBackgroundColor: "#334169",
      },
      title: {
        text: null,
      },
      subtitle: {
        text: null,
      },
      xAxis: {
        type: "datetime",
      },
      yAxis: {
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
          data: [
            [1167609600000, 0.7537],
            [1167696000000, 0.7537],
            [1167782400000, 0.7559],
            [1167868800000, 0.7631],
            [1167955200000, 0.7644],
            [1168214400000, 0.769],
            [1168300800000, 0.7683],
            [1168387200000, 0.77],
            [1168473600000, 0.7703],
            [1168560000000, 0.7757],
            [1168819200000, 0.7728],
            [1168905600000, 0.7721],
            [1168992000000, 0.7748],
            [1169078400000, 0.774],
            [1169164800000, 0.7718],
            [1169424000000, 0.7731],
            [1169510400000, 0.767],
            [1169596800000, 0.769],
            [1169683200000, 0.7706],
            [1169769600000, 0.7752],
            [1170028800000, 0.774],
            [1170115200000, 0.771],
            [1170201600000, 0.7721],
            [1170288000000, 0.7681],
          ],
        },
      ],
    });
  }, []);

  //   traffic-overview-chart
  useEffect(() => {
    Highcharts.chart("traffic-overview-chart", {
      chart: {
        type: "column",
        plotBackgroundColor: "#334169",
      },
      title: {
        text: null,
      },
      subtitle: {
        text: null,
      },
      accessibility: {
        announceNewData: {
          enabled: true,
        },
      },
      xAxis: {
        type: "category",
      },
      yAxis: {
        title: {
          text: "Values",
        },
      },
      legend: {
        enabled: false,
      },
      plotOptions: {
        series: {
          borderWidth: 0,
          dataLabels: {
            enabled: false,
            format: "{point.y:.1f}%",
          },
        },
      },

      tooltip: {
        pointFormat:
          '<strong>{point.y:.2f}%</strong>',
      },

      series: [
        {
          name: null,
          colorByPoint: true,
          data: [
            {
              name: "Apples",
              y: 5.2,
              color: "rgba(124, 181, 236, 1)",
            },
            {
              name: "Oranges",
              y: 3.1,
              color: "rgba(124, 181, 236, 1)",
            },
            {
              name: "Pears",
              y: 4,
              color: "rgba(124, 181, 236, 1)",
            },
            {
              name: "Grapes",
              y: 7.5,
              color: "rgba(124, 181, 236, 1)",
            },
            {
              name: "Bananas",
              y: 2,
              color: "rgba(124, 181, 236, 1)",
            },
          ],
        },
      ],
      drilldown: {
        series: [
          {
            name: "Chrome",
            id: "Chrome",
            data: [
              ["v65.0", 0.1],
              ["v64.0", 1.3],
              ["v63.0", 53.02],
              ["v62.0", 1.4],
              ["v61.0", 0.88],
              ["v60.0", 0.56],
              ["v59.0", 0.45],
              ["v58.0", 0.49],
              ["v57.0", 0.32],
              ["v56.0", 0.29],
              ["v55.0", 0.79],
              ["v54.0", 0.18],
              ["v51.0", 0.13],
              ["v49.0", 2.16],
              ["v48.0", 0.13],
              ["v47.0", 0.11],
              ["v43.0", 0.17],
              ["v29.0", 0.26],
            ],
          },
          {
            name: "Firefox",
            id: "Firefox",
            data: [
              ["v58.0", 1.02],
              ["v57.0", 7.36],
              ["v56.0", 0.35],
              ["v55.0", 0.11],
              ["v54.0", 0.1],
              ["v52.0", 0.95],
              ["v51.0", 0.15],
              ["v50.0", 0.1],
              ["v48.0", 0.31],
              ["v47.0", 0.12],
            ],
          },
          {
            name: "Internet Explorer",
            id: "Internet Explorer",
            data: [
              ["v11.0", 6.2],
              ["v10.0", 0.29],
              ["v9.0", 0.27],
              ["v8.0", 0.47],
            ],
          },
          {
            name: "Safari",
            id: "Safari",
            data: [
              ["v11.0", 3.39],
              ["v10.1", 0.96],
              ["v10.0", 0.36],
              ["v9.1", 0.54],
              ["v9.0", 0.13],
              ["v5.1", 0.2],
            ],
          },
          {
            name: "Edge",
            id: "Edge",
            data: [
              ["v16", 2.6],
              ["v15", 0.92],
              ["v14", 0.4],
              ["v13", 0.1],
            ],
          },
          {
            name: "Opera",
            id: "Opera",
            data: [
              ["v50.0", 0.96],
              ["v49.0", 0.82],
              ["v12.1", 0.14],
            ],
          },
        ],
      },
    });
  }, []);

  return (
    <div className="test-page">
      <h2 className="test-page__page-title">Test Page</h2>

      <section className="test-page__charts">
        <figure id="visitors-chart"></figure>
        <figure id="ad-conversion-chart"></figure>
        <figure id="traffic-overview-chart"></figure>
      </section>
    </div>
  );
};

export default TestChart;
