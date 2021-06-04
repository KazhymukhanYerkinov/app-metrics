import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = () => {

  const data = {
    labels: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas'],
    datasets: [{
      label: 'My First Datasets',
      data: [5, 3, 4, 7, 2],
      backgroundColor: ['#7CB5EC']
    }]
  }

  const options = {
    plugins: {
      legend: {
        display: false,
        labels: {
          color: '#ffffff'
        }
      }
    }
  }
  return (
    <div className = 'chart'>
      <div className = 'chart__inner'>
        <Bar data = { data } options = { options }></Bar>
      </div>
    </div>
  )
}

export default BarChart;