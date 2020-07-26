import React from "react";

import Header from "./Header";
import Articles from "./Articles";
import Hero from "./Hero";
import Footer from "./Footer";
import { IS_LOGGED_IN, LOGGED_USER } from "../store/types";
import { connect } from "react-redux";

class AllContent extends React.Component {
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
        .then(({user}) => {
          this.props.dispatch({
            type: IS_LOGGED_IN,
            payload: true,
          });
          this.props.dispatch({
            type: LOGGED_USER,
            payload : user
          })


        });
  }

  render() {
    return (
      <>
        <Header />
        <Hero />
        <Articles />
        <Footer />
      </>
    );
  }
}

function mapState(state) {
  return { state };
}
export default connect(mapState)(AllContent);
