import React from 'react';
import Highcharts from "highcharts";
import Funnel from 'highcharts/modules/funnel';
Funnel(Highcharts)

const FunnelChart = () => {
  React.useEffect(() => {
    Highcharts.chart('container', {
      chart: {
          type: 'funnel',
          backgroundColor: 'transparent'
      },
      title: {
          text: null
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        series: {
            dataLabels: {
                enabled: true,
                format: '{point.name}',
                softConnector: true,
                color: 'white',
               
            },
            center: ['40%', '50%'],
            neckWidth: '30%',
            neckHeight: '25%',
            width: '80%'
        }
      },
      series: [{
          name: 'Unique users',
          data: [
              ['Coverage', 100],
              ['Impressions', 80],
              ['CTR %', 60],
              ['Conversion', 40],
              
          ]
      }],
  });
  }, []);

  return (
    <div className = 'funnel-chart'>
      <div className = 'funnel-chart__header'>
        <div className = 'funnel-chart__title'> Average time watching </div>
      </div>
      <figure className = 'funnel-chart__figure' id = 'container' />

      <div className = 'funnel-chart__footer'>
        <table>
          <thead>
            <tr>
              <th> Бюджет </th>
              <th> Статус </th>
              <th> Стоимость </th>
              <th> Показы </th>
              <th> Сред. цена за клик </th>
              <th> Клики </th>
              <th> Сред. цена </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td> $50 в день </td>
              <td> Приостановлен </td>
              <td> $39.13 </td>
              <td> 10 702 </td>
              <td> $0.37 </td>
              <td> 130 </td>
              <td> $0.01 </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default FunnelChart;