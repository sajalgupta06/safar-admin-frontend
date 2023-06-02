import React, { useContext, useRef, useState, useEffect } from "react";
import { Footer, Header } from "..";
import { MyContext } from "../../../../App";
import TextArea from "antd/es/input/TextArea";
import EditableTags from "../../../../utils/EditableTags";

export default function View2(props) {
  const context = useContext(MyContext);
  const { tripDetails, setTripDetails } = props;

  const [highlights, setHighlights] = useState([]);
  const [inclusion, setInclusion] = useState([]);
  const [exclusion, setExclusion] = useState([]);
  const [recommendation, setRecommendation] = useState([]);
  const [terms, setTerms] = useState([]);

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

  useEffect(() => {
    console.log(highlights);
  }, [highlights]);

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
              <TextArea placeholder="Enter Text Here" />
            </div>
          </div>
          <div className="createTrips-body-view2-highlight">
            <p className="heading">Highlights</p>
            <div className="inputBox">
              <EditableTags
                tags={highlights}
                setTags={setHighlights}
                title={"Highlight"}
              />
            </div>
          </div>
          <div className="createTrips-body-view2-inclusion">
            <p className="heading">Inclusions</p>
            <div className="inputBox">
              <EditableTags
                tags={inclusion}
                setTags={setInclusion}
                title={"Inclusion"}
              />
            </div>
          </div>
          <div className="createTrips-body-view2-exclusion">
            <p className="heading">Exclusions</p>
            <div className="inputBox">
              <EditableTags
                tags={exclusion}
                setTags={setExclusion}
                title={"Exclusion"}
              />
            </div>
          </div>
          <div className="createTrips-body-view2-recommendation">
            <p className="heading">Recommendations</p>
            <div className="inputBox">
              <EditableTags
                tags={recommendation}
                setTags={setRecommendation}
                title={"Recommendation"}
              />
            </div>
          </div>

          <div className="createTrips-body-view2-terms">
            <p className="heading">Terms & Condition</p>
            <div className="inputBox">
              <EditableTags
                tags={terms}
                setTags={setTerms}
                title={"Terms & Condition "}
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
