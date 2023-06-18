import React from "react";
import "./Register.scss";
import { Alert, Button, Form, Input, Select, Upload } from "antd";
import { useState } from "react";
import { AiOutlineArrowLeft, AiOutlineBackward } from "react-icons/ai";
import { getCities, getStates } from "../../utils/State-Cities";
import TextArea from "antd/es/input/TextArea";
import {  UploadOutlined } from '@ant-design/icons';
import { checkAdminExists } from "../../action/req";

const { Option } = Select;
export default function Register() {
  const [form] = Form.useForm();
  const [cities, setCities] = useState([]);

  const [details, setDetails] = useState()

  const handleOnStateSelect = (value) => {
    setCities(getCities(value));
  };
  const onFinish = (values) => {
    handleOnClickNext("formSubmit")
    console.log("Received values of form: ", values);
  };

  const [page, setPage] = useState("userDetails");

  const handleOnClickNext = async(nextPage) => {

    if(page==="contactDetails"){

        try {
          
          const result = await checkAdminExists({email:details?.email, phone:details?.phone})  

          if(result.statusCode==="10000")
          {
            if(result.data)
            {
                
            }
            else{
                setPage(nextPage);
            }
          }

        } catch (error) {
            
        }


    }

    setPage(nextPage);
  };

  const handleOnClickBack = (prevPage) => {
    setPage(prevPage);
  };

  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };


  return (
    <div className="register">
      <div className="register-container">
        <div className="register-container-top">
          <h3 className="heading">Admin Registeration</h3>
        </div>
        <div className="register-container-form">

        {page == "contactDetails" && (
            <>
              <div className="subHeading"> Contact Details</div>
              <Form
                form={form}
                name="register"
                onFinish={onFinish}
                scrollToFirstError
                requiredMark={false}
                colon={false}
              >
              

                <Form.Item
                  name="phone"
                  label="Mobile Number"
                  labelCol={{ span: 6 }}
                  labelAlign="left"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Mobile number!",
                    },
                  ]}
                >
                  <Input
                    addonBefore={"+91"}
                    style={{
                      width: "100%",
                    }}
                  />
                </Form.Item>

                <Form.Item
                  name="email"
                  label="E-mail"
                  labelCol={{ span: 6 }}
                  labelAlign="left"
                  rules={[
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                    {
                      required: true,
                      message: "Please input your E-mail!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  wrapperCol={{
                    offset: 21,
                    // span: 16,
                  }}
                  //   style={{ marginTop: "10rem", marginRight:"2rem" }}
                >
                  <Button
                    type="primary"
                    onClick={() => handleOnClickNext("userDetails")}
                  >
                    Next
                  </Button>
                </Form.Item>
              </Form>
            </>
          )}


          {page == "userDetails" && (
            <>
              <div className="subHeading"> User Details</div>
              <Form
                form={form}
                name="register"
                onFinish={onFinish}
                scrollToFirstError
                requiredMark={false}
                colon={false}
              >
                <Form.Item
                  name="firstName"
                  label="First Name"
                  labelCol={{ span: 6 }}
                  labelAlign="left"
                  rules={[
                    {
                      required: true,
                      message: "Please input your First Name",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="lastName"
                  label="Last Name"
                  labelCol={{ span: 6 }}
                  labelAlign="left"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Last Name",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="gender"
                  label="Gender"
                  labelCol={{ span: 6 }}
                  labelAlign="left"
                  rules={[
                    {
                      required: true,
                      message: "Please select gender!",
                    },
                  ]}
                >
                  <Select placeholder="select your gender">
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                    <Option value="other">Other</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="age"
                  label="Age"
                  labelCol={{ span: 6 }}
                  labelAlign="left"
                  rules={[
                    {
                      type: "number",
                      required: true,
                      message: "Please enter Your age",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="phone"
                  label="Mobile Number"
                  labelCol={{ span: 6 }}
                  labelAlign="left"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Mobile number!",
                    },
                  ]}
                >
                  <Input
                    addonBefore={"+91"}
                    style={{
                      width: "100%",
                    }}
                  />
                </Form.Item>

                <Form.Item
                  name="email"
                  label="E-mail"
                  labelCol={{ span: 6 }}
                  labelAlign="left"
                  rules={[
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                    {
                      required: true,
                      message: "Please input your E-mail!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  wrapperCol={{
                    offset: 18,
                    // span: 16,
                  }}
                  //   style={{ marginTop: "10rem", marginRight:"2rem" }}
                >
                     <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                    }}
                  >
                    <Button
                      type="secondary"
                      onClick={() => handleOnClickBack("contactDetails")}
                    >
                      Back
                    </Button>

                    <Button
                      type="primary"
                      onClick={() => handleOnClickNext("companyDetails")}
                    >
                      Next
                    </Button>
                  </div>
                </Form.Item>
              </Form>
            </>
          )}

          {page == "companyDetails" && (
            <>
              <div className="subHeading"> Company Details</div>
              <Form
                form={form}
                name="register"
                onFinish={onFinish}
                scrollToFirstError
                requiredMark={false}
                colon={false}
              >
                <Form.Item
                  name="companyName"
                  label="Company Name"
                  labelCol={{ span: 6 }}
                  labelAlign="left"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Company Name",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="gstin"
                  label="GSTIN"
                  labelCol={{ span: 6 }}
                  labelAlign="left"
                  rules={[
                    {
                      type: "number",
                      required: true,
                      message: "Please enter GSTIN Number",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="yearOfFoundation"
                  label="Founded in"
                  labelCol={{ span: 6 }}
                  labelAlign="left"
                  rules={[
                    {
                      type: "number",
                      required: true,
                      message: "Please enter Year",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Office Location"
                  className="multiInputLabels"
                  labelCol={{ span: 6 }}
                  labelAlign="left"
                >
                  <Select
                    showSearch
                    defaultValue={"Choose State"}
                    options={getStates()}
                    onChange={handleOnStateSelect}
                  />

                  <Select
                    showSearch
                    defaultValue={"Choose City"}
                    options={cities}
                  />

                  <TextArea placeholder="Address" rows={7} />
                </Form.Item>

                <Form.Item
                  label="Social Media Links"
                  className="multiInputLabels"
                  labelCol={{ span: 6 }}
                  labelAlign="left"
                >
                  <Input placeholder="Instagram" />
                  <Input placeholder="Facebook" />
                  <Input placeholder="Youtube" />
                </Form.Item>

                <Form.Item
                  wrapperCol={{
                    offset: 18,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                    }}
                  >
                    <Button
                      type="secondary"
                      onClick={() => handleOnClickBack("userDetails")}
                    >
                      Back
                    </Button>

                    <Button
                      type="primary"
                      onClick={() => handleOnClickNext("uploadDocuments")}
                    >
                      Next
                    </Button>
                  </div>
                </Form.Item>
              </Form>
            </>
          )}

          {page == "uploadDocuments" && (
            <>
              <div className="subHeading"> Upload Documents</div>
              <Form
                form={form}
                name="register"
                onFinish={onFinish}
                scrollToFirstError
                requiredMark={false}
                colon={false}
              >
           

                <Form.Item
                    name="uploadAadhar"
                    label=" Aadhar Card"
                    valuePropName="fileList"
                    labelCol={{ span: 8 }}
                    labelAlign="left"
                      getValueFromEvent={normFile}
                    >
                    <Upload name="logo" action="/upload.do" listType="picture">
                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                    </Form.Item>

                    <Form.Item
                    name="uploadPanCard"
                    label=" PAN Card"
                    valuePropName="fileList"
                    labelCol={{ span: 8 }}
                    labelAlign="left"
                      getValueFromEvent={normFile}
                    >
                    <Upload name="logo" action="/upload.do" listType="picture">
                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                    </Form.Item>
                <Form.Item
                  wrapperCol={{
                    offset: 17,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                    }}
                  >
                    <Button
                      type="secondary"
                      onClick={() => handleOnClickBack("companyDetails")}
                    >
                      Back
                    </Button>

                    <Button
                      type="primary"
                      className="btn-success"
                      onClick={onFinish}
                    >
                      Sign up
                    </Button>
                  </div>
                </Form.Item>
              </Form>
            </>
          )}
          {page=="formSubmit" && (
            <>
                <Alert
      message="Done !"
      description="Your Details are submitted. We will reach soon once details are verified"
      type="success"
      showIcon
    />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
