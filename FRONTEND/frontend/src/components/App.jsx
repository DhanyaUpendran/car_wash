import React from 'react'

import {BrowserRouter, Routes, Route} from "react-router-dom";

import HomePage from "./Home.jsx";
import AdminLogin from './Adminlogin.jsx';
import UserLogin from "./UserLogin.jsx";
import Dashboard from './AdminDashboard.jsx';
import UserDetails from "./AdminClientDetails.jsx";
import PaymentDetails from "./AdminPaymentDetails.jsx";
import ClientDataPage from "./GetUserdetails.jsx";
import PaymentDetailsPage from "./GetPaymentdetail.jsx";
import AdminAddUserPage from "./AdminAddUser.jsx";
import Navbar from './Navbars.jsx';




function App() {

  return (
    
    <div style={{marginTop : '-3.5rem'}}>
      <BrowserRouter >
        <Routes>
        <Route path="/" element ={<HomePage/>} />
        <Route path="/navbar" element={<Navbar/>}/>
         <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/userlogin" element ={<UserLogin/>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/clients" element={ <UserDetails />} />
          <Route path="/dashboard/payments" element={ <PaymentDetails />} />
          <Route path="/clientdata" element ={<ClientDataPage/>} />
          <Route path="/payment/:clientId" element ={<PaymentDetailsPage/>} />
          <Route path="/dashboard/adduser" element={<AdminAddUserPage/>} />
          
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App