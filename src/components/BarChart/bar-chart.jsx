import { Bar } from 'react-chartjs-2';
import { DatePicker, TimePicker } from 'antd';
import moment from 'moment';

import 'antd/dist/antd.css';
import React from 'react';

const { RangePicker } = DatePicker;

const BarChart = () => {

  const [ picker, setPicker ] = React.useState(true);

  const handlePicker = () => {
    setPicker((prevState) => !prevState);
  }
  
  let data = {
    labels: ['21.01','22.01','23.01','24.01','25.01','26.01','27.01','28.01', '29.01','30.01','31.01','01.01' ],
    datasets: [{
      label: 'John',
      data: [4.75, 6.25, 2.75, 4.25, 8, 8.50, 4.5, 6.25, 4.75, 6.25, 2.75, 4.25],
      backgroundColor: ['#7CB5EC'],
      borderColor: ['#7CB5EC'],
    }]
  }

  let options = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 15,
          boxHeight: 15,
          color: 'white',
          usePointStyle: true,
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: 'white',
        }
      },
      y: {
        ticks: {
          color: 'white',
        }
      },
    }
  }

  let items = [{name: 'Просмотры', count: '21586'},
               {name: 'Клики', count: '3091'},
               {name: 'Пользователей', count: '1796'},
               {name: 'Просмотры страниц', count: '123'},
               {name: 'Сред. пр.', count: '35.9'},
               {name: 'Конверсия из просмотра в клик', count: '549'},
               {name: 'Конверсия из клика в заявку', count: '549'},]

  const dateFormat = 'YYYY/MM/DD';

  return (
    <div className = 'bar-chart'>

      <div className = 'bar-chart__header'>
        <div className = 'bar-chart__title'> Traffic overview </div>

        <div className = 'bar-chart__date'>
          {picker ? <RangePicker
            defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
            format={dateFormat}
          /> :
           <TimePicker.RangePicker />}
          <button className = 'bar-chart__picker' onClick = { handlePicker }> Отображать по | {picker ? 'Часам': 'Дням'} </button>
        </div>
      </div>
      <div className = 'bar-chart__content'>
        <div className = 'bar-chart__figure'>
          <Bar data = { data } options = { options } />
        </div>

        <div className = 'bar-chart__table'>
          { items.map((item, index) => (
            <div className = 'bar-chart__items' key = { index }>
              <div> { item.name } </div>
              <div> { item.count } </div>
            </div>
          )) }
          
        </div>
      </div>
      
      
    </div>
  );
}

export default BarChart;