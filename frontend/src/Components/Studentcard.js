import React from "react";
import { useNavigate } from "react-router-dom";
import "../Css/assignmentcard.scss";

const Studentcard = (props) => {
  const navigate = useNavigate();
  const { questionNumber, question } = props.item;

  return (
    <div
      className="cardBox"
      onClick={() => {
        navigate("/studenthome/classes/assignment/assignnum", {
          state: { item: props.item, code: props.code },
        });
      }}
    >
      <div className="cardBoxHeader">
        <div className="cardTitle2">{questionNumber}</div>
        <img
          className="cardBoxImg"
          src={require("../Images_copy/bonbon-child-at-math-lesson-with-calculator-and-apple-1.png")}
          height="40"
        ></img>
      </div>
      <div className="cardBoxBody">
        <div>{question}</div>
      </div>
    </div>
  );
};

export default Studentcard;
