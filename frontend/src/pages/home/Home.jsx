import React, { useState } from "react";
import "./home.css";
import ExpensesTab from "../../components/expensetab/ExpensesTab";
import IncomesTab from "../../components/incomestab/IncomesTab";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { useSelector} from "react-redux";
import { selectTotalBalance } from "../../redux/features/account/accountSlice";

export default function Home() {
  useRedirectLoggedOutUser('/login');
  const total_balance = useSelector(selectTotalBalance);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState('Total');
  const [selectedBalance, setSelectedBalance] = useState(total_balance);


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAccountSelect = (account, balance) => {
    setSelectedAccount(account);
    setSelectedBalance(balance);
    handleClose();
  };
  const [activeTab, setActiveTab] = useState("expenses");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="user">
    <div className="userTitleContainer">
      <div className="total-balance" onClick={handleClick}>
        <MonetizationOnIcon fontSize="large" />
        {selectedAccount} : {selectedBalance} <ArrowDropDownIcon fontSize="large" />
      </div>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {/* Replace with your account data */}
        <MenuItem onClick={() => handleAccountSelect('Total', `$${total_balance}`)}>
          <input type="radio" name="account" checked={selectedAccount === 'Total'} readOnly />
          Total : ${total_balance}
        </MenuItem>
        <MenuItem onClick={() => handleAccountSelect('Account 1', '$1000')}>
          <input type="radio" name="account" checked={selectedAccount === 'Account 1'} readOnly />
          Account 1 : $1000
        </MenuItem>
        <MenuItem onClick={() => handleAccountSelect('Account 2', '$1500')}>
          <input type="radio" name="account" checked={selectedAccount === 'Account 2'} readOnly />
          Account 2 : $1500
        </MenuItem>
        {/* Add more MenuItems for each account */}
      </Menu>
    </div>
      <div className="userContainer">
        <div className="userUpdate">
          <div className="tabs">
            <button
              className={activeTab === "expenses" ? "active" : ""}
              onClick={() => handleTabChange("expenses")}
            >
              Expenses
            </button>
            <button
              className={activeTab === "income" ? "active" : ""}
              onClick={() => handleTabChange("income")}
            >
              Income
            </button>
          </div>
          <div className="tabContent">
            {activeTab === "expenses" && <ExpensesTab />}
            {activeTab === "income" && <IncomesTab />}
          </div>
        </div>
      </div>
    </div>
  );
}
