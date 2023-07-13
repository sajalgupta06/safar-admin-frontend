import React, { useEffect, useState } from "react";
import "./Messages.scss";
import { Avatar, Button, Descriptions, Drawer, List, Modal, Select, Table, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { AiOutlinePlus, AiOutlineSend } from "react-icons/ai";
import { useQuery } from "react-query";
import { fetchActiveTripsBookingDetails } from "../../action/req";
import moment from "moment";
import { getModesOptions } from "../../utils/helper";
import { object_equals } from "../../utils/functions";
import { ActiveBookingsColumn, MessagePassengersColumn, PassengersDetails } from "../../components/Table/columns";

export default function Messages() {
  const [messageData, setMessageData] = useState();
  const [dates, setDates] = useState();
  const [priceSlot, setPriceSlot] = useState();
  const [validationStatus, setValidationStatus] = useState();
  const [drawerContent, setDrawerContent] = useState();
  const [open, setOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  let { isLoading, error, data } = useQuery("activeTripsBookingDetails", () =>
    fetchActiveTripsBookingDetails()
  );

  data = data?.data?.trips;



  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };



  const showDrawer = (record) => {
    setDrawerContent(record);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const getTripsOptions = () => {
    return data?.map((obj) => {
      let tripDetail = {
        name: obj?.trip?.name,
        id: obj?.trip?._id,
      };
      return {
        label: obj?.trip?.name,
        value: JSON.stringify(tripDetail),
      };
    });
  };

  const handleOnChangeChooseTrip = (value) => {
    let id = value._id;
    delete value.dates;
    delete value.priceSlots;
    delete value._id;

    setMessageData({
      ...messageData,
      tripDetails: {
        ...value,
        id: id,
      },
    });

    setDates([]);
  };

  const handleOnChangeChooseDate = (value) => {
    
    const items = [];
    
    value?.map((val) => {
      
      items.push(JSON.parse(val));
    });
    
    setDates(items);
    
    getPassengersList()
 
  };

  const getDatesOptions = () => {
    const name = messageData?.tripDetails?.name;

    const dates = data
      ?.map((obj) => {
        if (obj?.trip.name === name) {
          return obj?.trip?.dates;
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


  const getPassengersList = ()=>{

    let list = []

    data?.map(obj=>{
      obj?.tickets?.map(ticket=>{

        dates?.map(date=>{
          if(object_equals(ticket.tripDetails.priceSlot.date,date))
          {
            list.push(ticket)
          }
        })
      
      })
    })

    // console.log(list)
    return list

  }


 
  const getColumns = () => {

    const actionColumn = {
      title: "Action",
      key: "action",
      render: (record) => (
        <>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <Button onClick={() => showDrawer(record)}>View More</Button>
           
          </div>
        </>
      ),
    };

    return [ ...MessagePassengersColumn, actionColumn];
  };
  const rowSelection = {
    selectedRowKeys:selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys( selectedRowKeys)

    },
    // getCheckboxProps: (record) => ({
    //   disabled: record.name === "Disabled User",
    //   // Column configuration not to be checked
    //   name: record.name,
    // }),
  };


  // useEffect(() => {
  //   console.log(messageData);
  // }, [messageData]);

  // useEffect(() => {
  //   console.log(dates);
  // }, [dates]);

  // const listData = [
  //   {
  //     title: 'Ant Design Title 1',
  //   },
  //   {
  //     title: 'Ant Design Title 2',
  //   },
  //   {
  //     title: 'Ant Design Title 3',
  //   },
  //   {
  //     title: 'Ant Design Title 4',
  //   },
  // ];
  const listData = [];

  for (let index = 0; index < 20; index++) {
    
    listData.push({title:`Ant Design Title ${index+1}`})
    
  }


  return (
    <>

<Modal title="Send New Message" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
  width={"1000px"}
  style={{top:20}}

>
<div className="messages-container">
          <div className="messages-container-options">
            <div className="messages-container-options-option">
              <label>Choose Trip</label>
              <Select
                className="inputSelect"
                placeholder="Choose Trip"
                options={getTripsOptions()}
                
                // value={messageData?.tripDetails?.name}
                loading={isLoading}   
                showArrow={true}
                status={validationStatus?.tripName}
                onChange={(value) =>
                  handleOnChangeChooseTrip(JSON.parse(value))
                }
              />
            </div>
            <div className="messages-container-options-option">
              <label>Choose Dates</label>
              <Select
                className="inputSelect"
                placeholder="Choose Dates"
                mode="multiple"
                options={getDatesOptions()}
                
                // value={
                //    dates?.length > 0
                //     ? dates?.map(
                //         (val) =>
                //           moment(val.startDate, "DD-MM-YYYY").format(
                //             "DD MMM YY"
                //           ) +
                //           " - " +
                //           moment(val.endDate, "DD-MM-YYYY").format("DD MMM YY")
                //       )
                //     : []
                // }
                onChange={(value) => handleOnChangeChooseDate(value)}
              />
            </div>

            {/* <div className="messages-container-options-option">
              <label>Choose Modes</label>
              <Select
                className="inputSelect"
                defaultValue="lucy"
                mode="multiple"
                options={getModesOptions}
              />
            </div> */}
          </div>
          <div className="messages-container-passengers">
            <div className="heading">Passengers List</div>
            <Table locale={{ emptyText: "Choose trip to view passengers" }}
              columns={getColumns()}
              dataSource={getPassengersList()}
              rowKey={"ticketId"}
              rowSelection={rowSelection}
            />
          </div>
          <div className="messages-container-content">
            <div className="heading">Message Content</div>
            <TextArea
              rows={8}
              placeholder="Enter the Message You want to send"
              value={messageData?.content}
              onChange={(e)=>setMessageData({...messageData, content:e.target.value})}
            />
          </div>
        </div>
      </Modal>

    <Drawer
        title="Ticket Detail"
        width={900}
        onClose={onClose}
        open={open}
        bodyStyle={{
          paddingBottom: 60,
        }}
      >
        <Descriptions layout="vertical" bordered>
          <Descriptions.Item label="Trip Name">
            {drawerContent?.tripDetails?.name}
          </Descriptions.Item>

          <Descriptions.Item label="Start Date">
            {moment(
              drawerContent?.tripDetails?.priceSlot?.date?.startDate,
              "DD-MM-YYYY"
            ).format("DD MMM YY")}
          </Descriptions.Item>

          <Descriptions.Item label="End Date">
            {moment(
              drawerContent?.tripDetails?.priceSlot?.date?.endDate,
              "DD-MM-YYYY"
            ).format("DD MMM YY")}
          </Descriptions.Item>

          <Descriptions.Item label="Pickup Point">
            {drawerContent?.tripDetails?.priceSlot?.pickupPoint}
          </Descriptions.Item>

          <Descriptions.Item label="Pickup Mode">
            {drawerContent?.tripDetails?.priceSlot?.pickupMode}
          </Descriptions.Item>

          <Descriptions.Item label="Drop Point">
            {drawerContent?.tripDetails?.priceSlot?.dropPoint}
          </Descriptions.Item>

          <Descriptions.Item label="Drop Mode">
            {drawerContent?.tripDetails?.priceSlot?.dropMode}
          </Descriptions.Item>

          <Descriptions.Item label="Amount">
            Rs. {drawerContent?.tripDetails?.priceSlot?.amount}
          </Descriptions.Item>

          <Descriptions.Item label="Payment Mode">
            {drawerContent?.payment?.mode}
          </Descriptions.Item>

          <Descriptions.Item label="Booked On">
            {moment(drawerContent?.createdAt).format("hh:mm A ,  DD MMM YYYY")}
          </Descriptions.Item>

          <Descriptions.Item label="Booked By">
            {drawerContent?.userDetails?.name}
          </Descriptions.Item>
        </Descriptions>
              <br></br>
        <Table
          columns={PassengersDetails}
          dataSource={drawerContent?.passengers}
          rowKey={(record) => JSON.stringify(record)}
          pagination={false}  
          // scroll={{ x: 1000}}
        />
      </Drawer>


      <div className="messages">
        <div className="top">
          
        <div className="top-heading">

          Message
          </div>
          <div className="top-button">
              <Button type="primary" onClick={showModal}><AiOutlinePlus/> New Message</Button>

          </div>
          </div>
          <div className="body">
          <List
    itemLayout="horizontal"
    dataSource={listData}
    renderItem={(item, index) => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
          title={<a href="https://ant.design">{item.title}</a>}
          description="Ant Design, a design language for background applications, is refined by Ant UED Team"
        />
      </List.Item>
    )}
  />
            </div>
       
        {/* <div className="messages-footer">
          <Button type="primary">
            Send Message <AiOutlineSend />{" "}
          </Button>
        </div> */}
      </div>


    </>
  );
}
