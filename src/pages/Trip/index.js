import React, { useContext, useEffect, useState } from "react";
import "./Trip.scss";
import { useParams } from "react-router-dom";
import { AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import {MdOutlinePhoto} from "react-icons/md";
import {VscFeedback} from "react-icons/vsc";
import { useQuery } from "react-query";
import { getSingleTripBySlug } from "../../action/req";
import { MyContext } from "../../App";
import NotFound from "../NotFound";
import ViewTrip from "./Tabs/ViewTrip";


export default function SingleTrip() {
  let { slug } = useParams();

  const context = useContext(MyContext)


  let { isLoading, error ,data} = useQuery(`singleTrip/${slug}`, () => getSingleTripBySlug(slug));

  data = data?.data?.trip

  useEffect(() => {
  
    if(isLoading)
    {
      context.setLoading({
        type: "SET_LOADING",
        payload: true,
      });
    }
    else{
      context.setLoading({
        type: "SET_LOADING",
        payload: false,
      });
    }

  }, [isLoading]);
 

  const [tabs, setTabs] = useState("view");

  const handleTabChange = (name) => {
    setTabs(name);
  };
  return (
    <>
    {data && (
  <div className="trip">
  <div className="trip-heading">{data.name}</div>
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
              tabs === "feedback" ? "selected" : ""
            }`}
            onClick={() => handleTabChange("feedback")}
          >
            <VscFeedback/>
            Feedback
       
        </div>


      </div>
    </div>
    <div className="trip-body-right">

            {tabs==="view" && <ViewTrip data = {data}/>}
    </div>
  </div>
</div>
    )}
    { !isLoading  && !data && (
     <NotFound/>
    )}
    </>
  );
}
