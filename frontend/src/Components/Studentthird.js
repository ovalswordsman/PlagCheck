import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../Css/studentthird.css";
import axios from "axios";
import Guestpopup from "./Guestpopup";

const Studentthird = (props) => {
  console.log(props.userData);
  const location = useLocation();
  const { questionNumber, question } = location.state.item;
  const { item, code } = location.state;
  const [assign, setassign] = useState({
    fname: "",
    solution: ``,
  });
  const [buttonPopup, setbuttonPopup] = useState(0);
  const closePopup = () => {
    setbuttonPopup(0);
  };
  const [report, setreport] = useState([]);
  const [sub, setsub] = useState(``);

  //Submitting solution
  const submitSoln = async (e) => {
    const res = await fetch("/submitsoln", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        fname: assign.fname,
        solution: assign.solution,
        code,
        questionNumber,
      }),
    });
    const data = await res.json();

    if (res.status === 422 || !data) {
      window.alert(data.error);
    } else {
      window.alert(data.message);
    }
  };

  const showFile = async (e) => {
    var mf = document.getElementById("myfile");
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      console.log(text);
      alert(text);
      setassign({ fname: mf.files.item(0).name, solution: text });
    };
    reader.readAsText(e.target.files[0]);
  };
  const onUpload = async (e) => {
    submitSoln();
  };
  const fileData = () => {
    var mf = document.getElementById("myfile");
    if (mf) {
      return (
        <div className="details">
          <h2>File Details:</h2>

          <p>File Name: {mf.files.item(0).name}</p>

          <p>File Type: {mf.files.item(0).type}</p>

          <p>
            Last Modified: {mf.files.item(0).lastModifiedDate.toDateString()}
          </p>
        </div>
      );
    } else {
      return (
        <div className="details">
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };
  const printReportGramm = () => {
    return (
      <div className="grammarreport">
        <h4>Grammar Report</h4>
        {report.join("\n")}
      </div>
    );
  };
  const grammReport = () => {
    setbuttonPopup(1);
    axios
      .post("http://127.0.0.1:5000/studentgram", {
        code: code,
        questionNumber: questionNumber,
        roll_no: props.userData.roll_no,
      })
      .then(
        (response) => {
          var result = response.data;
          setreport(result);

          console.log(result);
          console.log(report);
        },
        (error) => {
          console.log(error);
        }
      );
  };
  const printsub = () => {
    return (
      <div>
        <h4>Submission</h4>
        {sub}
      </div>
    );
  };
  const viewSub = async () => {
    axios
      .post("http://127.0.0.1:5000/studentsub", {
        code: code,
        questionNumber: questionNumber,
        roll_no: props.userData.roll_no,
      })
      .then(
        (response) => {
          var result = response.data;
          setsub(result);

          console.log(result);
          console.log(sub);
        },
        (error) => {
          console.log(error);
        }
      );
  };
  return (
    <section className="student-assignment">
      <div className="title2">
        <h1 className="first">{questionNumber}</h1>
        <h2 className="second">{code}</h2>
      </div>
      <div className="question">
        <h2>{question}</h2>
      </div>

      <button className="viewbutton" onClick={viewSub}>
        View Submission
      </button>
      <div className="choosefile2">
        <input
          type="file"
          onChange={(e) => showFile(e)}
          className="myfile2"
          id="myfile"
          name="myfile"
        />
        <button onClick={(e) => onUpload(e)} className="upload2">
          <div className="svg-wrapper-1">
            <div className="svg-wrapper">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path
                  fill="currentColor"
                  d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                ></path>
              </svg>
            </div>
          </div>
          <span>Upload</span>
        </button>
        <div className="details">{assign.fname != "" && fileData()}</div>
      </div>
      <button className="scan3" onClick={grammReport}>
        Scan for gramatical errors
      </button>
      <div className="viewsubmission">{sub.length !== 0 && printsub()}</div>
      <div>
        {buttonPopup != 0 && (
          <Guestpopup
            closePopup={closePopup}
            report={report}
            buttonPopup={buttonPopup}
          />
        )}
      </div>
    </section>
  );
};

export default Studentthird;
