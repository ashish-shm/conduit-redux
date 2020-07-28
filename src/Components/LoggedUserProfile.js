import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { USER_PROFILE } from "../store/types";
import Header from "./Header";

class UserProfile extends Component {
  componentDidMount() {
    let username = this.props.match.params.slug;
    let url = `https://conduit.productionready.io/api/profiles/${username}`;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${localStorage.authToken}`,
      },
    })
      .then((res) => res.json())
      .then(({ profile }) => {
        return this.props.dispatch({ type: USER_PROFILE, payload: profile });
      });
  }

  

  render() {
    let { username, image, bio, following } = this.props.state.userProfile;
    return (
      <>
        <Header />
        <section className="hero-section">
          <div className="container">
            
            <img src={image} className='hero-image' alt={username} />
            <p className="hero-description">{username}</p>
            <p className="hero-description">{bio}</p>
          </div>
          {following ? (
            <button onClick={this.handleFollow}>
              Unfollow
            </button>
          ) : (
            <button onClick={this.handleFollow}>
              Follow
            </button>
          )}
        </section>
      </>
    );
  }
}

function mapState(state) {
  return { state };
}

export default connect(mapState)(UserProfile);
