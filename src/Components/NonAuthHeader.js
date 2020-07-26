import React from 'react'
import {Link, NavLink} from 'react-router-dom'


const NonAuthHeader = () => (
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
                to="/login"
              >
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                activeClassName="activeButton"
                className="navButton"
                to="/register"
              >
                Register
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );

  export default NonAuthHeader