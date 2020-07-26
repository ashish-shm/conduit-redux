import React from "react";
import { NavLink, Link } from "react-router-dom";

export default class Header extends React.Component {
  render() {
    return (
      <>
        <div className="container">
          <header className="header flex">
            <h1 className="logo">
              <Link to="/">conduit</Link>
            </h1>
            <nav>
              <ul className="header-nav flex">
                {/* <li className='nav-item'>
                                <NavLink activeClassName='activeButton' className='navButton' to='/'>Home</NavLink>
                            </li> */}
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
      </>
    );
  }
}

const AuthHeader = () => {
  return (
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
                to="/"
              >
                New
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                activeClassName="activeButton"
                className="navButton"
                to="/"
              >
                New
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                activeClassName="activeButton"
                className="navButton"
                to="/"
              >
                New
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};
