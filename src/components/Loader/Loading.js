import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import './Loading.scss'

export default function Loading() {

    const antIcon = (
        <LoadingOutlined
          style={{
            fontSize: 44,
          }}
          spin
          
        //   allowTransparency
        />
      );


  return (
   <div className='loading'>
       <Spin indicator={antIcon}  />
    </div>
  )
}
