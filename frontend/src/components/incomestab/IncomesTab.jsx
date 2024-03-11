import PublishIcon from "@mui/icons-material/Publish";
import AddIcon from "@mui/icons-material/Add";
import "./IncomesTab.css";
import { useState } from "react";

const IncomesTab = () => {
  return (
    <div>
      <table className="expenses-table">
        <tbody>
          <tr>
            <td className="expense-title">
              <PublishIcon />
              <p>Lunch</p>
            </td>
            <td>18%</td>
            <td>$50.00</td>
            <td>
              <button className="edit-btn">Edit</button>
            </td>
          </tr>
          <tr>
            <td className="expense-title">
              <AddIcon />
              <p>Dinner</p>
            </td>
            <td>79%</td>
            <td>$50.00</td>
            <td className="td-btn">
              <button className="edit-btn">Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default IncomesTab;
