import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container-lg">
        <Link to="/" className="navbar-brand">
          <i className="fa fa-ticket" aria-hidden="true"></i> Mvis
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarLinks"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="navbar-collapse collapse" id="navbarLinks">
          <div className="navbar-nav ms-auto">
            <NavLink to="/movies" className="nav-link">
              Movies
            </NavLink>
            {/* displaying the current user in navbar if valid jwt is provided */}
            {user ? (
              <>
                <a href="/profile" className="nav-link">
                  {user.name}
                </a>
                <a href="/logout" className="nav-link">
                  Logout
                </a>
              </>
            ) : (
              <>
                <a href="/login" className="nav-link">
                  Login
                </a>
                <a href="/register" className="nav-link">
                  Register
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
