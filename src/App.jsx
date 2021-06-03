import { Main, Login, Register } from "@pages";
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
    </div>
  );
};

export default App;
