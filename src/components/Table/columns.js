import { Space, Tag } from "antd";

export const ActiveTripsColumn = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Collection",
      dataIndex: "collection",
      key: "collection",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Days / Nights",
      dataIndex: "days",
      key: "address",
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
   
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <a>View More  </a>
    //     </Space>
    //   ),
    // },
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
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Collection",
      dataIndex: "collection",
      key: "collection",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Days / Nights",
      dataIndex: "days",
      key: "address",
    },

    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },

    {
      title: "Travel Options",
      dataIndex: "travelOptions",
      key: "travelOptions",
    },


    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>View More  </a>
          <a>Edit  </a>
        </Space>
      ),
    },
  ];

  export const ActiveBookingsColumn = [
    {
      title: 'Trip Name',
      dataIndex: 'tripName',
      key: 'tripNames',
    },
    {
      title: 'UserName',
      dataIndex: 'platform',
      key: 'platform',
    },
    {
      title: 'Total Passengers',
      dataIndex: 'version',
      key: 'version',
    },
    {
      title: 'Date and Pickup Point',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Booked On',
      dataIndex: 'upgradeNum',
      key: 'upgradeNum',
    },
    
  
    {
      title: 'Action',
      key: 'operation',
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