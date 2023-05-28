import React from 'react'
import './Bookings.scss'
import { Badge, Table } from 'antd';
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


      const expandedRowRender = () => {
        const columns = [
          {
            title: 'Passengers Name',
            dataIndex: 'date',
            key: 'date',
          },
          {
            title: 'Age',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
          },
          {
            title: 'Mobile Number',
            dataIndex: 'upgradeNum',
            key: 'upgradeNum',
          },
          {
            title: 'Aadhar Card Number',
            dataIndex: 'upgradeNum',
            key: 'upgradeNum',
          },
        
        ];
  
        return <Table columns={columns} dataSource={data} pagination={false} />;
      };



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
    <Table
        columns={ActiveBookingsColumn}
        rowSelection
        expandable={{
          expandedRowRender,
          defaultExpandedRowKeys: ['0'],
        }}
        dataSource={data}
      />
    </div>

   </section>
   
   
   </>
  )
}
