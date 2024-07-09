// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Nav";
import LoginForm from "./components/Login";
import RegisterForm from "./components/Register";
import Dashboard from "./components/Dashboard";
import Homepage from "./components/Homepage";
import "./App.css";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./components/NotFound";
import ServiceForm from "./components/ServiceForm";
import ServicesList from "./components/ServicesList";
import UserList from "./components/UserList";
import ServiceUpdateForm from "./components/ServiceUpdateForm";
import BookingForm from "./components/BookingForm";
import Profile from "./components/Profile";
import ThreeScene from "./components/ThreeScene";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import SecureRoutes from "./components/SecureRoutes";
// Import the 404 component

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Privateroute for admin and user only*/}

        <Route element={<SecureRoutes allowedRoles={["admin", "user"]} />}>
          <Route path="/services" element={<ServicesList />} />
          <Route path="/bookingform" element={<BookingForm />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/homepage" element={<Homepage />} />
        </Route>

        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        
        {/* Privateroute for admin */}

        <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
          <Route path="/users" element={<UserList />} />
          <Route path="/serviceform" element={<ServiceForm />} />
          <Route path="/serviceupdate/:id" element={<ServiceUpdateForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        {/* Catch-all route for undefined paths */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
