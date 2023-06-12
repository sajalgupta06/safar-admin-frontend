import React from "react";
import './Analytics.scss'
import Revenue from "./Charts/Revenue";
import Bookings from "./Charts/Bookings";
import Gender from "./Charts/Gender";
import Age from "./Charts/Age";
import Transport from "./Charts/Transport";

export default function Analytics() {
  return( 
  <>
  <div className="analytics">
  <div className="analytics-container">
    <div className="heading">Analytics</div>
  <div className="analytics-container-performance">
    <div className="heading">Performance</div>
  <div className="analytics-container-performance-content">
  <div className="analytics-container-performance-content-top">

  <Revenue/>
  </div>
  <div className="analytics-container-performance-content-bottom">

  <Bookings/>

  </div>

  </div>
       

  </div>
  <div className="analytics-container-allTripsInsights">

  <div className="heading">Insights</div>

  <div className="analytics-container-allTripsInsights-content">
  <div className="analytics-container-allTripsInsights-content-top">

  {/* <Revenue/> */}
  <div className="boxes">
    <div className="box"></div>
    <div className="box"></div>
    <div className="box"></div>
    <div className="box"></div>
  </div>
  </div>
  <div className="analytics-container-allTripsInsights-content-bottom">
    <div className="gender"><Gender/></div>
    <div className="gender"><Age/></div>
    <div className="gender"><Transport/></div>


  </div>

  </div>
  </div>
  <div className="analytics-container-singleTripInsights"></div>

  </div>

  </div>
  
  </>
  )
}
