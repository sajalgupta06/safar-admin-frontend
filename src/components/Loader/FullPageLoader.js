import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import './Loading.scss'

export default function FullPageLoader() {

    const antIcon = (
        <LoadingOutlined
          style={{
            fontSize: 44,
          }}
          spin
          
        />
      );


  return (
   <div className='fullPageLoading'>
       <Spin indicator={antIcon}  />
    </div>
  )
}
