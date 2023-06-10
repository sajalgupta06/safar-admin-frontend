import { Badge, Descriptions, Table, Tabs } from "antd";
import moment from "moment";
import React from "react";
import { PricingPlanTable } from "../../../components/Table/columns";

export default function ViewTrip({ data }) {

  const renderDayContent = (day) => {
    if (data?.itinerary)
      return (
        <>
          {data?.itinerary[day]?.map((iti, i) => {
            return (
              <div className="activityBox" key={i}>
                <div className="activityBox-heading">
                  <p className="title">
                    {iti.title} <span>{iti.time}</span>
                  </p>
                </div>
                <div className="activityBox-desc">{iti.description}</div>
              </div>
            );
          })}
        </>
      );
  };



  const getItineraryItems = ()=>{
    const keys = Object.keys(data?.itinerary)

    return keys.map((key)=>{
      return{
        key: key,
        label: `Day ${key}`,
        children: renderDayContent(parseInt(key)),
      }
    })

  }

  return (
    <div className="viewTrip">
      <Descriptions layout="vertical" bordered>
        <Descriptions.Item label="Created At">
          {data?.createdAt && moment(data?.createdAt).format("hh:mm A,  DD MMM YYYY")}
        </Descriptions.Item>
        <Descriptions.Item label="Name">{data?.name}</Descriptions.Item>
        <Descriptions.Item label="Trip type">
          {data?.collections?.map((ele, i) => (
            <span key={i}>
              {i > 0 && ",  "}
              {ele.name}
            </span>
          ))}
        </Descriptions.Item>
        <Descriptions.Item label="Region">
          {data?.region || "NIL"}
        </Descriptions.Item>
        <Descriptions.Item label="Age Limit">
          {data?.ageLimit}
        </Descriptions.Item>
        <Descriptions.Item label="Duration" span={2}>
          {data?.days && `${data.days} Days`} /{" "}
          {data?.nights && `${data.nights} Nights`}
        </Descriptions.Item>
        <Descriptions.Item label="All Locations">
          {data?.locations?.map((ele, i) => (
            <span key={i}>
              {i > 0 && ",  "}
              {ele}
            </span>
          ))}
        </Descriptions.Item>
        <Descriptions.Item label="Last Date To Register">
          {data?.lastDate || "NIL"}
        </Descriptions.Item>
        <Descriptions.Item label="Status">
          {data?.completed && <Badge color="green" text="Completed" />}

          {!data?.completed && <Badge color="red" text="Not Completed" />}
        </Descriptions.Item>

        <Descriptions.Item label="About">{data?.about}</Descriptions.Item>
      </Descriptions>
      <br></br>
      <Descriptions layout="vertical" bordered>
        <Descriptions.Item label="Pricing Plans">
          <Table
            columns={PricingPlanTable}
            dataSource={data?.priceSlots}
            pagination={false}
            rowKey={record=>JSON.stringify(record)}
          ></Table>
        </Descriptions.Item>
      </Descriptions>
      <br></br>
      <Descriptions layout="vertical" bordered>
        <Descriptions.Item label="Highlights" span={4}>
          {data?.highlights?.map((ele, i) => (
            <p key={i}>{ele}</p>
          ))}
        </Descriptions.Item>
        <Descriptions.Item label="Inclusions" span={4}>
          {data?.inclusions?.map((ele, i) => (
            <p key={i}>{ele}</p>
          ))}
        </Descriptions.Item>
        <Descriptions.Item label="Exclusions" span={4}>
          {data?.exclusions?.map((ele, i) => (
            <p key={i}>{ele}</p>
          ))}
        </Descriptions.Item>
        <Descriptions.Item label="Recommendations" span={4}>
          {data?.recommendations?.map((ele, i) => (
            <p key={i}>{ele}</p>
          ))}
        </Descriptions.Item>
        <Descriptions.Item label="Terms & Condition" span={4}>
          {data?.terms?.map((ele, i) => (
            <p key={i}>{ele}</p>
          ))}
        </Descriptions.Item>
      </Descriptions>

     
      <Descriptions layout="vertical" bordered>
      <Descriptions.Item label="Itinerary" span={4}>
      <Tabs defaultActiveKey="1" items={getItineraryItems()} />

        </Descriptions.Item>
      </Descriptions>
    </div>
  );
}
