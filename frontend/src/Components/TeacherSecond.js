import "../Css/assignment.scss";
import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../Css/studenthome.css";
import "../Css/cardt2.css";
import AssignmentsCard from "./AssignmentCard";
const TeacherSecond = () => {
  const location = useLocation();
  const { title, name, code, email, assignments } = location.state;
  const [assignDetails, setassignDetails] = useState({
    questionNumber: "",
    question: "",
  });
  const [assignL, setassignL] = useState([]);
  const [submit, setSubmit] = useState(false);

  let n, value;
  const handleInputs = (e) => {
    n = e.target.name;
    value = e.target.value;

    setassignDetails({ ...assignDetails, [n]: value });
  };

  //Registering the assignment created by user
  const postData = async (e) => {
    e.preventDefault();
    const { questionNumber, question } = assignDetails;

    const res = await fetch("/createassign", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        questionNumber,
        question,
        code,
      }),
    });
    const data = await res.json();

    if (res.status === 422 || !data) {
      window.alert(data.error);
    } else {
      window.alert("Successful");
      setassignL((prev) => {
        return [...prev, data.assignment];
      });
      setSubmit(false);
    }
  };

  //Fetching the assignment details
  const homePage = async () => {
    try {
      const res = await fetch("/assignmentdetails", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({ code }),
        credentials: "include",
      });
      const assignmentList = await res.json();
      console.log(assignmentList);
      setassignL(assignmentList.assignmentList);
      console.log(assignL);
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
          <span>Create Assignment</span>
        </button>
      </div>
      {submit && (
        <div className="form-popup" id="myForm">
          <form className="form-container">
            <h1>Create Assignment</h1>

            <label htmlFor="name">
              <b>Question Number</b>
            </label>
            <input
              type="text"
              onChange={handleInputs}
              placeholder="Enter Question Number"
              name="questionNumber"
            />
            <label htmlFor="class-code">
              <b>Question</b>
            </label>
            <textarea
              className="inputquestion2"
              type="text"
              onChange={handleInputs}
              placeholder="Enter Question"
              name="question"
              cols="40"
              rows="5"
            ></textarea>

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
        {assignL.map((item, index) => (
          <AssignmentsCard code={code} item={item} key={index} />
        ))}
      </div>
    </>
  );
};

export default TeacherSecond;
