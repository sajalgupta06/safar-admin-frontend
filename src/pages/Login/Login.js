import React, { useContext, useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import "./Login.scss";
import { alerts } from "../../utils/alert";
import { MyContext } from "../../App";
import { adminlogin } from "../../action/req";
import { Link } from "react-router-dom";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const context = useContext(MyContext)

  const onFinish = async(values) => {
   

    try {

      setLoading(true)
      const result = await adminlogin(values)

      if(result.statusCode==="10000")
      {
        alerts.success("Login Successful")
        context.setIsAuthenticated({ type: "IS_AUTHENTICATED", payload: true });


        localStorage.setItem("a_token",result.data.tokens.accessToken)
        localStorage.setItem("r_token",result.data.tokens.refreshToken)

        

      }

      if(result.statusCode==="10001")
      {
        alerts.error(result.message)
    
      }

    } catch (error) {
      alerts.error("Error Occured")

    }
    setLoading(false)

  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <div className="login">
        <div className="login-container">
          <div className="login-container-top">
            <h3 className="heading">Admin Panel</h3>
          </div>
          <div className="login-container-form">
            <Form
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Email ID"
                name="email"
                labelCol={{ span: 6 }}
                labelAlign="left"
                rules={[
                  {
                    required: true,
                    message: "Please input your Email ID!",
                  },
                  {
                    type: "email",
                    message: "Please input valid Email ID!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                labelCol={{ span: 6}}
                labelAlign="left"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                  {
                    min: 6,

                    message:
                      "Password length must be greater than 6 characters",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

            
              <div className="footerButtonDiv">
                <Button type="primary" htmlType="submit" loading={loading}>
                  Login
                </Button>
              </div>


              {/* <Form.Item
                // style={{ marginTop: "10rem", marginRight:"2rem" }}
                wrapperCol={{
                  offset: 10  ,
                  // span: 16,
                }}
              >
                  <Link>New Registeration </Link>
              </Form.Item> */}

            </Form>
            <div className="newRegisterationDiv"> 
            <Link to="/register" >New Registeration</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
