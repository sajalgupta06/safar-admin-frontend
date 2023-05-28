import React, { useContext, useState } from "react";
import "./CreateTrips.scss";
import { Button, Form, Select } from "antd";
import { AiOutlineArrowLeft } from "react-icons/ai";
import View0 from "./Views/View0";
import GroupTrips from "./GroupTrips";
import Packages from "./Packages";
import { MyContext } from "../../../App";

export const Header = ({ heading, view, handleOnClickBack ,children}) => {
  const handleBackClick = () => {
    handleOnClickBack();
  };

  return (
    <div className="createTrips-header">
      <div className="heading">
        {view > 1 && (
          <AiOutlineArrowLeft className="icon" onClick={handleBackClick} />
        )}
        <p>{heading}</p>
      </div>
      {children}
    </div>
  );
};

export const Footer = ({ view,  handleOnClickNext }) => {
  const [loading, setLoading] = useState(false);

  const onClick = () => {
    setLoading(true);
    handleOnClickNext();
    setLoading(false);
  };

  return (
    <div className="createTrips-footer">
      <Button type="secondary" >
        Cancel
      </Button>
      <Button type="primary" loading={loading} onClick={onClick}>
        Next
      </Button>
    </div>
  );
};

export default function CreateTrips() {

    const context = useContext(MyContext)

  return (
    <>
      {context.createTripView===0 ? <View0 />: context.createTripView >0 ? <GroupTrips/>:<Packages/>}
    </>
  );
}
