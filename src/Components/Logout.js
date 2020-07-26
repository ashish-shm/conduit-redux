import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { IS_LOGGED_IN } from "../store/types";

class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigate: false,
    };
  }

  handleLogout = () => {
    localStorage.clear("authToken");
    this.setState({ navigate: true });
    // this.props.dispatch({ type: IS_LOGGED_IN, payload: false });
  };

  render() {
    const { navigate } = this.state;

    if (navigate) return <Redirect to="/login" push={true} />;

    return (
      <button className="navButton" onClick={this.handleLogout}>
        Logout
      </button>
    );
  }
}

function mapState(state) {
  return { state };
}
export default connect(mapState)(Logout);
