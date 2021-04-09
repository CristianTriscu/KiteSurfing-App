import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import LogIn from "./Components/LogIn/LogIn";

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
              return <div className="App"> Dashboard here</div>;
            }}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
