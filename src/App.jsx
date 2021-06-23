import React from "react";
import { Route } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { initializeApp } from "@redux/app-reducer";
import { selectInitialize } from "./selectors/app-selector";

import {
  Main,
  OldMain,
  Login,
  Register,
  TestApi,
  TestIframe,
  TestX,
  Heatmap,
  Visitors,
} from "@pages";

import "./App.less";

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
      <Route exact path="/om" component={OldMain} />
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
      <Route exact path="/test-x" component={TestX} />
    </div>
  );
};

export default App;
