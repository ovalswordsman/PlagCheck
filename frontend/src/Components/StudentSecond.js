import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "../Css/studenthome.css";
import Studentcard from "./Studentcard";
const StudentSecond = () => {
  const location = useLocation();
  const { title, name, code, email, assignments } = location.state;
  const [assignDetails, setassignDetails] = useState({
    questionNumber: "",
    question: "",
  });
  const [assignL, setassignL] = useState([]);
  let n, value;
  const handleInputs = (e) => {
    n = e.target.name;
    value = e.target.value;

    setassignDetails({ ...assignDetails, [n]: value });
  };
  //Fetching the assignment details of respective user
  const homePage = async () => {
    try {
      const res = await fetch("/assignmentdetails", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({code}),
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
      <div className="card-item" id="card-item">
        {assignL.map((item, index) => (
          <Studentcard code={code} item={item} key={index} />
        ))}
      </div>
    </>
  );
};

export default StudentSecond;
