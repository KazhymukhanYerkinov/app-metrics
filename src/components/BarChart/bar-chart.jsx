import React from 'react';
import Highcharts from 'highcharts';
import { DatePicker } from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css';

const { RangePicker } = DatePicker;


const BarChart = () => {

  React.useEffect(() => {
    Highcharts.chart('bar-chart', {

      chart: {
        type: 'column',
        backgroundColor: 'transparent',
      },
    
      title: {
        text: null
      },
    
      subtitle: {
        text: null
      },
    
      legend: {
        align: 'center',
        itemStyle: {
          color: '#ffffff'
        }

      },
    
      xAxis: {
        categories: ['Apples', 'Oranges', 'Pears', 'Graps', 'Banans'],
        labels: {
          x: -10,
          style: {
            color: '#ffffff'
          }
        }
      },
    
      yAxis: {
        allowDecimals: false,
        title: {
          text: 'Values',
          style: {
            color: '#ffffff'
          }
        },
        labels: {
          style: {
            color: '#ffffff',
          }
        }
      },
    
      series: [{
        name: 'Christmas Eve',
        data: [1, 4, 3, 7, 2]
      }],

      credits: {
        enabled: false
      },
    
      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              align: 'center',
              verticalAlign: 'bottom',
              layout: 'horizontal'
            },
            yAxis: {
              labels: {
                align: 'left',
                x: 0,
                y: -5
              },
              title: {
                text: null
              }
            },
            subtitle: {
              text: null
            },
          }
        }]
      }
    });
  }, []);

  const dateFormat = 'YYYY/MM/DD';

  return (
    <div className = 'bar-chart'>
      <div className = 'bar-chart__header'>
        <div className = 'bar-chart__title'> Traffic overview </div>

        <div className = 'bar-chart__pickers'>
          <RangePicker
            className = 'progressive-chart__date'
            defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
            format={dateFormat}
          />
          <button className = 'bar-chart__time'> Отображать по | Часам </button>
        </div>
      </div>

      <div className = 'bar-chart__figure' id = 'bar-chart'></div>
    </div>
  )
}

export default BarChart;