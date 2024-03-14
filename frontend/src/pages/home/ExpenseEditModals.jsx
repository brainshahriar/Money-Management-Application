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
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  EXPENSE_CREATE_ERROR_MESSAGE,
  EXPENSE_EDIT_ERROR_MESSAGE,
  createExpense,
  deleteExpense,
  getAllExpenses,
  getExpense,
  selectExpense,
  updateExpense,
} from "../../redux/features/expenses/expenseSlice";
import { IconButton } from "@mui/material";
import { PhotoCamera, Close } from "@mui/icons-material";

const ExpenseEditModals = ({
  isOpen,
  onClose,
  selectedExpenseId,
  allAccounts,
  allCategories,
}) => {
  const dispatch = useDispatch();
  const { editErrorMessage } = useSelector((state) => state.expense);
  const expenseEdit = useSelector(selectExpense);
  const [amount, setAmount] = useState("");
  const [account, setAccount] = useState("");
  const [category, setCategory] = useState("");
  const [comments, setComments] = useState("");
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [imageId, setImageId] = useState([]);

  console.log(images);

  useEffect(() => {
    if (!isOpen) {
      setImageId([]);
    }
  }, [isOpen]);

  const handleDelete = async (id) => {
    dispatch(deleteExpense(id));
    dispatch(getAllExpenses());
    onClose();
  };

  const handleImageChange = (e) => {
    const fileList = Array.from(e.target.files);

    const newImages = fileList.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setImages(newImages);
    setPreviewImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleRemoveImage = (index, imageIds) => {
    const arr = [...imageId, imageIds].filter((_, i) => i !== index);
    setImageId(arr);
    setPreviewImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  // useEffect(() => {
  //   if (activeTab === "expenses") {
  //     setExpenseType(1);
  //   } else if (activeTab === "income") {
  //     setExpenseType(2);
  //   }
  // }, [activeTab]);

  const today = dayjs();

  const handleUpdate = async (id) => {
    const formData = new FormData();
    formData.append("amount", amount);
    formData.append("account_id", account);
    formData.append("category_id", category);
    formData.append("comments", comments);
    formData.append("_method", "PUT");

    imageId.forEach((id, index) => {
      formData.append(`photo_ids[${index}]`, id);
    });
      images.forEach((image, index) => {
        formData.append(`photo[${index}]`, image.file);
      });

    const response = await dispatch(updateExpense({ id, formData }));

    if (response.payload.success === true) {
      dispatch(EXPENSE_EDIT_ERROR_MESSAGE(""));
      // Reset state variables
      setAmount("");
      setAccount("");
      setCategory("");
      setComments("");
      setImages([]); // Clear images array
      setImageId([]);
      onClose();
    }
    dispatch(getAllExpenses());
  };

  useEffect(() => {
    if (selectedExpenseId) {
      dispatch(getExpense(selectedExpenseId));
    }
  }, [selectedExpenseId]);

  // Check if expenseEdit exists before setting initial state

  useEffect(() => {
    if (expenseEdit) {
      setAmount(expenseEdit.amount || "");
      setCategory(expenseEdit.category.id || "");
      setAccount(expenseEdit.account.id || "");
      setComments(expenseEdit.comments || "");
      setPreviewImages(expenseEdit.photo || "");
    }
  }, [expenseEdit]);
  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="modal-container">
        <h2>Edit Expense</h2>
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
          style={{ marginTop: "15px" }}
          select
          label="Account"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
          fullWidth
        >
          {allAccounts.map((accounts, index) => {
            const { id, account_name } = accounts;
            return (
              <MenuItem key={id} value={id}>
                {account_name}
              </MenuItem>
            );
          })}
        </TextField>
        {editErrorMessage && (
          <p className="error-message">{editErrorMessage.account_id}</p>
        )}
        <TextField
          label="Comments"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          fullWidth
          multiline
          rows={2} // Specify the number of rows you want
          style={{ marginTop: "15px" }}
        />
        <TextField
          style={{ marginTop: "15px" }}
          select
          label="Choose Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          fullWidth
        >
          {allCategories.map((categories, index) => {
            const { id, category_name } = categories;
            return (
              <MenuItem key={id} value={id}>
                {category_name}
              </MenuItem>
            );
          })}
        </TextField>
        {editErrorMessage && (
          <p className="error-message">{editErrorMessage.category_id}</p>
        )}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker defaultValue={today} />
        </LocalizationProvider>
        <div>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            style={{ display: "none" }}
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            style={{ cursor: "pointer", position: "relative" }}
          >
            <InputAdornment position="start">
              <span className="image-label">
                <Icons.AddAPhoto></Icons.AddAPhoto>Add Photos
              </span>
            </InputAdornment>
          </label>
          <div className="image-list">
            {previewImages.map((image, index) => (
              <div key={index}>
                <img
                  src={
                    image.file_path
                      ? `http://localhost:8000/storage/${image.file_path}`
                      : image.url
                  }
                  alt={`Image ${index}`}
                  style={{ width: "50px", height: "50px" }}
                />
                <div
                  className="delete-icon"
                  onClick={() =>
                    handleRemoveImage(index, image.id ? image.id : index)
                  }
                >
                  X
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          className="delete-btn"
          onClick={() => handleDelete(selectedExpenseId)}
        >
          Delete
        </button>
        <div className="footer">
          <Button
            className="btn-modal"
            variant="contained"
            color="primary"
            onClick={() => handleUpdate(selectedExpenseId)}
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

export default ExpenseEditModals;
