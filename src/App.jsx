import { Main, Login, Register } from "@pages";
import { initializeApp } from "@redux/app-reducer";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route } from "react-router";

import './App.less'
import { selectInitialize } from "./selectors/app-selector";



const App = () => {

  const dispatch = useDispatch();
  const initialized = useSelector(selectInitialize);

  React.useEffect(() => {
    dispatch(initializeApp())
  }, [dispatch])

  if (!initialized) {
    return <div></div>
  }

  return (
    <div className='app-wrapper'>
      <Route exact path='/' component={Main} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/register' component={Register} />
    </div>
  )
}


export default App;
