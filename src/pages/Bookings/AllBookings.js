import React, { useContext } from "react";
import "./Bookings.scss";
import { Button, Table } from "antd";
import { AllBookingsColumn } from "../../components/Table/columns";
import { MyContext } from "../../App";
import { useQuery } from "react-query";
import { fetchAllBookingsTrips } from "../../action/req";
import { Link } from "react-router-dom";

export default function AllBookings() {
  const { isLoading, error, data } = useQuery("activeTickets", () =>
    fetchAllBookingsTrips()
  );


    const getColumns = ()=>{

      const nameColumn =  {
        title: "Trip Name",
        dataIndex: "trip",
        key: "name",
        render: (record) => <Link to={`/all_bookings/${record._id}`}>{record?.name}</Link>
      }
      const actionColumn = {
        title: "Action",
        key: "action",
        render: (record) => (
          <>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                alignItems: "center",
              }}
            >
              {/* <Button onClick={() => showDrawer(record)}>View More</Button> */}
              <Button
                style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
              >
                {/* <AiOutlineDownload /> Receipt */}
              </Button>
            </div>
          </>
        ),
      };
  
      return [nameColumn, ...AllBookingsColumn];

    }

  return (
    <>
      <section className="allBookings">
        <div className="heading">
          <p>All Bookings</p>
        </div>

        <div className="allBookings-content">
          <Table
            columns={getColumns()}
            dataSource={data?.data?.trips}
            rowKey={"_id"}
            loading={isLoading}
          />
        </div>
      </section>
    </>
  );
}
