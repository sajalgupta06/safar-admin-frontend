import React from 'react'
import './Payments.scss'
import { Table } from 'antd'
import { PaymentsColumn } from '../../components/Table/columns'
export default function Payments() {
  return (
   <section className='payments'>
    <div className='heading'>
        Payments
    </div>

    <div className='payments-body'>
        <Table
        
        columns={PaymentsColumn}
        pagination={false}
        rowKey={(record) => JSON.stringify(record)}
        // dataSource={getPricingSlotTableData()}
        ></Table>
    </div>
   </section>
  )
}
