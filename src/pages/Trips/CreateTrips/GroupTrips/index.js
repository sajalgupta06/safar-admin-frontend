import React, { useContext, useEffect, useState } from "react";
import "../CreateTrips.scss";
import { MyContext } from "../../../../App";
import View1 from "../Views/View1";
import {
  LoadingOutlined,
  HighlightOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Steps } from "antd";
import { MdOutlineDescription } from "react-icons/md";
import { GiWavyItinerary, GiFinishLine } from "react-icons/gi";
import { BsCurrencyRupee } from "react-icons/bs";
import {
  HiOutlinePhotograph,
  HiOutlineInformationCircle,
} from "react-icons/hi";
import { VscPreview } from "react-icons/vsc";
import View2 from "../Views/View2";
import View3 from "../Views/View3";
import View4 from "../Views/View4";
import View5 from "../Views/View5";
import View6 from "../Views/View6";
import View7 from "../Views/View7";
import { fetchWorkingTrip } from "../../../../action/req";
import { useQuery } from "react-query";

export default function GroupTrips() {
  const context = useContext(MyContext);

  const [tripDetails, setTripDetails] = useState();


  const onSuccessFetchWorkingTrip = (data)=>{

    

   
  }

  const { isLoading, error, data } = useQuery("fetchTripDetails",  () => fetchWorkingTrip() ,{onSuccess:(data)=>setTripDetails(data?.data)});

  


  useEffect(() => {
  
    if(isLoading)
    {
      context.setNoSpinLoading({
        type: "SET_LOADING",
        payload: true,
      });
    }
    else{
      context.setNoSpinLoading({
        type: "SET_LOADING",
        payload: false,
      });
    }

  }, [isLoading]);
  // console.log(data?.data)


  const getStepStatus = (view) => {
    if (context.createTripView == view) return "process";
    if (context.createTripView > view) return "finish";
    else return "wait";
  };

  useEffect(() => {
    console.log(tripDetails);
  }, [tripDetails]);

const onClickSteps = (view)=>{

  context.setCreateTripView({
    type: "SET_CREATE_TRIPVIEW",
    payload: view,
  });

}
  
  return (
    <>
      <div className="groupTripSteps">
        {" "}
        <Steps
          items={[
            {
              title: "Basic Details",
              status: getStepStatus(1),
              icon: <HiOutlineInformationCircle />,
            onClick:()=>onClickSteps(1)
            },

            {
              title: "Description",
              status: getStepStatus(2),
              icon: <MdOutlineDescription />,
              onClick:()=>onClickSteps(2)

            },
            {
              title: "Itinerary",
              status: getStepStatus(3),
              icon: <GiWavyItinerary />,
              onClick:()=>onClickSteps(3)

            },
            {
              title: "Pricing",
              status: getStepStatus(4),
              icon: <BsCurrencyRupee />,
              onClick:()=>onClickSteps(4)

            },
            {
              title: "Photos",
              status: getStepStatus(5),
              icon: <HiOutlinePhotograph />,
              onClick:()=>onClickSteps(5)

            },
            {
              title: "Preview",
              status: getStepStatus(6),
              icon: <VscPreview />,
              onClick:()=>onClickSteps(6)

            },
            {
              title: "Final Step",
              status: getStepStatus(7),
              icon: <GiFinishLine />,
              onClick:()=>onClickSteps(7)

            },
          ]}
        />
      </div>
      {context.createTripView === 1 && (
        <View1 tripDetails={tripDetails} setTripDetails={setTripDetails} />
      )}

      {context.createTripView === 2 && (
        <View2 tripDetails={tripDetails} setTripDetails={setTripDetails} />
      )}

      {context.createTripView === 3 && (
        <View3 tripDetails={tripDetails} setTripDetails={setTripDetails} />
      )}

      {context.createTripView === 4 && (
        <View4 tripDetails={tripDetails} setTripDetails={setTripDetails} />
      )}

      {context.createTripView === 5 && (
        <View5 tripDetails={tripDetails} setTripDetails={setTripDetails} />
      )}

      {context.createTripView === 6 && (
        <View6 tripDetails={tripDetails} setTripDetails={setTripDetails} />
      )}

      {context.createTripView === 7 && (
        <View7 tripDetails={tripDetails} setTripDetails={setTripDetails} />
      )}
    </>
  );
}
