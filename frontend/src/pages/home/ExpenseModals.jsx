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
  createExpense,
  getAllExpenses,
} from "../../redux/features/expenses/expenseSlice";

const ExpenseModals = ({
  isOpen,
  onClose,
  activeTab,
  allAccounts,
  allCategories,
}) => {
  const dispatch = useDispatch();
  const { createErrorMessage } = useSelector((state) => state.expense);

  const [amount, setAmount] = useState("");
  const [account, setAccount] = useState("");
  const [category, setCategory] = useState("");
  const [comments, setComments] = useState("");
  const [expenseType, setExpenseType] = useState(0);

  useEffect(() => {
    if (activeTab === "expenses") {
      setExpenseType(1);
    } else if (activeTab === "income") {
      setExpenseType(2);
    }
  }, [activeTab]);

  const today = dayjs();

  const handleSave = async () => {
    const formData = {
      amount: amount,
      account_id: account,
      category_id: category,
      comments,
    };
    const response = await dispatch(createExpense(formData));

    if (response.payload.success === true) {
      dispatch(EXPENSE_CREATE_ERROR_MESSAGE(""));
      //  Reset state variables
      setAmount("");
      setAccount("");
      setCategory("");
      setComments("");
      onClose();
    }
    dispatch(getAllExpenses());
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="modal-container">
        <h2>Add Expense</h2>
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
        {createErrorMessage && (
          <p className="error-message">{createErrorMessage.amount}</p>
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
        {createErrorMessage && (
          <p className="error-message">{createErrorMessage.account_id}</p>
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
        {createErrorMessage && (
          <p className="error-message">{createErrorMessage.category_id}</p>
        )}
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
