import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Css/studenthome.css";

const StudentHome = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState("");
  const homePage = async () => {
    try {
      const res = await fetch("/studenthome", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();

      console.log(data);
      setUserData(data);
    } catch (err) {
      console.log(err);
      navigate("/login");
    }
  };
  useEffect(() => {
    homePage();
  }, []);
  return (
    <section className="section about-section gray-bg" id="about">
      <div className="container">
        <div className="row align-items-center mb-3 flex-row-reverse">
          <div className="col-lg-6">
            <div className="about-text go-to">
              <h3 className="dark-color">{userData.name}</h3>

              <div className="row about-list">
                <div className="col-md-6">
                  <div className="media">
                    <label>User ID</label>
                    <p>{userData.roll_no}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="media">
                    <label>E-mail</label>
                    <p>{userData.email}</p>
                  </div>
                  <div className="media">
                    <label>Phone</label>
                    <p>*********</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="about-avatar">
              <img
                src="https://bootdey.com/img/Content/avatar/avatar7.png"
                title="img"
                alt="avatar"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentHome;
