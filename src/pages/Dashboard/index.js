import React, { useEffect, useState } from "react";
import "./Dashboard.scss";
import {

  AiOutlineInfoCircle,
} from "react-icons/ai";
import { TfiAnnouncement } from "react-icons/tfi";
import { MdUpdate } from "react-icons/md";
import { IoTicketOutline } from "react-icons/io5";
import Camping from "../../static/images/Trip-pana.svg";
import { getAllBookingTrips } from "../../action/req";
import { Carousel } from "antd";
import { BiRupee, BiSupport } from "react-icons/bi";
import Bookings from "../Analytics/Charts/Bookings";
import Revenue from "../Analytics/Charts/Revenue";


export default function Dashboard() {

  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [compLoading, setCompLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isBannderAlert, setIsBannerAlert] = useState(true);

  var welcome;

  var date = new Date();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  if (minute < 10) {
    minute = "0" + minute;
  }
  if (second < 10) {
    second = "0" + second;
  }
  if (hour < 12) {
    welcome = "Good Morning";
  } else if (hour < 17) {
    welcome = "Good Afternoon";
  } else {
    welcome = "Good Evening";
  }

  //   useEffect(() => {
  //     // console.log(trips);
  //   }, [trips]);

  useEffect(() => {
    // console.log(notifications);
  }, [notifications]);

  useEffect(() => {
    // fetchTrips();
    // fireFunc();
  }, []);

  const fetchTrips = async () => {
    setCompLoading(true);
    const result = await getAllBookingTrips();
    if (result.success) {
      setTrips(result.data);
    }
    setCompLoading(false);
  };

  
  const handleBannerAlert = () => {
    setIsBannerAlert(false);
  };





  
  const contentStyle = {
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };

  return (
    <>
      <div className="db">
        <div className="db-left">
        
          <div className="headingWish">
            <span>
              {welcome}, 
              </span> 

               Sajal !
          </div>

          <div className="db-left-top">
            <div className="db-left-top-left">
              <div className="templateHead-card">
                <div className="templateHead-card-head">
                  <IoTicketOutline className="hedIcn" />
                  <p>Bookings</p>
                </div>
                <div className="templateHead-card-box">
                 <Bookings/>
                </div>
              </div>
            </div>
            <div className="db-left-top-right">
              <div className="templateHead-card">
                <div className="templateHead-card-head">
                  <BiRupee />
                  <p>Revenue </p>
                </div>
                <div className="templateHead-card-box"><Revenue/></div>
              </div>
            </div>
          </div>

          <div className="db-left-middle">
          <div className="db-left-middle-left">
            <div className="templateHead-card">
              <div className="templateHead-card-head">
                <AiOutlineInfoCircle />
                <p>Watchlist</p>
              </div>
              <div className="templateHead-card-box"></div>
            </div>
            </div>
            <div className="db-left-middle-right">
            <div className="templateHead-card">
              <div className="templateHead-card-head">
                <AiOutlineInfoCircle />
                <p>Announcement</p>
              </div>
              <div className="templateHead-card-box">

                <div className="singleAnnouncement">
                  Hello
                </div>

              </div>
            </div>
            </div>
          </div>
        </div>
{/* 
        <div className="db-right">
          <div className="db-right-body">
            
            <Carousel >
                <div className="CarouselItem">

             
              <img
                className="sImg"
                src={Camping}
                alt="slide 1"
                />
                </div>
            <div className="CarouselItem" > 

              <div className="dan">
                <p>7 days trip</p>
                <p>Trip 11</p>
              </div>
              <p>3 days to trip to Sikkim</p>
              <img
                className=" sImg"
                src={Camping}
                alt="slide 2"
                />
                </div>
                <div className="CarouselItem">

              <div className="dan">
                <p>9 days trip</p>
                <p>Trip 11</p>
              </div>
              <p>2 days to trip to Rajashthan </p>
              <img
                className=" sImg"
                src={Camping}
                alt="slide 3"
                />
                </div>
            </Carousel>
          </div>
         
        </div> */}
      </div>
    </>
  );
}
