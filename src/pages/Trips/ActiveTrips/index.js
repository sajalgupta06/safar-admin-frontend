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
import Loading from "../../../components/Loader/Loading";


export default function ActiveTrips() {

  const [data,setData] = useState(null)
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState();
  const [ticketDetails, setTicketDetail] = useState();
  const [pricingSlotData, setPricingSlotData] = useState();


  let { isLoading, error } = useQuery("activeTripsBookingDetails", () =>
    fetchActiveTripsBookingDetails(),
    { onSuccess: (res) => setData(res?.data?.trips) }

  );




  useEffect(() => {
   
    if(data!=null)
    {
        onRowClick(data[0])
     
      
    }
    
  }, [data]);


const setDateOnDrawerOpen = (record)=>{
    
  let tempDate;
  tempDate = record?.trip?.dates[0]
  delete tempDate?._id

  setDate(JSON.stringify(tempDate))
}

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };


  const onRowClick = (record) => {
    if (ticketDetails?._id == record?._id) {
      setTicketDetail(null);
      setOpen(false);
    
    } else {
      setTicketDetail(record);
      setDateOnDrawerOpen(record)
      setOpen(true);
    }
  };

 

  const getActiveTripColumns = () => {
    

    return [...ActiveTripsColumn];
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

  const getPricingSlotTableData = () => {
    const obj = [];

    let ticketCount = 0;

    ticketDetails?.trip?.priceSlots?.map((priceSlot) => {
      if (JSON.stringify(priceSlot?.date) === date) {

        delete priceSlot._id;

        ticketCount = 0;

        ticketDetails?.tickets?.map((ticket) => {
          if (object_equals(ticket?.tripDetails?.priceSlot, priceSlot)) {
            ticketCount = ticketCount + ticket?.passengers?.length;
          }
        });


        obj.push({ ...priceSlot, ticketCount: ticketCount });
      }
    });

    return obj
  };

  const getIndividualDateTicketCount = () => {
    const obj = [];

    let ticketCount = 0;

    ticketDetails?.trip?.priceSlots?.map((priceSlot) => {
      if (JSON.stringify(priceSlot?.date) === date) {
        delete priceSlot._id;

        ticketCount = 0;

        ticketDetails?.tickets?.map((ticket) => {
          if (object_equals(ticket?.tripDetails?.priceSlot, priceSlot)) {
            ticketCount = ticketCount + ticket?.passengers?.length;
          }
        });

        obj.push({ ...priceSlot, ticketCount: ticketCount });
      }
    });

    return ticketCount;
  };


  const handleOnChangeDate = (value)=>{

    setDate(value)
  }
  return (
    <>
    {isLoading==true?
    <Loading/>
    :
    <>
         <section className="activeTrips">
        <div className="activeTrips-head">
            <div className="heading">Active Trips</div>
            </div>
        <div className="activeTrips-top">
          <Table
            columns={getActiveTripColumns()}
            loading={isLoading}
            dataSource={data }
            pagination={false}
            // rowSelection={{
            //   type: "radio",
            //   defaultSelectedRowKeys: "1",
            //   ...rowSelection,
            // }}
            rowKey={(record) => JSON.stringify(record)}
            bordered
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => onRowClick(record), // click row
              };
            }}
          />
      
        </div>
        {/* <Divider></Divider> */}
        <div className="activeTrips-bottom">
          <Drawer
            title={ticketDetails?.trip?.name}
            placement={"bottom"}
            width={500}
            height={"100%"}
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
                    value={
                      date &&
                      moment(JSON.parse(date).startDate, "DD-MM-YYYY").format(
                        "DD MMM YY"
                      ) +
                        " - " +
                        moment(JSON.parse(date).endDate, "DD-MM-YYYY").format(
                          "DD MMM YY"
                        )
                    }
                    onChange={(value) => handleOnChangeDate(value)}
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
                  rowKey={(record) => JSON.stringify(record)}
                  dataSource={getPricingSlotTableData()}
                />
              </div>
            </div>
          </Drawer>
        </div>
      </section>
    </>}
 
    </>
  );
}
