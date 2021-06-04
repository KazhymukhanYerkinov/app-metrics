import { Main, Login, Register, TestChart } from "@pages";
import Heatmap from "@pages/Heatmap";

import React from "react";
import { Route } from "react-router";

import "./App.less";

// ALMAZ BYL TUT

const App = () => {
  return (
    <div className="app-wrapper">
      <Route exact path="/" component={Main} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/heatmap" component={Heatmap} />
      <Route exact path="/test-chart" component={TestChart} />
    </div>
  );
};

export default App;
