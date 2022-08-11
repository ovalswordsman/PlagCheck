import React from "react";
import { useNavigate } from "react-router-dom";
import "../Css/card.scss";

const CardS = (props) => {
  const navigate = useNavigate();
  const { name, title, code } = props.item;

  return (
    <div
      className="cardBox"
      onClick={() => {
        navigate("/studenthome/classes/assignment", {
          state: props.item,
        });
      }}
    >
      <div className="cardBoxHeader">
        <img
          className="cardBoxImg"
          
          src={"https://gstatic.com/classroom/themes/img_backtoschool.jpg"}
        ></img>
        <div className="cardTitle">{title}</div>
      </div>
      <div className="cardBoxBody">
        <div className="cardBoxBody">{name}</div>
      </div>
      <div className="cardBoxFooter">
        <div className="cardBoxFooter">{code}</div>
      </div>
    </div>
  );
};

export default CardS;
