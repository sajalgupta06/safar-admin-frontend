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
  <div className="cards">
    {/* <div className="box"></div>
    <div className="box"></div>
    <div className="box"></div>
    <div className="box"></div> */}
   

   <div className="card purple">
  <p>51</p>
  <span>Trips</span>
</div>
  
<div className="card green">
<p>1500</p>
  <span>Travellers</span>
</div>

<div className="card blue">
<p>87</p>
  <span>Locations Covered</span>
</div>

<div className="card green">
<p>84K+</p>
  <span>Total Revenue</span>
</div>





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
