import React, { useContext } from "react";
import { Form, Select, Switch, Table, Tabs } from "antd";
import "../CreateTrips.scss";
import { Footer, Header } from "..";
import { MyContext } from "../../../../App";
import { PricingPlanTable } from "../../../../components/Table/columns";

export default function Preview(props) {
  const context = useContext(MyContext);
  
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

  const renderDayContent = (day) => {
    if (tripDetails?.itinerary)
      return (
        <>
          {tripDetails?.itinerary[day]?.map((iti, i) => {
            return (
              
                <div className="activityBox" key={i}>
                  <div className="activityBox-heading">
                    <p className="title">
                      {iti.title} <span>{iti.time}</span>
                    </p>
                  </div>
                  <div className="activityBox-desc">{iti.description}</div>
                </div>
              
            );
          })}
        </>
      );
  };



 
  const getItineraryItems = ()=>{
    const keys = Object.keys(tripDetails?.itinerary)

    return keys.map((key)=>{
      return{
        key: key,
        label: `Day ${key}`,
        children: renderDayContent(parseInt(key)),
      }
    })

  }

  return (
    <>
      <div className="createTrips">
        <Header
          heading={"Preview"}
          view={context.createTripView}
          handleOnClickBack={handleOnClickBack}
        ></Header>

        <div className="createTrips-body">
          <div className="createTrips-body-previewView">
            <div className="basicDetailsView">
              <div className="heading">Basic Details</div>
              <div className="item">
                <div className="label">Name</div>
                <div className="value">{tripDetails?.name}</div>
              </div>
              <div className="item">
                <div className="label">Type</div>
                <div className="value"> <ul>
                    {tripDetails?.type?.map((type, i) => {
                      return (
                        <li key={i}>
                          {i + 1}. {type.name}  
                        </li>
                      );
                    })}
                  </ul></div>
              </div>

              <div className="item">
                <div className="label">Age Limit</div>
                <div className="value">{tripDetails?.ageLimit}</div>
              </div>

              <div className="item">
                <div className="label">last Date To register</div>
                <div className="value">{tripDetails?.lastDate}</div>
              </div>

              <div className="item">
                <div className="label">Duration</div>
                <div className="value">
                 
                  {`${tripDetails?.days } D`} {`${tripDetails?.nights} N`}{" "}
                </div>
              </div>

              <div className="item">
                <div className="label">All Location</div>
                <div className="value">
                  <ul>
                    {tripDetails?.locations?.map((location, i) => {
                      return (
                        <li key={i}>
                          {i + 1}. {location}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>

            <div className="descriptionsView">
              <div className="heading">Description</div>

              <div className="item">
                <div className="label">About</div>
                <div className="value">{tripDetails?.about}</div>
              </div>

              <div className="item">
                <div className="label">Highlights</div>
                <div className="value">
                  <ul>
                    {tripDetails?.highlights?.map((data, i) => {
                      return (
                        <li key={i}>
                          {i + 1}. {data}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              <div className="item">
                <div className="label">Inclusions</div>
                <div className="value">
                  <ul>
                    {tripDetails?.inclusions?.map((data, i) => {
                      return (
                        <li key={i}>
                          {i + 1}. {data}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              <div className="item">
                <div className="label">Exclusions</div>
                <div className="value">
                  <ul>
                    {tripDetails?.exclusions?.map((data, i) => {
                      return (
                        <li key={i}>
                          {i + 1}. {data}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              <div className="item">
                <div className="label">Recommendations</div>
                <div className="value">
                  <ul>
                    {tripDetails?.recommendations?.map((data, i) => {
                      return (
                        <li key={i}>
                          {i + 1}. {data}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              <div className="item">
                <div className="label">Terms & Conditions</div>
                <div className="value">
                  <ul>
                    {tripDetails?.terms?.map((data, i) => {
                      return (
                        <li key={i}>
                          {i + 1}. {data}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>

            <div className="itineraryView">
              <div className="heading">Itinerary</div>
              <Tabs defaultActiveKey="1" items={getItineraryItems()} />
            </div>

            <div className="pricingView">
              <div className="heading">Pricing Plan</div>
              <Table
                columns={PricingPlanTable}
                dataSource={tripDetails?.priceSlots}
                pagination={false}
                rowKey={(record)=>record} 
              />
            </div>

            <div className="view5">
              <div className="heading">Photos</div>
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
