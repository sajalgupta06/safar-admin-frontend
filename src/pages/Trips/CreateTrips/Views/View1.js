import React, { useContext, useEffect, useState } from "react";
import "../CreateTrips.scss";
import { Footer, Header } from "..";
import { Button, Col, DatePicker, Form, Input, List, Row, Select } from "antd";
import { MyContext } from "../../../../App";
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import moment from "moment";
import EditableTags from "../../../../utils/EditableTags";
import { alerts } from "../../../../utils/alert";
import { view1Validator } from "../validators";

const { RangePicker } = DatePicker;

export default function View1(props) {
  const context = useContext(MyContext);



  const { tripDetails, setTripDetails } = props;
  const [travelDateState, setTravelDateState] = useState();
  const [allLocations, setAllLocations] = useState();

  const [validationStatus, setValidationStatus] = useState();

  useEffect(() => {
    console.log(tripDetails);

  }, [tripDetails]);

  const handleOnClickNext = () => {
    // const result = view1Validator({ ...tripDetails });

    // if(!result.validate)
    // {
    //   alerts.error(result.message)
    //   setValidationStatus({ [result?.field] : "error"})
    //   return
    // }

    context.setCreateTripView({
      type: "SET_CREATE_TRIPVIEW",
      payload: context.createTripView + 1,
    });
  };

  const handleOnClickBack = () => {};

  const onChangeInput = (val, field) => {
    if (tripDetails) {
      setTripDetails({ ...tripDetails, [field]: val });
    } else {
      setTripDetails({ [field]: val });
    }

    
  };

  const addTravelDates = () => {
    if (!travelDateState) return;
    const obj = {
      startDate: travelDateState[0].format("DD-MM-YYYY"),
      endDate: travelDateState[1].format("DD-MM-YYYY"),
    };
    if (tripDetails) {
      if (tripDetails.dates) {
        setTripDetails({ ...tripDetails, dates: [...tripDetails.dates, obj] });
      } else {
        setTripDetails({ ...tripDetails, dates: [obj] });
      }
    } else {
      setTripDetails({ dates: [obj] });
    }
  };

  const removeTravelDate = (key) => {
    setTripDetails({
      ...tripDetails,
      dates: tripDetails.dates.filter((date, i) => key != i),
    });
  };

  const getTravelDates = () => {
    if (tripDetails?.dates) {
      return tripDetails?.dates?.map((date, i) => {
        return (
          <div key={i} className="travelDateList">
            <p>
              {date.startDate} {"----->"} {date.endDate}
            </p>
            <AiOutlineDelete onClick={() => removeTravelDate(i)} />
          </div>
        );
      });
    }
    return [];
  };

  useEffect(() => {
    if (allLocations) {
      setTripDetails({
        ...tripDetails,
        locations: allLocations,
      });
    }
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
              initialValues={{ ...tripDetails }}
            >
              <Row gutter={70}>
                <Col span={8} style={{ paddingLeft: 0 }}>
                  {" "}
                  <Form.Item label="Name" name="name">
                    <Input
                      value={tripDetails?.name}
                      onChange={(e) => onChangeInput(e.target.value, "name")}
                      status={validationStatus?.name}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  {" "}
                  <Form.Item
                    label="Type"
                    name="type"
                    initialValue={"Choose Trip Type"}
                  >
                    <Select
                      // style={{
                      //   width: 220,
                      // }}

                      status={validationStatus?.type}
                      onChange={(value) => onChangeInput(value, "type")}
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
                  <Form.Item label="Age Limit" name="ageLimit">
                    <Input
                      type="number"
                      min={1}
                      max={80}
                      value={tripDetails?.ageLimit}
                      onChange={(e) =>
                        onChangeInput(e.target.value, "ageLimit")
                      }
                      status={validationStatus?.ageLimit}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={50}>
                <Col span={8} style={{ paddingLeft: 0 }}>
                  {" "}
                  <Form.Item label="Last Date To Register" name="lastDate">
                    <DatePicker
                      style={{ width: "100%" }}
                      value={moment(tripDetails?.lastDate, "DD-MMM-YYYY")}
                 
                      onChange={(date,dateString) =>   onChangeInput(date.format("DD-MM-YYYY"), "lastDate")}            
                      format={"DD-MMM-YYYY"}
                      disabledDate={(current) => {
                        return current && current < moment().add(0, "d");
                      }}
                      status={validationStatus?.lastDate}
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
                      status={validationStatus?.region}
                      value={tripDetails?.region}
                      onChange={(e) => onChangeInput(e.target.value, "region")}
                    />
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Form.Item label="Days" name="days">
                    <Input
                      type="number"
                      min={0}
                      value={tripDetails?.days}
                      onChange={(e) =>
                        onChangeInput(parseInt(e.target.value), "days")
                      }
                      status={validationStatus?.days}
                    />
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Form.Item label="Nights" name="nights">
                    <Input
                      type="number"
                      min={0}
                      value={tripDetails?.nights}
                      onChange={(e) =>
                        onChangeInput(parseInt(e.target.value), "nights")
                      }
                      status={validationStatus?.nights}
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
                    status={validationStatus?.locations}
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
                        status={validationStatus?.dates}
                        onChange={(e) => setTravelDateState(e)}
                        cellRender={(current) => {
                          const style = {};
                          if (current.date() === 1) {
                            style.border = "1px solid #1677ff";
                            style.borderRadius = "50%";
                          }
                          return (
                            <div
                              className="ant-picker-cell-inner"
                              style={style}
                            >
                              {current.date()}
                            </div>
                          );
                        }}
                      />
                      <Button type="primary" onClick={addTravelDates}>
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
