import React, { useState } from "react";
import "../Css/register.css";
import { NavLink, useNavigate } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    roll_no: "",
    password: "",
    cpassword: "",
    role:"student",
  });
  let n, value;
  const handleInputs = (e) => {
    n = e.target.name;
    
    value = e.target.value;

   
    setUser({ ...user, [n]: value });
  };
  const postData = async (e) => {
    e.preventDefault();
    const { name, email, roll_no, password, cpassword, role } = user;
    console.log(user)
    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        roll_no,
        password,
        cpassword,
        role,
      }),
    });
    const data = await res.json();
    console.log(data)

    if (res.status === 422 || !data) {
      window.alert("Invalid Registration");
    } else {
      window.alert("Successful");
      navigate("/login");
    }
  };
  return (
    <section className="register-section">
      <div className="container1">
        <div className="screen">
          <div className="screen__content">
            <form className="login2" method="POST">
              <div className="login__field">
                <i className="login__icon fas fa-user zmdi zmdi-account"></i>
                <input
                  type="text"
                  name="name"
                  className="login__input"
                  // value={user.name}
                  onChange={handleInputs}
                  placeholder="Name"
                />
              </div>
              <div className="login__field">
                <i className="login__icon fas fa-user zmdi zmdi-email"></i>
                <input
                  type="email"
                  name="email"
                  className="login__input"
                  // value={user.email}
                  onChange={handleInputs}
                  placeholder=" Email"
                />
              </div>
              <div className="login__field">
                <i className="login__icon fas fa-user zmdi zmdi-plus-1"></i>
                <input
                  type="number"
                  name="roll_no"
                  className="login__input"
                  // value={user.roll_no}
                  onChange={handleInputs}
                  placeholder="Institute Id"
                />
              </div>
              <div className="login__field">
                <i className="login__icon fas fa-lock zmdi zmdi-lock"></i>
                <input
                  type="password"
                  name="password"
                  className="login__input"
                  // value={user.password}
                  onChange={handleInputs}
                  placeholder="Password"
                />
              </div>
              <div className="login__field">
                <i className="login__icon fas fa-lock zmdi zmdi-lock"></i>
                <input
                  type="password"
                  name="cpassword"
                  className="login__input"
                  // value={user.cpassword}
                  onChange={handleInputs}
                  placeholder="Confirm Pass"
                />
              </div>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">
                  Login As
                </FormLabel>
                <RadioGroup
                  onChange={handleInputs}
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="student"
                  name="role"
                >
                  <FormControlLabel
                    value="teacher"
                    control={<Radio />}
                    label="Teacher"
                  />
                  <FormControlLabel
                    value="student"
                    control={<Radio />}
                    label="Student"
                  />
                </RadioGroup>
              </FormControl>

              <button className="button login__submit" onClick={postData}>
                <span className="button__text">Register</span>
                <i className="button__icon fas fa-chevron-right"></i>
              </button>
              <div className="forgot">
                <NavLink to="/">Forgot Password?</NavLink>
                <NavLink to="/login">Already have an account?</NavLink>
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

export default Register;
