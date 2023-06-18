import React, { useEffect, useState } from "react";
import "./Bookings.scss";
import { Badge, Button, Descriptions, Drawer, Input, Space, Table } from "antd";
import { AiOutlineDownload, AiOutlineReload } from "react-icons/ai";
import {
  ActiveBookingsColumn,
  PassengersDetails,
} from "../../components/Table/columns";
import { useQuery } from "react-query";
import { fetchRecentTickets } from "../../action/req";
import moment from "moment";
import { Link } from "react-router-dom";

export default function ActiveBookings() {
  const [data, setData] = useState();
  const [open, setOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState();

  let { isLoading, error } = useQuery(
    "activeTickets",
    () => fetchRecentTickets(),
    { onSuccess: (res) => setData({rawData:res?.data?.tickets, searchedData:res?.data?.tickets}) }
  );

  const showDrawer = (record) => {
    setDrawerContent(record);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

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
            <Button onClick={() => showDrawer(record)}>View Details</Button>
            <Button
              style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
            >
              <AiOutlineDownload /> Receipt
            </Button>
          </div>
        </>
      ),
    };

    return [ ...ActiveBookingsColumn, actionColumn];
  };

  const handleSearch = (e) => {
        
    const searchedData = data?.rawData?.map(record=>{
      const ticketId = record.ticketId.toString().toLowerCase().match(e.target.value.toString().toLowerCase())
     
      const amountMatch = record.payment.amount.toString().toLowerCase().match(e.target.value.toString().toLowerCase())

     
      
      if(!ticketId  && !amountMatch  )
      {
        return null
      }
      return record
    }).filter(record => !!record);


    setData({
      ...data,
      searchedData:e.target.value ? searchedData:data.rawData
    })
  };


  return (
    <>
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
      <section className="activeBookings">
        <div className="heading">
          <p>Active Bookings</p>
          <div className="search">  
          <Input className="searchInput" placeholder="Search"
          onChange={handleSearch}
          ></Input>
        </div>
          {/* <span className="refresh">
            <AiOutlineReload />
            Refresh
          </span> */}
        </div>

        <div className="activeBookings-content">
          <Table
            columns={getColumns()}
            dataSource={data?.searchedData}
            loading={isLoading}
            rowKey={"ticketId"}

          />
        </div>
      </section>
    </>
  );
}
