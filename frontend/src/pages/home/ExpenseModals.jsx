import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import "./home.css";
import MenuItem from "@mui/material/MenuItem";
import * as Icons from "@mui/icons-material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const ExpenseModals = ({ isOpen, onClose }) => {
  const currencies = [
    "USD",
    "EUR",
    "GBP",
    "JPY",
    "AUD",
    "CAD",
    "BDT",
    "CNY",
    "SEK",
    "NZD", // Add more currencies as needed
  ];
  const allowedIcons = [
    "AccessAlarm",
    "AccessAlarms",
    "Accessibility",
    "Accessible",
  ];

  const iconList = allowedIcons.map((iconName) => ({
    value: iconName,
    label: iconName,
    component: Icons[iconName],
  }));
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [currency, setCurrency] = useState("");

  const today = dayjs();

  const handleSave = () => {
    setAmount("");
    setName("");
    setIcon("");
    setCurrency("");

    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="modal-container">
        <h2>Add Transactions</h2>
        <TextField
          style={{ marginTop: "15px" }}
          label="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          fullWidth
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
        <TextField
          style={{ marginTop: "15px" }}
          select
          label="Account"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          fullWidth
        >
          {currencies.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Comments"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          multiline
          rows={2} // Specify the number of rows you want
          style={{ marginTop: "15px" }}
        />
        <TextField
          style={{ marginTop: "15px" }}
          select
          label="Choose Category"
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
          fullWidth
        >
          {iconList.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              <option.component /> {option.label}
            </MenuItem>
          ))}
        </TextField>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker defaultValue={today} />
        </LocalizationProvider>
        <TextField
          style={{ marginTop: "15px" }}
          type="file"
          label="Photo"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">📷</InputAdornment>
            ),
          }}
        />
        <div className="footer">
          <Button
            className="btn-modal"
            variant="contained"
            color="primary"
            onClick={handleSave}
          >
            Save
          </Button>
          <Button className="btn-modal" variant="contained" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ExpenseModals;
