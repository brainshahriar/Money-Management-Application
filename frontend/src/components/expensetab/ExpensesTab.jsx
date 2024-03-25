import PublishIcon from "@mui/icons-material/Publish";
import AddIcon from "@mui/icons-material/Add";
import "./ExpensesTab.css";
import { useState } from "react";
import ExpenseEditModals from "../../pages/home/ExpenseEditModals";

const ExpensesTab = ({ expenses, allAccounts, allCategories, date }) => {
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);

  const openEditModal = (id) => {
    setSelectedExpenseId(id);
    setUpdateModalOpen(true);
  };

  const closeEditModal = () => {
    setUpdateModalOpen(false);
  };
  return (
    <div>
      <table className="expenses-table">
        <tbody>
          {expenses.length > 0 ? (
            expenses.map((items, i) => {
              return (
                <tr key={i}>
                  <td className="expense-title">
                    <PublishIcon />
                    <p>{items.category.category_name}</p>
                  </td>
                  <td>19%</td>
                  <td>${items.amount}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => openEditModal(items.id)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="4">No expenses today</td>
            </tr>
          )}
          <ExpenseEditModals
            isOpen={isUpdateModalOpen}
            onClose={closeEditModal}
            selectedExpenseId={selectedExpenseId}
            allAccounts={allAccounts}
            allCategories={allCategories}
            date={date}
          />
        </tbody>
      </table>
    </div>
  );
};

export default ExpensesTab;
