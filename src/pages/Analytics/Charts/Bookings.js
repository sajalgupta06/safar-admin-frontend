import React, { useEffect, useRef, useState } from "react";
import Chart from "react-apexcharts";
import { Button } from "antd";
import { getData, groupData } from "../data";
import {  get15DaysBookings, getMonthBookings,  getWeeksBooking } from "../dataGrouping";
import { fetchBookingsAnalytics } from "../../../action/req";

export default function Bookings() {
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState([]);
  const [testData, setTestData] = useState([]);
  const [loading, setLoading] = useState(false);

  const weekButtonRef = useRef()


  const fetchData = async()=>{
    setLoading(true)

    try {
      
      const res = await fetchBookingsAnalytics()

        if(res.statusCode==="10000")
        {
         

          let groupedResults = groupData(res.data.bookings)
          setTestData(groupedResults)
          weekButtonRef.current.click()

          // setTestData(getData())
        }

    } catch (error) {
      
    }
    setLoading(false)

  }

  useEffect(() => {
    fetchData()
  }, []);






  const handleWeek = () => {
    const res = getWeeksBooking(testData);

    setCategories(res.xaxis);
    setData(res.yaxis);
  };

  const handl15Days = () => {
    const res = get15DaysBookings(testData);

    setCategories(res.xaxis);
    setData(res.yaxis);
  };

  const handleMonth = () => {
    const res = getMonthBookings(testData);

    setCategories(res.xaxis);
    setData(res.yaxis);
  };

  const options = {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
      toolbar:{
        show:false
      }
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: "Bookings",
      align: "left",
      
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: categories
    },
  };

  const series = [
    {
      name: "Bookings",
      data: data,
    },
  ];

  return (
    <>
        {loading ==true? "Loading...":(
          <>
                <div className="headerButtons">
        <Button onClick={() => handleWeek()} ref={weekButtonRef} >Last Week</Button>
        <Button onClick={() => handl15Days()}>Last 15 Days</Button>
        <Button onClick={() => handleMonth()}>Last Month</Button>
      </div>
      <Chart options={options} series={series} type="line" height={300} />
          </>
  )}

    </>
  );
}
