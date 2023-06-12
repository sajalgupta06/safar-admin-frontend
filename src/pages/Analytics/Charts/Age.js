import React from 'react'
import Chart from "react-apexcharts";

export default function Age() {

    const options =  {
        chart: {
          width: 380,
          type: 'pie',
        },
        
        legend: {
            position: 'bottom'
          },
          title: {
            text: "Age",
            align: "left",
          },
        labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
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
    
    
    
    const series = [44, 55, 13, 43, 22]
    
  return (
   <>
     <Chart options={options} series={series} type="pie" width={380} />


   </>
  )
}
