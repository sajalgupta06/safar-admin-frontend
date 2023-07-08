import React, { useContext, useState } from "react";
import "./CreateTrips.scss";
import { Button, Popconfirm } from "antd";
import { AiOutlineArrowLeft } from "react-icons/ai";
import View0 from "./Views/View0";
import GroupTrips from "./GroupTrips";
import Packages from "./Packages";
import { MyContext } from "../../../App";
import { useNavigate } from "react-router-dom";
import { declarations } from "../../../config";
import { alerts } from "../../../utils/alert";
import { getViewsNumber } from "./getViewsNumber";

export const Header = ({ heading, view, handleOnClickBack, children }) => {
  const onClick = () => {
    handleOnClickBack();
  };

  return (
    <div className="createTrips-header">
      <div className="heading">
        {view > 1 && (
          <AiOutlineArrowLeft className="icon" onClick={onClick} />
        )}
        <p>{heading}</p>
      </div>
      {children}
    </div>
  );
};

export const Footer = ({ view, handleOnClickNext }) => {
  const [btnLoading, setBtnLoading] = useState(false);
const navigate = useNavigate()
  const context = useContext(MyContext)

  const onClick = async() => {

    if(context.createTripView==getViewsNumber.finalStep)
    {
        navigate(`/${declarations.routes.ALL_TRIPS}`)
        alerts.info("We will Notify You once the trip is created")
        
        await handleOnClickNext();

      return
        
    }
    setBtnLoading(true);
    context.setNoSpinLoading({
      type: "SET_NOSPIN_LOADING",
      payload: true,
    });
    const res = await handleOnClickNext();
   
    if(res)
    {
      context.setCreateTripView({
        type: "SET_CREATE_TRIPVIEW",
        payload: context.createTripView + 1,
      });
    }

    context.setNoSpinLoading({
      type: "SET_NOSPIN_LOADING",
      payload: false,
    });

    setBtnLoading(false);
    
  };

 
  const confirm = (e) => {

    context.setCreateTripView({type:"SET_CREATE_TRIPVIEW", payload:0})


  };
  const cancel = (e) => {
  };

  return (
    <div className="createTrips-footer">

    {view!=0 && (
     <Popconfirm
     title="Cancel Trip"
     description="Are you sure to Cancel Trip"
     onConfirm={confirm}
     onCancel={cancel}
     okText="Yes"
     cancelText="No"
   >
 
   <Button danger  >Cancel</Button>
 
   </Popconfirm>
    )}
   

      {view==7?
       <Button type="primary" className="btn-success"  loading={btnLoading} onClick={onClick}>
       Create Trip
     </Button>
      : <Button type="primary" loading={btnLoading} onClick={onClick}>
      Next
    </Button>}
     
    </div>
  );
};

export default function CreateTrips() {
  const context = useContext(MyContext);

  return (
    <>
      {context.createTripView === 0 ? (
        <View0 />
      ) : context.createTripView > 0 ? (
        <GroupTrips />
      ) : (
        <Packages />
      )}
    </>
  );
}
