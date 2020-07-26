import React from "react";
import { connect } from "react-redux";
import AuthHeader from "./AuthHeader";
import NonAuthHeader from "./NonAuthHeader";

class Header extends React.Component {
  render() {
    let { loggedUser, isLoggedIn } = this.props.state;

    return (
      <>
        <h1>{loggedUser.username}</h1>
        {isLoggedIn ? <AuthHeader /> : <NonAuthHeader />}
      </>
    );
  }
}

function mapState(state) {
  return { state };
}
export default connect(mapState)(Header);
