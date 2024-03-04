import React from "react";
import Topbar from "../topbar/Topbar";
import Sidebar from "../sidebar/Sidebar";

const Layout = ({ children }) => {
  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        {children}
      </div>
    </>
  );
};

export default Layout;
