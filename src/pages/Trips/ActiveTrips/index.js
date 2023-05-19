import React, { useState } from "react";
import "./ActiveTrips.scss";
import { Divider, Select, Table } from "antd";
import { ActiveTripsColumn, ActiveTrips_IndividualDate_TransportModeColumn } from "../../../components/Table/columns";

export default function ActiveTrips() {

const [ticketDetails , setTicketDetail] = useState(null)


  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];

  const onRowClick = (record,rowIndex)=>{

      
      if(ticketDetails?.key==record.key)
      {
          setTicketDetail(null)
        }
    
        else setTicketDetail(record)
  }
  return (
    <>
      <section className="activeTrips">
        <div className="activeTrips-top">
          <Table columns={ActiveTripsColumn} dataSource={data} pagination={false} 
          onRow={(record, rowIndex) => {
            return {
              onClick: ()=>onRowClick(record,rowIndex) // click row
            };
          }}
        bordered
          />
        </div>
        <Divider></Divider>
        <div className="activeTrips-bottom">
    {ticketDetails!=null && (
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
            <Table columns={ActiveTrips_IndividualDate_TransportModeColumn} dataSource={data} pagination={false} />

            </div>
          </div>

    )}

          
        </div>
      </section>
    </>
  );
}
