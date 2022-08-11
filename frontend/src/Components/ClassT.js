import React from "react";
import CardT from "./CardT";
import "../Css/cardt.css";
import { useState, useEffect } from "react";

const ClassT = (props) => {
  //props includes email and role
  const [userClass, setUserClass] = useState([]);
  const [classDetails, setClassDetails] = useState({
    name: "",
    title: "",
    code: "",
  });
  const [submit, setSubmit] = useState(false);

  //Setting the classDetails input by user

  let n, value;
  const handleInputs = (e) => {
    n = e.target.name;
    value = e.target.value;

    setClassDetails({ ...classDetails, [n]: value });
  };

  //Registering the class created by user
  const postData = async (e) => {
    e.preventDefault();
    const { name, title, code } = classDetails;

    const res = await fetch("/registerclass", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name,
        title,
        code,
        email: props.userData.email,
      }),
    });
    const data = await res.json();
    console.log(data);
    if (res.status === 422 || !data) {
      window.alert("Fill data correctly / Class already exists");
    } else {
      window.alert("Successful");
      setUserClass((prev) => {
        return [...prev, data.class];
      });
      setSubmit(false);
    }
  };
  const deleteUser = (i) => {
    setUserClass((prev) => {
      console.log();
      prev.splice(i, 1);
      return [...prev];
    });
  };
  //Fetching the class details of respective user
  const homePage = async () => {
    try {
      const res = await fetch("/teacherhome/classes", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        credentials: "include",
      });
      const classList = await res.json();
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
      <div className="classT-btn2">
        <button
          onClick={() => {
            setSubmit(true);
          }}
          className="cssbuttons-io-button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path
              fill="currentColor"
              d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"
            ></path>
          </svg>
          <span>Create Class</span>
        </button>
      </div>
      {submit && (
        <div className="form-popup" id="myForm">
          <form className="form-container">
            <h1>Create Class</h1>

            <label htmlFor="name">
              <b>Class Name</b>
            </label>
            <input
              type="text"
              onChange={handleInputs}
              placeholder="Enter Class Name"
              name="name"
            />

            <label htmlFor="class-code">
              <b>Class title</b>
            </label>
            <input
              type="text"
              onChange={handleInputs}
              placeholder="Enter Class title"
              name="title"
            />
            <label htmlFor="class-code">
              <b>Class Code (Should be Unique)</b>
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
            <button
              className="btnjoin cancel"
              onClick={() => {
                setSubmit(false);
              }}
            >
              Close
            </button>
          </form>
        </div>
      )}
      <div className="card-item" id="card-item">
        {userClass.map((item, index) => (
          <CardT
            deleteUser={deleteUser}
            item={item}
            key={index}
            index={index}
          />
        ))}
      </div>
    </>
  );
};

export default ClassT;
