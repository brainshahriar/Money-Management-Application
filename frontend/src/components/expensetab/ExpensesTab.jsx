import PublishIcon from "@mui/icons-material/Publish";
import AddIcon from "@mui/icons-material/Add";
import "./ExpensesTab.css";
import { useState } from "react";
import ExpenseModals from "../../pages/home/ExpenseModals";

const ExpensesTab = ({ expenses }) => {
  console.log(expenses);
  return (
    <div>
      <table className="expenses-table">
        <tbody>
          {expenses.map((items, i) => {
            return (
              <tr key={i}>
                <td className="expense-title">
                  <PublishIcon />
                  <p>{items.category.category_name}</p>
                </td>
                <td>19%</td>
                <td>${items.amount}</td>
                <td>
                  <button className="edit-btn">Edit</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ExpensesTab;
