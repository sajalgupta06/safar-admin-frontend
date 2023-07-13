import React, { useEffect, useRef, useState } from "react";
import Chart from "react-apexcharts";
import { Button } from "antd";
import { getData, groupData } from "../data";
import { get15Days, getMonth, getWeeks } from "../dataGrouping";
import { fetchRevenueAnalytics } from "../../../action/req";

export default function Revenue() {

  const [categories, setCategories] = useState([]);
  const [data, setData] = useState([]);
  const [testData, setTestData] = useState([]);
  const [loading, setLoading] = useState(false);

  
  const weekButtonRef = useRef()


  const fetchData = async()=>{
    setLoading(true)
    try {
      
      const res = await fetchRevenueAnalytics()

        if(res.statusCode==="10000")
        {
         

          let groupedResults = groupData(res.data.revenue)
          setTestData(groupedResults)
          weekButtonRef.current.click()
        }

    } catch (error) {
        console.log(error)
    }

    setLoading(false)

  }

  useEffect(() => {
    fetchData()
  }, []);



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
        // columnWidth: "10%",
        endingShape: "rounded",
      },
    },

    // title: {
    //   text: "Revenue",
    //   align: "left",
    // },
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
      // title: {
      //   text: "Rs. (thousands)",
      // },
      labels: {
        formatter: function(value) {
          var val = Math.abs(value)
          if (val >= 1000) {
            val = (val / 1000).toFixed(0) + ' K'
          }
          return val
        }
      }
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          var val = Math.abs(val)
          if (val >= 1000) {
            val = (val / 1000).toFixed(2) + ' K'
          }
          // return val
          return "Rs. " + val + " thousands";
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
    {loading ==true? "Loading...":(
      <>
   
        <div className="headerButtons">

        <a onClick={() => handleWeek()} ref={weekButtonRef}>Last Week</a>
        <a onClick={() => handl15Days()}>Last 15 Days</a>
        <a onClick={() => handleMonth()}>Last Month</a>

        </div>
        <Chart options={options} series={series} type="bar" height={300} />
   
      </>
    )}
      
    </>
  );
}
