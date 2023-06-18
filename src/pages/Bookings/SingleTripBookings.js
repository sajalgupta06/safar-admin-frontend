import React, { useContext, useState } from "react";
import "./Bookings.scss";
import { Button, Descriptions, Drawer, Input, Popover, Table } from "antd";
import {
  AllBookingsColumn,
  PassengersDetails,
  SingleTripBookingsColumn,
} from "../../components/Table/columns";
import { MyContext } from "../../App";
import { useQuery } from "react-query";
import { fetchAllBookingsTrips, getTripTicket } from "../../action/req";
import { Link, useParams } from "react-router-dom";
import { AiOutlineDownload, AiOutlineExport } from "react-icons/ai";
import moment from "moment";
import DataNotFound from "../../components/NotFound/DataNotFound";
import { BiDotsVerticalRounded } from "react-icons/bi";

export default function SingleTripBookings() {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState();
  const [data, setData] = useState(null);

  let { isLoading, error } = useQuery(
    `SingleTripTickets/${id}`,
    () => getTripTicket(id),
    {
      onSuccess: (res) =>
        setData({
          rawData: res.data?.tickets?.tickets,
          searchedData: res.data?.tickets?.tickets,
        }),
    }
  );

  const showDrawer = (record) => {
    setDrawerContent(record);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const moreOptionsContent = (
    <div className="moreOptionDiv">
      <Button className="moreOptionButton">
        {" "}
        <AiOutlineDownload /> Download Ticket
      </Button>
     
    </div>
  );
  const getColumns = () => {
    const actionColumn = {
      title: "Action",
      key: "action",
      render: (record) => (
        <>
          <div className="actionDiv">
            <Button onClick={() => showDrawer(record)}>View Details</Button>
            <Popover
              rootClassName="moreOptionPopover"
              trigger={"click"}
              placement="bottom"
              content={moreOptionsContent}
            >
              <BiDotsVerticalRounded
                style={{
                  height: "3rem",
                  width: "3rem",
                  color: "var(--primary)",
                  cursor: "pointer",
                }}
              />
            </Popover>
          </div>
        </>
      ),
    };

    return [...SingleTripBookingsColumn, actionColumn];
  };

  const handleSearch = (e) => {
    const searchedData = data?.rawData
      ?.map((record) => {
        const ticketId = record.ticketId
          .toString()
          .toLowerCase()
          .match(e.target.value.toString().toLowerCase());

        if (!ticketId) {
          return null;
        }
        return record;
      })
      .filter((record) => !!record);

    setData({
      ...data,
      searchedData: e.target.value ? searchedData : data.rawData,
    });
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
          rowKey={(record) => record._id}
          pagination={false}
          // scroll={{ x: 1000}}
        />
      </Drawer>

      <section className="singleBookings">
        <div className="singleBookings-top">
          <div className="heading">
            {data && data.rawData[0]?.tripDetails?.name}
            <p>{data && data[0]?.tripDetails?.name}</p>
          </div>
          <div className="search">
            <Input className="searchInput" placeholder="Search" onChange={handleSearch}></Input>
          </div>
        </div>

        <div className="singleBookings-content">
          <Table
            columns={getColumns()}
            dataSource={data?.searchedData}
            rowKey={"_id"}
            loading={isLoading}
          />
        </div>
      </section>
    </>
  );
}
