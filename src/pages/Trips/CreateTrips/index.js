import React, { useContext, useState } from "react";
import "./CreateTrips.scss";
import { Button, Popconfirm } from "antd";
import { AiOutlineArrowLeft } from "react-icons/ai";
import View0 from "./Views/View0";
import GroupTrips from "./GroupTrips";
import Packages from "./Packages";
import { MyContext } from "../../../App";

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
  const [loading, setLoading] = useState(false);

  const context = useContext(MyContext)

  const onClick = () => {
    setLoading(true);
    handleOnClickNext();
    setLoading(false);
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
       <Button type="primary" className="btn-success"  loading={loading} onClick={onClick}>
       Create Trip
     </Button>
      : <Button type="primary" loading={loading} onClick={onClick}>
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
