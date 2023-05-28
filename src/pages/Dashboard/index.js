import React, { useEffect, useState } from "react";
import "./Dashboard.scss";
import {
  AiOutlineClockCircle,
  AiOutlineClose,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import { FiActivity } from "react-icons/fi";
import { BiStats } from "react-icons/bi";
import { MdUpdate } from "react-icons/md";
import Camping from "../../static/images/Trip-pana.svg";
import { getAllBookingTrips } from "../../action/req";
import { Carousel } from "antd";

// import {
//   getFirestore,
//   collection,
//   query,
//   onSnapshot,
//   orderBy,
// } from "firebase/firestore";

// import fire from "../../components/Firebase/Fire";

export default function Dashboard() {
  //   const db = getFirestore(fire);

  //   async function fireFunc() {
  //     try {
  //       const q = query(
  //         collection(db, "admin", "61929022c2124be78a6aebe2", "Activity"),
  //         orderBy("createdAt", "desc")
  //       );

  //       onSnapshot(q, (querySnapshot) => {
  //         setNotifications([]);
  //         querySnapshot.forEach((doc) => {
  //           setNotifications((e) => {
  //             return [...e, doc.data()];
  //           });
  //         });
  //       });
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }

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
          {isBannderAlert && (
            <section className="arya stark">
              <div className="sheet center middle">
                <div className="tile" style={{ transform: "none" }}>
                  <div className="bannerBx">
                    <AiOutlineClose
                      className="bannerCloseIcon"
                      onClick={handleBannerAlert}
                    />

                    <marquee
                      behavior="scroll"
                      direction="left"
                      className="marqueeBx"
                    >
                      <h1>Welcome to Safar</h1>
                    </marquee>
                  </div>
                </div>
              </div>
            </section>
          )}

          <div className="db-left-top">
            <div className="db-left-top-left">
              <div className="templateHead-card">
                <div className="templateHead-card-head">
                  <MdUpdate className="hedIcn" />
                  <p>Updates</p>
                </div>
                <div className="templateHead-card-box"></div>
              </div>
            </div>
            <div className="db-left-top-right">
              <div className="templateHead-card">
                <div className="templateHead-card-head">
                  <BiStats />
                  <p>Stats</p>
                </div>
                <div className="templateHead-card-box"></div>
              </div>
            </div>
          </div>

          <div className="db-left-middle">
            <div className="templateHead-card">
              <div className="templateHead-card-head">
                <AiOutlineInfoCircle />
                <p>Info</p>
              </div>
              <div className="templateHead-card-box"></div>
            </div>
          </div>
        </div>

        <div className="db-right">
          <div className="db-right-body">
            {/* <CCarousel
              controls
              indicators
              wrap={"false"}
              dark
              // interval="false"
              className="w-100 h-100 "
            >
              <CCarouselItem className="w-100 h-100 cIt">
                <div className="dan">
                  <p>5 days trip</p>
                  <p>Trip 11</p>
                </div>
                <p>4 days to trip to Manali and Kasol</p>
                <CImage
                  className="d-block w-100 h-100 sImg"
                  src={Camping}
                  alt="slide 1"
                />
              </CCarouselItem>

              <CCarouselItem className="w-100 h-100 cIt">
                <div className="dan">
                  <p>7 days trip</p>
                  <p>Trip 11</p>
                </div>
                <p>3 days to trip to Sikkim</p>
                <CImage
                  className="d-block w-100 h-100 sImg"
                  src={Camping}
                  alt="slide 1"
                />
              </CCarouselItem>

              <CCarouselItem className="w-100 h-100 cIt">
                <div className="dan">
                  <p>9 days trip</p>
                  <p>Trip 11</p>
                </div>
                <p>2 days to trip to Rajashthan </p>
                <CImage
                  className="d-block w-100 h-100 sImg"
                  src={Camping}
                  alt="slide 1"
                />
              </CCarouselItem>
            </CCarousel> */}
            <Carousel >
                <div className="CarouselItem">

              <div className="dan">
                <p>5 days trip</p>
                <p>Trip 11</p>
              </div>
              <p>4 days to trip to Manali and Kasol</p>
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
          <div className="db-right-bottom">
            <div className="templateHead-card">
              <div className="templateHead-card-head">
                <AiOutlineClockCircle />
                <p>Recent Activities</p>
              </div>
              <div className="templateHead-card-box">
                {notifications.map((not, i) => {
                  return (
                    <div className="templateHead-card-box-act" key={i}>
                      <FiActivity className="ic" />
                      <div className="templateHead-card-box-act-cont">
                        <p>{not.data.body} </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
