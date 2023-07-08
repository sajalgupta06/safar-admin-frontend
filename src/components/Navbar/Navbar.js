import React, { useContext, useEffect, useState } from "react";
import "./Navbar.scss";
import { Link, useLocation } from "react-router-dom";
import { MyContext, editNotification } from "../../App";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MenuFoldOutlined } from "@ant-design/icons";
import { DownOutlined } from "@ant-design/icons";
import {
  Badge,
  Divider,
  Dropdown,
  Popover,
  Space,
  notification,
  theme,
} from "antd";
import { Button } from "antd";
import { GiTicket } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import moment from "moment";
import { BiTrip } from "react-icons/bi";
import { TiUserOutline } from "react-icons/ti";
const { useToken } = theme;
// import {
//   getFirestore,
//   collection,
//   query,
//   onSnapshot,
//   orderBy,
// } from "firebase/firestore";
// import fire from "../Firebase/Fire";

const Navbar = () => {
  const location = useLocation();

  // const db = getFirestore(fire);
  const context = useContext(MyContext);
  // console.log(data)
  const [notifications, setNotifications] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState();

  const { token } = useToken();

  // useEffect(() => {
  //   fireFunc();
  // }, []);

  // useEffect(() => {
  //   console.log(notifications);
  // }, [notifications]);

  // async function fireFunc() {
  //   try {
  //     const q = query(
  //       collection(db, "admin", "61929022c2124be78a6aebe2", "Notifications"),
  //       orderBy("createdAt", "desc")
  //     );

  //     onSnapshot(q, (querySnapshot) => {
  //       setNotifications([]);
  //       querySnapshot.forEach((doc) => {
  //         setNotifications((e) => {
  //           return [...e, doc.data()];
  //         });
  //       });
  //     });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  useEffect(() => {
    // console.log(location.pathname.substring(1).indexOf("/"))
    // location.pathname.substring(1,location.pathname.substring(1).indexOf("/")+1)
    const pathName =
      location?.pathname?.substring(1)?.indexOf("/") == -1
        ? location.pathname?.substring(1)
        : location.pathname.substring(1).indexOf("/");

    // const pathName= "ant"

    if (pathName === "dashboard") setTitle("Dashboard");

    if (pathName === "trips" || pathName === "trips") setTitle("Trips");

    if (pathName === "bookings") setTitle("Bookings");

    if (pathName === "payments") setTitle("Payments");

    if (pathName === "email") setTitle("Email");

    if (pathName === "analytics") setTitle("Analytics");

    if (pathName === "pricing") setTitle("Pricing");

    if (pathName === "me") setTitle("Me");
  }, [location]);

  const toggleSidebarButton = () => {
    context.toggleSideBarCollapse({
      type: "SIDEBAR_COLLAPSE",
      payload: context.IsSideBarCollapsed,
    });
    console.log(context.IsSideBarCollapsed);
  };


const handleOnRemoveNotification=(id)=>{
console.log(id)

const arr = context.notifications.filter((noti=>noti.id!=id))

context.setNotifications({type:"SET_NOTIFICATIONS",payload:arr})

  editNotification(id)

}
  const items = (
  <div className="notificationContainer">
   
{  context?.notifications?.map((notification, key) => {
    return (
      <div className="notification" key={key}>
        <div className="iconDiv">
          {notification?.type === "BOOK_TICKET" ? 
            <GiTicket className={`icon ${notification?.type}`} />:notification?.type === "TRIP_CREATED"?   <BiTrip className={`icon ${notification?.type}`} />:""
          }
        </div>
        <div className="message">

        {notification?.data?.message}
        <p className="time">
          
          {moment.utc(notification?.createdAt).local().startOf('seconds').fromNow()}
          </p>
        </div>
     
          <AiOutlineClose className="closeIcon" onClick={()=>handleOnRemoveNotification(notification.id)}/>
      
      </div>
    );
  })}


  </div>

  )
  const contentStyle = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };
  const menuStyle = {
    boxShadow: "none",
  };

  return (
    <div className="navbar-container">
      <div className="navbar-inside">
        <div className="navbar-info">
          <Button
            onClick={toggleSidebarButton}
            style={{
              marginRight: "2rem",
            }}
          >
            {context.IsSideBarCollapsed ? (
              <MenuFoldOutlined />
            ) : (
              <MenuFoldOutlined />
            )}
          </Button>
          Safar
        </div>

        <div className="screenName">
          {/* {context.screenName} */}
          {/* {console.log(context.screenName)} */}
        </div>

        <div className="navbar-user">
          <Popover
            content={items}
            trigger="click"
            align={{offset:[0, -20]}}
          >
            <div className="badgeDiv">
              <Badge count={context.notifications.length}>
                <IoIosNotificationsOutline
                  style={{
                    height: "2.5rem",
                    width: "2.5rem",
                    cursor: "pointer",
                  }}
                  className="badgeIcon"
                  onClick={() => setToggle(!toggle)}
                ></IoIosNotificationsOutline>
              </Badge>

              {/* <div className="dotBadge">12</div> */}
            </div>{" "}
          </Popover>
          {context?.companyDetails?.logo && (
            <img src={context?.companyDetails?.logo} className="user-img" alt= {<TiUserOutline/>} />
          )}

          <div style={{ cursor: "pointer" }}>
            <div className="user-name">
              Welcome {context?.companyDetails?.name|| "User"} !
            </div>
            {/* <div className="user-type">Recruiter</div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
