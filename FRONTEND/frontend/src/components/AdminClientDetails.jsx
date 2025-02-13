
import React, { useState, useEffect } from 'react';
import axios from "axios";
import * as XLSX from "xlsx"; // Import xlsx for Excel export

const UserDetails = () => {
  const [clients, setClients] = useState([]);

  // Fetch clients from backend
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get("http://localhost:5000/admin/dashboard/clients");
        setClients(response.data.clients);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    fetchClients();
  }, []);

  // Function to export clients to Excel
  const exportToExcel = () => {
    if (clients.length === 0) {
      alert("No data available to export.");
      return;
    }

    // Convert data to Excel format
    const worksheet = XLSX.utils.json_to_sheet(
      clients.map(client => ({
        Name: client.name,
        Email: client.email,
        Phone: client.phone,
        Place: client.place,
        "Vehicle Number": client.vehicleNumber,
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Clients");

    // Create and trigger file download
    XLSX.writeFile(workbook, "Clients.xlsx");
  };

  return (
    <div className="overflow-x-auto mt-5 p-6">
      <h2 className="text-2xl font-semibold mb-4 mt-4 text-center">Client List</h2>

      {/* Export Button */}
      <button
        onClick={exportToExcel}
        className="mb-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Export to Excel
      </button>

      {/* Clients Table */}
      <table className="table w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">#</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Phone</th>
            <th className="border border-gray-300 p-2">Place</th>
            <th className="border border-gray-300 p-2">Vehicle Number</th>
          </tr>
        </thead>
        <tbody>
        {clients && clients.length > 0 ?(
            clients.map((client, index) => (
              <tr key={client._id} className="hover">
                <th className="border border-gray-300 p-2">{index + 1}</th>
                <td className="border border-gray-300 p-2">{client.name}</td>
                <td className="border border-gray-300 p-2">{client.email}</td>
                <td className="border border-gray-300 p-2">{client.phone}</td>
                <td className="border border-gray-300 p-2">{client.place}</td>
                <td className="border border-gray-300 p-2">{client.vehicleNumber}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center p-4">No clients found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserDetails;
