import React from "react";
import { connect } from "react-redux";
import { fetchArticles, fetchTags } from "../store/actions";
import { SINGLE_ARTICLE } from "../store/types";
import { withRouter, Link } from "react-router-dom";

class Articles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredtag: null,
      active : 'yourFeed' ,
      feedArticles : [],
    };
  }

  handleFavourite = (slug, i) => {
    var articlesUrl = `https://conduit.productionready.io/api/articles?limit=10&offset=0`;

    let url = `https://conduit.productionready.io/api/articles/${slug}/favorite`;
    fetch(url, {
      method: "POST",
      headers: {
        authorization: `Token ${localStorage.authToken}`,
      },
    }).then((res) => {
      if (res.status === 200) {
        return res.json();
      }
    });
  };

  handleReadMore = (slug) => {
    let url = ` https://conduit.productionready.io/api/articles/${slug}`;
    fetch(url, {
      headers: {
        authorization: `Token ${localStorage.authToken}`,
      },
    })
      .then((res) => {
        return res.json()
      })
      .then((article) => {
        this.props.dispatch({
          type: SINGLE_ARTICLE,
          payload: article,
        });
      });
  };

  handleTagClick = (tag) => {
    console.log(tag);
    let tagUrl = `https://conduit.productionready.io/api/articles?limit=10&offset=0&tag=${tag}`;
    this.setState({ filteredtag: tag });
    this.setState({active : 'tag'})
    this.props.dispatch(fetchArticles(tagUrl));
  };

  handleYourFeed = () =>{
    this.setState({active : 'yourFeed'})
    let url = `https://conduit.productionready.io/api/articles/feed?limit=10&offset=0`
    fetch(url, {
      headers: {
        authorization : `Token ${localStorage.authToken}`
      }
    }).then((res => {
      if(res.status === 200)
      return res.json();

    })).then((data) => {
      this.setState({feedArticles : data})
    })
  }

  addActive = () => {
    this.setState({active : 'tag'})
  }

  handleGlobalFeed = () => {
    var articlesUrl = `https://conduit.productionready.io/api/articles?limit=10&offset=0`;
    this.props.dispatch(fetchArticles(articlesUrl));
    this.setState({ filteredtag: null });
    this.setState({active : 'global'})
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
            {this.props.state.isLoggedIn ? <h4
                className="feedbutton"
                style={
                  this.state.active === 'yourFeed' ?activeButtonStyle :  tagButtonStyle
                }
                onClick={this.handleYourFeed}
              >
                Your Feed
              </h4>: null}
            
              
              <h4
                className="feedbutton"
                style={
                  this.state.active==='global' ? activeButtonStyle : tagButtonStyle
                }
                onClick={this.handleGlobalFeed}
              >
                Global Feed
              </h4>
              {this.state.filteredtag? (
                <h4
                  className="feedbutton"
                  style={
                    this.state.active === 'tag'? activeButtonStyle : tagButtonStyle
                  }
                  onClick={this.addActive}
                >
                  {this.state.filteredtag}
                </h4>
              ) : null}
            </div>
                  
            {this.state.active ==='yourFeed' && this.state.feedArticles.articlesCount ? (
              this.state.feedArticles.articles.map((article, i) => (
                <div className="articleCard">
                  <div className="authorPicture pictureflex">
                    <div className="picture_flex">
                      <div>
                        <img
                          src={article.author.image}
                          alt={article.author.username}
                          className="authorDp"
                        ></img>
                      </div>

                      <ul className="authorTime">
                        <li>
                          <Link to={`/profile/${article.author.username}`} className="articleAuthor">
                            Author: {article.author.username}
                          </Link>
                        </li>
                        <li>
                          <p>{new Date(article.createdAt).toDateString()}</p>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <button
                        class="btn btn-sm btn-primary"
                        onClick={() => this.handleFavourite(article.slug)}
                      >
                        <i class="ion-heart"></i>
                      </button>
                    </div>
                  </div>

                  <div>
                    <Link
                      to={`articles/${article.slug}`}
                      onClick={() => this.handleReadMore(article.slug)}
                      className="articleTitle"
                    >
                      {article.title}
                    </Link>

                    <p className="articledes">
                      Description: {article.description}
                    </p>
                    <Link to={`articles/${article.slug}`} onClick={()=> this.handleReadMore(article.slug)}>Read More</Link>
                  </div>
                </div>
              ))
            ) : (
              null
            )}


            

            {(this.state.active ==='global') && this.props.state.articles ? (
              this.props.state.articles.map((article, i) => (
                <div className="articleCard">
                  <div className="authorPicture pictureflex">
                    <div className="picture_flex">
                      <div>
                        <img
                          src={article.author.image}
                          alt={article.author.username}
                          className="authorDp"
                        ></img>
                      </div>

                      <ul className="authorTime">
                        <li>
                          <Link to={`/profile/${article.author.username}`} className="articleAuthor">
                            Author: {article.author.username}
                          </Link>
                        </li>
                        <li>
                          <p>{new Date(article.createdAt).toDateString()}</p>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <button
                        class="btn btn-sm btn-primary"
                        onClick={() => this.handleFavourite(article.slug)}
                      >
                        <i class="ion-heart"></i>
                      </button>
                    </div>
                  </div>

                  <div>
                    <Link
                      to={`articles/${article.slug}`}
                      onClick={() => this.handleReadMore(article.slug)}
                      className="articleTitle"
                    >
                      {article.title}
                    </Link>

                    <p className="articledes">
                      Description: {article.description}
                    </p>
                    <Link to={`articles/${article.slug}`} onClick={()=> this.handleReadMore(article.slug)}>Read More</Link>
                  </div>
                </div>
              ))
            ) : (
              null
            )}

{(this.state.active ==='tag') && this.props.state.articles ? (
              this.props.state.articles.map((article, i) => (
                <div className="articleCard">
                  <div className="authorPicture pictureflex">
                    <div className="picture_flex">
                      <div>
                        <img
                          src={article.author.image}
                          alt={article.author.username}
                          className="authorDp"
                        ></img>
                      </div>

                      <ul className="authorTime">
                        <li>
                          <Link to={`/profile/${article.author.username}`} className="articleAuthor">
                            Author: {article.author.username}
                          </Link>
                        </li>
                        <li>
                          <p>{new Date(article.createdAt).toDateString()}</p>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <button
                        class="btn btn-sm btn-primary"
                        onClick={() => this.handleFavourite(article.slug)}
                      >
                        <i class="ion-heart"></i>
                      </button>
                    </div>
                  </div>

                  <div>
                    <Link
                      to={`articles/${article.slug}`}
                      onClick={() => this.handleReadMore(article.slug)}
                      className="articleTitle"
                    >
                      {article.title}
                    </Link>

                    <p className="articledes">
                      Description: {article.description}
                    </p>
                    <Link to={`articles/${article.slug}`} onClick={()=> this.handleReadMore(article.slug)}>Read More</Link>
                  </div>
                </div>
              ))
            ) : (
              null
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
              null
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
export default withRouter(connect(mapState)(Articles));
