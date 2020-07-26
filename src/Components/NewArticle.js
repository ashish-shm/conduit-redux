import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      body: "",
      tagList: [],
    };
  }

  handleInput = ({ target: { name, value } }) =>
    this.setState({ [name]: value });

  handleSubmit = () => {
    let url = "https://conduit.productionready.io/api/articles";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${localStorage.authToken}`,
      },
      body: JSON.stringify({ article: this.state }),
    })
      .then((res) => {
        console.log(res.json());
        if (res.status === 200) {
          this.props.history.push("/");
        }
      })
      .catch(Error);
  };

  render() {
    return (
      <>
        <Header />
        <div className="container login">
          <h2 className='publish_head'>Publish your article</h2>
          <div className="form">
            <input
              type="text"
              placeholder="Title"
              onChange={this.handleInput}
              name="title"
              value={this.state.title}
            ></input>
            <input
              type="text"
              placeholder="What's this article about?"
              onChange={this.handleInput}
              name="description"
              value={this.state.description}
            ></input>
            <input
              type="text"
              placeholder="Write your article"
              onChange={this.handleInput}
              name="body"
              value={this.state.body}
            ></input>
            <input
              type="text"
              placeholder="Enter Tags"
              onChange={this.handleInput}
              name="tagList"
              value={this.state.tagList}
            ></input>
            <input type="submit" onClick={this.handleSubmit}></input>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}
