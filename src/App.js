import React from "react";

import AllContent from "./Components/AllContent";

import Login from "./Components/Login";
import Register from "./Components/Register";
import Error from "./Components/Error";
import { Route, Switch } from "react-router-dom";

export default class App extends React.Component {
  render() {
    return (
      <main>
        <Switch>
          <Route path="/" component={AllContent} exact />

          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route component={Error} />
        </Switch>
      </main>
    );
  }
}
