import React, { useContext } from "react";
import { Form, Select } from "antd";
import '../CreateTrips.scss'
import { Footer, Header } from "..";
import { MyContext } from "../../../../App";

export default function Photos() {

  const context = useContext(MyContext)

  const handleOnClickNext = () => {

    context.setCreateTripView({type:"SET_CREATE_TRIPVIEW", payload:context.createTripView+1})
  };
  
  const handleOnClickBack = () => {
    if (context.createTripView > 1) {
    context.setCreateTripView({type:"SET_CREATE_TRIPVIEW", payload:context.createTripView-1})
    }
  };

  return (
    <>
      <div className="createTrips">
        <Header
          heading={"Photos"}
          view={context.createTripView}
          handleOnClickBack={handleOnClickBack}
        ></Header>

        <div className="createTrips-body">
          <div className="createTrips-body-view5">
            
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
