import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
    };
  }

  handleInput = ({ target: { name, value } }) =>
    this.setState({ [name]: value });

  handleSubmit = () => {
    let url = "https://conduit.productionready.io/api/users";
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: this.state }),
    }).then((res) => {
      console.log(res.json());
      if (res.status === 200) {
        this.props.history.push("/login");
      }
    });
  };

  render() {
    return (
      <>
        <Header />
        <div className="container login">
          <h2>Sign Up</h2>
          <Link to="/login">Have an account?</Link>
          <div className='form'>
            <input
              type="text"
              placeholder="Username"
              onChange={this.handleInput}
              name="username"
              value={this.state.username}
            ></input>
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
              onChange={this.handleInput}
              name="password"
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
