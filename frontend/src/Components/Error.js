import React from "react";
import { NavLink } from "react-router-dom";

const Error = () => {
  return (
    <section className="home-section">
      <p>404 </p>
      <h1>Page Not found</h1>
      <NavLink
        to="/"
        className="login-error nav-link
      "
      >
        <span className="Text">Go to Homepage</span>
      </NavLink>
    </section>
  );
};

export default Error;
