import React, { useContext, useEffect, useState } from "react";
import "./Navbar.scss";
import { Link, useLocation } from "react-router-dom";
import { MyContext } from "../../App";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MenuFoldOutlined } from "@ant-design/icons";
import { DownOutlined } from "@ant-design/icons";
import { Divider, Dropdown, Space, theme } from "antd";
import { Button } from "antd";
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
    console.log(context.IsSideBarCollapsed)
  };

  const items = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st menu item
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          2nd menu item (disabled)
        </a>
      ),
      disabled: true,
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          3rd menu item (disabled)
        </a>
      ),
      disabled: true,
    },
  ];

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
          <Dropdown
            menu={{
              items,
            }}
            trigger={'click'}
            placement="bottomCenter"
            
            dropdownRender={(menu) => (
              <div style={contentStyle}>
                {React.cloneElement(menu, {
                  style: menuStyle,
                })}
                <Divider
                  style={{
                    margin: 0,
                  }}
                />
            
              </div>
            )}
          >
            <div className="badgeDiv">
              <IoIosNotificationsOutline
                style={{ height: "2.5rem", width: "2.5rem", cursor: "pointer" }}
                className="badgeIcon"
                onClick={() => setToggle(!toggle)}
              ></IoIosNotificationsOutline>

              <div className="dotBadge"></div>
            </div>
          </Dropdown>
          {context.companyLogo && (
            <img src={context.companyLogo} className="user-img" alt="" />
          )}

          <div style={{ cursor: "pointer" }}>
            <div className="user-name">
              Welcome {context.companyName || "User"} !
            </div>
            {/* <div className="user-type">Recruiter</div> */}
          </div>

        
        </div>
      </div>
    </div>
  );
};

export default Navbar;
