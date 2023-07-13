import React, { useContext, useState ,useRef, useEffect} from 'react'
import './AllTrips.scss'
import { AllTripsColumn } from '../../../components/Table/columns';
import { getAllAdminTrips } from '../../../action/req';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { TiTick } from 'react-icons/ti';
import { BiRupee } from 'react-icons/bi';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import moment from 'moment';
import { MdClose } from 'react-icons/md';
import Loading from '../../../components/Loader/Loading';
export default function AllTrips() {

    const [data,setData]  = useState(null)

      const { isLoading, error } = useQuery('adminTrips', () =>getAllAdminTrips(),{onSuccess:(res)=>setData({rawData:res.data,searchedData:res.data})}  )


     
      const handleSearch = (e) => {
        
        const searchedData = data?.rawData?.map(record=>{
          const nameMatch = record.name.toString().toLowerCase().match(e.target.value.toString().toLowerCase())
          // const collectionMatch = record?.collections?.map((ele)=>ele.name.toString().toLowerCase().match(e.target.value.toString().toLowerCase())).filter(ele => !!ele)
          const priceMatch = record.finalPrice.toString().toLowerCase().match(e.target.value.toString().toLowerCase())
          const createdAtMatch = moment(record.createdAt).format("DD MMM YYYY").toString().toLowerCase().match(e.target.value.toString().toLowerCase())
          const regionMatch = record?.region?.toString().toLowerCase().match(e.target.value.toString().toLowerCase())

          if(!nameMatch  && !priceMatch && !createdAtMatch && !regionMatch)
          {
            return null
          }
          return record
        }).filter(record => !!record);

        // console.log(searchedData)

        setData({
          ...data,
          searchedData:e.target.value ? searchedData:data.rawData
        })
      };




    

      const columns = [
      
        {
          title: "Name",
          dataIndex: "name",
          sorter: (a, b) => a?.name.localeCompare(b?.name),
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

      
      
        },
        {
          title: "Days / Nights",
          dataIndex: "days",
      
          render: (text, record) => (
            <>
              {record?.days}D / {record?.nights}N{" "}
            </>
          ),
        },
      
        {
          title: "Created At",
          dataIndex: "createdAt",
          key: "createdAt",
          sorter: (a, b) => moment(a.createdAt) - moment(b.createdAt),
          render: (record) => moment(record).format("hh:mm A,  DD MMM YYYY"),
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
        {
          title: "Action",
          key: "action",
          render: (_, record) => (
            <>
              <Link to={`/trip/${record?.slug}`}>View More </Link>
            </>
          ),
        }
      
      
      ]

     
    return (
   <>
   {isLoading===true?
   <Loading/>
   :<>
    <section className='allTrips'>

    <div className='allTrips-top'>
        <p className='heading'>

        All Trips
        </p>
        <div className='search'><Input className='searchInput' placeholder='Search' onChange={handleSearch}></Input></div>
    </div>

    <div className='allTrips-content'>
    <Table columns={columns} dataSource={data?.searchedData} loading= {isLoading} pagination={false} rowKey={"_id"} />

    </div>
   </section>
   </>}
  
   
   
   </>
  )
}
