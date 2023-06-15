import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { Button } from "antd";
import { getData } from "../data";
import { get15Days, getMonth, getWeeks } from "../dataGrouping";

export default function Revenue() {

  const [categories, setCategories] = useState([]);
  const [data, setData] = useState([]);
  const testData = getData()

  

  const options = {
    chart: {
      type: "bar",
      height: 350,
      toolbar:{
        show:false
      },
    },
   
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "40%",
        endingShape: "rounded",
      },
    },

    title: {
      text: "Revenue",
      align: "left",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: categories,
    },
    yaxis: {
      title: {
        text: "$ (thousands)",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "$ " + val + " thousands";
        },
      },
    },
  };

  const series = [
    {
      name: "Net Revenue",
      data: data,
    },
    // {
    //   name: "Cas",
    //   data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
    // },
    // {
    //   name: "Free Cash Flow",
    //   data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
    // },
  ];


  const handleWeek  =()=>{

    const res = getWeeks(testData)

    setCategories(res.xaxis)
    setData(res.yaxis)

  }

  const handl15Days  =()=>{

    const res = get15Days(testData)

    setCategories(res.xaxis)
    setData(res.yaxis)

  }

  const handleMonth  =()=>{

    const res = getMonth(testData)

    setCategories(res.xaxis)
    setData(res.yaxis)

  }

  return (
    <>
      <div>
        <div className="headerButtons">

        <Button onClick={() => handleWeek()}>Last Week</Button>
        <Button onClick={() => handl15Days()}>Last 15 Days</Button>
        <Button onClick={() => handleMonth()}>Last Month</Button>

        </div>
        <Chart options={options} series={series} type="bar" height={300} />
      </div>
    </>
  );
}
