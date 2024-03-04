import React from "react";
import "./topbar.css";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LanguageIcon from '@mui/icons-material/Language';
import SettingsIcon from '@mui/icons-material/Settings';
import { useState } from "react";
import ProfileModal from "./ProfileModal";

export default function Topbar() {

  const [isOpen, setIsOpen] = useState(false);

 const toggleMenu = () =>{
  setIsOpen(!isOpen);
 }

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">My Wallet</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNoneIcon />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <LanguageIcon />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <SettingsIcon />
          </div>
          <img onClick={toggleMenu} src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="topAvatar" />
        </div>
        <ProfileModal isOpen={isOpen} />
      </div>
    </div>
  );
}
