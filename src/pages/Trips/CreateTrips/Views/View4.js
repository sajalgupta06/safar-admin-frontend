import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Input, Select, Table } from "antd";
import "../CreateTrips.scss";
import { Footer, Header } from "..";
import { MyContext } from "../../../../App";
import { BiRupee } from "react-icons/bi";
import { PricingPlanTable } from "../../../../components/Table/columns";
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import { view4Validator } from "../validators";
import { alerts } from "../../../../utils/alert";
import { updateWorkingTrip } from "../../../../action/req";
import { getModesOptions } from "../../../../utils/helper";

export default function View4(props) {
  const context = useContext(MyContext);
  const [priceSlotState , setPriceSlotState] = useState({})
   const { tripDetails, setTripDetails } = props;
   const [validationStatus, setValidationStatus] = useState()

  

  const handleOnClickNext = async() => {

    const validationResult = view4Validator(tripDetails.priceSlots)

    if(!validationResult?.validate)
    {
      alerts.error(validationResult?.message)
  
      return  
    }

    const result = await updateWorkingTrip(tripDetails);
    if (result.statusCode == "10000") {
      alerts.success("Pricing Plan saved");

      return true;
    }

    alerts.error("Error in saving Pricing Plan");

    return false;
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
    setPriceSlotState({
        ...priceSlotState,
        [field]: value,
      });

    
}


const handleAddPricingPlan = ()=>{

  const result = view4Validator({...priceSlotState,validationType:"ADD_PLAN"})

  if(!result.validate)
  {
    alerts.error(result.message)
    setValidationStatus({ [result?.field] : "error"})

    return  
  }

  if(tripDetails?.priceSlots?.includes(priceSlotState)){
    alerts.error("Plan already created")
    return

  }


if(tripDetails?.priceSlots)
{
    setTripDetails({
        ...tripDetails,
        priceSlots:[
            ...tripDetails.priceSlots,
            priceSlotState
        ]
    })
}
else{
    setTripDetails({
        ...tripDetails,
        priceSlots:[
            priceSlotState
        ]
    })
}

setValidationStatus()


}

const getDates = ()=>{

   const res = tripDetails?.dates?.map((date,i)=>{             
    return {
    value: JSON.stringify(date),
    key:i,
    label:`${date.startDate} to ${date.endDate}`
  }
})

return res

}




const handleRemoveRow = (record)=>{
setTripDetails({
  ...tripDetails,
  priceSlots:tripDetails?.priceSlots.filter(plan=>plan!=record)
})

}

const getTableColumn=()=>{

let newColumn =  {
  title: 'Action',
  dataIndex: 'action',
  key: 'action',
  render : (e,record,index)=><AiOutlineDelete className="tabelDeleteIcon" onClick={()=>handleRemoveRow(record)}/>
}
let table = [...PricingPlanTable, newColumn]

return table

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
                    onChange={(value)=>handleOnChange(JSON.parse(value),"date")}
                    options={getDates()}
                    status = {validationStatus?.date}

                  />
                </div>

                <div className="option">
                  <label htmlFor="pickupPoint">Pickup Point</label>
                    <Input
                    
                    name="pickupPoint"
                    value={priceSlotState?.pickupPoint}
                    onChange={(e)=>handleOnChange(e.target.value,"pickupPoint")}
                    status = {validationStatus?.pickupPoint}

                    />
                </div>

                <div className="option">
                  <label htmlFor="pickupMode">Pickup Mode</label>
                  <Select
                    id="pickupMode"
                    className="inputSelect"
                    defaultValue="Choose Mode"
                    onChange={(value)=>handleOnChange(value,"pickupMode")}
                    status = {validationStatus?.pickupMode}

                    options={getModesOptions}
                  />
                </div>

                <div className="option">
                  <label htmlFor="dropPoint">Drop Point</label>
                  <Input
                    name="dropPoint"
                    value={priceSlotState?.dropPoint}
                    onChange={(e)=>handleOnChange(e.target.value,"dropPoint")}
                    status = {validationStatus?.dropPoint}

                    />
                </div>

                <div className="option">
                  <label htmlFor="dropMode">Drop Mode</label>
                  <Select
                    id="dropMode"
                    className="inputSelect"
                    defaultValue="Choose Mode"
                    options={getModesOptions}
                      onChange={(value)=>handleOnChange(value,"dropMode")}
                      status = {validationStatus?.dropMode}

                  />
                </div>

                <div className="option">
                  <label htmlFor="amount">Amount</label>
                  <Input addonBefore={<BiRupee />} 
                  type="number" 
                  min={0}
                  value={priceSlotState.amount}
                  onChange={(e)=>handleOnChange(e.target.value,"amount")}
                  status = {validationStatus?.amount}

                  />
                </div>
              </div>
              <div className="buttonDiv">

              <Button className="addButton" onClick={handleAddPricingPlan}> <AiOutlinePlus/> Add</Button>
              </div>
            </div>
            <div className="createTrips-body-view4-right">
              <Table
                columns={getTableColumn()}
                dataSource={tripDetails?.priceSlots}
                pagination={false}
                rowKey={(record)=>JSON.stringify(record)}
                
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
