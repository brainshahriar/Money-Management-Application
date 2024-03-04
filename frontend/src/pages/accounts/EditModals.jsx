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
  ACCOUNT_EDIT_ERROR_MESSAGE,
  deleteAccount,
  getAccount,
  getAllAccounts,
  selectAccount,
  updateAccount,
} from "../../redux/features/account/accountSlice";
import { useEffect } from "react";

const EditModals = ({ isOpen, onClose, accountId }) => {
  const dispatch = useDispatch();
  const { editErrorMessage } = useSelector((state) => state.account);
  const accountEdit = useSelector(selectAccount);
  const [account, setAccount] = useState(accountEdit);

  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [color, setColor] = useState("");
  const [currency, setCurrency] = useState("");
  const [isSwitchOn, setSwitchOn] = useState(false);

  const handleDelete = async (id) => {
    dispatch(deleteAccount(id));
    dispatch(getAllAccounts());
    onClose();
  };

  const handleUpdate = async (id) => {
    const formData = {
      amount,
      account_name: name,
      account_icon: icon,
      color,
      currency,
      is_included: isSwitchOn,
    };

    // const response = dispatch(updateAccount({ id, formData }));
    const response = await dispatch(updateAccount({ id, formData }));

    if (response.payload.success === true) {
      dispatch(ACCOUNT_EDIT_ERROR_MESSAGE(""));
      onClose();
    }
    await dispatch(getAllAccounts());
  };

  const handleSwitchChange = () => {
    setSwitchOn(!isSwitchOn);
  };

  useEffect(() => {
    if (accountId) {
      dispatch(getAccount(accountId));
    }
  }, [accountId]);

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

  // Check if accountEdit exists before setting initial state

  useEffect(() => {
    if (accountEdit) {
      setAmount(accountEdit.amount || "");
      setName(accountEdit.account_name || "");
      setIcon(accountEdit.account_icon || "");
      setColor(accountEdit.color || "");
      setCurrency(accountEdit.currency || "");
      setSwitchOn(accountEdit.is_included || false);
    }
  }, [accountEdit]);

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="modal-container">
        <h2>Edit Account</h2>
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
        {editErrorMessage && (
          <p className="error-message">{editErrorMessage.amount}</p>
        )}
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          style={{ marginTop: "15px" }}
        />
        {editErrorMessage && (
          <p className="error-message">{editErrorMessage.account_name}</p>
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
        {editErrorMessage && (
          <p className="error-message">{editErrorMessage.account_icon}</p>
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
        {editErrorMessage && (
          <p className="error-message">{editErrorMessage.currency}</p>
        )}
        <FormControlLabel
          style={{ marginTop: "15px" }}
          control={
            <Switch
              checked={!!isSwitchOn}
              onChange={handleSwitchChange}
              color="primary"
            />
          }
          label="Do not include in total balance"
        />
        <button className="delete-btn" onClick={() => handleDelete(accountId)}>
          Delete
        </button>
        <div className="footer">
          <Button
            className="btn-modal"
            variant="contained"
            color="primary"
            onClick={() => handleUpdate(accountId)}
          >
            Update
          </Button>
          <Button className="btn-modal" variant="contained" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EditModals;
