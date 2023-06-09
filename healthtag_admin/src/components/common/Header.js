import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-transparent  bg-primary  navbar-absolute">
      <div className="container-fluid">
        <div className="navbar-wrapper">
          <div className="navbar-toggle">
            <button type="button" className="navbar-toggler">
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
          </div>
          <a className="navbar-brand" href="#pablo">
            Dashboard
          </a>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navigation"
          aria-controls="navigation-index"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-bar navbar-kebab" />
          <span className="navbar-toggler-bar navbar-kebab" />
          <span className="navbar-toggler-bar navbar-kebab" />
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navigation">
          <form>
            <div className="input-group no-border">
              {/* <input type="text" defaultValue className="form-control" placeholder="Search..." />
            <div className="input-group-append">
              <div className="input-group-text">
                <i className="now-ui-icons ui-1_zoom-bold" />
              </div>
            </div> */}
            </div>
          </form>
          <ul className="navbar-nav">
            <li className="nav-item">
              {/* <a className="nav-link" href="#pablo">
                <i className="now-ui-icons media-2_sound-wave" />
                <p>
                  <span className="d-lg-none d-md-block">Stats</span>
                </p>
              </a> */}
            </li>
            <li className="nav-item dropdown">
              {/* <a
                className="nav-link dropdown-toggle"
                id="navbarDropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="now-ui-icons location_world" />
                <p>
                  <span className="d-lg-none d-md-block">Some Actions</span>
                </p>
              </a> */}
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                <a className="dropdown-item" href="#">
                  Action
                </a>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </div>
            </li>
            <li className="nav-item">
              <NavLink to="/profile" className="nav-link">
                <i className="now-ui-icons users_single-02" />
                <p>
                  <span className="d-lg-none d-md-block">Account</span>
                </p>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
