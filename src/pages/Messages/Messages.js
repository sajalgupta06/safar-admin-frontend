import React, { useState } from "react";
import "./Messages.scss";
import { Button, Select, Table } from "antd";
import TextArea from "antd/es/input/TextArea";
import {AiOutlineSend} from 'react-icons/ai'
import { useQuery } from "react-query";
import { fetchActiveTripsNameSlugDatesPriceSlots } from "../../action/req";

export default function Messages() {

//     const [messageData, setMessageData] = useState()

//     let { isLoading, error, data } = useQuery(
//         "activeTickets",
//         () => fetchActiveTripsNameSlugDatesPriceSlots()
//       );
//    data = data?.data?.trip 


const getTripsOptions = ()=>{



}


  return (
    <>
      <div className="messages">
        <div className="heading">Message</div>
        <div className="messages-container">
          <div className="messages-container-options">
            <div className="messages-container-options-option">
              <label>Choose Trip</label>
              <Select
              className="inputSelect"
                defaultValue="lucy"
              
                options={[
                  {
                    value: "jack",
                    label: "Jack",
                  },
                  {
                    value: "lucy",
                    label: "Lucy",
                  },
                  {
                    value: "Yiminghe",
                    label: "yiminghe",
                  },
                  {
                    value: "disabled",
                    label: "Disabled",
                    disabled: true,
                  },
                ]}
              />
            </div>
            <div className="messages-container-options-option">
              <label>Choose Dates</label>
              <Select
              className="inputSelect"
                defaultValue="lucy"
                mode="multiple"

                options={[
                  {
                    value: "jack",
                    label: "Jack",
                  },
                  {
                    value: "lucy",
                    label: "Lucy",
                  },
                  {
                    value: "Yiminghe",
                    label: "yiminghe",
                  },
                  {
                    value: "disabled",
                    label: "Disabled",
                    disabled: true,
                  },
                ]}
              />
            </div>

            <div className="messages-container-options-option">
              <label>Choose Modes</label>
              <Select
              className="inputSelect"
                defaultValue="lucy"
                mode="multiple"
                options={[
                  {
                    value: "jack",
                    label: "Jack",
                  },
                  {
                    value: "lucy",
                    label: "Lucy",
                  },
                  {
                    value: "Yiminghe",
                    label: "yiminghe",
                  },
                  {
                    value: "disabled",
                    label: "Disabled",
                    disabled: true,
                  },
                ]}
              />
            </div>

          </div>
          <div className="messages-container-passengers">
                <div className="heading">Passengers List</div>
                <Table
                locale={{emptyText:"Choose trip to view passengers"}}
                />

          </div>
          <div className="messages-container-content">
          <div className="heading">Message Content</div>
                <TextArea rows={8} placeholder="Enter the Message You want to send" maxLength={6} />

          </div>

        
        </div>
        <div className="messages-footer">
                <Button type="primary">Send Message <AiOutlineSend/> </Button>
          </div>
      </div>
    </>
  );
}
