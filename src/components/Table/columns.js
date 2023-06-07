import { Select, Space, Tag } from "antd";
import moment from "moment";
import { BiRupee } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import { TiTick } from "react-icons/ti";

export const ActiveTripsColumn = [
  {
    title: "S.No",
    key: "index",
    render: (text, record, index) => index + 1,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Collections",
    dataIndex: "collections",
    key: "collections",
    render: (record) => record?.map((ele) => ele.name),
  },
  {
    title: "Location",
    dataIndex: "location",
    key: "location",
  },
  {
    title: "Days / Nights",
    dataIndex: "days",
    key: "days",
    render: (text, record) => (
      <>
        {record.days}D / {record.nights}N{" "}
      </>
    ),
  },

  {
    title: "Tickets Count",
    dataIndex: "ticketCount",
    key: "ticketCount",
  },
  {
    title: "Last Booking",
    dataIndex: "lastBooking",
    key: "lastBooking",
  },
];

export const ActiveTrips_IndividualDate_TransportModeColumn = [
  {
    title: "Pick Up Point",
    dataIndex: "pickUpPoint",
    key: "pickUpPoint",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Pick Up Transport Mode",
    dataIndex: "pickUpTransMode",
    key: "pickUpTransMode",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Drop Point",
    dataIndex: "dropPoint",
    key: "dropPoint",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Drop Transport Mode",
    dataIndex: "dropTransMode",
    key: "dropTransMode",
    render: (text) => <a>{text}</a>,
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
    title: "Trip Name",
    dataIndex: "tripName",
    key: "tripNames",
  },
  {
    title: "UserName",
    dataIndex: "platform",
    key: "platform",
  },
  {
    title: "Total Passengers",
    dataIndex: "version",
    key: "version",
  },
  {
    title: "Date and Pickup Point",
    dataIndex: "createdAt",
    key: "createdAt",
  },
  {
    title: "Booked On",
    dataIndex: "upgradeNum",
    key: "upgradeNum",
  },

  {
    title: "Action",
    key: "operation",
    render: () => <a>Receipt</a>,
  },
];

export const AllBookingsColumn = [
  {
    title: "Trip Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Tickets Sold",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Last Booked",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Status",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>View Report</a>
      </Space>
    ),
  },
];

export const PricingPlanTable = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    render: (record) => `${record?.startDate} - ${record?.endDate}`,
  },
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
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
];
