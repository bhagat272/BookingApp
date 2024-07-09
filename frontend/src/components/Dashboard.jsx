import React, { useState } from "react";
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
  return (
    <div className="mt-1">
      <CSidebar
        className="border-end"
        unfoldable
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
            
              {" "}
              Users
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
    </div>
  );
};

export default Dashboard;
