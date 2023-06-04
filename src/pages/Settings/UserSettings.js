import { Button, Form, Input, Select } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React, { useEffect, useState } from 'react'
import { getCities, getStates } from '../../utils/State-Cities'

export default function UserSettings() {

const [cities, setCities] = useState([])  

const handleOnStateSelect = (value)=>{

  setCities(getCities(value))


}

useEffect(() => {
 console.log(cities)
}, [cities]);
  return (
    <div className='userSettings'>
    <div className='userSettings-form'>
         <Form 
         labelCol={{span:8}}
        
         requiredMark={false}
         colon={false}
         
         autoComplete='false'
         autoCorrect='false'
         >
    <Form.Item
      label="Name"
      name="name"
    >
      <Input
      type='text'
      minLength={5}
      maxLength={30}
      />
    </Form.Item>

    <Form.Item
      label="Gender"
      name="gender"
    >
      <Select 
      defaultValue={"Choose Gender"}
      options ={
        [
          {
            value:"MALE",
            label:"Male"
          },
          {
            value:"FEMALE",
            label:"Female"
          },
          {
            value:"OTHER",
            label:"Other"
          }
        ]
      }
      />
    </Form.Item>



    <Form.Item
      label="Age"
      name="age"
    >
      <Input
      
      type='number'
      min={0}
      />
    </Form.Item>


    <Form.Item
      label=" Mobile Number"
      name="mobile"
    >
      <Input  disabled/>
    </Form.Item>

  
    <Form.Item
      label="Registered Email"
      name="email"
      
    >
      <Input
        disabled
      />
    </Form.Item>

 

    <Form.Item
      label="Aadhar Number"
      name="aadharNumber"
    >
      <Input 
        type='number'
    
      />
    </Form.Item>


    <Form.Item
      label="State"
    >
           <Select 
           showSearch
      defaultValue={"Choose State"}
      options ={ getStates() }
      onChange={handleOnStateSelect}
      />
    </Form.Item>



    <Form.Item
      label="City"
       >
           <Select 
           showSearch
      defaultValue={"Choose City"}
      options ={ cities}
      />
    </Form.Item>

    <Form.Item
      label="Address"
      name="address"
    >
      <TextArea />
    </Form.Item>


    </Form>
  
      </div>

      <div className='bottom'>
        <Button type='primary'>Save</Button>
      </div>
    </div>
  )
}
