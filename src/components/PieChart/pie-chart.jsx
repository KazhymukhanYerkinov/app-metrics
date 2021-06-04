import React from 'react';
import { Pie } from 'react-chartjs-2';


const PieChart = () => {
  const data = {
    labels: ['Chrome', 'Internet Explorer', 'Firefox', 'Edge', 'Safari', 'Other'],
    
    datasets: [{
      label: 'My First Dataset',
      data: [300, 50, 50, 20, 20, 35],
      backgroundColor: [
        '#7CB5EC',
        '#434348',
        '#90ED7D',
        '#F7A35C',
        '#8085E9',
        '#F15C80',

      ],
      hoverOffset: 4
    }]
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'right',
        labels: {
          color: '#ffffff'
        }
      }
    }
  }
  
  return ( 
    <div className = 'chart'>        
      <div className = 'chart__inner'>
        <Pie data = { data } options = {options}></Pie>
      </div>
    </div>
  )
}

export default PieChart;