import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./Nav";

const PrivateRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("authToken");
  const role = localStorage.getItem("userRole");

  if (!token) {
    return <Navigate to="/" />;
  }
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" />;
  }

  return (
    <>
    <Navbar/>
       <Outlet />
    </>
  );
};

export default PrivateRoute;
