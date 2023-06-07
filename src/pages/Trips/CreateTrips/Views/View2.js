import React, { useContext, useRef, useState, useEffect } from "react";
import { Footer, Header } from "..";
import { MyContext } from "../../../../App";
import TextArea from "antd/es/input/TextArea";
import EditableTags from "../../../../utils/EditableTags";
import { view2Validator } from "../validators";
import { alerts } from "../../../../utils/alert";
import { updateWorkingTrip } from "../../../../action/req";

export default function View2(props) {
  const context = useContext(MyContext);
  const { tripDetails, setTripDetails } = props;

  const initialsValidationStatus = {
    highlights: "",
    inclusions: "",
    exclusions: "",
    recommendations: "",
 
  };



  const [highlights, setHighlights] = useState(tripDetails?.highlights);
  const [inclusions, setInclusion] = useState(tripDetails?.inclusions);
  const [exclusions, setExclusion] = useState(tripDetails?.exclusions);
  const [recommendations, setRecommendation] = useState(
    tripDetails?.recommendations
  );
  const [terms, setTerms] = useState(tripDetails?.terms);
  const [validationStatus, setValidationStatus] = useState(
    // initialsValidationStatus
  );

  useEffect(() => {
    setTripDetails({
      ...tripDetails,
      highlights,
      inclusions,
      exclusions,
      recommendations,
      terms,
    });
  }, [highlights, inclusions, exclusions, recommendations, terms]);

  const handleOnClickNext = async() => {


    const validationResult = view2Validator({...tripDetails})
    if(!validationResult.validate)
    {
      alerts.error(validationResult.message)
      setValidationStatus({ [validationResult?.field] : "error"})

      return  false
    }
    
    const result = await updateWorkingTrip(tripDetails);
    if (result.statusCode == "10000") {
      alerts.success("Description saved");

      return true;
    }

    alerts.error("Error in saving Description");

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

  return (
    <div className="createTrips">
      <Header
        heading={"Description"}
        view={context.createTripView}
        handleOnClickBack={handleOnClickBack}
      ></Header>

      <div className="createTrips-body">
        <div className="createTrips-body-view2">
          <div className="createTrips-body-view2-about">
            <p className="heading">About</p>
            <div className="inputBox">
              <TextArea placeholder="Enter Text Here" 
                value={tripDetails?.about}
                name="about"
                onChange={(e)=>setTripDetails({...tripDetails,about:e.target.value})}
                status = {validationStatus?.about}

              />
            </div>
          </div>
          <div className="createTrips-body-view2-highlights">
            <p className="heading">Highlights</p>
            <div className="inputBox">
              <EditableTags
                tags={tripDetails?.highlights}
                setTags={setHighlights}
                title={"Highlight"}
                status = {validationStatus?.highlights}
              />
            </div>
          </div>
          <div className="createTrips-body-view2-inclusions">
            <p className="heading">Inclusions</p>
            <div className="inputBox">
              <EditableTags
                tags={tripDetails?.inclusions}
                setTags={setInclusion}
                title={"inclusions"}
                status = {validationStatus?.inclusions}

              />
            </div>
          </div>
          <div className="createTrips-body-view2-exclusions">
            <p className="heading">Exclusions</p>
            <div className="inputBox">
              <EditableTags
                tags={tripDetails?.exclusions}
                setTags={setExclusion}
                title={"exclusions"}
                status = {validationStatus?.exclusions}

              />
            </div>
          </div>
          <div className="createTrips-body-view2-recommendations">
            <p className="heading">Recommendations</p>
            <div className="inputBox">
              <EditableTags
                tags={tripDetails?.recommendations}
                setTags={setRecommendation}
                title={"recommendations"}
              />
            </div>
          </div>

          <div className="createTrips-body-view2-terms">
            <p className="heading">Terms & Condition</p>
            <div className="inputBox">
              <EditableTags
                tags={tripDetails?.terms}
                setTags={setTerms}
                title={"Terms & Condition "}
                status = {validationStatus?.terms}

              />
            </div>
          </div>
        </div>
      </div>
      <Footer
        view={context.createTripView}
        handleOnClickNext={handleOnClickNext}
      ></Footer>
    </div>
  );
}
