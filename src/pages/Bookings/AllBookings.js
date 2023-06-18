import React, { useContext, useState } from "react";
import "./Bookings.scss";
import { Button, Input, Popover, Table } from "antd";
import { AllBookingsColumn } from "../../components/Table/columns";
import { MyContext } from "../../App";
import { useQuery } from "react-query";
import { fetchAllBookingsTrips } from "../../action/req";
import { Link } from "react-router-dom";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { AiOutlineDownload, AiOutlineExport } from "react-icons/ai";
import moment from "moment";

export default function AllBookings() {

  const [data,setData]  = useState(null)

  let { isLoading, error } = useQuery("activeTickets", () =>
    fetchAllBookingsTrips(),
    {onSuccess:(res)=>setData({rawData:res.data.trips,searchedData:res.data.trips})}  )

  


  const getColumns = () => {
    const actionColumn = {
      title: "Action",
      key: "action",
      render: (record) => (
        <>
          <div className="actionDiv">
            <Button className="csvButton">
              <AiOutlineExport /> Export to CSV
            </Button>
          </div>
        </>
      ),
    };

    return [...AllBookingsColumn, actionColumn];
  };


  const handleSearch = (e) => {
        
    const searchedData = data?.rawData?.map(record=>{
      const nameMatch = record.trip.name.toString().toLowerCase().match(e.target.value.toString().toLowerCase())
      // const collectionMatch = record?.collections?.map((ele)=>ele.name.toString().toLowerCase().match(e.target.value.toString().toLowerCase())).filter(ele => !!ele)
      const ticketSold = record.ticketCount.toString().toLowerCase().match(e.target.value.toString().toLowerCase())

     
      
      if(!nameMatch  && !ticketSold  )
      {
        return null
      }
      return record
    }).filter(record => !!record);

    // console.log(searchedData)

    setData({
      ...data,
      searchedData:e.target.value ? searchedData:data.rawData
    })
  };

  return (
    <>
      <section className="allBookings">
        <div className="allBookings-top">
          <div className="heading">
            <p>All Bookings</p>
          </div>
      

        <div className="search">
          <Input className="searchInput" placeholder="Search" onChange={handleSearch} ></Input>
        </div>
        </div>
        <div className="allBookings-content">
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
