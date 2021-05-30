import { Main, Login, Register } from "@pages";
import React from "react";
import { Route } from "react-router";


import './App.less'

// ALMAZ BYL TUT

const App = () => {
    return (
      <div className = 'app-wrapper'>
        <Route exact path = '/' component = { Main } />
        <Route exact path = '/login' component = { Login } />
        <Route exact path = '/register' component = { Register } />
      </div>
    )
}


export default App;
