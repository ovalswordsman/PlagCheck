import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import "../Css/home.css";
const Home = () => {
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate("/guest");
  };
  return (
    <section className="home-section">
      <p>Welcome to </p>
      <h1 className="title">PlagCheck</h1>
      <Button class="guest" onClick={clickHandler}>
        Use as Guest
      </Button>
    </section>
  );
};

export default Home;
