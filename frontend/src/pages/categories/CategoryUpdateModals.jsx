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
  CATEGORY_EDIT_ERROR_MESSAGE,
  createCategory,
  deleteCategory,
  getAllCategory,
  getCategory,
  selectCategory,
  updateCategory,
} from "../../redux/features/category/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const CategoryUpdateModals = ({
  isOpen,
  onClose,
  selectedCategoryId,
}) => {
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
  const { editErrorMessage } = useSelector((state) => state.category);
  const categoryEdit = useSelector(selectCategory);

  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [color, setColor] = useState("");
  const [categoryType,setCategoryType] = useState('');

  const handleDelete = async (id) => {
    dispatch(deleteCategory(id));
    dispatch(getAllCategory());
    onClose();
  };

  const handleUpdate = async (id) => {
    const formData = {
      category_name: name,
      icon,
      color,
    };

    const response = await dispatch(updateCategory({ id, formData }));

    if (response.payload.success === true) {
      dispatch(CATEGORY_EDIT_ERROR_MESSAGE(""));
      onClose();
    }
    await dispatch(getAllCategory());
  };

  useEffect(() => {
    if (selectedCategoryId) {
      dispatch(getCategory(selectedCategoryId));
    }
  }, [selectedCategoryId]);

  // Check if accountEdit exists before setting initial state

  useEffect(() => {
    if (categoryEdit) {
      setName(categoryEdit.category_name || "");
      setIcon(categoryEdit.icon || "");
      setColor(categoryEdit.color || "");
      setCategoryType(categoryEdit.category_type.name || '');
    }
  }, [categoryEdit]);

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="modal-container">api
        <h2>Edit Category</h2>
        <InputLabel className="category-type">{categoryType} <strong>Type</strong></InputLabel>
        <TextField
          label="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          multiline
          style={{ marginTop: "15px" }}
        />
        {editErrorMessage && (
          <p className="error-message">{editErrorMessage.category_name}</p>
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
        {editErrorMessage && (
          <p className="error-message">{editErrorMessage.icon}</p>
        )}
        <InputLabel className="color-picker-label">Set Color</InputLabel>
        <div className="color-picker" style={{ marginBottom: "15px" }}>
          <ColorPicker selectedColor={color} onSelectColor={setColor} />
        </div>
        {editErrorMessage && (
          <p className="error-message">{editErrorMessage.color}</p>
        )}
        <button className="delete-btn" onClick={()=>handleDelete(selectedCategoryId)}>
          Delete
        </button>
        <div className="footer">
          <Button
            className="btn-modal"
            variant="contained"
            color="primary"
            onClick={() => handleUpdate(selectedCategoryId)}
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

export default CategoryUpdateModals;
