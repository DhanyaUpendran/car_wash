import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbars.jsx"; 

const ClientDataPage = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [clientData, setClientData] = useState({
    name: "",
    phone: "",
    place: "",
    vehicleNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post ("http://localhost:5000/client/clientdata", clientData, { withCredentials: true });
      
      if (response.status === 200 || response.status === 201) {
        console.log("Client data saved successfully!", response.data);
        alert("Client data saved successfully!");
        setTimeout(() => navigate(`/payment/${response.data.clientId}`), 500);
      } else {
        alert("Failed to save client data.");
      }
    } catch (error) {
      console.error("Error saving client data:", error.response?.data?.message || error.message);
      alert("Error: " + (error.response?.data?.message || "Failed to save client data."));
    }
  };
  
 

  return (
    <div>
      {/* Navbar at the top */}
      <Navbar  />

      {/* Page Background */}
      <div
        className="flex justify-center items-center h-screen 
        bg-[url('/carwash.webp')] bg-cover bg-center bg-no-repeat"
      >
        {!showForm ? (
          /* Show "Add User Details" Button */
          <button
            onClick={() => setShowForm(true)}
            className="bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg 
            hover:bg-orange-700 transition-all duration-300 ease-in-out shadow-lg"
          >
            Add User Details
          </button>
        ) : (
          /* Show Form */
          <div className="bg-white bg-opacity-50 p-6 rounded-lg shadow-md w-1/3 backdrop-blur-lg">
            {/* Title */}
            <h1 className="text-center text-orange-600 text-2xl font-semibold mb-6">
              Enter Client Details
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={clientData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={clientData.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Place</label>
                <input
                  type="text"
                  name="place"
                  value={clientData.place}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Vehicle Number</label>
                <input
                  type="text"
                  name="vehicleNumber"
                  value={clientData.vehicleNumber}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              {/* Submit & Cancel Buttons */}
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-orange-600 text-white font-semibold px-6 py-2 rounded-lg 
                  hover:bg-orange-700 transition-all duration-300 ease-in-out shadow-md"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-400 text-white font-semibold px-6 py-2 rounded-lg 
                  hover:bg-gray-500 transition-all duration-300 ease-in-out shadow-md"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientDataPage;
