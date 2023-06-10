import {
  
  PieChartOutlined,
  DesktopOutlined,
  
} from '@ant-design/icons';
import { Menu } from 'antd';
import './index.scss'
import {MdTravelExplore} from 'react-icons/md'
import {AiFillSetting,AiOutlinePlus,AiOutlineLogout} from 'react-icons/ai'
import {GiPriceTag} from 'react-icons/gi'
import {SiGoogleanalytics} from 'react-icons/si'
import {RiSecurePaymentLine} from 'react-icons/ri'
import {TiThSmall} from 'react-icons/ti'
import {BsRadioactive} from 'react-icons/bs'
import {  useNavigate } from 'react-router-dom';
import { useContext,  } from 'react';
import { MyContext } from '../../App';
import { declarations } from '../../config';



function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}



const items = [

  getItem('Dashboard', '', <PieChartOutlined /> ),
  getItem('Trip', 'trip', <MdTravelExplore />, [
    getItem('Active Trips', declarations.routes.ACTIVE_TRIPS,<BsRadioactive/>),
    getItem('All Trips', declarations.routes.ALL_TRIPS,<TiThSmall/>),
    getItem('Create Trip',  declarations.routes.CREATE_TRIPS,<AiOutlinePlus/>),
    
  ]),

  getItem('Bookings', 'bookings', <MdTravelExplore />, [
    getItem('Active Bookings',  declarations.routes.ACTIVE_BOOKINGS, <BsRadioactive/>),
    getItem('All Bookings',  declarations.routes.ALL_BOOKINGS,<TiThSmall/>),
    getItem('Add Bookings',  declarations.routes.ADD_BOOKINGS, <AiOutlinePlus/>),
    
  ]),

  getItem('Payments',  declarations.routes.PAYMENTS, <RiSecurePaymentLine /> ),
  getItem('Email',  declarations.routes.EMAIL, <DesktopOutlined />),
  getItem('Analytics',  declarations.routes.ANALYTICS, <SiGoogleanalytics />),
  getItem('Pricing',  declarations.routes.PRICING, <GiPriceTag />),
  getItem('Settings',  declarations.routes.SETTINGS, <AiFillSetting />),
  getItem('Logout', 'logout', <AiOutlineLogout />),
];


const SideBar = () => {

const navigate = useNavigate()
const context = useContext(MyContext)



const getDefaultOpenKey = ()=>{
  const tab = window.location.pathname.split('/')[1]
  if(tab=== declarations.routes.ACTIVE_TRIPS ||tab=== declarations.routes.ALL_TRIPS ||tab=== declarations.routes.CREATE_TRIPS  )
  {
    return "trip"
  }

  if(tab=== declarations.routes.ACTIVE_BOOKINGS ||tab=== declarations.routes.ALL_BOOKINGS ||tab=== declarations.routes.ADD_BOOKINGS  )
  {
    return "bookings"
  }
  return ""
}


const onClickMenu = (e)=>{


  if(e.key==="logout")
  {
    return
  }
  context.setLoading({type:"SET_LOADING",payload:false})

  navigate(`${e.key}`)
  context.setScreenName({type:"SET_SCREEN_NAME",payload:"asd"})
  

}




  return (

     
      <Menu
        defaultSelectedKeys={[window.location.pathname.split('/')[1]]}
        defaultOpenKeys={[getDefaultOpenKey()]}
        mode="inline"
        // theme="dark"
        selectedKeys={[window.location.pathname.split('/')[1]]}
        items={items}
        onClick={(e)=>onClickMenu(e)}
        className='mainSideBar'
      />
 
      
  
  );
};

export default SideBar