import React, { useContext } from 'react'
import './AllTrips.scss'
import { Table } from 'antd';
import { AllTripsColumn } from '../../../components/Table/columns';

export default function AllTrips() {

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
    return (
   <>
   <section className='allBookings'>

    <div className='heading'>
        <p>

        All Trips
        </p>
    </div>

    <div className='allBookings-content'>
    <Table columns={AllTripsColumn} dataSource={data} pagination={false} />

    </div>
   </section>
   
   
   </>
  )
}
