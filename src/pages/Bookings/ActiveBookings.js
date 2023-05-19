import React from 'react'
import './Bookings.scss'
import { Table } from 'antd';
import {AiOutlineReload} from 'react-icons/ai'
import { ActiveBookingsColumn } from '../../components/Table/columns';
export default function ActiveBookings() {

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
   <section className='activeBookings'>

    <div className='heading'>
        <p>

        Active Bookings
        </p>
        <span className='refresh'><AiOutlineReload/>Refresh</span>
    </div>

    <div className='activeBookings-content'>
    <Table columns={ActiveBookingsColumn} dataSource={data} pagination={false} />

    </div>

   </section>
   
   
   </>
  )
}
