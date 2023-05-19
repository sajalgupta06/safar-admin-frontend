import React, { useContext } from 'react'
import './Bookings.scss'
import { Table } from 'antd';
import { AllBookingsColumn } from '../../components/Table/columns';
import { MyContext } from '../../App';

export default function AllBookings() {

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

        All Bookings
        </p>
    </div>

    <div className='allBookings-content'>
    <Table columns={AllBookingsColumn} dataSource={data} pagination={false} />

    </div>
   </section>
   
   
   </>
  )
}
