import React, { useState } from "react";
import "./Trip.scss";
import { useParams } from "react-router-dom";
import { AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import {MdOutlinePhoto} from "react-icons/md";
import {VscFeedback} from "react-icons/vsc";


export default function SingleTrip() {
  let { id } = useParams();

  console.log(id);
  const [tabs, setTabs] = useState("view");

  const handleTabChange = (name) => {
    setTabs(name);
  };
  return (
    <>
      <div className="trip">
        <div className="trip-heading">Manali Adventure</div>
        <div className="trip-body">
          <div className="trip-body-left">
            <div className="trip-body-left-options">
          
                <div
                  className={`trip-body-left-options-option ${
                    tabs === "view" ? "selected" : ""
                  }`}
                  onClick={() => handleTabChange("view")}
                >
                    <AiOutlineEye/>
                  View Trip
                </div>
                <div
                  className={`trip-body-left-options-option ${
                    tabs === "edit" ? "selected" : ""
                  }`}
                  onClick={() => handleTabChange("edit")}
                >
                    <AiOutlineEdit/>    
                  Edit
                </div>
                <div
                  className={`trip-body-left-options-option ${
                    tabs === "media" ? "selected" : ""
                  }`}
                  onClick={() => handleTabChange("media")}
                >
                  <MdOutlinePhoto/>
                  Photos/Videos
             
              </div>

              <div
                  className={`trip-body-left-options-option ${
                    tabs === "Feedback" ? "selected" : ""
                  }`}
                  onClick={() => handleTabChange("Feedback")}
                >
                  <VscFeedback/>
                  Feedback
             
              </div>


            </div>
          </div>
          <div className="trip-body-right"></div>
        </div>
      </div>
    </>
  );
}
