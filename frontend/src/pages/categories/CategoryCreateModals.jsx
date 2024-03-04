import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import * as Icons from "@mui/icons-material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import ColorPicker from "../../pages/accounts/ColorPicker";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import {
  CATEGORY_CREATE_ERROR_MESSAGE,
  createCategory,
  getAllCategory,
} from "../../redux/features/category/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const CategoryCreateModals = ({ isOpen, onClose, activeTab }) => {
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

  const dispatch = useDispatch();
  const { createErrorMessage } = useSelector((state) => state.category);

  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [color, setColor] = useState("");
  const [categoryType, setCategoryType] = useState(0);

  useEffect(() => {
    if (activeTab === "expenses") {
      setCategoryType(1);
    } else if (activeTab === "income") {
      setCategoryType(2);
    }
  }, [activeTab]);

  const handleSave = async () => {
    const formData = {
      category_name: name,
      icon,
      color,
      category_type: categoryType,
    };
    const response = await dispatch(createCategory(formData));

    if (response.payload.success === true) {
      dispatch(CATEGORY_CREATE_ERROR_MESSAGE(""));
      //  Reset state variables
      setName("");
      setIcon("");
      setColor("");
      onClose();
    }
    dispatch(getAllCategory());
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="modal-container">
        <h2>Create Category</h2>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            className="radio-btn-group"
            // onChange={(e) => setCategoryType(parseInt(e.target.value))}
          >
            <FormControlLabel
              value={1}
              control={<Radio />}
              label="Expense"
              checked={activeTab === "expenses"}
              disabled={activeTab === "income"}
            />
            <FormControlLabel
              value={2}
              control={<Radio />}
              label="Income"
              checked={activeTab === "income"}
              disabled={activeTab === "expenses"}
            />
          </RadioGroup>
        </FormControl>
        <TextField
          label="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          multiline
          style={{ marginTop: "15px" }}
        />
        {createErrorMessage && (
          <p className="error-message">{createErrorMessage.category_name}</p>
        )}
        <TextField
          style={{ marginTop: "15px" }}
          select
          label="Choose Icons"
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
          <p className="error-message">{createErrorMessage.icon}</p>
        )}
        <InputLabel className="color-picker-label">Set Color</InputLabel>
        <div className="color-picker" style={{ marginBottom: "15px" }}>
          <ColorPicker selectedColor={color} onSelectColor={setColor} />
        </div>
        {createErrorMessage && (
          <p className="error-message">{createErrorMessage.color}</p>
        )}
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

export default CategoryCreateModals;
