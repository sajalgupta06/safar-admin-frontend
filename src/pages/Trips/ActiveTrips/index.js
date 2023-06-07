import React, { useEffect, useState } from "react";
import "./ActiveTrips.scss";
import { Button, Divider, Drawer, Select, Table } from "antd";
import {
  ActiveTripsColumn,
  ActiveTrips_IndividualDate_TransportModeColumn,
} from "../../../components/Table/columns";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { getDashTrips } from "../../../action/req";

export default function ActiveTrips() {
  const { isLoading, error, data } = useQuery("dashTrip", () => getDashTrips());

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const [ticketDetails, setTicketDetail] = useState();

  const onRowClick = (record) => {
    if (ticketDetails?._id == record?._id) {
      setTicketDetail(null);
      setOpen(false);
    } else {
      setTicketDetail(record);
      setOpen(true);
    }
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      onRowClick(selectedRows[0]);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  const getActiveTripColumns = () => {
    const newColumn = {
      key: "action",
      width: "10%",

      render: (_, record) => (
        <>
              <Link to={`/trip/${record.slug}`}>View More </Link>
        </>
      ),
    };

    return [...ActiveTripsColumn, newColumn];
  };

  return (
    <>
      <section className="activeTrips">
        <div className="activeTrips-top">
          <Table
            columns={getActiveTripColumns()}
            loading={isLoading}
            dataSource={data?.data}
            pagination={false}
            rowSelection={{
              type: "radio",
              defaultSelectedRowKeys: "1",
              ...rowSelection,
            }}
            rowKey={"_id"}
            bordered
          />
        </div>
        <Divider></Divider>
        <div className="activeTrips-bottom">
          {/* {ticketDetails && (
        <div className="activeTrips-bottom-info">
            <div className="activeTrips-bottom-info-top">
              <div className="date">
                Select Date :
                <Select
                  defaultValue="lucy"
                  style={{
                    width: 220,
                  }}
                  
                  options={[
                    {
                      value: "lucy",
                      label: "Lucy",
                    },
                  ]}
                />
              </div>
              <div className="ticketCount">
                <p>Total Count : <span>74</span></p>
              </div>
            </div>
            <div className="activeTrips-bottom-info-middle">
            <Table columns={ActiveTrips_IndividualDate_TransportModeColumn}  pagination={false} />

            </div>
          </div>

    )} */}

<Drawer
            title="Drawer with extra actions"
            placement={"bottom"}
            width={500}
            onClose={onClose}
            open={open}
            className="bottomDrawer"
            // extra={
            //   <Space>
            //     <Button onClick={onClose}>Cancel</Button>
            //     <Button type="primary" onClick={onClose}>
            //       OK
            //     </Button>
            //   </Space>
            // }
            getContainer={false}
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Drawer>
         
        </div>

      </section>
    </>
  );
}
