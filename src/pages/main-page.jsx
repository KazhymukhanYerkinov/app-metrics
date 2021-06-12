import React from "react";
import { LineChart, Funnel ,PieChart, BarChart, FunnelChart, Youtube,IframeVideo } from "@components";


let pie_chart_1_data = [61.41, 11.84, 10.85, 4.67, 4.18, 7.05];
let pie_chart_1_labels = ['Chrome', 'Internet Explorer', 'Firefox', 'Edge', 'Safari', 'Other'];
let pie_chart_1_colors = ['#7CB5EC', '#434348', '#90ED7D', '#F7A35C', '#8085E9', '#F15C80'];
let pie_chart_1_position = 'right';


let pie_chart_2_data = [10, 10, 80];
let pie_chart_2_labels = ['ПК', 'Планшет', 'Мобильный'];
let pie_chart_2_colors = ['#7486E7', '#F4F7F9','#1B7FF5'];
let pie_chart_2_position = 'bottom';

const Main = () => {
  return (
    <React.Fragment>

      <div className = 'main'>
        <LineChart 
          fill = {false}
          borderColor = '#F08C2F'
        />
      </div>

      <div className = 'main'>
        <Funnel />
      </div>

      <div className = 'main'>
        <PieChart
          items = { pie_chart_1_data } 
          labels = { pie_chart_1_labels }
          colors = { pie_chart_1_colors }
          position = { pie_chart_1_position }
        />
      </div>

      <div className = 'main'>
        <BarChart />
      </div>

      <div className = 'main'>
        <PieChart
          items = { pie_chart_2_data } 
          labels = { pie_chart_2_labels }
          colors = { pie_chart_2_colors }
          position = { pie_chart_2_position }
        />
      </div>

      <div className = 'main'>
        <LineChart 
          fill = {true}
          borderColor = '#7CB5EC'
        />
      </div>

      <div className = 'main'>
        <FunnelChart />
      </div>

      <div className = 'main'>
        <Youtube />
      </div>

      <div className = 'main'>
        <IframeVideo />
      </div>

      
    </React.Fragment>
    
  )
};

export default Main;
