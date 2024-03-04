import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputAdornment from "@mui/material/InputAdornment";
import "./Accounts.css";
import ColorPicker from "./ColorPicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import * as Icons from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  ACCOUNT_CREATE_ERROR_MESSAGE,
  createAccount,
  getAllAccounts,
} from "../../redux/features/account/accountSlice";

const CreateModals = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
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
  const [color, setColor] = useState("");
  const [currency, setCurrency] = useState("");
  const [isSwitchOn, setSwitchOn] = useState(false);

  const handleSwitchChange = () => {
    setSwitchOn(!isSwitchOn);
  };
  const { createErrorMessage } = useSelector((state) => state.account);

  const handleSave = async () => {
    const formData = {
      amount,
      account_name: name,
      account_icon: icon,
      color,
      currency,
      is_included: isSwitchOn,
    };

    const response = await dispatch(createAccount(formData));

    if (response.payload.success === true) {
      dispatch(ACCOUNT_CREATE_ERROR_MESSAGE(""));
      //  Reset state variables
      setAmount("");
      setName("");
      setIcon("");
      setColor("");
      setCurrency("");
      setSwitchOn(false);
      onClose();
    }
    dispatch(getAllAccounts());
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="modal-container">
        <h2>Add New Account</h2>
        <TextField
          style={{ marginTop: "15px" }}
          label="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          fullWidth
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
        {createErrorMessage && (
          <p className="error-message">{createErrorMessage.amount}</p>
        )}
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          style={{ marginTop: "15px" }}
        />
        {createErrorMessage && (
          <p className="error-message">{createErrorMessage.account_name}</p>
        )}
        <TextField
          style={{ marginTop: "15px" }}
          select
          label="Icon"
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
        {createErrorMessage && (
          <p className="error-message">{createErrorMessage.account_icon}</p>
        )}
        <InputLabel className="color-picker-label">Set Color</InputLabel>
        <div className="color-picker" style={{ marginBottom: "15px" }}>
          <ColorPicker selectedColor={color} onSelectColor={setColor} />
        </div>
        <TextField
          style={{ marginTop: "15px" }}
          select
          label="Currency"
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
        {createErrorMessage && (
          <p className="error-message">{createErrorMessage.currency}</p>
        )}
        <FormControlLabel
          style={{ marginTop: "15px" }}
          control={
            <Switch
              checked={isSwitchOn}
              onChange={handleSwitchChange}
              color="primary"
            />
          }
          label="Do not include in total balance"
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

export default CreateModals;
