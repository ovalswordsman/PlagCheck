import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "../Css/teacherthird.css";
import axios from "axios";
const TeacherThird = () => {
  const location = useLocation();
  const { questionNumber, question } = location.state.item;
  const { item, code } = location.state;
  console.log(item, code);
  const [report, setreport] = useState([]);
  const [solutionDetails, setsolutionDetails] = useState({
    roll_no: "",
    fname: "",
    solution: "",
  });
  const [solnL, setsolnL] = useState([]);
  let n, value;
  const handleInputs = (e) => {
    n = e.target.name;
    value = e.target.value;

    setsolutionDetails({ ...solutionDetails, [n]: value });
  };
  const homePage = async () => {
    try {
      const res = await fetch("/solutiondetails", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({ code, questionNumber }),
      });
      const solutionList = await res.json();
      console.log(solutionList);
      setsolnL(solutionList.solutions);
      console.log(solnL);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    homePage();
  }, []);
  const plagReport = () => {
    axios
      .post("http://127.0.0.1:5000/teacherplagreport", {
        code,
        questionNumber,
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

  return (
    <section className="teacher-assignment">
      <div className="title2">
        <h1 className="first">{questionNumber}</h1>
        <h2 className="second">{code}</h2>
      </div>
      <div className="question2">
        <h2>{question}</h2>
      </div>
      <button className="scan4" onClick={plagReport}>
        Scan for plagiarism
      </button>
      {report.length !== 0 && (
        <div id="report" className="reportteacher">
          <h4>Plagiarism Report</h4>
          <table className="table table-striped">
            <tr className="bg-info">
              <th>Roll1</th>
              <th>Roll2</th>
              <th>Similarity_Score</th>
            </tr>

            <tbody id="myTable">
              {report.map((entries) => {
                return (
                  <tr>
                    <th>{entries[0]}</th>
                    <th>{entries[1]}</th>
                    <th>{entries[2]}</th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      <div>
        {solnL.map((item, i) => {
          return (
            <div className="solutionlist">
              <div className="solutionroll"> {item.roll_no}</div>
              <div className="solutionfname"> {item.fname}</div>
              <div className="solutioncontent"> {item.solution}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TeacherThird;
