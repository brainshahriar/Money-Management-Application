import PublishIcon from "@mui/icons-material/Publish";
import AddIcon from "@mui/icons-material/Add";
import "./Accounts.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser'
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { useEffect } from "react";
import { getAllAccounts, selectTotalBalance } from "../../redux/features/account/accountSlice";
import Loader from "../../components/loader/Loader";
import CreateModals from "./CreateModals";
import EditModals from "./EditModals";

const Accounts = () => {
  useRedirectLoggedOutUser('/login');
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const total_balance = useSelector(selectTotalBalance);

  const { accounts, isLoading, isError, message } = useSelector(
    (state) => state.account
  );
  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getAllAccounts());
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedAccountId, setSelectedAccountId] = useState(null);

  const openCreateModal = () => {
    setCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setCreateModalOpen(false);
  };

  const openEditModal = (accountId) => {
    setSelectedAccountId(accountId);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedAccountId(null);
    setEditModalOpen(false);
  };

  return (
    <div className="user">
      {isLoading && <Loader />}
      <div className="userTitleContainer">
        <h1 className="userTitle">All Accounts</h1>
      </div>
      <div className="userContainer">
        <div className="userUpdate">
          <span className="userUpdateTitle">Total Balance : ${total_balance}</span>
          {accounts.map((item, index) => {
            const {
              id,
              amount,
              account_icon,
              account_name,
            } = item;
            return (
              <div key={`${id}-${index}`} className="account-body" onClick={() => openEditModal(id)}>
                <div className="left-part">
                  <PublishIcon />
                  <p>{account_name}</p>
                </div>
                <div className="right-part">${amount}</div>
              </div>
            );
          })}
          <div className="add-icon-div">
            <button className="add-icon-button" onClick={openCreateModal}>
              <AddIcon className="add-icon" fontSize="large" />
            </button>
          </div>
        </div>
      </div>
      <CreateModals isOpen={isCreateModalOpen} onClose={closeCreateModal} />
      {selectedAccountId && (
        <EditModals isOpen={isEditModalOpen} onClose={closeEditModal} accountId={selectedAccountId} />
      )}
    </div>
  );
};

export default Accounts;
