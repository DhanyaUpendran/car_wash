import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/client/userlogin', { email, password },
        { withCredentials: true });
      
      setMessage(response.data.message);
 
      // Redirect or handle success
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token); // Store JWT Token
        
       
        navigate('/clientdata');
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="absolute top-0 left-0 w-full flex justify-center items-center h-screen bg-[url('./public/carwash.webp')] bg-cover bg-center bg-no-repeat">
  <div className="bg-white bg-opacity-50 p-6 rounded-lg shadow-md w-1/3 backdrop-blur-lg">
    <h2 className="text-center text-orange-600 text-2xl font-semibold mb-4">User Login</h2>
    
    {message && <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{message}</div>}
    
    <form onSubmit={handleLogin}>
      {/* Email Field */}
      <label className="input input-bordered flex items-center gap-2 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
          <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
          <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
        </svg>
        <input type="text" className="grow" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>

      {/* Password Field */}
      <label className="input input-bordered flex items-center gap-2 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
          <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
        </svg>
        <input type="password" className="grow" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>

      {/* Login Button */}
      <button type="submit" className="w-full bg-orange-600 hover:bg-purple-300 text-white font-bold py-2 rounded">
        Login
      </button>
    </form>
  </div>
</div>
  )}

export default UserLogin;
