import React from "react";
import { useNavigate } from "react-router-dom";
import "../Css/card.scss";

const CardT = (props) => {
  const navigate = useNavigate();
  const { name, title, code, suser } = props.item;
  const deleteClass = async () => {
    const res = await fetch("/deleteclass", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        code,
      }),
    });
    const data = await res.json();
    console.log(data);
    alert(data.message);

    props.deleteUser(props.index);
  };
  const openClass = () => {
    navigate("/teacherhome/classes/assignment", {
      state: props.item,
    });
  };
  return (
    <div className="cardBox">
      <div className="cardBoxHeader" onClick={openClass}>
        <img
          className="cardBoxImg"
          src={"https://gstatic.com/classroom/themes/img_read.jpg"}
          alt="img"
        ></img>
        <div className="cardTitle">{title}</div>
      </div>
      <div className="cardBoxBody">
        <div>{name}</div>
      </div>
      <div className="cardBoxFooter">
        <div>{code}</div>
        <button className="noselect" onClick={deleteClass}>
          <span className="text">Delete</span>
          <span className="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
};

export default CardT;
