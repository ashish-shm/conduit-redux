import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import {connect} from 'react-redux';
import {loginUser} from '../store/actions'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleInput = ({ target: { name, value } }) =>
    this.setState({ [name]: value });

  handleSubmit = () => {
    let userInputData = {...this.state};  
    let url = "https://conduit.productionready.io/api/users/login";
    this.props.dispatch(loginUser(url, userInputData, this.props.history ));
  }
    

  render() {
    return (
      <>
        <Header />
        <div className="container login">
          <h2>Sign In</h2>
          <Link to="/register">Need an account?</Link>
          <div className="form">
            <input
              type="email"
              placeholder="Email"
              onChange={this.handleInput}
              name="email"
              value={this.state.email}
            ></input>
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={this.handleInput}
              value={this.state.password}
            ></input>
            <input type="submit" onClick={this.handleSubmit}></input>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

function mapState(state) {
    return { state };
  }
  export default connect(mapState)(Login);
