import React, { useContext } from "react";
import { Form, Select, Switch } from "antd";
import '../CreateTrips.scss'
import { Footer, Header } from "..";
import { MyContext } from "../../../../App";

export default function View7(props) {

  const context = useContext(MyContext)
  const { tripDetails, setTripDetails } = props;

  const handleOnClickNext = () => {

    context.setCreateTripView({type:"SET_CREATE_TRIPVIEW", payload:context.createTripView+1})
  };
  
  const handleOnClickBack = () => {
    if (context.createTripView > 1) {
    context.setCreateTripView({type:"SET_CREATE_TRIPVIEW", payload:context.createTripView-1})
    }
  };

const handleOnChange = (val,field)=>{
    setTripDetails({
        ...tripDetails,
        [field]:val
    })
}

  return (
    <>
      <div className="createTrips">
        <Header
          heading={"Final Step"}
          view={context.createTripView}
          handleOnClickBack={handleOnClickBack}
        ></Header>

        <div className="createTrips-body">
          <div className="createTrips-body-view7">
            <div className="configBoxes">
            <div className="box">
                <label>Publish Trip</label>
                <Switch  onChange={(val)=>handleOnChange(val,"publish")}  />
            </div>
            <div className="box">
                <label>Accept Terms & Condition</label>
                <Switch onChange={(val)=>handleOnChange(val,"acceptTerms")}  />
            </div>
            <div className="box">
                <label>Allow Cancellation</label>
                <Switch onChange={(val)=>handleOnChange(val,"allowCancellation")}  />
            </div>

            </div>
          </div>
        </div>

        <Footer
          view={context.createTripView}
          handleOnClickNext={handleOnClickNext}
        ></Footer>
      </div>
    </>
  );
}
