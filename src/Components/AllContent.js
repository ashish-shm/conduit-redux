import React from "react";

import Header from "./Header";
import Articles from "./Articles";
import Hero from "./Hero";
import Footer from "./Footer";
import { connect } from "react-redux";
import Loader from './Loader'

class AllContent extends React.Component {
  
  render() {
    if(!this.props.state.isLoggedIn){
      return <Loader />;
    }
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

function mapState(state) {
  return { state };
}
export default connect(mapState)(AllContent);
