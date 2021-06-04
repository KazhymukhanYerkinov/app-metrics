import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = () => {

  const data1 = [];
  let prev = 100;
  for (let i = 0; i < 1000; i++) {
    prev += 5 - Math.random() * 10;
    data1.push({ x: i, y: prev });
  }

  const data = {
    datasets: [{
      borderColor: '#7CB5EC',
      fill: true,
      background: 'linear-gradient(180deg, #7CB5EC 0%, rgba(124, 181, 236, 0) 100%)',
      borderWidth: 1,
      radius: 0,
      data: data1,
    }]
  }

  



  const options = {
    interaction: {
      intersect: false
    },
    plugins: {
      legend: false
    },
    scales: {
      x: {
        type: 'linear'
      }
    }
  }
  return (
    <div className='chart'>
      <div className='chart__inner'>
        <Line data={data} options={options}></Line>
      </div>
    </div>
  )
}

export default LineChart;