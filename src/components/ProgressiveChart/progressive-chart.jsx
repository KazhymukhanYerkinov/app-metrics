import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import { Line } from 'react-chartjs-2';
import { data } from 'src/data';

import 'antd/dist/antd.css';

const { RangePicker } = DatePicker;


const LineChart = ({ fill, borderColor }) => {

  const [startTime, setStartTime] = React.useState(0);
  const [endTime, setEndTime] = React.useState(0);

  const getDate = (value, dateString) => {
    let start = new Date(dateString[0]);
    let end = new Date(dateString[1]);

    setStartTime(Number(start.getTime()));
    setEndTime(Number(end.getTime()))
  
  }

  let lineData = {
    datasets: [{
      borderColor: borderColor,
      borderWidth: 1,
      radius: 0,
      data: data,
      fill: fill,
    }]
  }

  let lineOptions = {
    plugins: {
      legend: false
    },
    scales: {
      x: {
        
        min: startTime,
        max: endTime,
        grid: {
          display: false
        },
        type: 'linear',
        ticks: {
          color: 'white',
          callback: function(value, index, values) {
            let date = new Date(value);
            if (index === 0) {
              return;
            }
            return date.getFullYear();
          },
        },
      },
      y: {
        ticks: {
          color: 'white'
        }
      }
    }
  }

  const dateFormat = 'DD.MM.YYYY';
  
  return (
    <div className = 'progressive-chart'>
      <div className = 'progressive-chart__header'>
        <div className = 'progressive-chart__title'> Ad conversion </div>

        <RangePicker
          onChange = { getDate }
          className = 'progressive-chart__date'
          defaultValue={[moment('01.02.2021', dateFormat), moment('01.03.2021', dateFormat)]}
          format={dateFormat}
        />
      </div>

      <Line data = { lineData } options = { lineOptions }/>
    </div>
  )
  
}

export default LineChart;