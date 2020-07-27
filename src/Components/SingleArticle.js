import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "./Header";
import { singleArticle } from "../store/actions";

class SingleArticle extends Component {
  render() {
    return (
      <div>
        <Header />
        <>
          <section className="hero-section">
            <div className="container">
              <h1 className="hero-title">
                {this.props.state.singleArticle.article.title}
              </h1>
              <div className="picture_flex">
                <div>
                  <img
                    src={this.props.state.singleArticle.article.author.image}
                    alt={this.props.state.singleArticle.article.author.username}
                    className="authorDp"
                  ></img>
                </div>

                <ul className="authorTime">
                  <li>
                    <h3 className="articleAuthor">
                      Author:{" "}
                      {this.props.state.singleArticle.article.author.username}
                    </h3>
                  </li>
                  <li>
                    <p>
                      {new Date(
                        this.props.state.singleArticle.article.createdAt
                      ).toDateString()}
                    </p>
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
