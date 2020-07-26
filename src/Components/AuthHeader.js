import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import {connect} from 'react-redux'

const  AuthHeader = (props) => (
    <div className="container">
      <header className="header flex">
        <h1 className="logo">
          <Link to="/">conduit</Link>
        </h1>
        <nav>
          <ul className="header-nav flex">
            <li className="nav-item">
              <NavLink
                activeClassName="activeButton"
                className="navButton"
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                activeClassName="activeButton"
                className="navButton"
                to="/new"
              >
                New Article
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                activeClassName="activeButton"
                className="navButton"
                to="/settings"
              >
                Settings
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                activeClassName="activeButton"
                className="navButton"
                to="/myfeed"
              >
                {props.state.loggedUser.username}
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );

  function mapState(state) {
    return { state };
  }
  export default connect(mapState)(AuthHeader);

