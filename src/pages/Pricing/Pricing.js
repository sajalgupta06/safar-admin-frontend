import React, { useContext, useEffect, useState } from 'react'
import './Pricing.scss'
import { BiRupee } from 'react-icons/bi'
import { Link } from 'react-router-dom';

export default function Pricing() {

    const [selectedPlan , setSelectedPlan] = useState("2")
    const handleUpdatePricingPlan=()=>{}
  return (
   <div className='pricing'>

     <div className="background">
  <div className="container">
    <div className="panel pricing-table">
      
      <div className="pricing-plan">
        <img src="https://s22.postimg.cc/8mv5gn7w1/paper-plane.png" alt="" className="pricing-img"/>
        <h2 className="pricing-header">Small team</h2>
        <ul className="pricing-features">
          <li className="pricing-features-item">Email Service</li>
          <li className="pricing-features-item">Payment Service</li>
          <li className="pricing-features-item">Analytics Service</li>
        </ul>
        <p className="start_tag">Starting at*</p>
        <span className="pricing-price"><BiRupee/>500<span style={{fontSize:"1.5rem", marginLeft:"0.5rem"}}> / Month</span></span>
       <Link to="/pricing/addons"> <p className={`pricing-button`} >See Details</p></Link>
      </div>  
      
      <div className="pricing-plan">
        <img src="https://s28.postimg.cc/ju5bnc3x9/plane.png" alt="" className="pricing-img"/>
        <h2 className="pricing-header">Business</h2>
        <ul className="pricing-features">
          <li className="pricing-features-item">All Small Team Features</li>
          <li className="pricing-features-item">Accept Payments</li>

         
        </ul>
        <p className="start_tag">Starting at*</p>

        <span className="pricing-price"><BiRupee/>1500 <span style={{fontSize:"1.5rem", marginLeft:"0.5rem"}}> / Month</span></span>
        <p  className={`pricing-button ${selectedPlan==="1"?"is-featured":""}`}  onClick={()=>handleUpdatePricingPlan("1")}>{selectedPlan==="1"?"Selected":"Buy"}</p>
      </div>
      
      <div className="pricing-plan">
        <img src="https://s21.postimg.cc/tpm0cge4n/space-ship.png" alt="" className="pricing-img"/>
        <h2 className="pricing-header">Enterprise</h2>
        <ul className="pricing-features">
        <li className="pricing-features-item">All  Business  Plan Features</li>
          <li className="pricing-features-item"> Smart Feedback System</li>
          {/* <li className="pricing-features-item"> Email Service</li> */}

          <li className="pricing-features-item"> Advanced Analytics</li>
        </ul>
        <p className="start_tag">Starting at*</p>

        <span className="pricing-price"><BiRupee/>2500  <span style={{fontSize:"1.5rem", marginLeft:"0.5rem"}}> / Month</span></span>
        <p  className={`pricing-button ${selectedPlan==="2"?"is-featured":""}`}  onClick={()=>handleUpdatePricingPlan("2")}>{selectedPlan==="2"?"Selected":"Buy"}</p>
      </div>
      
    </div>
  </div>
</div>
</div>
  )
}
