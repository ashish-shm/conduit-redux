import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "./Header";
import { singleArticle } from "../store/actions";

class SingleArticle extends Component {

  componentDidMount() {
    const slug = this.props.match.params.slug;
    const url = `https://conduit.productionready.io/api/articles/${slug}`;
    this.props.dispatch(singleArticle(url));
  }
  render() {
    let { title, createdAt, body } = this.props.state.singleArticle;
    let  {image, username} 
     = this.props.state.singleArticle;

    return (
      <div>
        <Header />
        <>
          <section className="hero-section">
            <div className="container">
              <h1 className="hero-description">{title}</h1>
              <p className="hero-description">{body}</p>
              <div className="picture_flex">
                <div>
                  <img src={image} alt={username} className="authorDp"></img>
                </div>

                <ul className="authorTime">
                  <li>
                    <h3 className="articleAuthor">Author: {username}</h3>
                  </li>
                  <li>
                    <p>{new Date(createdAt).toDateString()}</p>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </>
      </div>
    );
  }
}

function mapState(state) {
  return { state };
}

export default connect(mapState)(SingleArticle);
