import React, { useState } from "react";
import "./Categories.css";
import CategoryExpensesTab from "../../components/categoryexpensetab/CategoryExpensesTab";
import CategoryIncomesTab from "../../components/categoryincomestab/CategoryIncomesTab";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../redux/features/category/categorySlice";
import AddIcon from "@mui/icons-material/Add";
import CategoryCreateModals from "./CategoryCreateModals";
import { useEffect } from "react";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import CategoryUpdateModals from "./CategoryUpdateModals";

export default function Categories() {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const { message, isLoading, isError, categories } = useSelector(
    (state) => state.category
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getAllCategory());
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  const openCreateModal = () => {
    setCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setCreateModalOpen(false);
  };

  const [activeTab, setActiveTab] = useState("expenses");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="user">
      {isLoading && <Loader />}
      <div className="userTitleContainer">
        <h1 className="userTitle">Categories</h1>
      </div>
      <div className="userContainer">
        <div className="userUpdate">
          <div className="tabs">
            <button
              className={activeTab === "expenses" ? "active" : ""}
              onClick={() => handleTabChange("expenses")}
            >
              Expenses
            </button>
            <button
              className={activeTab === "income" ? "active" : ""}
              onClick={() => handleTabChange("income")}
            >
              Income
            </button>
          </div>
          <div className="add-icon-div">
            <button className="add-icon-button" onClick={openCreateModal}>
              <AddIcon className="add-icon" fontSize="large" />
            </button>
            <CategoryCreateModals
              isOpen={isCreateModalOpen}
              onClose={closeCreateModal}
              activeTab={activeTab}
            />
          </div>
          <div className="tabContent">
            {activeTab === "expenses" && (
              <CategoryExpensesTab categories={categories} />
            )}
            {activeTab === "income" && (
              <CategoryIncomesTab categories={categories} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
