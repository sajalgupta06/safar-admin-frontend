import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { Button } from "antd";
import { getData } from "../data";
import { get15Days, getMonth, getWeeks } from "../dataGrouping";

export default function Bookings() {
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState([]);
  const testData = getData();

  const handleWeek = () => {
    const res = getWeeks(testData);

    setCategories(res.xaxis);
    setData(res.yaxis);
  };

  const handl15Days = () => {
    const res = get15Days(testData);

    setCategories(res.xaxis);
    setData(res.yaxis);
  };

  const handleMonth = () => {
    const res = getMonth(testData);

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
      name: "Desktops",
      data: data,
    },
  ];

  return (
    <>
      <div className="headerButtons">
        <Button onClick={() => handleWeek()}>Last Week</Button>
        <Button onClick={() => handl15Days()}>Last 15 Days</Button>
        <Button onClick={() => handleMonth()}>Last Month</Button>
      </div>
      <Chart options={options} series={series} type="line" height={300} />
    </>
  );
}
