import React from 'react';
import Highcharts from 'highcharts';
import { DatePicker } from 'antd';
import moment from 'moment';
import { data } from 'src/data';

import 'antd/dist/antd.css';

const { RangePicker } = DatePicker;

const LineChart = () => {

  React.useEffect(() => {
    Highcharts.chart("ad-conversion-chart", {
      chart: {
        zoomType: "x",
        backgroundColor: 'transparent',
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
            color: '#ffffff'
          }
        },
        type: "datetime",
      },
      yAxis: {
        labels: {
          style: {
            color: '#ffffff'
          }
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

  const dateFormat = 'YYYY/MM/DD';
  
  return (
    <div className = 'progressive-chart'>
      <div className = 'progressive-chart__header'>
        <div className = 'progressive-chart__title'> Ad conversion </div>

        <RangePicker
          className = 'progressive-chart__date'
          defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
          format={dateFormat}
        />
      </div>
      <div className = 'progressive-chart__figure' id = 'ad-conversion-chart'></div>
    </div>
  )
  
}

export default LineChart;