import React, { useContext } from "react";
import { Form, Select } from "antd";
import '../CreateTrips.scss'
import { Footer, Header } from "..";
import { MyContext } from "../../../../App";

export default function View0() {

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
                  //   onChange={handleChange}
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

              <Form.Item label="Choose Create Option">
                <Select
                  style={{ width: 300 }}
                  placeholder="Choose an option "
                  //   onChange={handleChange}
                  options={[
                    {
                      label: "Create Trip From  Template",
                      value: "groupTour",
                    },
                    {
                      label: "Create Trip From Scratch",
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
