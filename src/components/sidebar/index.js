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
import { useContext } from 'react';
import { MyContext } from '../../App';



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

  getItem('Dashboard', '/', <PieChartOutlined /> ),
  getItem('Trip', 'trip', <MdTravelExplore />, [
    getItem('Active Trips', 'active_trips',<BsRadioactive/>),
    getItem('All Trips', 'All_trips',<TiThSmall/>),
    getItem('Create Trip', 'create_trips',<AiOutlinePlus/>),
    
  ]),

  getItem('Bookings', 'bookings', <MdTravelExplore />, [
    getItem('Active Bookings', 'active_bookings', <BsRadioactive/>),
    getItem('All Bookings', 'all_bookings',<TiThSmall/>),
    getItem('Add Bookings', 'add_bookings', <AiOutlinePlus/>),
    
  ]),

  getItem('Payments', 'payments', <RiSecurePaymentLine /> ),
  getItem('Email', 'email', <DesktopOutlined />),
  getItem('Analytics', 'analytics', <SiGoogleanalytics />),
  getItem('Pricing', 'pricing', <GiPriceTag />),
  getItem('Settings', 'settings', <AiFillSetting />),
  getItem('Logout', 'logout', <AiOutlineLogout />),
];


const SideBar = () => {

const navigate = useNavigate()
const context = useContext(MyContext)

const onClickMenu = (e)=>{

  if(e.key=="logout")
  {
    return
  }
  navigate(`${e.key}`)
  context.setScreenName({type:"SET_SCREEN_NAME",payload:"asd"})
  

}



  return (
    <div
      style={{
        // width: 256,
      }}
    >
     
      <Menu
        defaultSelectedKeys={['/']}
        // defaultOpenKeys={['sub1']}
        mode="inline"
        // theme="dark"
        items={items}
        onClick={(e)=>onClickMenu(e)}
        className='mainSideBar'
      />
 
      
    </div>
  );
};

export default SideBar