import React, { useContext, useState } from "react";
import "./Bookings.scss";
import { Button, Descriptions, Drawer, Table } from "antd";
import {
  AllBookingsColumn,
  PassengersDetails,
  SingleTripBookingsColumn,
} from "../../components/Table/columns";
import { MyContext } from "../../App";
import { useQuery } from "react-query";
import { fetchAllBookingsTrips, getTripTicket } from "../../action/req";
import { Link, useParams } from "react-router-dom";
import { AiOutlineDownload } from "react-icons/ai";
import moment from "moment";
import DataNotFound from "../../components/NotFound/DataNotFound";

export default function SingleTripBookings() {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState();

  let { isLoading, error, data } = useQuery(`SingleTripTickets/${id}`, () =>
    getTripTicket(id)
  );

  data = data?.data?.tickets?.tickets;

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
            <Button onClick={() => showDrawer(record)}>View More</Button>
            <Button
              style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
            >
              <AiOutlineDownload /> Receipt
            </Button>
          </div>
        </>
      ),
    };

    return [...SingleTripBookingsColumn, actionColumn];
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
                {moment(drawerContent?.createdAt).format(
                  "hh:mm A ,  DD MMM YYYY"
                )}
              </Descriptions.Item>

              <Descriptions.Item label="Booked By">
                {drawerContent?.userDetails?.name}
              </Descriptions.Item>
            </Descriptions>
            <br></br>
            <Table
              columns={PassengersDetails}
              dataSource={drawerContent?.passengers}
              rowKey={(record) => record._id}
              pagination={false}
              // scroll={{ x: 1000}}
            />
          </Drawer>

          <section className="allBookings">
            <div className="heading">
              <p>{data && data[0]?.tripDetails?.name}</p>
            </div>

            <div className="allBookings-content">
              <Table
                columns={getColumns()}
                dataSource={data}
                rowKey={"_id"}
                loading={isLoading}
              />
            </div>
          </section>
        </>
      

     
 
  );
}
