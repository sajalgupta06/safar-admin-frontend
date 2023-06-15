import React, { useContext, useState } from "react";
import "./Settings.scss";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import UserSettings from "./UserSettings";
import {GiChoice,GiSettingsKnobs} from 'react-icons/gi'
import {RiSecurePaymentFill} from 'react-icons/ri'
import {GoFileMedia} from 'react-icons/go'
import {MdPolicy} from 'react-icons/md'
import {BiUser} from 'react-icons/bi'
import CompanySettings from "./CompanySettings";
import { MyContext } from "../../App";

export default function Settings() {
  const [tabs, setTabs] = useState("user");
const context = useContext(MyContext)
  const handleTabChange = (name) => {
    setTabs(name);
  };

  return (
    <>
      <div className="settings">
        <div className="settings-div">
          <div className="settings-div-left">
            <Avatar
              className="companyPhoto"
              size={94}
              src={context?.companyDetails?.logo}
            />
            <div className="companyName">{context?.companyDetails?.name}</div>
            <div className="settings-div-left-options">
              <div
                className={`settings-div-left-options-option ${
                  tabs === "user" ? "selected" : ""
                }`}
                onClick={() => handleTabChange("user")}
              >
                <BiUser/>
                User Settings
              </div>
              <div
                className={`settings-div-left-options-option ${
                  tabs === "company" ? "selected" : ""
                }`}
                onClick={() => handleTabChange("company")}
              >
                <GiSettingsKnobs/>
                Company Settings
              </div>
              <div
                className={`settings-div-left-options-option ${
                  tabs === "payment" ? "selected" : ""
                }`}
                onClick={() => handleTabChange("payment")}
              >
                <RiSecurePaymentFill/>
                Payment Settings
              </div>
              <div
                className={`settings-div-left-options-option ${
                  tabs === "media" ? "selected" : ""
                }`}
                onClick={() => handleTabChange("media")}
              >
                <GoFileMedia/>
                Media Settings
              </div>
              <div
                className={`settings-div-left-options-option ${
                  tabs === "preference" ? "selected" : ""
                }`}
                onClick={() => handleTabChange("preference")}
              >
                <GiChoice/>
                Preference
              </div>

              <div
                className={`settings-div-left-options-option ${
                  tabs === "terms" ? "selected" : ""
                }`}
                onClick={() => handleTabChange("terms")}
              >
                <MdPolicy/>
                Terms & Condition
              </div>
            </div>
          </div>
          <div className="settings-div-right">
          <div className="settings-div-right-head">
            {tabs==="user" && <div className="content"><BiUser/>User Settings</div>}
            {tabs==="company" && <div className="content"><GiSettingsKnobs/>Company Settings</div>}
            {tabs==="uspaymenter" && <div className="content"><RiSecurePaymentFill/>Payment Settings</div>}
            {tabs==="media" && <div className="content"><GoFileMedia/>Media Settings</div>}
            {tabs==="preference" && <div className="content"><GiChoice/>Preference</div>}
            {tabs==="terms" && <div className="content"><MdPolicy/>Terms & Condition</div>}
          
          </div>
          <div className="settings-div-right-body">
          {tabs=="user" && <UserSettings/>} 
          {tabs=="company" && <CompanySettings/>} 
          </div>
    

          </div>
        </div>
      </div>
    </>
  );
}
