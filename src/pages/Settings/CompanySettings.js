import { Button, Col, Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { getCities, getStates } from "../../utils/State-Cities";

export default function CompanySettings() {
  const [cities, setCities] = useState([]);

  const handleOnStateSelect = (value) => {
    setCities(getCities(value));
  };

  useEffect(() => {
    console.log(cities);
  }, [cities]);
  return (
    <div className="companySettings">
      <div className="companySettings-form">
        <Form
          labelCol={{ span: 8 }}
          requiredMark={false}
          colon={false}
          autoComplete="false"
          autoCorrect="false"
        >
          <Form.Item label="Company Name" name="name">
            <Input type="text" minLength={5} maxLength={30} />
          </Form.Item>

          <Form.Item label="Founded In" name="gender">
            <Select
              defaultValue={"Choose Year"}
              options={[
                {
                  value: "MALE",
                  label: "Male",
                },
                {
                  value: "FEMALE",
                  label: "Female",
                },
                {
                  value: "OTHER",
                  label: "Other",
                },
              ]}
            />
          </Form.Item>

          <Form.Item label=" Regsiteration Number" name="regsiteration">
            <Input  />
          </Form.Item>  

          <Form.Item label="About" name="name">
            <TextArea placeholder="Write Something about company" />
          </Form.Item>


          <Form.Item label="Office Location" className="multiInputLabels">
       
            <Select
              showSearch
              defaultValue={"Choose State"}
              options={getStates()}
              onChange={handleOnStateSelect}
            />

            <Select showSearch defaultValue={"Choose City"} options={cities} />

            <TextArea  placeholder="Address"/>
          </Form.Item>

          <Form.Item label="Social Media Links" className="multiInputLabels">
          
            <Input placeholder="Instagram" />
            <Input  placeholder="Facebook"/>
            <Input  placeholder="Youtube"/>
          </Form.Item>
        </Form>
      </div>

      <div className="bottom">
        <Button type="primary">Save</Button>
      </div>
    </div>
  );
}
