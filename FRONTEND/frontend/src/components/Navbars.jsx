import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  // const [email, setUserEmail] = useState("");

  // useEffect(() => {
  //   const storedEmail = localStorage.getItem("email");
  //   if (storedEmail) {
  //     setUserEmail(storedEmail);
  //   }
  // }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/client/logout", {}, { withCredentials: true });
      localStorage.removeItem("email"); // Clear email on logout
      navigate("/userlogin");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };


return (
  <nav className="flex items-center justify-between bg-gray-500 p-4 shadow-lg  mt-5">
    {/* Title or Logo */}
    <h1 className="text-white text-xl font-semibold tracking-wide p-4 mt-5" >Car Wash Service</h1>

    {/* Logout Button */}
    <button
      className="bg-red-600 p-4 mt-5 text-white px-4 py-2 rounded-lg flex items-center shadow-md hover:bg-red-700 transition duration-300 ease-in-out"
      onClick={handleLogout}
    >
      <FaSignOutAlt className="mr-2 text-lg" />
      Logout
    </button>
  </nav>
);
};

export default Navbar;
