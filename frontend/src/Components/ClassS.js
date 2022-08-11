import React from "react";
import CardS from "./CardS";
import "../Css/cards.css";

// import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
const ClassS = (props) => {
  // const navigate = useNavigate();
  const [userClass, setUserClass] = useState([]);
  const [submit, setSubmit] = useState(false);
  const [classCode, setClassCode] = useState({
    code: "",
  });
  let n, value;
  const handleInputs = (e) => {
    n = e.target.name;
    value = e.target.value;
    setClassCode({ ...classCode, [n]: value });
  };

  const postData = async (e) => {
    e.preventDefault();
    const { code } = classCode;
    console.log(classCode);
    const res = await fetch("/joinclass", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        code,
        email: props.userData.email,
      }),
    });
    const data = await res.json();
    console.log(data);
    console.log(userClass);

    if (res.status === 422 || !data) {
      window.alert("Class does not exists or already joined!");
    } else {
      window.alert("Successful");
      setUserClass((prev) => {
        return [...prev, data.class];
      });
      setSubmit(false);
    }
  };
  //Fetching the class details of respective user
  const homePage = async () => {
    try {
      const res = await fetch("/studenthome/classes", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        credentials: "include",
      });
      const classList = await res.json();
      console.log("I am here");
      console.log(classList);
      setUserClass(classList.classList);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    homePage();
  }, []);

  return (
    <>
      <div className="classT-btn">
       

        <button className="join" onClick={() => setSubmit(true)}>
          <span className="circle" aria-hidden="true">
            <span className="icon arrow"></span>
          </span>
          <span className="button-text">Join Class</span>
        </button>
      </div>
      {submit && (
        <div className="form-popup" id="myForm">
          <form className="form-container">
            <h1>Join Class</h1>

            <label htmlFor="name">
              <b>Class Code</b>
            </label>
            <input
              type="text"
              onChange={handleInputs}
              placeholder="Enter Class Code"
              name="code"
            />
            <button className="btnjoin" onClick={postData}>
              Submit
            </button>
            <button className="btnjoin cancel" onClick={() => setSubmit(false)}>
              Close
            </button>
          </form>
        </div>
      )}
      <div className="card-item" id="card-item">
        {userClass.map((item, index) => (
          <CardS item={item} key={index} />
        ))}
      </div>
    </>
  );
};

export default ClassS;
