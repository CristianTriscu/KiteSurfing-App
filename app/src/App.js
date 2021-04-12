import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Dashboard from "./Components/Dashboard/Dashboard";
import LogIn from "./Components/LogIn/LogIn";
import SignUp from "./Components/SignUp/SignUp";
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            path="/"
            exact={true}
            component={() => {
              return (
                <div className="App">
                  <LogIn />
                </div>
              );
            }}
          />
          <Route
            path="/Dashboard"
            exact={true}
            component={() => {
              return (
                <div className="App">
                  <Dashboard />
                </div>
              );
            }}
          />
           <Route
            path="/SignUp"
            exact={true}
            component={() => {
              return (
                <div className="App">
                  <SignUp />
                </div>
              );
            }}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
