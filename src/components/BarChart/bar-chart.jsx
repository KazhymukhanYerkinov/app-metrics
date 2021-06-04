import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = () => {

  const data = {
    labels: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas'],
    datasets: [
    {
      label: 'John',
      data: [5, 3, 4, 7, 2],
      backgroundColor: ['#7CB5EC']
    }]
  }

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          usePointStyle: true,
          color: '#ffffff'
        }
      }
    },
    scales: {
      x: {
        borderWidth: 0,
        ticks: {
          
          color: "#ffffff", // this here
        },
      },
      y: {
        ticks: {
          color: "#ffffff",
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