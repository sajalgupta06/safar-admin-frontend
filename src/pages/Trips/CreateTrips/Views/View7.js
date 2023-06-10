import React, { useContext, useEffect, useState } from "react";
import { Form, Select, Switch } from "antd";
import '../CreateTrips.scss'
import { Footer, Header } from "..";
import { MyContext } from "../../../../App";
import { createTrip } from "../../../../action/req";
import { alerts } from "../../../../utils/alert";

export default function View7(props) {

  const context = useContext(MyContext)

  const [options, setOptions] = useState({})

  const handleOnClickNext = async() => {


    if(!options?.acceptTerms)
    {
      alerts.error("Please Accept Terms and Conditions")
      return 
    }

    const result = await createTrip(options);
    if (result.statusCode == "10000") {

      alerts.success("Trip Created Successfully" );

      return true;
    }

        alerts.error("Erro while  Creating  Trip")

    return false;

  };
  
  const handleOnClickBack = () => {
    if (context.createTripView > 1) {
    context.setCreateTripView({type:"SET_CREATE_TRIPVIEW", payload:context.createTripView-1})
    }
  };

  useEffect(() => {
   console.log(options)
  }, [options]);

const handleOnChange = (val,field)=>{
  setOptions({
        ...options,
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
                <Switch  onChange={(val)=>handleOnChange(val,"published")}  />
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
