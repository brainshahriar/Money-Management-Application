import "./sidebar.css";
import LineStyleIcon from '@mui/icons-material/LineStyle';
import TimelineIcon from '@mui/icons-material/Timeline';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BarChartIcon from '@mui/icons-material/BarChart';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import ReportIcon from '@mui/icons-material/Report';
import GridViewIcon from '@mui/icons-material/GridView';
import CategoryIcon from '@mui/icons-material/Category';
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {

  const [activeLink,setActiveLink] = useState('home');

  const handleLinkClick = (id) => {
    setActiveLink(id);
  }

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
            <li className={`sidebarListItem ${activeLink === 'home' ? 'active' : ''}`} onClick={()=>handleLinkClick('home')}>
              <LineStyleIcon className="sidebarIcon" />
              Home
            </li>
            </Link>
            <Link to='/accounts' className='link'>
            <li className={`sidebarListItem ${activeLink === 'account' ? 'active' : ''}`} onClick={()=>handleLinkClick('account')}>
              <AccountBalanceWalletIcon className="sidebarIcon" />
              Accounts
            </li>
            
            </Link>
            <Link to='/categories' className='link'>
            <li className={`sidebarListItem ${activeLink === 'category' ? 'active' : ''}`} onClick={()=>handleLinkClick('category')}>
              <CategoryIcon className="sidebarIcon" />
              Categories
            </li>
            
            </Link>
            <Link to='/dashboard' className='link'>
            <li className="sidebarListItem">
              <GridViewIcon className="sidebarIcon" />
              Dashboard
            </li>
            
            </Link>
            <li className="sidebarListItem">
              <TrendingUpIcon className="sidebarIcon" />
              Sales
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li className="sidebarListItem">
                <PermIdentityIcon className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/products" className="link">
              <li className="sidebarListItem">
                <StorefrontIcon className="sidebarIcon" />
                Products
              </li>
            </Link>
            <li className="sidebarListItem">
              <AttachMoneyIcon className="sidebarIcon" />
              Transactions
            </li>
            <li className="sidebarListItem">
              <BarChartIcon className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <MailOutlineIcon className="sidebarIcon" />
              Mail
            </li>
            <li className="sidebarListItem">
              <DynamicFeedIcon className="sidebarIcon" />
              Feedback
            </li>
            <li className="sidebarListItem">
              <ChatBubbleOutlineIcon className="sidebarIcon" />
              Messages
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Staff</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <WorkOutlineIcon className="sidebarIcon" />
              Manage
            </li>
            <li className="sidebarListItem">
              <TimelineIcon className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <ReportIcon className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
