import React, { useContext, useEffect } from "react";
import "./Bookings.scss";
import {
  PassengersDetails,
  PricingPlanTable,
} from "../../components/Table/columns";
import { AiOutlinePlus } from "react-icons/ai";
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
} from "antd";
import { useState } from "react";
import { alerts } from "../../utils/alert";
import { addPassengerDetailsValidator, createBookingValidator } from "./validators";
import { useNavigate } from "react-router-dom";
import { createManualTicket, fetchActiveTripsNameSlugDatesPriceSlots } from "../../action/req";
import { useQuery } from "react-query";
import moment from "moment";
import { MyContext } from "../../App";

export default function AddBookings() {
  const [open, setOpen] = useState(false);
  const [passengerState, setPassengerState] = useState();
  const [ticketData, setTicketData] = useState();
  const [date, setDate] = useState();
  const [priceSlot, setPriceSlot] = useState();
  const [loading, setLoading] = useState(false);
  const [validationStatus, setValidationStatus] = useState();
  const navigate = useNavigate();
  const context = useContext(MyContext)

  let { isLoading, error, data } = useQuery(`activeTrips`, () =>
  fetchActiveTripsNameSlugDatesPriceSlots()
  );  

  data = data?.data?.trip;

  const handlePassengersDetailsOnChange = (val, field) => {
    setPassengerState({
      ...passengerState,
      [field]: val,
    });
  };

  const addPassenger = () => {

    const validationResult = addPassengerDetailsValidator(passengerState);

    if (!validationResult?.validate) {
      setValidationStatus({
        [validationResult.field]: "error",
      });
      alerts.error(validationResult.message);
      return;
    }

    // console.log(passengerData.length>0 && passengerData?.map((data)=>JSON.stringify(data) === JSON.stringify(passengerState)).filter((data)=>data===true))
    // if( passengerData.length>0 && passengerData?.map(data=>JSON.stringify(data) === JSON.stringify(passengerState) ))
    // {
    //     alerts.error("Duplicate Entry")
    //     return
    // }

      let isDuplicate = false
    ticketData?.passengers?.map(pass=>{
        if(JSON.stringify(pass) ===JSON.stringify(passengerState))
        {
          isDuplicate = true
          return
        }
    })

    if(isDuplicate)
    {
      alerts.error("Duplicate Entry")
        return
    }

    setValidationStatus({});

    if (ticketData) {
      if (ticketData?.passengers) {
        setTicketData({
          ...ticketData,
          passengers: [
            ...ticketData.passengers,
            passengerState,
          ],
        });
      } else {
        setTicketData({
          ...ticketData,
          passengers: [
            passengerState,
          ],
        });
      }
    } else {
      setTicketData({
        passengers:[
          passengerState,
        ],
      });
    }

    alerts.success("Passenger Added");
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const genderOptions = [
    {
      label: "Male",
      value: "MALE",
    },
    {
      label: "Female",
      value: "FEMALE",
    },

    {
      label: "Other",
      value: "OTHER",
    },
  ];

  const onRowClick = (record)=>{

      
    setTicketData({
      ...ticketData,
      tripDetails:{
        ...ticketData.tripDetails,
        priceSlot:record
      }
    })

  }

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      onRowClick(selectedRows[0]);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };


  const getActiveTripsOptions = () => {

    
    return data?.map((ele) => {
      
      return {
        label: ele?.name,
        value: JSON.stringify(ele),
      };
    });

  };

  const getDatesOptions = () => {
    const name = ticketData?.tripDetails?.name;

    const dates = data
      ?.map((ele) => {
        if (ele.name === name) {
          return ele.dates;
        }
      })
      .filter((ele) => ele != undefined)[0];


    return dates?.map((ele) => {
      delete ele._id;
      return {
        label:
          moment(ele.startDate, "DD-MM-YYYY").format("DD MMM YY") +
          " - " +
          moment(ele.endDate, "DD-MM-YYYY").format("DD MMM YY"),
        value: JSON.stringify(ele),
      };
    });
  };

  const getPriceSlotsOptions = (date) => {
    const priceSlotData = [];


    data?.map((element) => {
      element.priceSlots.forEach((e) => {
        if (JSON.stringify(e.date) === date) {
          priceSlotData.push(e);
        }
      });
    });

    setPriceSlot(priceSlotData);
  };

 

  const handleOnChangeChooseTrip = (value) => {

    let id = value._id
    delete value.dates
    delete value.priceSlots
    delete value._id
 
    setTicketData({
      ...ticketData,
      tripDetails: {
        ...value,
        id:id
      },
    });

    setDate();
    setPriceSlot();
  };

  const handleOnChangeChooseDate = (value) => {

    getPriceSlotsOptions(value)

      if(value)
      {

        setDate(JSON.parse(value))
      }

  };

  const handlePaymentOnchange = (value)=>{

    setTicketData({
      ...ticketData,
      payment:{
        mode:value,
        amount:ticketData?.passengers?.length  * ticketData?.tripDetails?.priceSlot?.amount,
        status:true
      }
    })
  }

  const createBooking = async() => {

    setLoading(true)
    // navigate("/all_bookings");

    const validationResult = createBookingValidator(ticketData)

    if(!validationResult?.validate)
    {
      setValidationStatus({[validationResult?.field]:"error"})
        alerts.error(validationResult?.message)
      return
    }

    context.setNoSpinLoading({
      type: "SET_NOSPIN_LOADING",
      payload: true,
    });


 

    console.log(ticketData)

   delete  ticketData.tripDetails.priceSlot._id

    try {
      const result = await createManualTicket(ticketData)


      if(result.statusCode==="10000")
      {
        alerts.success("Booking Confirmed")

        setTicketData()
        
        
      }
      else{

        console.log(result)

        alerts.error("Error Occured")

      }

      context.setNoSpinLoading({
        type: "SET_NOSPIN_LOADING",
        payload: false,
      });
      setLoading(false)
      setValidationStatus({})

    } catch (error) {

      alerts.error("Error Occured. Please Try again after some time")

      context.setNoSpinLoading({
        type: "SET_NOSPIN_LOADING",
        payload: false,
      });
      setLoading(false)
      setValidationStatus({})
    }

   
  


    
  };



 

  useEffect(() => {

    handlePaymentOnchange()

  }, [ticketData?.passengers, ticketData?.tripDetails?.priceSlot]);


  

  return (
    <>
    
      <Drawer
        title="Add New Passengers"
        width={720}
        onClose={onClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={addPassenger} type="primary">
              Add Passenger
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="name" label="Name">
                <Input
                  value={passengerState?.name}
                  onChange={(e) =>
                    handlePassengersDetailsOnChange(e.target.value, "name")
                  }
                  placeholder="Please enter  name"
                  status={validationStatus?.name}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="age" label="Age">
                <Input
                  type="number"
                  min={1}
                  max={100}
                  value={passengerState?.age}
                  onChange={(e) =>
                    handlePassengersDetailsOnChange(e.target.value, "age")
                  }
                  placeholder="Please enter  age"
                  status={validationStatus?.age}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="gender" label="Gender">
                <Select
                  placeholder="Please select  gender"
                  options={genderOptions}
                  status={validationStatus?.gender}
                  value={passengerState?.gender}
                  onChange={(value) =>
                    handlePassengersDetailsOnChange(value, "gender")
                  }
                ></Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="mobileNumber" label="Mobile Number">
                <Input
                  type="number"
                  placeholder="Please enter  Mobile Number"
                  value={passengerState?.mobileNumber}
                  onChange={(e) =>
                    handlePassengersDetailsOnChange(
                      e.target.value,
                      "mobileNumber"
                    )
                  }
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="email" label="Email">
                <Input
                  type="email"
                  placeholder="Please enter  Email ID"
                  value={passengerState?.email}
                  onChange={(e) =>
                    handlePassengersDetailsOnChange(e.target.value, "email")
                  }
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="aadharNumber" label="Aadhar Number">
                <Input
                  type="number"
                  placeholder="Please enter  Aadhar Number"
                  value={passengerState?.aadharNumber}
                  onChange={(e) =>
                    handlePassengersDetailsOnChange(
                      e.target.value,
                      "aadharNumber"
                    )
                  }
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>

      <div className="addBookings">
        <div className="heading">
          <p>Add Bookings</p>
        </div>

        <div className="addBookings-content">
          <div className="options">
            <div className="inputBox">
              <label> Choose Trip</label>
              <Select
                placeholder="Select from options"
                className="selectInput"
                options={getActiveTripsOptions()}
                value={ticketData?.tripDetails?.name}
                  status={validationStatus?.tripName}
                onChange={(value) =>
                  handleOnChangeChooseTrip(JSON.parse(value))
                }
              />
            </div>

            <div className="inputBox">
              <label> Date</label>
              <Select
                placeholder="Select from options"
                className="selectInput"
                options={getDatesOptions()}
                value={
                  date &&
                  moment(date.startDate, "DD-MM-YYYY").format("DD MMM YY") +
                    " - " +
                    moment(date.endDate, "DD-MM-YYYY").format("DD MMM YY")
                }
                onChange={(value) => handleOnChangeChooseDate(value)}
              />
            </div>

           
          </div>

          <div className="passengersTable">
            <Table
              columns={PricingPlanTable}
              dataSource={priceSlot}
              rowKey={record=>JSON.stringify(record)}
              rowSelection={{
                type: "radio",
                defaultSelectedRowKeys: "1",
                ...rowSelection,
              }}
            ></Table>
          </div>

          <div className="addPassengersDiv" onClick={showDrawer}>
            <AiOutlinePlus /> Add Passengers
          </div>

          {ticketData?.passengers?.length > 0 && (
            <div className="passengersTable">
              <Table
                columns={PassengersDetails}
                dataSource={ticketData?.passengers}
                rowKey={(record) => JSON.stringify(record)}
                pagination={false}
                
              ></Table>
            </div>
          )}
  <div className="options">
  <div className="inputBox">
              <label> Amount </label>
              {ticketData?.passengers && ticketData?.tripDetails?.priceSlot && (
              <label  className="labelInput" > {  ticketData?.payment?.amount || 0 } </label>
              )}

             
            </div>

      <div className="inputBox">
              <label> Payment Mode</label>
              <Select
                placeholder="Select from options"
                className="selectInput"
                status={validationStatus?.paymentMode}

                onChange={(value)=>handlePaymentOnchange(value)}
                options={[
                  {
                    value: "CASH",
                    label: "Cash",
                  },
                  {
                    value: "CARD",
                    label: "Card",
                  },
                  {
                    value: "UPI",
                    label: "UPI",
                  },
                  {
                    value: "OTHER",
                    label: "Other",
                  },
                ]}
              />
            </div>
            </div>
        </div>

        <div className="addBookings-footer">
          <Button
            className="btn-success"
            type="primary"
            onClick={createBooking}
            loading={context.noSpinLoading}
          >
            Create Booking
          </Button>
        </div>
      </div>
    </>
  );
}
