import "./App.css";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import GlobalStyle from "./globalStyle";
import Home from "./components/Home";
import Login from "./components/Login";
import React from "react";
import Registration from "./components/Registration";
import Verification from "./components/verifyEmail";

function App() {
  return (
    <div>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/register" component={Registration} />
          <Route exact path="/verify" component={Verification} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
