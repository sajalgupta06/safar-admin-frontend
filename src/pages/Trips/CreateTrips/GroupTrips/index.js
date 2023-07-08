import React, { useContext, useEffect, useState } from "react";
import "../CreateTrips.scss";
import { MyContext } from "../../../../App";
import View1 from "../Views/BasicDetails";
import {
  LoadingOutlined,
  HighlightOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Steps } from "antd";
import { MdOutlineDashboardCustomize, MdOutlineDescription } from "react-icons/md";
import { GiWavyItinerary, GiFinishLine } from "react-icons/gi";
import { BsCurrencyRupee } from "react-icons/bs";
import {
  HiOutlinePhotograph,
  HiOutlineInformationCircle,
} from "react-icons/hi";
import { VscPreview } from "react-icons/vsc";
import { fetchWorkingTrip } from "../../../../action/req";
import { useQuery } from "react-query";
import { getViewsNumber } from "../getViewsNumber";
import BasicDetails from "../Views/BasicDetails";
import Descriptions from "../Views/Description";
import Itineary from "../Views/Itineary";
import Pricing from "../Views/Pricing";
import Photos from "../Views/Photos";
import Preview from "../Views/Preview";
import FinalStep from "../Views/FinalStep";
import Customizables from "../Views/Customizables";

export default function GroupTrips() {
  const context = useContext(MyContext);

  const [tripDetails, setTripDetails] = useState();


  

  const { isLoading, error } = useQuery("fetchTripDetails",  () => fetchWorkingTrip() ,{onSuccess:(data)=>setTripDetails(data?.data)});

  


  useEffect(() => {
  
    if(isLoading)
    {
      context.setLoading({
        type: "SET_LOADING",
        payload: true,
      });
    }
    else{
      context.setLoading({
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

 

const onClickSteps = (view)=>{

  context.setCreateTripView({
    type: "SET_CREATE_TRIPVIEW",
    payload: view,
  });

}


const getStepsItems = (title, icon , viewNumber)=>{
  return {
    title: title,
    status: getStepStatus(viewNumber),
    icon:icon,
    onClick:()=>onClickSteps(viewNumber)
  }
}
  
  return (
    <>

    {!isLoading && (
      <>
      <div className="groupTripSteps">
        {" "}
        <Steps
          items={[
              getStepsItems("Basic Details",<HiOutlineInformationCircle/> ,getViewsNumber.basicDetails),
              getStepsItems("Descriptions",<MdOutlineDescription/> ,getViewsNumber.descriptions),
              getStepsItems("Itinerary",<GiWavyItinerary/> ,getViewsNumber.itinerary),
              getStepsItems("Pricing",<BsCurrencyRupee/> ,getViewsNumber.pricing),
              getStepsItems("Customizables",<MdOutlineDashboardCustomize/> ,getViewsNumber.customizables),
              getStepsItems("Photos",<HiOutlinePhotograph/> ,getViewsNumber.photos),
              getStepsItems("Preview",<VscPreview/> ,getViewsNumber.preview),
              getStepsItems("Final Step",<GiFinishLine/> ,getViewsNumber.finalStep),
          ]}
          size="small"
        />
      </div>
      {context.createTripView === getViewsNumber.basicDetails && (
        <BasicDetails tripDetails={tripDetails} setTripDetails={setTripDetails} />
      )}

      {context.createTripView === getViewsNumber.descriptions && (
        <Descriptions tripDetails={tripDetails} setTripDetails={setTripDetails} />
      )}

      {context.createTripView === getViewsNumber.itinerary && (
        <Itineary tripDetails={tripDetails} setTripDetails={setTripDetails} />
      )}

      {context.createTripView === getViewsNumber.pricing && (
        <Pricing tripDetails={tripDetails} setTripDetails={setTripDetails} />
      )}
          {context.createTripView === getViewsNumber.customizables && (
        <Customizables tripDetails={tripDetails} setTripDetails={setTripDetails} />
      )}

      {context.createTripView === getViewsNumber.photos && (
        <Photos tripDetails={tripDetails} setTripDetails={setTripDetails} />
      )}

      {context.createTripView === getViewsNumber.preview && (
        <Preview tripDetails={tripDetails} setTripDetails={setTripDetails} />
      )}

      {context.createTripView === getViewsNumber.finalStep && (
        <FinalStep tripDetails={tripDetails} setTripDetails={setTripDetails} />
      )}


      </>
    )}
      

    </>
  );
}
