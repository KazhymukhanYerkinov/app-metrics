import React from "react";
import { PieChart, LineChart, BarChart } from "@components";


const Main = () => {
  return (
    <React.Fragment>
      <div className = 'main'>
        <PieChart />
        <LineChart />
      </div>
      <BarChart />
    </React.Fragment>
    
  )
};

export default Main;
