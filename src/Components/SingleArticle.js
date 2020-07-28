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
    let singleArticle =
      this.props.state.singleArticle && this.props.state.singleArticle;
    let { title, createdAt, body } = singleArticle;
    // let author =  singleArticle.author

    return (
      <div>
        <Header />
        <div className="singleArticle-section">
          <section className=" container">
            <h1 className="hero-description">{title}</h1>

            <div className="picture_flex">
              <div>
                <img
                  className="singleArticle-image"
                  src={singleArticle.author ? singleArticle.author.image : null}
                  alt={
                    singleArticle.author ? singleArticle.author.username : null
                  }
                  className="authorDp"
                ></img>
              </div>

              <ul className="authorTime">
                <li>
                  <h3 className="singleArticle-articleAuthor">
                    Author:{" "}
                    {singleArticle.author
                      ? singleArticle.author.username
                      : null}
                  </h3>
                </li>
                <li>
                  <p className="singleArticle-date">
                    {new Date(createdAt).toDateString()}
                  </p>
                </li>
              </ul>
              <div></div>
            </div>
          </section>
        </div>
        <div className="body-section container">
          <p className="body-description">{body}</p>
        </div>
      </div>
    );
  }
}

function mapState(state) {
  return { state };
}

export default connect(mapState)(SingleArticle);
