import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Input, Select, Table } from "antd";
import "../CreateTrips.scss";
import { Footer, Header } from "..";
import { MyContext } from "../../../../App";
import { BiRupee } from "react-icons/bi";
import { PricingPlanTable } from "../../../../components/Table/columns";
import { AiOutlinePlus } from "react-icons/ai";

export default function View4(props) {
  const context = useContext(MyContext);
  const [pricingPlanState , setPricingPlanState] = useState({})
   const { tripDetails, setTripDetails } = props;

  

  const handleOnClickNext = () => {
    context.setCreateTripView({
      type: "SET_CREATE_TRIPVIEW",
      payload: context.createTripView + 1,
    });
  };

  const handleOnClickBack = () => {
    if (context.createTripView > 1) {
      context.setCreateTripView({
        type: "SET_CREATE_TRIPVIEW",
        payload: context.createTripView - 1,
      });
    }
  };

 


const handleOnChange = (value, field)=>{
    setPricingPlanState({
        ...pricingPlanState,
        [field]: value,
      });
}

const handleAddPricingPlan = ()=>{

if(tripDetails?.pricingPlan)
{
    setTripDetails({
        ...tripDetails,
        pricingPlan:[
            ...tripDetails.pricingPlan,
            pricingPlanState
        ]
    })
}
else{
    setTripDetails({
        ...tripDetails,
        pricingPlan:[
            pricingPlanState
        ]
    })
}

}



  return (
    <>
      <div className="createTrips">
        <Header
          heading={"Pricing"}
          view={context.createTripView}
          handleOnClickBack={handleOnClickBack}
        ></Header>

        <div className="createTrips-body">
          <div className="createTrips-body-view4">
            <div className="createTrips-body-view4-left">
              <div className="heading">Make a Plan</div>
              <div className="options">
                <div className="option">
                  <label htmlFor="date">Date</label>
                  <Select
                    id="date"
                    className="inputSelect"
                    defaultValue="Choose Date"
                    onChange={(value)=>handleOnChange(value,"date")}
                    options={[
                      {
                        value: "jack",
                        label: "Jack",
                      },
                      {
                        value: "lucy",
                        label: "Lucy",
                      },
                      {
                        value: "Yiminghe",
                        label: "yiminghe",
                      },
                    ]}
                  />
                </div>

                <div className="option">
                  <label htmlFor="pickupPoint">Pickup Point</label>
                    <Input
                    name="pickupPoint"
                    value={pricingPlanState?.pickupPoint}
                    onChange={(e)=>handleOnChange(e.target.value,"pickupPoint")}
                    />
                </div>

                <div className="option">
                  <label htmlFor="pickupMode">Pickup Mode</label>
                  <Select
                    id="pickupMode"
                    className="inputSelect"
                    defaultValue="Choose Mode"
                    onChange={(value)=>handleOnChange(value,"pickupMode")}

                    options={[
                        { label: "Train (NON AC)", value: "Train (NON AC)" },
                        { label: "Train (AC)", value: "Train (AC)" },
                        { label: "Bus (NON AC)", value: "Bus (NON AC)" },
                        { label: "Bus (AC)", value: "Bus (AC)" },
                        { label: "Car", value: "Car" },
                        { label: "Plane", value: "Plane" },
                        { label: "Other", value: "other" },
                      ]}
                  />
                </div>

                <div className="option">
                  <label htmlFor="dropPoint">Drop Point</label>
                  <Input
                    name="dropPoint"
                    value={pricingPlanState?.dropPoint}
                    onChange={(e)=>handleOnChange(e.target.value,"dropPoint")}
                    />
                </div>

                <div className="option">
                  <label htmlFor="dropMode">Drop Mode</label>
                  <Select
                    id="dropMode"
                    className="inputSelect"
                    defaultValue="Choose Mode"
                    options={[
                        { label: "Train (NON AC)", value: "Train (NON AC)" },
                        { label: "Train (AC)", value: "Train (AC)" },
                        { label: "Bus (NON AC)", value: "Bus (NON AC)" },
                        { label: "Bus (AC)", value: "Bus (AC)" },
                        { label: "Car", value: "Car" },
                        { label: "Plane", value: "Plane" },
                        { label: "Other", value: "other" },
                      ]}
                      onChange={(value)=>handleOnChange(value,"dropMode")}
                  />
                </div>

                <div className="option">
                  <label htmlFor="amount">Amount</label>
                  <Input addonBefore={<BiRupee />} 
                  type="number" 
                  value={pricingPlanState.amount}
                  onChange={(e)=>handleOnChange(e.target.value,"amount")}
                  />
                </div>
              </div>
              <div className="buttonDiv">

              <Button className="addButton" onClick={handleAddPricingPlan}> <AiOutlinePlus/> Add</Button>
              </div>
            </div>
            <div className="createTrips-body-view4-right">
              <Table
                columns={PricingPlanTable}
                dataSource={tripDetails?.pricingPlan}
                pagination={false}
                
              />
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
