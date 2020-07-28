import React from "react";

import AllContent from "./Components/AllContent";
import { IS_LOGGED_IN, LOGGED_USER } from "./store/types";
import { connect } from "react-redux";
import Settings from './Components/Settings'
import Login from "./Components/Login";
import Register from "./Components/Register";
import Error from "./Components/Error";
import NewArticle from "./Components/NewArticle";
import UserProfile from './Components/UserProfile'
import LoggedUserProfile from './Components/LoggedUserProfile'
import SingleArticle from './Components/SingleArticle';
import { Route, Switch } from "react-router-dom";
class App extends React.Component {
  componentDidMount() {
    let url = `https://conduit.productionready.io/api/user`;
    if (localStorage.authToken)
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Token ${localStorage.authToken}`,
        },
      })
        .then((res) => res.json())
        .then(({ user }) => {
          this.props.dispatch({
            type: IS_LOGGED_IN,
            payload: true,
          });
          this.props.dispatch({
            type: LOGGED_USER,
            payload: user,
          });
        });
  }

  render() {
    return (
      <main>
        <Switch>
          <Route path="/" component={AllContent} exact />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/new" component={NewArticle} />
          <Route path='/settings' component={Settings} />
          <Route path="/profile/:slug" component={UserProfile} />
          <Route path="/profile/:slug" component={LoggedUserProfile} />



          <Route path="/articles/:slug" component={SingleArticle} />
          <Route component={Error} />
        </Switch>
      </main>
    );
  }
}

function mapState(state) {
  return { state };
}
export default connect(mapState)(App);
