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
import {
  fetchActiveTripsBookingDetails,
  getDashTrips,
} from "../../../action/req";
import moment from "moment";
import { object_equals } from "../../../utils/functions";

export default function ActiveTrips() {
  let { isLoading, error, data } = useQuery("activeTripsBookingDetails", () =>
    fetchActiveTripsBookingDetails()
  );

  data = data?.data?.trips;

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState();

  // console.log(data);

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
      setOpen(false)
      setTicketDetail(record);
      
      setOpen(true);
    }
    setDate()
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
        title:"Action",
      key: "action",
      width: "10%",

      render: (_, record) => (
        <>
          <Link to={`/trip/${record?.trip?.slug}`}>View More </Link>
        </>
      ),
    };

    return [...ActiveTripsColumn, newColumn];
  };

  const getDates = () => {
    return ticketDetails?.trip?.dates?.map((ele) => {
      delete ele._id;
      return {
        label:
          moment(ele.startDate, "DD-MM-YYYY").format("DD MMM YY") +
          " - " +
          moment(ele.endDate, "DD-MM-YYYY").format("DD MMM YY"),
        value: JSON.stringify(ele),
      };
    });
  };

 

  const getPricingSlotTableData = ()=>{

    const obj =[]

    let ticketCount = 0

    ticketDetails?.trip?.priceSlots?.map(priceSlot=>{


        if(JSON.stringify(priceSlot?.date)===date)
        {
          delete priceSlot._id

           ticketCount = 0

          ticketDetails?.tickets?.map(ticket=>{

            


            if(object_equals(ticket?.tripDetails?.priceSlot,priceSlot)){
              ticketCount = ticketCount + ticket?.passengers?.length;
            }
          })

          obj.push({...priceSlot,ticketCount:ticketCount})

        }

        


    })


    

    return obj

  }


  const getIndividualDateTicketCount = ()=>{

    const obj =[]

    let ticketCount = 0

    ticketDetails?.trip?.priceSlots?.map(priceSlot=>{


        if(JSON.stringify(priceSlot?.date)===date)
        {
          delete priceSlot._id

           ticketCount = 0

          ticketDetails?.tickets?.map(ticket=>{

            


            if(object_equals(ticket?.tripDetails?.priceSlot,priceSlot)){
              ticketCount = ticketCount + ticket?.passengers?.length;
            }
          })

          obj.push({...priceSlot,ticketCount:ticketCount})

        }

        


    })


      

    return ticketCount

  }


  // useEffect(() => {
  //   getPricingSlotTableData()
  // }, [date]);

  return (
    <>
      <section className="activeTrips">
        <div className="activeTrips-top">
          <Table
            columns={getActiveTripColumns()}
            loading={isLoading}
            dataSource={data}
            pagination={false}
            rowSelection={{
              type: "radio",
              defaultSelectedRowKeys: "1",
              ...rowSelection,
            }}
            rowKey={record=>JSON.stringify(record)}
            bordered
          />
        </div>
        <Divider></Divider>
        <div className="activeTrips-bottom">
          <Drawer
            title={ticketDetails?.trip?.name}
            placement={"bottom"}
            width={500}
            onClose={onClose}
            open={open}
            className="bottomDrawer"
            getContainer={false}
          >
            <div className="activeTrips-bottom-info">
              <div className="activeTrips-bottom-info-top">
                <div className="date">
                  Select Date :
                  <Select
                    placeholder={"Choose Date"}
                    style={{
                      width: 220,
                    }}
                    value={date && moment(JSON.parse(date).startDate, "DD-MM-YYYY").format("DD MMM YY") +
                    " - " +
                    moment(JSON.parse(date).endDate, "DD-MM-YYYY").format("DD MMM YY")}
                    onChange={(value)=>setDate(value)}
                    options={getDates()}
                  />
                </div>
                <div className="ticketCount">
                  <p>
                     Count : <span>{getIndividualDateTicketCount()}</span>
                  </p>
                </div>
              </div>
              <div className="activeTrips-bottom-info-middle">
                <Table
                  columns={ActiveTrips_IndividualDate_TransportModeColumn}
                  pagination={false}
                  rowKey={(record)=>JSON.stringify(record)}
                  dataSource={getPricingSlotTableData()}
                />
              </div>
            </div>
          </Drawer>
        </div>
      </section>
    </>
  );
}
