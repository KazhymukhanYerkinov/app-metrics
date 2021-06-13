import {
  Main,
  Login,
  Register,
  TestApi,
  TestIframe,
  TestAds,
} from "@pages";
import Heatmap from "@pages/Heatmap";
import Visitors from "@pages/Visitors";

import { initializeApp } from "@redux/app-reducer";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route } from "react-router";

import "./App.less";
import { selectInitialize } from "./selectors/app-selector";

const App = () => {
  const dispatch = useDispatch();
  const initialized = useSelector(selectInitialize);

  React.useEffect(() => {
    dispatch(initializeApp());
  }, [dispatch]);

  if (!initialized) {
    return <div></div>;
  }

  return (
    <div className="app-wrapper">
      <Route exact path="/" component={Main} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/heatmap" component={Heatmap} />
      <Route exact path="/visitors" component={Visitors} />
      <Route exact path="/test-api" component={TestApi} />
      <Route
        exact
        path="/test-iframe"
        component={TestIframe}
      />
      <Route exact path="/test-ads" component={TestAds} />
    </div>
  );
};

export default App;
