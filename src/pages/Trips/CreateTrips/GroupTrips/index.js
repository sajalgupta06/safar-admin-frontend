import React, { useContext } from "react";
import "../CreateTrips.scss";
import { MyContext } from "../../../../App";
import View1 from "../Views/View1";
import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import { Steps } from 'antd';
import { Header } from "..";


export default function GroupTrips() {

    const context = useContext(MyContext);


  return (
    <>
   <Header
          heading={"Group Packages"}
          view={context.createTripView}
        //   handleOnClickBack={handleOnClickBack}
        >
            <div className="headerSteps">
            < Steps
    items={[
      {
        title: 'Login',
        status: 'finish',
        icon: <UserOutlined />,
      },
      {
        title: 'Verification',
        status: 'finish',
        icon: <SolutionOutlined />,
      },
      {
        title: 'Pay',
        status: 'process',
        icon: <LoadingOutlined />,
      },
      {
        title: 'Done',
        status: 'wait',
        icon: <SmileOutlined />,
      },
    ]}
  />
            </div>

        </Header>



    {/* {context.createTripView==1 && (

     <View1/>

    )} */}
    </>
  );
}
