
import { Pie } from 'react-chartjs-2';


const PieChart = ({ items, labels, colors, position }) => {

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
        <button className = 'pie-chart__button pie-chart__button--first active'> Visitors </button>
        <button className = 'pie-chart__button'> Ads </button>
        <div className = 'pie-chart__line'></div>
      </div>
      <div className = 'pie-chart__content'>
        <Pie data = { data } options = { options }/>
      </div>
       
    </div>
  )
}

export default PieChart;