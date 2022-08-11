import React, { useContext } from "react";
import "../Css/navbar.css";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
const Navbar = (props) => {
  const { state, dispatch } = useContext(UserContext);

  const path =
    props.userData.role === "student" ? `/studenthome` : `/teacherhome`;

  const RenderMenu = () => {
    if (state) {
      return (
        <div className="btn d-flex">
          <Link className="nav-link" to={path}>
            <li>MyProfile</li>
          </Link>
          <Link className="nav-link" to="/support">
            <li>Support</li>
          </Link>
          <Link className="nav-link" to={`${path}/classes`}>
            <li>Classes</li>
          </Link>
          <Link className="nav-link" to="/logout">
            <li>Logout</li>
          </Link>
        </div>
      );
    } else {
      return (
        <div className="btn d-flex">
          <Link className="nav-link" to="/login">
            <li>Login</li>
          </Link>

          <Link className="nav-link" to="/register">
            <li>Register</li>
          </Link>
          <Link className="nav-link" to="/support">
            <li>Support</li>
          </Link>
        </div>
      );
    }
  };

  return (
    <>
      <nav className="main-nav">
        <div className="logo">
          <h2>
            <Link className="nav-link" to="/">
              <img
                src={require("../Images_copy/Plag_Check.png")}
                height="40"
              ></img>
            </Link>
          </h2>
          <div className="logo">
            <h2>
              <Link className="nav-link" to="/">
                <h3 className="head">Ｐｌａｇ Ｃｈｅｃｋ</h3>
              </Link>
            </h2>
          </div>
        </div>

        <RenderMenu />
      </nav>
    </>
  );
};

export default Navbar;
