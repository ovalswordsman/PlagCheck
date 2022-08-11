import React from "react";
import "../Css/guestpopup.scss";
import { useEffect } from "react";

function Guestpopup(props) {
  console.log(props?.report);
  return (
    <div className="guestPopup">
      
      <a onClick={props.closePopup} className="close">
        &times;
      </a>
      
      {props.buttonPopup === 1 ? (
        <div className="grammer">
          <div className="grammerTitle">Grammer Report</div>
          <div className="grammerBody">
            {props?.report?.map((item, i) => {
              return (
                <>
                  <div className="grammerBodyTitle">{item[0]}</div>
                  <div className="grammerDesc">
                    <div className="grammerDescTitle">
                      <div>{item[1][0]}</div>
                      <div>{item[1][1]}</div>
                    </div>
                    {item[1].map((desc, i) => {
                      return (
                        i >= 2 && <div className="grammerDescBody">{desc}</div>
                      );
                    })}
                  </div>
                </>
              );
            })}
          </div>
        </div>
      ) : props.buttonPopup === 2 ? (
        <div className="plag">
          <div className="plagTitle">Plagrism Report</div>
          <div className="plagBody">
            
            <>
              <div className="plagBodyTitle">
                
              </div>
              <div className="plagDesc">
                
                <table className="styled-table">
                  <tr className="bg-info">
                    <th>File1</th>
                    <th>File2</th>
                    <th>Simlarity_Score</th>
                  </tr>

                  <tbody id="myTable">
                    {props?.report.map((entries) => {
                      return (
                        <tr className="active-row">
                          <th>{entries[0]}</th>
                          <th>{entries[1]}</th>
                          <th>{entries[2]}</th>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                
              </div>
            </>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Guestpopup;
