import React, { useEffect, useState } from 'react'
import Chart from "react-apexcharts";
import { getPassengers } from '../data';

export default function Gender() {

  const testData =getPassengers()



  const getData = ()=>{
   
    let male=0, female=0, other=0;

    testData?.map(obj=>{
      if(obj.gender==="Male")male++
      if(obj.gender==="Female")female++
      if(obj.gender==="Other")other++
    })

    return [male,female,other]

  }

  


    const options =  {
        chart: {
          width: 380,
          type: 'pie',
        },
        
        legend: {
            position: 'bottom'
          },
          title: {
            text: "Gender",
            align: "left",
          },
        labels: ['Male', 'Female', 'Other'],
        responsive: [{  
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      }
    
    
    
    const series = getData()
    
  return (
   <>
     <Chart options={options} series={series} type="pie" width={380} />


   </>
  )
} 
