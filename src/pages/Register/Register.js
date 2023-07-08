import React, { useEffect } from "react";
import "./Register.scss";
import { Alert, Button, Form, Input, Select, Upload } from "antd";
import { useState } from "react";
import { AiOutlineArrowLeft, AiOutlineBackward } from "react-icons/ai";
import { getCities, getStates } from "../../utils/State-Cities";
import TextArea from "antd/es/input/TextArea";
import { UploadOutlined } from "@ant-design/icons";
import { adminRegister, checkAdminExists } from "../../action/req";
import { Link } from "react-router-dom";

const { Option } = Select;
export default function Register() {
  const [form] = Form.useForm();
  const [cities, setCities] = useState([]);
  const [adminExists, setAdminExists] = useState(false);
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(false);

  const handleOnStateSelect = (value) => {
    handleOnChangeCompanyAddress(value, "state");

    setCities(getCities(value));
  };

  const onFinish = async(values) => {
    console.log("Received values of form: ", details);

      try {
        
        const result = await adminRegister(details)

        console.log(result)
        if(result.statusCode==="10000")
        {

          handleOnClickNext("formSubmit");
        }


      } catch (error) {
        
      }


  };

  const [page, setPage] = useState("contactDetails");

  const handleOnChange = (value, field) => {
    setDetails({
      ...details,
      [field]: value,
    });
  };
  const handleOnChangeCompanyDetails = (value, field) => {
    setDetails({
      ...details,
      companyRegistration: {
        ...details.companyRegistration,
        [field]: value,
      },
    });
  };

  const handleOnChangeCompanyAddress = (value, field) => {
    setDetails({
      ...details,
      companyRegistration: {
        ...details?.companyRegistration,
        address: {
          ...details?.companyRegistration?.address,
          [field]: value,
        },
      },
    });
  };

  const handleOnChangeSocialMedialLinks = (value, field) => {
    setDetails({
      ...details,
      socialMediaLinks: {
        ...details.socialMediaLinks,
        [field]: value,
      },
    });
  };
  const handleOnClickNext = async (nextPage) => {
    setPage(nextPage);
  };

  const handleSubmitContactDetails = async (nextPage) => {
    setLoading(true);
    try {
      const result = await checkAdminExists({
        email: details?.email,
        phone: details?.phone,
      });

      if (result.statusCode === "10000") {
        if (result.data) {
          setAdminExists(true);
        } else {
          setPage(nextPage);
        }
      }
    } catch (error) {}

    setLoading(false);
  };

  const handleOnClickBack = (prevPage) => {
    setPage(prevPage);
  };

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const annualTurnoverOptions = [
    {
      label: "Below 5 Lakhs",
      value: "Below 5 Lakhs",
    },

    {
      label: "5 - 10 Lakhs",
      value: "5 - 10  Lakhs",
    },

    {
      label: "10 - 20 Lakhs",
      value: "10 - 20 Lakhs",
    },

    {
      label: "Above 20 Lakhs",
      value: "Above 20 Lakhs",
    },
  ];

  useEffect(() => {
    console.log(details);
  }, [details]);

  return (
    <div className="register">
      <div className="register-container">
        <div className="register-container-top">
          <h3 className="heading">Admin Registeration</h3>
        </div>
        <div className="register-container-form">
          {page == "contactDetails" && (
            <>
              {adminExists === true ? (
                <>
                  <Alert
                    message="Already Exists"
                    description="Email or Mobile Number already exists. "
                    type="error"
                    showIcon
                  />
                  <div className="footerButtonDiv">
                    <Button
                      type="secondary"
                      className="btn-secondary"
                      onClick={() => setAdminExists(false)}
                      style={{ marginTop: "2rem" }}
                    >
                      Go Back
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="subHeading"> Contact Details</div>
                  <Form
                    form={form}
                    name="register"
                    onFinish={() => handleSubmitContactDetails("userDetails")}
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
                        value={details?.phone}
                        onChange={(e) =>
                          handleOnChange(e.target.value, "phone")
                        }
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
                      <Input
                        value={details?.email}
                        onChange={(e) =>
                          handleOnChange(e.target.value, "email")
                        }
                      />
                    </Form.Item>
                    <div className="footerButtonDiv">
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                      >
                        Next
                      </Button>
                    </div>

                    
                  </Form>
                  <div className="newRegisterationDiv"> 
            <Link to="/login" >Back To Login</Link>
            </div>
                </>
              )}
            </>
          )}

          {page == "userDetails" && (
            <>
              <div className="subHeading"> User Details</div>
              <Form
                form={form}
                name="register"
                onFinish={() => handleOnClickNext("companyDetails")}
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
                  <Input
                    value={details?.firstName}
                    onChange={(e) =>
                      handleOnChange(e.target.value, "firstName")
                    }
                  />
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
                  <Input
                    value={details?.lastName}
                    onChange={(e) => handleOnChange(e.target.value, "lastName")}
                  />
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
                  <Select
                    placeholder="select your gender"
                    value={details?.gender}
                    onChange={(val) => handleOnChange(val, "gender")}
                  >
                    <Option value="Male">Male</Option>
                    <Option value="Female">Female</Option>
                    <Option value="Other">Other</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="age"
                  label="Age"
                  labelCol={{ span: 6 }}
                  labelAlign="left"
                  rules={[
                    {
                      required: true,
                      message: "Please enter Your age",
                    },
                  ]}
                >
                  <Input
                    type="number"
                    min={0}
                    value={details?.age}
                    onChange={(e) => handleOnChange(e.target.value, "age")}
                  />
                </Form.Item>

                <div className="footerButtonDiv">
                  <Button
                    type="secondary"
                    className="btn-secondary"
                    onClick={() => handleOnClickBack("contactDetails")}
                  >
                    Back
                  </Button>

                  <Button type="primary" htmlType="submit">
                    Next
                  </Button>
                </div>
              </Form>
            </>
          )}

          {page == "companyDetails" && (
            <>
              <div className="subHeading"> Company Details</div>
              <Form
                form={form}
                name="register"
                onFinish={() => handleOnClickNext("uploadDocuments")}
                scrollToFirstError
                requiredMark={false}
                colon={false}
              >
                <Form.Item
                  name="companyName"
                  label="Company Name"
                  labelCol={{ span: 7 }}
                  labelAlign="left"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Company Name",
                    },
                  ]}
                >
                  <Input
                    value={details?.companyRegistration?.legalCompanyName}
                    onChange={(e) =>
                      handleOnChangeCompanyDetails(
                        e.target.value,
                        "legalCompanyName"
                      )
                    }
                  />
                </Form.Item>

                <Form.Item
                  name="annualTurnover"
                  label="Annual Turnover"
                  labelCol={{ span: 7 }}
                  labelAlign="left"
                  rules={[
                    {
                      required: true,
                      message: "Please choose Annual Turnover",
                    },
                  ]}
                >
                  <Select
                    defaultValue={"Choose Amount"}
                    value={details?.companyRegistration?.annualTurnover}
                    options={annualTurnoverOptions}
                    onChange={(val) => handleOnChangeCompanyDetails(val, "annualTurnover")}
                  />
                </Form.Item>

                <Form.Item
                  name="gstin"
                  label="GSTIN"
                  labelCol={{ span: 7 }}
                  labelAlign="left"
                  rules={[
                    {
                      required:
                        details?.companyRegistration?.annualTurnover ===
                        "Above 20 Lakhs",
                      message: "Please enter GSTIN Number",
                    },
                  ]}
                >
                  <Input
                    value={details?.companyRegistration?.gstin}
                    onChange={(e) =>
                      handleOnChangeCompanyDetails(e.target.value, "gstin")
                    }
                  />
                </Form.Item>

                <Form.Item
                  name="yearOfFoundation"
                  label="Founded in"
                  labelCol={{ span: 7 }}
                  labelAlign="left"
                  rules={[
                    {
                      required: true,
                      message: "Please enter Year",
                    },
                  ]}
                >
                  <Input
                    type="number"
                    value={details?.companyRegistration?.yearOfFoundation}
                    onChange={(e) =>
                      handleOnChangeCompanyDetails(
                        e.target.value,
                        "yearOfFoundation"
                      )
                    }
                  />
                </Form.Item>

                <Form.Item
                  label="State"
                  name={"state"}
                  labelCol={{ span: 7 }}
                  labelAlign="left"
                  rules={[
                    {
                      required: true,
                      message: "Please Select State",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    defaultValue={"Choose State"}
                    options={getStates()}
                    onChange={handleOnStateSelect}
                  />
                </Form.Item>
                <Form.Item
                  label="City"
                  name="city"
                  labelCol={{ span: 7 }}
                  labelAlign="left"
                  rules={[
                    {
                      required: true,
                      message: "Please Select City",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    defaultValue={"Choose City"}
                    options={cities}
                    onChange={(e) => handleOnChangeCompanyAddress(e, "city")}
                  />
                </Form.Item>
                <Form.Item
                  label="Address"
                  name="address"
                  labelCol={{ span: 7 }}
                  labelAlign="left"
                  rules={[
                    {
                      required: true,
                      message: "Please enter Address",
                    },
                  ]}
                >
                  <Input
                    placeholder="Address"
                    // rows={6}
                    // value={details?.companyRegistration?.address?.address}

                    onChange={(e) =>
                      handleOnChangeCompanyAddress(e.target.value, "address")
                    }
                  />
                </Form.Item>

                <Form.Item
                  label="Social Media Links"
                  className="multiInputLabels"
                  labelCol={{ span: 7 }}
                  labelAlign="left"
                >
                  <Input
                    placeholder="Instagram"
                    value={details?.socialMediaLinks?.instagram}
                    onChange={(e) =>
                      handleOnChangeSocialMedialLinks(
                        e.target.value,
                        "instagram"
                      )
                    }
                  />
                  <Input
                    placeholder="Facebook"
                    value={details?.socialMediaLinks?.facebook}
                    onChange={(e) =>
                      handleOnChangeSocialMedialLinks(
                        e.target.value,
                        "facebook"
                      )
                    }
                  />
                  <Input
                    placeholder="Youtube"
                    value={details?.socialMediaLinks?.youtube}
                    onChange={(e) =>
                      handleOnChangeSocialMedialLinks(e.target.value, "youtube")
                    }
                  />
                </Form.Item>

                <div className="footerButtonDiv">
                  <Button
                    type="secondary"
                    onClick={() => handleOnClickBack("userDetails")}
                  >
                    Back
                  </Button>

                  <Button type="primary" htmlType="submit">
                    Next
                  </Button>
                </div>
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

                <div className="footerButtonDiv">
                  <Button
                    type="secondary"
                    onClick={() => handleOnClickBack("companyDetails")}
                  >
                    Back
                  </Button>

                  <Button
                    type="primary"
                    className="btn-success"
                    htmlType="submit"
                  >
                    Sign up
                  </Button>
                </div>
              </Form>
            </>
          )}
          {page == "formSubmit" && (
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
