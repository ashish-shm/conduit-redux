import React from "react";

import Header from "./Header";
import Articles from "./Articles";
import Hero from "./Hero";
import Footer from "./Footer";

export default class AllContent extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Hero />
        <Articles />
        <Footer />
      </>
    );
  }
}
