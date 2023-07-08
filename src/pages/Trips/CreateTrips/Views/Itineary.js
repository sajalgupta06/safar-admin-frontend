import React, { useContext, useState } from "react";
import { Footer, Header } from "..";
import { MyContext } from "../../../../App";
import { Button, Input, Modal, Tabs, TimePicker } from "antd";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import TextArea from "antd/es/input/TextArea";
import { useEffect } from "react";
import moment from "moment";
import { view3Validator } from "../validators";
import { alerts } from "../../../../utils/alert";
import { updateWorkingTrip } from "../../../../action/req";

export default function Itineary(props) {
  const context = useContext(MyContext);

  const { tripDetails, setTripDetails } = props;
  const [validationStatus, setValidationStatus] = useState()

  const [activityState, setActivityState] = useState({
    day: "",
    title: "",
    time: "",
    description: "",
  });

  const handleOnClickNext = async() => {
 
    const validationResult = view3Validator(tripDetails?.itinerary);

    if(!validationResult.validate)
    {
      alerts.error(validationResult.message)
      setValidationStatus({ [validationResult?.field] : "error"})
      return false
    }
    const result = await updateWorkingTrip(tripDetails);
    if (result.statusCode == "10000") {
      alerts.success("Itineary saved");

      return true;
    }

    alerts.error("Error in saving Itinerary");

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (day) => {
    setIsModalOpen(true);
    setActivityState({ ...activityState, day: day });
  };

  const handleCancel = () => {
    setActivityState({ day: "", title: "", time: "", description: "" });
    setIsModalOpen(false);
  };

  const handleAddActivity = () => {

    const result = view3Validator({...activityState ,validationType:"ADD_ACTIVITY"})

    if(!result.validate)
    {
      alerts.error(result.message)
      setValidationStatus({ [result?.field] : "error"})

      return  
    }
    setValidationStatus({})


    if (tripDetails?.itinerary) {
      if (tripDetails.itinerary[activityState.day]) {
        setTripDetails({
          ...tripDetails,
          itinerary: {
            ...tripDetails.itinerary,
            [activityState.day]: [
              ...tripDetails.itinerary[activityState.day],
              activityState,
            ],
          },
        });
      } else {
        setTripDetails({
          ...tripDetails,
          itinerary: {
            ...tripDetails.itinerary,
            [activityState.day]: [activityState],
          },
        });
      }
    } else {
      setTripDetails({
        ...tripDetails,
        itinerary: {
          [activityState.day]: [activityState],
        },
      });
    }

    setIsModalOpen(false);
    setActivityState({
      day: "",
      title: "",
      time: "",
      description: "",
    });
  };

  const handleRemoveActivity = (day,index)=>{

    setTripDetails({
        ...tripDetails,
        itinerary:{
            ...tripDetails.itinerary,
            [day]:[
                ...tripDetails.itinerary[day].filter((day, i) => index !== i)
            ]

            }
         
    })

  }

  const renderDayContent = (day) => {

    if (tripDetails?.itinerary && tripDetails?.itinerary[day]) {
      return (
        <>
          {tripDetails?.itinerary[day].map((iti, i) => {
            return (
             
                <div className="activityBox" key={i}  >
                    <div className="activityBox-heading">
                        <p className="title">{iti.title} <span>{iti.time}</span></p>
                        <p className="icon"><AiOutlineClose 
                        onClick={()=>handleRemoveActivity(day,i)}
                        /></p>
                    </div>
                    <div className="activityBox-desc">
                        {iti.description}
                    </div>
                </div>
              
            );
          })}
          <div className="addActivityBox" key={100} onClick={() => showModal(day)}>
            <AiOutlinePlus /> Add Activity
          </div>
        </>
      );
    } else {
      return (
        <div className="addActivityBox"  onClick={() => showModal(day)}>
          <AiOutlinePlus /> Add Activity
        </div>
      );
    }
  };
  const items = [
    {
      key: "1",
      label: `Day 1`,
      children: renderDayContent(1),
    },
    {
      key: "2",
      label: `Day 2`,
      children: renderDayContent(2),
    },
    {
      key: "3",
      label: `Day 3`,
      children: renderDayContent(3),
    },
  ];

  return (
    <>
      <Modal
        title="Add Activity"
        open={isModalOpen}
        style={{
          top: 300,
        }}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleAddActivity}>
            Add
          </Button>,
        ]}
      >
        <div className="activityForm">
          <div className="activityForm-item">
            <label htmlFor="title">Day</label>
            {/* <Input
            name='title'
            valu
            /> */}
            {activityState?.day}
          </div>

          <div className="activityForm-item">
            <label htmlFor="title">Title</label>
            <Input
              name="title"
              value={activityState.title}
              onChange={(e) =>
                setActivityState({ ...activityState, title: e.target.value })
                
              }
              status = {validationStatus?.title}

            />
          </div>

          <div className="activityForm-item">
            <label htmlFor="time">Time</label>
            <TimePicker
              name="time"
              style={{ width: "100%" }}
              format={"hh:mm A"}
              value={activityState.time!="" &&  moment(activityState.time,"hh:mm A")}
              onChange={(e,time)=>setActivityState({...activityState,time:time})}
              // onChange={(e,a)=>console.log(a)}
              status = {validationStatus?.time}
            


            />
          </div>

          <div className="activityForm-item"> 
            <label htmlFor="Description">Description</label>
            <TextArea
              rows={3}
              placeholder="Add Description"
              value={activityState.description}
              onChange={(e) =>
                setActivityState({
                  ...activityState,
                  description: e.target.value,
                })
              }
              status = {validationStatus?.description}

            />
          </div>
        </div>
      </Modal>

      <div className="createTrips">
        <Header
          heading={"Itinerary"}
          view={context.createTripView}
          handleOnClickBack={handleOnClickBack}
        ></Header>

        <div className="createTrips-body">
          <div className="createTrips-body-itineraryView">
            <Tabs defaultActiveKey="1" items={items} />
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
