import React, { useContext, useState } from "react";
import "../Css/login.css";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { BrowserRouter } from 'react-router-dom';

const Login = (props) => {
  const navigate = useNavigate();

  const { state, dispatch } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();

    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();

    console.log(data.role);
    if (res.status === 400 || !data) {
      window.alert("Invalid Credentials");
    } else {
      dispatch({ type: "USER", payload: true });
      props.setUserData(data);
      if (data.role === "student") navigate("/studenthome/classes");
      else navigate("/teacherhome/classes");
    }
  };

  return (
    <section className="login-section">
      <div className="container1">
        <div className="screen">
          <div className="screen__content">
            <form method="POST" className="login">
              <div className="login__field">
                <i className="login__icon fas fa-user zmdi zmdi-email"></i>
                <input
                  type="email"
                  className="login__input"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder=" Email"
                />
              </div>
              <div className="login__field">
                <i className="login__icon fas fa-lock zmdi zmdi-lock"></i>
                <input
                  type="password"
                  className="login__input"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>
              <button className="button login__submit" onClick={loginUser}>
                <span className="button__text">Log In</span>
                <i className="button__icon fas fa-chevron-right"></i>
              </button>
              <div className="forgot">
                <NavLink to="/">Forgot Password?</NavLink>
                <NavLink to="/register">Create an account?</NavLink>
              </div>
            </form>
          </div>
          <div className="screen__background">
            <span className="screen__background__shape screen__background__shape4"></span>
            <span className="screen__background__shape screen__background__shape3"></span>
            <span className="screen__background__shape screen__background__shape2"></span>
            <span className="screen__background__shape screen__background__shape1"></span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
