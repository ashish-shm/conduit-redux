import React from "react";
import { connect } from "react-redux";
import AuthHeader from "./AuthHeader";
import NonAuthHeader from "./NonAuthHeader";

class Header extends React.Component {
  render() {
    let { isLoggedIn } = this.props.state;

    return <>{isLoggedIn ? <AuthHeader /> : <NonAuthHeader />}</>;
  }
}

function mapState(state) {
  return { state };
}
export default connect(mapState)(Header);
