import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "./Header";
import { singleArticle, addComment, fetchComments } from "../store/actions";
import { Link } from "react-router-dom";

class SingleArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: "",
    };
  }

  componentDidMount() {
    const slug = this.props.match.params.slug;
    const url = `https://conduit.productionready.io/api/articles/${slug}`;
    let commentsurl = `https://conduit.productionready.io/api/articles/${slug}/comments`;
    this.props.dispatch(singleArticle(url));
    this.props.dispatch(fetchComments(commentsurl));
  }

  handleInput = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    let userInputData = { ...this.state };
    let slug = this.props.match.params.slug;
    let url = `https://conduit.productionready.io/api/articles/${slug}/comments`;
    this.props.dispatch(addComment(url, userInputData, this.props.history));
  };

  render() {
    let singleArticle =
      this.props.state.singleArticle && this.props.state.singleArticle;
    let { title, createdAt, body } = singleArticle;

    // let author =  singleArticle.author

    return (
      <>
        <div>
          <Header />
          <div className="singleArticle-section">
            <section className=" container">
              <h1 className="hero-description">{title}</h1>

              <div className="picture_flex">
                <div>
                  <img
                    className="singleArticle-image"
                    src={
                      singleArticle.author ? singleArticle.author.image : null
                    }
                    alt={
                      singleArticle.author
                        ? singleArticle.author.username
                        : null
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
                <div>
                {singleArticle.author &&
          (this.props.state.loggedUser.username) === (singleArticle.author.username) ? (<button>Edit</button>) : (null) }
          {singleArticle.author &&
          (this.props.state.loggedUser.username) === (singleArticle.author.username) ? (<button>Delete</button>) : (null) }
                </div>
              </div>
              
            </section>
          </div>
          <div className="body-section container">
            <p className="body-description">{body}</p>
          </div>
        </div>
        <div className="comment-section container">
          <input
            type="text"
            placeholder="Add Comment here"
            onChange={this.handleInput}
            name="body"
            value={this.state.body}
          ></input>
          <input type="submit" onClick={this.handleSubmit}></input>
          <div className="comments">
            <h2 style={{ padding: "30px", fontSize: "18px", color: "crimson" }}>
              Comments
            </h2>
            <ul>
              {this.props.state.comments
                ? this.props.state.comments.map((comment) => (
                    <li className="oneComment">
                      <Link to={`/profile/${comment.author.username}`} className="comment-author">
                        Author: {comment.author.username}
                      </Link>
                      <p className="commentDate">
                        {new Date(comment.createdAt).toDateString()}
                      </p>
                      <p className="comment-body">{comment.body}</p>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>
      </>
    );
  }
}

function mapState(state) {
  return { state };
}

export default connect(mapState)(SingleArticle);
