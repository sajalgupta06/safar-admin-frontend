import React, { useContext, useEffect, useState } from "react";
import "../CreateTrips.scss";
import { Footer, Header } from "..";
import { Button, Col, DatePicker, Form, Input, List, Row, Select } from "antd";
import { MyContext } from "../../../../App";
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import moment from "moment";
import EditableTags from "../../../../utils/EditableTags";
import { alerts } from "../../../../utils/alert";

const { RangePicker } = DatePicker;

export default function View1(props) {
  const context = useContext(MyContext);

  const {tripDetails,setTripDetails} = props
  const [travelDateState, setTravelDateState] = useState()
  const [allLocations, setAllLocations] = useState([])
  

  const handleOnClickNext = () => {

    if(!tripDetails.name)
    {

      alerts.error("Provide a Valid  Name")
      return
    }

    if(!tripDetails.type)
    {

      alerts.error("Provide a Valid Type")
      return
    }



    if(!tripDetails.ageLimit)
    {

      alerts.error("Provide a Valid Age")
      return
    }



    if(!tripDetails.lastDate)
    {

      alerts.error("Provide a Valid Last Date")
      return
    }



    if(!tripDetails.region)
    {

      alerts.error("Provide a Valid Region")
      return
    }


    if(!tripDetails.days)
    {

      alerts.error("Provide a Valid Days")
      return
    }


    if(!tripDetails.nights)
    {

      alerts.error("Provide a Valid Nights")
      return
    }

    context.setCreateTripView({type:"SET_CREATE_TRIPVIEW", payload:context.createTripView+1})
  }; 

   const handleOnClickBack = () => {};



  const onChangeInput = (val,field) => {

    if(tripDetails)
    {

      setTripDetails({...tripDetails,[field]: val})
    }
    else{
      setTripDetails({[field]:val})

    }

  };

  const addTravelDates = ()=>{
if(!travelDateState)return
    const obj = {
      startDate:travelDateState[0].format("DD-MM-YYYY"),
      endDate:travelDateState[1].format("DD-MM-YYYY")
    }
    if(tripDetails)
    {

      if(tripDetails.dates)
      {

        setTripDetails({...tripDetails, "dates":[...tripDetails.dates  ,obj]})
      }
      else{
        setTripDetails({...tripDetails, "dates":[obj]})
      }
    }
    else{
      setTripDetails({"dates":[obj]})

    }
  }

  const removeTravelDate = (key)=>{

    setTripDetails({...tripDetails, "dates":tripDetails.dates.filter((date,i)=>key!=i)})
  }

  const getTravelDates = ()=>{

    if(tripDetails?.dates)
    {
      return tripDetails?.dates?.map((date,i)=>{
        return(
          <div key={i} className="travelDateList"><p>
            {date.startDate} {"----->"} {date.endDate}
            </p>
            <AiOutlineDelete
            onClick={()=>removeTravelDate(i)}
            />
            </div>
        )
      })

    }
    return []

  }

  useEffect(() => {
  
    setTripDetails({
      ...tripDetails,
      locations:allLocations
    })
  }, [allLocations]);

  return (
    <>
      <div className="createTrips">
        <Header
          heading={"Basic Details"}
          view={context.createTripView}
          handleOnClickBack={handleOnClickBack}
        ></Header>

        <div className="createTrips-body">
          <div className="createTrips-body-view1">
            <Form
              // className="view1Form"
             
              requiredMark={false}
              colon={false}
              
            >
              <Row gutter={70}
            
              >

                <Col span={8} 
                style={{paddingLeft:0}}
                >
                  {" "}
                  <Form.Item label="Name" name="name">
                    <Input value={tripDetails?.name}
                        onChange={(e)=>onChangeInput(e.target.value,"name")}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  {" "}
                  <Form.Item label="Type" name="type"
                    initialValue={"Choose Trip Type"}
                  >
                    <Select
                      // style={{
                      //   width: 220,
                      // }}
                      onChange={(value)=>onChangeInput(value,"type")}
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
                  </Form.Item>
                </Col>
                <Col span={8}>
                  {" "}
                  <Form.Item
                    label="Age Limit"
                    name="ageLimit"
                  
                  >
                    <Input
                    type="number"
                    min={0}
                    value={tripDetails?.ageLimit}
                    onChange={(e)=>onChangeInput((e.target.value),"ageLimit")}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={50}>

              <Col span={8}
               style={{paddingLeft:0}}
              >
                {" "}
                <Form.Item label="Last Date To Register" name="lastDate"
                >
                  <DatePicker style={{width:"100%"}} 
                  onChange={(e)=>onChangeInput(e?.format("DD-MM-YYYY"),"lastDate")}
                  format={"DD MMM YYYY"}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                {" "}
                <Form.Item
                  label="Region"
                  name="region"
                  // style={{ width: 250 }}
                >
                  <Input
                
                  value={tripDetails?.region}
                  onChange={(e)=>onChangeInput(parseInt(e.target.value),"region")}
                  />
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item label="Days" name="days">
                  <Input
                  type="number"
                  min={0}
                  value={tripDetails?.days}
                  onChange={(e)=>onChangeInput(parseInt(e.target.value),"days")}
                  />
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item label="Nights" name="nights">
                  <Input 
                  type="number"
                  min={0}
                   value={tripDetails?.nights}
                   onChange={(e)=>onChangeInput(parseInt(e.target.value),"nights")}
                  />
                </Form.Item>
              </Col>
              </Row>
              <div className="allLocations">
              <h3>All Locations</h3>
              <div className="allLocations-content">
              <EditableTags
                tags={allLocations}
                setTags={setAllLocations}
                title={"Locations that you will cover in the trip"}
              />
              </div>
            </div>
            
            <div className="travelDates">
              <h3>Add Travel Dates</h3>
              <div className="travelDates-content">
                <div className="travelDates-content-left">
                  <div className="rangePickerDiv">
                    <RangePicker
                    format={"DD-MMM-YYYY"}
                      onChange={(e)=>setTravelDateState(e)}
                      cellRender={(current) => {
                        const style = {};
                        if (current.date() === 1) {
                          style.border = "1px solid #1677ff";
                          style.borderRadius = "50%";
                        }
                        return (
                          <div className="ant-picker-cell-inner" style={style}>
                            {current.date()}
                          </div>
                        );
                      }}
                    />
                    <Button type="primary"
                      onClick={addTravelDates}
                    >
                      <AiOutlinePlus />
                      Add
                    </Button>
                  </div>
                  <div className="instruction">
                    <p>Instruction</p>
                  </div>
                </div>
                <div className="travelDates-content-right">
                  <div className="dateContainer">
                    <List
                      size="small"
                      
                      dataSource={getTravelDates()}
                      renderItem={(item) => <List.Item>{item}</List.Item>}
                    />
                  </div>
                </div>
              </div>
            </div>
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
