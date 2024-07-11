import React, { useState, useEffect } from "react";
// Import necessary CoreUI components
import {
  CSidebar,
  CSidebarHeader,
  CSidebarBrand,
  CSidebarNav,
  CNavTitle,
  CNavItem,
  CNavGroup,
  CBadge,
} from "@coreui/react";
// Import CoreUI icons
import CIcon from "@coreui/icons-react";
import {
  cilSpeedometer,
  cilPuzzle,
  cilCloudDownload,
  cilUser,
  cilLayers,
} from "@coreui/icons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { name } = useSelector((state) => state.login);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  useEffect(() => {
    // Close the sidebar when resizing the window to larger screens
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarVisible(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSidebarToggle = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleClickOutside = (e) => {
    if (sidebarVisible && !e.target.closest(".sidebar")) {
      setSidebarVisible(false);
    }
  };

  useEffect(() => {
    if (sidebarVisible) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [sidebarVisible]);

  return (
    <div className="flex">
      <button
        className="lg:hidden p-2 bg-gray-800 text-white"
        onClick={handleSidebarToggle}
      >
        <CIcon customClassName="nav-icon" icon={cilSpeedometer} />
      </button>
      <CSidebar
        className={`sidebar border-end lg:static ${
          sidebarVisible ? "block fixed z-50 top-0 left-0 w-64" : "hidden lg:block"
        }`}
        colorScheme="dark"
        style={{ height: "100vh" }}
      >
        <CSidebarHeader className="border-bottom">
          <CSidebarBrand className="dash">Dashboard</CSidebarBrand>
          <CSidebarBrand>{name}</CSidebarBrand>
        </CSidebarHeader>
        <CSidebarNav>
          <CNavTitle>Nav Title</CNavTitle>
          <CNavItem href="#">
            <CIcon customClassName="nav-icon" icon={cilSpeedometer} /> Nav item
          </CNavItem>
          <CNavItem href="/users">
            <Link
              to="/users"
              className="flex justify-center no-underline hover:no-underline mb-2"
            >
              <CIcon customClassName="nav-icon" icon={cilUser} />
              {" "}Users
            </Link>
          </CNavItem>
          <CNavItem href="#">
            <CIcon customClassName="nav-icon" icon={cilSpeedometer} /> With
            badge <CBadge color="primary ms-auto">NEW</CBadge>
          </CNavItem>
          <CNavGroup
            toggler={
              <>
                <CIcon customClassName="nav-icon" icon={cilPuzzle} /> Nav
                dropdown
              </>
            }
          >
            <CNavItem href="#">
              <span className="nav-icon">
                <span className="nav-icon-bullet"></span>
              </span>{" "}
              Nav dropdown item
            </CNavItem>
            <CNavItem href="#">
              <span className="nav-icon">
                <span className="nav-icon-bullet"></span>
              </span>{" "}
              Nav dropdown item
            </CNavItem>
          </CNavGroup>
          <CNavItem href="https://coreui.io">
            <CIcon customClassName="nav-icon" icon={cilCloudDownload} />{" "}
            Download CoreUI
          </CNavItem>
          <CNavItem href="https://coreui.io/pro/">
            <CIcon customClassName="nav-icon" icon={cilLayers} /> Try CoreUI PRO
          </CNavItem>
        </CSidebarNav>
      </CSidebar>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 bg-white rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl">
            <Link to={"/serviceform"}><div className="text-center">
              <h5 className="text-lg font-bold mb-2">+</h5>
              <h5 className="text-lg font-bold mb-2">Create Services</h5>
            </div></Link>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl">
           <Link to={"/services"}> <div className="text-center">
              <h5 className="text-lg font-bold mb-2">All services</h5>
            </div></Link>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl">
           <Link to={"/users"}><div className="text-center">
              <h5 className="text-lg font-bold mb-2">Users Information</h5>
            </div>
            </Link>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl">
            <div className="text-center">
              <h5 className="text-lg font-bold mb-2">Payments</h5>
            </div>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl">
            <div className="text-center">
              <h5 className="text-lg font-bold mb-2">Query</h5>
            </div>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl">
            <div className="text-center">
              <h5 className="text-lg font-bold mb-2">Feedback</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
