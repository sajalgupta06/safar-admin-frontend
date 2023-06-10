import { Select, Space, Tag } from "antd";
import moment from "moment";
import { BiRupee } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import { TiTick } from "react-icons/ti";

export const ActiveTripsColumn = [

  {
    title: "Name",
    dataIndex: "trip",
    key: "name",
    render:(record)=>record?.name
  },

  {
    title: "Region",
    dataIndex: "trip",
    key: "region",
    render:(record)=>record?.region

  },
 
  {
    title: " Total Tickets Sold",
    dataIndex: "ticketCount",
    key: "ticketCount",
    sorter: (a, b) => a.ticketCount - b.ticketCount,

  },
  {
    title: "Last Booking",
    dataIndex: "updatedAt",
    key: "updatedAt",
    sorter: (a, b) => moment(a.updatedAt) - moment(b.updatedAt),
    render: (record) => moment(record).format("hh:mm A,  DD MMM YYYY"),
  },
];

export const ActiveTrips_IndividualDate_TransportModeColumn = [
  {
    title: "Pick Up Point",
    dataIndex: "pickupPoint",
    key: "pickupPoint",
    
  },
  {
    title: "Pick Up Transport Mode",
    dataIndex: "pickupMode",
    key: "pickupMode",
  },
  {
    title: "Drop Point",
    dataIndex: "dropPoint",
    key: "dropPoint",
  },
  {
    title: "Drop Transport Mode",
    dataIndex: "dropMode",
    key: "dropMode",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Ticket Count",
    dataIndex: "ticketCount",
    key: "ticketCount",
  },
];

export const AllTripsColumn = [
  {
    title: "S.No",
    key: "index",
    
    render: (text, record, index) => index + 1,
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.localeCompare(b.name),

    key: "name",
  },
  {
    title: "Collections",
    dataIndex: "collections",
    key: "collections",
    render: (record) => record?.map((ele,i) => <p key = {i}>{ele.name}</p>),
  },
  {
    title: "Region",
    dataIndex: "region",
    key: "region",
    sorter: (a, b) => a.name.localeCompare(b.name),


  },
  {
    title: "Days / Nights",
    dataIndex: "days",

    render: (text, record) => (
      <>
        {record.days}D / {record.nights}N{" "}
      </>
    ),
  },

  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
    sorter: (a, b) => moment(a.createdAt) - moment(b.createdAt),
    render: (record) => moment(record).format("DD MMM YYYY"),
  },

  {
    title: "Price",
    dataIndex: "finalPrice",
    key: "finalPrice",
    sorter:(a, b) =>a.finalPrice - b.finalPrice,
    render: (record) => (
      <>
        <BiRupee />
        {record}
      </>
    ),
  },

  {
    title: "Completed",
    dataIndex: "completed",
    key: "completed",
    render:(record)=><>{record?<TiTick style={{fill:"var(--green)",fontSize:"2.5rem"}} />:<MdClose style={{fill:"var(--red)",fontSize:"2.5rem"}} />}</>
  },

  {
    title: "Published",
    dataIndex: "published",
    key: "published",
    render:(record)=><>{record?<TiTick style={{fill:"var(--green)",fontSize:"2.5rem"}} />:<MdClose style={{fill:"var(--red)",fontSize:"2.5rem"}} />}</>

  },


];

export const ActiveBookingsColumn = [

  {
    title: "Booked By",
    dataIndex: "userDetails",
    key: "bookedBy",
    render:(record)=>record.name

  },
  {
    title: "Total Passengers",
    dataIndex: "passengers",
    key: "passengers",
    render:(record)=>record?.length

  },
  {
    title: "Trip Date",
    dataIndex: "tripDetails",
    key: "tripDetails",
    render:(record)=>moment(record?.priceSlot?.date?.startDate, "DD-MM-YYYY").format("DD MMM YY") + " - " + moment(record?.priceSlot?.date?.endDate,"DD-MM-YYYY").format("DD MMM YY")

    },
  {
    title: "Booked On",
    dataIndex: "createdAt",
    key: "createdAt",
    render:(record)=>moment(record).format("hh:mm A ,  DD MMM YYYY")

  },

  {
    title: "Amount",
    dataIndex: "tripDetails",
    key: "tripName",
    render:(record)=>record?.priceSlot?.amount
  },

 
];

export const AllBookingsColumn = [

  {
    title: "Tickets Sold",
    dataIndex: "ticketCount",
    key: "ticketCount",
  },
  {
    title: "Last Booked",
    dataIndex: "updatedAt",
    key: "updatedAt",
    render:(record)=>moment(record).format("hh:mm A ,  DD MMM YYYY")

  },
  {
    title: "Status",
    dataIndex: "trip",
    key: "completed",
    render:(record)=> record?.completed===true?"Completed":"Not Completed"
   
  },

];

export const SingleTripBookingsColumn = [

  {
    title: "Booked On",
    dataIndex: "createdAt",
    key: "createdAt",
    render:(record)=>moment(record).format("hh:mm A ,  DD MMM YYYY")

  },

  {
    title: "Booked By",
    dataIndex: "userDetails",
    key: "bookedBy",
    render:(record)=>record.name

  },
  {
    title: "Total Passengers",
    dataIndex: "passengers",
    key: "passengers",
    render:(record)=>record?.length

  },
  {
    title: "Trip Date",
    dataIndex: "tripDetails",
    key: "tripDetails",
    render:(record)=>moment(record?.priceSlot?.date?.startDate, "DD-MM-YYYY").format("DD MMM YY") + " - " + moment(record?.priceSlot?.date?.endDate,"DD-MM-YYYY").format("DD MMM YY")

    },


  {
    title: "Amount",
    dataIndex: "tripDetails",
    key: "tripName",
    render:(record)=>record?.priceSlot?.amount
  },

 
];



export const PricingPlanTable = [
  // {
  //   title: "Date",
  //   dataIndex: "date",
  //   key: "date",
  //   render: (record) => `${moment(record?.startDate, "DD-MM-YYYY").format("DD MMM YY")} - ${moment(record?.endDate,"DD-MM-YYYY").format("DD MMM YY")}`,
  // },
  {
    title: "Pickup Point",
    dataIndex: "pickupPoint",
    key: "pickupPoint",
  },
  {
    title: "Pickup Mode",
    dataIndex: "pickupMode",
    key: "pickupMode",
  },
  {
    title: "Drop Point",
    dataIndex: "dropPoint",
    key: "dropPoint",
  },
  {
    title: "Drop Mode",
    dataIndex: "dropMode",
    key: "dropMode",
  },
  {
    title: <><BiRupee/> Amount</>,
    dataIndex: "amount",
    key: "amount",
  },
];

export const PassengersDetails =[
  {
    title: 'Passengers Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
  },
  {
    title: 'Mobile Number',
    dataIndex: 'mobileNumber',
    key: 'mobileNumber',
  },

  {
    title: 'Email ID',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Aadhar Card Number',
    dataIndex: 'aadharNumber',
    key: 'aadharNumber',
  },

];