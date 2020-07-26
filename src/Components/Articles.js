import React from "react";
import { connect } from "react-redux";
import { fetchArticles, fetchTags } from "../store/actions";

class Articles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredtag: null,
    };
  }

  handleTagClick = (tag) => {
    console.log(tag);
    let tagUrl = `https://conduit.productionready.io/api/articles?limit=10&offset=0&tag=${tag}`;
    this.setState({ filteredtag: tag });
    this.props.dispatch(fetchArticles(tagUrl));
  };

  handleGlobalFeed = () => {
    var articlesUrl = `https://conduit.productionready.io/api/articles?limit=10&offset=0`;
    this.props.dispatch(fetchArticles(articlesUrl));
    this.setState({ filteredtag: null });
  };

  componentDidMount() {
    var articlesUrl = `https://conduit.productionready.io/api/articles?limit=10&offset=0`;
    let tagsUrl = `https://conduit.productionready.io/api/tags`;

    this.props.dispatch(fetchArticles(articlesUrl));
    this.props.dispatch(fetchTags(tagsUrl));
  }

  render() {
    let tagButtonStyle = {
      display: "inline-block",
      padding: "15px",
      backgroundColor: "transparent",
      marginTop: "30px",
      marginRight: "15px",
      border: "0px",
      outline: "none",
      cursor: "pointer",
      fontSize: "18px",
    };

    let activeButtonStyle = {
      display: "inline-block",
      padding: "15px",
      backgroundColor: "transparent",
      marginTop: "30px",
      marginRight: "15px",
      borderBottom: "1.8px solid #5cb85c",
      outline: "none",
      cursor: "pointer",
      color: "green",
      fontSize: "18px",
    };

    return (
      <>
        <div className="container article-flex">
          <div className=" article-div ">
            <div className="tagButtons">
              <h4
                className="feedbutton"
                style={
                  this.state.filteredtag ? tagButtonStyle : activeButtonStyle
                }
                onClick={this.handleGlobalFeed}
              >
                Global Feed
              </h4>
              {this.state.filteredtag ? (
                <h4
                  className="feedbutton"
                  style={
                    this.state.filteredtag ? activeButtonStyle : tagButtonStyle
                  }
                >
                  {this.state.filteredtag}
                </h4>
              ) : null}
            </div>

            {this.props.state.articles ? (
              this.props.state.articles.map((article) => (
                <div className="articleCard">
                  <div className="authorPicture pictureflex">
                    <img
                      src={article.author.image}
                      alt={article.author.username}
                      className="authorDp"
                    ></img>
                    <ul className="authorTime">
                      <h3 className="articleAuthor">
                        Author: {article.author.username}
                      </h3>
                      <p>{new Date(article.createdAt).toDateString()}</p>
                    </ul>
                  </div>
                  <h2 className="articleTitle">{article.title}</h2>

                  <p className="articledes">
                    Description: {article.description}
                  </p>
                </div>
              ))
            ) : (
              <h2>Loading</h2>
            )}
          </div>
          <div className="container tags-div ">
            <h4 className="popularTags">Popular Tags</h4>
            {this.props.state.tags ? (
              this.props.state.tags.map((data, i) => (
                <button key={i} onClick={() => this.handleTagClick(data)}>
                  {data}
                </button>
              ))
            ) : (
              <h2>Loading</h2>
            )}
          </div>
        </div>
      </>
    );
  }
}

function mapState(state) {
  return { state };
}
export default connect(mapState)(Articles);
