import React, { useContext, useState } from "react";
import { Form, Select } from "antd";
import '../CreateTrips.scss'
import { Footer, Header } from "..";
import { MyContext } from "../../../../App";
import { alerts } from "../../../../utils/alert";

export default function View0() {

  const context = useContext(MyContext)
  const [tripType, setTripType] = useState()

  const handleOnClickNext = () => {

      if(!tripType)
      {
        alerts.error("Select Trip Type")
        return 
      }

      if(tripType==="groupTour")
      {

        context.setCreateTripView({type:"SET_CREATE_TRIPVIEW", payload:context.createTripView+1})
      }
      else{
        context.setCreateTripView({type:"SET_CREATE_TRIPVIEW", payload:-1})

      }
  };
  
  const handleOnClickBack = () => {
    if (context.createTripView > 1) {
    context.setCreateTripView({type:"SET_CREATE_TRIPVIEW", payload:context.createTripView-1})
    }
  };

  const handleOnChange = (value)=>{
    setTripType(value)
  }

  return (
    <>
      <div className="createTrips">
        <Header
          heading={"Create Trip"}
          view={context.createTripView}
          handleOnClickBack={handleOnClickBack}
        ></Header>

        <div className="createTrips-body">
          <div className="createTrips-body-view0">
            <Form
              autoComplete="off"
              colon={false}
              labelCol={{
                span: 10,
              }}
            >
              <Form.Item label="Choose Trip Type">
                <Select
                  style={{ width: 300 }}
                  placeholder="Choose an option "
                    onChange={handleOnChange}
                  options={[
                    {
                      label: "Group Tour",
                      value: "groupTour",
                    },
                    {
                      label: "Package",
                      value: "package",
                    },
                  ]}
                />
              </Form.Item>

              
            </Form>
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
