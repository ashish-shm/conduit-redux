import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { USER_PROFILE } from "../store/types";
import Header from "./Header";

class UserProfile extends Component {
  componentDidMount() {
    let username = this.props.match.params.slug;
    let url = `https://conduit.productionready.io/api/profiles/${username}`;
    let url2 = `https://conduit.productionready.io/api/articles?author=lula1234&limit=5&offset=0`
    let url3 = `https://conduit.productionready.io/api/articles?favorited=lula1234&limit=5&offset=0`
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

  handleFollow = () => {
    let { username, following } = this.props.state.userProfile;

    let slug = this.props.match.params.slug;
    let url = `https://conduit.productionready.io/api/profiles/${slug}/follow`;
    let method = following ? "DELETE" : "POST";
    fetch(url, {
      method,
      headers: {
        "content-type": "application/json",
        authorization: `Token ${localStorage.authToken}`,
      },
    })
      .then((res) => res.json())
      .then(({ profile }) => {
        this.props.dispatch({ type: USER_PROFILE, payload: profile });
        this.props.history.push(`/profile/${username}`);
      });
  };

  render() {
    let { username, image, bio, following } = this.props.state.userProfile;

    return (
      <>
        <Header />
        <section className="profile-section">
          <div className="container">
            <img src={image} className="hero-image" alt={username} />
            <p className="hero-description">{username}</p>
            
          </div>
      <div className='container'>
      <div className='followedit'>
          {this.props.state.loggedUser.username &&
          this.props.state.loggedUser.username === username ? (
            <Link to="/settings"><button className='followbtn'>Edit Profile</button></Link>
          ) : following ? (
            <button className='followbtn' onClick={this.handleFollow}>Unfollow</button>
          ) : (
            <button className='followbtn' onClick={this.handleFollow}>follow</button>
          )}
          </div>
          </div>
        </section>
      </>
    );
  }
}

function mapState(state) {
  return { state };
}

export default connect(mapState)(UserProfile);
