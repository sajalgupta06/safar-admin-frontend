import React, { useContext } from "react";
import "../CreateTrips.scss";
import { Footer, Header } from "..";
import { Form, Input } from "antd";
import { MyContext } from "../../../../App";

export default function View1() {
    const context = useContext(MyContext);
    const handleOnClickNext = () => {};
    const handleOnClickBack = () => {};
    
  return (
  <>
   <div className="createTrips">
        <Header
          heading={"Group Packages"}
          view={context.createTripView}
          handleOnClickBack={handleOnClickBack}
        ></Header>

        <div className="createTrips-body">
          <div className="createTrips-body-view1">
            <Form
              labelCol={{
                span: 2,
              }}
              formLayout  = "inline"
              // onFinish={onFinish}
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input />
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
  )
}
