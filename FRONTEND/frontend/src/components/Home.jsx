
import React from 'react';
import { useNavigate } from 'react-router-dom';


const HomePage = () => {
  const navigate = useNavigate();

  const handleAdminLogin = () => {
    navigate('/adminlogin'); 
  };

  
  const handleUserLogin = () => {
    navigate('/userlogin'); 
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 mt-5 bg-gradient-to-r from-orange-500 to-purple-600 min-h-screen">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white">Welcome to Car Wash Service</h1>
        <p className="mt-3 text-lg text-gray-200 max-w-xl">
          Experience the best car wash service with our professional team. Book your wash today!
        </p>
      </div>

      {/* Drawer (Sidebar) */}
      <div className="mt-10">
        <div className="drawer">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
              Get Started 👉
            </label>
          </div>

          <div className="drawer-side">
            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-6">
              <li>
                <button
                  onClick={handleAdminLogin}
                  className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded w-full"
                >
                  Admin Login
                </button>
              </li>
              <li className="mt-4">
                <button
                  onClick={handleUserLogin}
                  className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded w-full"
                >
                  User Login
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};


export default HomePage;

