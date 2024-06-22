// App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Nav';
import LoginForm from './components/Login';
import RegisterForm from './components/Register';
import Dashboard from './components/Dashboard';
import Homepage from './components/Homepage';
import './App.css'
import PrivateRoute from './components/PrivateRoute';
import NotFound from './components/NotFound';
import ServiceForm from './components/ServiceForm';
import ServicesList from './components/ServicesList';
import UserList from './components/UserList';
import ServiceUpdateForm from './components/ServiceUpdateForm';
// Import the 404 component

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path='/serviceform' element={<ServiceForm/>}/>
        <Route path='/serviceupdate/:id' element={<ServiceUpdateForm/>}/>
        <Route path='/users' element={<UserList/>}/>
        <Route path="/register" element={<RegisterForm />} />
        <Route path='/services' element={<ServicesList/>}/>
        <Route path="/homepage" element={<Homepage />} />
        <Route path="*" element={<NotFound />} />
        <Route element={<PrivateRoute allowedRoles={['admin']} />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        {/* Catch-all route for undefined paths */}
       </Routes>
    </>
  );
}

export default App;
