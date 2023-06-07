import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import './Loading.scss'

export default function NoSpinLoader() {

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
   <div className='noSpinLoading'>
       <Spin indicator={antIcon}  />
    </div>
  )
}
