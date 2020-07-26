import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import {updateUser} from '../store/actions'
import { connect } from "react-redux";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: this.props.state.loggedUser.image,
      username: this.props.state.loggedUser.username,
      bio: this.props.state.loggedUser.bio,
      email: this.props.state.loggedUser.email,
      
    };
  }

  handleInput = ({ target: { name, value } }) =>
    this.setState({ [name]: value });

  handleSubmit = () => {
    let userInputData = {...this.state};  
    let url = "https://conduit.productionready.io/api/user";
    this.props.dispatch(updateUser(url, userInputData, this.props.history ));
  };

  render() {
    return (
      <>
        <Header />
        <div className="container login">
          <h2 className="publish_head">Update Your Settings</h2>
          <div className="form">
            <input
              type="text"
              placeholder="URL of profile picture"
              onChange={this.handleInput}
              value={this.state.image}
              name="image"
            ></input>
            <input
              type="text"
              onChange={this.handleInput}
              name="username"
              value={this.state.username}
            ></input>
            <input
              type="text"
              placeholder="Short bio about you"
              onChange={this.handleInput}
              name="bio"
              value={this.state.bio}
            ></input>
            <input
              type="email"
              onChange={this.handleInput}
              name="email"
              value={this.state.email}
            ></input>
            <input
              type="password"
              placeholder="Enter new password"
              name="password"
              onChange={this.handleInput}
              
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
export default connect(mapState)(Register);
