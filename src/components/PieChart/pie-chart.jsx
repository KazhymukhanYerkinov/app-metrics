import React from 'react';
import Highcharts from 'highcharts';


const PieChart = () => {

  React.useEffect(() => {
    Highcharts.chart('pie-chart', {
      chart: {
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        backgroundColor: 'transparent'
        
      },
      title: {
        text: null
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false,
          },
          showInLegend: true
        }
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        itemMarginTop: 5,
        itemMarginBottom: 5,
        itemStyle: {
          color: '#ffffff'
        }
      },
      series: [{
        name: 'Brands',
        colorByPoint: true, 
        data: [{
          name: 'Chrome',
          y: 61.41,
        }, {
          name: 'Internet Explorer',
          y: 11.84
        }, {
          name: 'Firefox',
          y: 10.85
        }, {
          name: 'Edge',
          y: 4.67
        }, {
          name: 'Safari',
          y: 4.18
        }, {
          name: 'Other',
          y: 7.05
        }]
      }]
    });
  }, []);

  return (
    <div className = 'pie-chart'>
      <div>
      <div className = 'pie-chart__header'>
        <button className = 'pie-chart__button pie-chart__button--first active'> Visitors </button>
        <button className = 'pie-chart__button'> Ads </button>
        <div className = 'pie-chart__line'></div>
      </div>
      <div className = 'pie-chart__figure' id="pie-chart"></div>
      </div>
      
    </div>
  
  )
}

export default PieChart;