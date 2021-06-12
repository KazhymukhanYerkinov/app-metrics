import React from 'react';
import { Pie } from 'react-chartjs-2';


const PieChart = ({ items, labels, colors, position }) => {

  const [ index, setIndex ] = React.useState(0);

  const handlePage = (id) => {
    setIndex(id);
  }

  let data = {
    labels: labels,
    datasets: [{
      data: items,
      backgroundColor: colors
    }]
  }

  let options = {
    plugins: {
      legend: {
        position: position,
        align: 'middle',
        labels: {
          boxWidth: 15,
          boxHeight: 15,
          color: 'white',
          padding: 12,
        }

      }
    }
  }

  return (
    <div className = 'pie-chart'>
      <div className = 'pie-chart__header'>
        <button className = 'pie-chart__button pie-chart__button--first active' onClick = {() => handlePage(0)}> Visitors </button>
        <button className = 'pie-chart__button' onClick = {() => handlePage(1)}> Ads </button>
        <div className = 'pie-chart__line'></div>
      </div>
      <div className = 'pie-chart__content'>
        {index === 0 && <Pie data = { data } options = { options }/>}
        {index === 1 && <div></div>}
      </div>
       
    </div>
  )
}

export default PieChart;