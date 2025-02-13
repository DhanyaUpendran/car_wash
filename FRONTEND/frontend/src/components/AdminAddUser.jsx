import React, { useState,useEffect } from 'react';
import axios from 'axios';

const AdminAddUserPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]); // State to store user details
  const [popupVisible, setPopupVisible] = useState(false); // State for popup visibility


// Fetch all users when the component loads
useEffect(() => {
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/admin/dashboard/users');
      setUsers(response.data.users); // Populate users state with data from the backend
      setUsers(data.users || []);
    } catch (error) {
      console.error('Error fetching users:', error.message);
    }
  };

  fetchUsers();
}, []);
  

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/admin/dashboard/adduser', formData);
      setMessage(response.data.message || 'User added successfully');
      setPopupVisible(true); // Show popup
      setFormData({ email: '', password: '' }); // Reset form
      setUsers((prevUsers) => [...prevUsers, response.data.user]); // Add new user to the table
    } catch (error) {
      setMessage(error.response?.data?.error || 'Failed to add user');
      setPopupVisible(true); // Show popup for error
    }
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  return (
    <div className="absolute top-0 left-0 w-full flex justify-center items-center h-screen bg-[url('/carwash.webp')] bg-cover bg-center bg-no-repeat">
     <div className="bg-white bg-opacity-50 p-6 rounded-lg shadow-md w-1/3 backdrop-blur-lg">
      <h1 className="text-center text-orange-600 text-2xl font-semibold mb-4">Add Executive</h1>
      <form onSubmit={handleSubmit} >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"
        >
          Save
        </button>
      </form>

      {/* Popup Message */}
      {popupVisible && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <p className="text-lg text-center">{message}</p>
            <button
              onClick={closePopup}
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

     
    </div>
    </div>
  );
};

export default AdminAddUserPage;
