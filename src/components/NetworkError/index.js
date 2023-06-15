import { Result } from 'antd'
import React from 'react'

export default function NetWorkError() {
  return (
    <div
    style={{
        height:"100%",
        width:"100%",
        marginTop:"15rem"
    }}  
    >

    <Result
    status="500"
    title="500"
    subTitle="Sorry, something went wrong. Please Check Your Internet Connection"
    // extra={<Button type="primary">Back Home</Button>}
    />
    </div>
  )
}
