import React from 'react'
import Chart from "react-apexcharts";
import { getPassengers } from '../data';

export default function Age() {
  const testData =getPassengers()

 const getData = ()=>{
   

    let below16 = 0;
    let between16and30 = 0
    let between30and50 = 0
    let above50 = 0

    let getAgeCategory = (age)=>{

      if(age<=16) return "below16"
      if(age>16 && age<=30)return "between16and30"
      if(age>30 && age<=50)return "between30and50"
      if(age>50)return "above50"
    }

  

    testData?.map(obj=>{
      if(getAgeCategory(obj.age)==="below16")below16++
      if(getAgeCategory(obj.age)==="between16and30")between16and30++
      if(getAgeCategory(obj.age)==="between30and50")between30and50++
      if(getAgeCategory(obj.age)==="above50")above50++
     
    })

    return [
      below16,
      between16and30,
      between30and50,
      above50
    ]

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
            text: "Age",
            align: "left",
          },
        labels: ['Under 16', '16 - 30', '30 - 50', 'Above 50'],
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
