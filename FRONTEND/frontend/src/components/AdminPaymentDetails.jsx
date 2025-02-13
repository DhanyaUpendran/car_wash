import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from "xlsx"; // Import xlsx for Excel export

const PaymentDetails = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/admin/dashboard/payments'); // Update endpoint if needed
        setPayments(response.data.payments || []);
      } catch (error) {
        console.error('Error fetching payments:', error);
      }
    };

    fetchPayments();
  }, []);

  const exportToExcel = () => {
    if (payments.length === 0) {
      alert("No data available to export.");
      return;
    }

    // Convert data to Excel format
    const worksheet = XLSX.utils.json_to_sheet(
      payments.map(payment => ({
        'Client Name': payment.client?.name || 'N/A',
        'Client Email': payment.client?.email || 'N/A',
        Amount: payment.amount || 0,
        Method: payment.method || 'N/A',
        Status: payment.status || 'N/A',
        Date: new Date(payment.date).toLocaleString() || 'N/A',
        'Transaction ID': payment.transactionId || 'N/A',
        'Created At': new Date(payment.createdAt).toLocaleString() || 'N/A'
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Payments");

    // Create and trigger file download
    XLSX.writeFile(workbook, "Payments.xlsx");
  };

  return (
    <div className="p-6 mt-6">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={exportToExcel}
      >
        Export to Excel
      </button>

      <div className="overflow-x-auto">
        <table className="table-auto w-full text-center border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Client Name</th>
              <th className="p-2">Client Email</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Method</th>
              <th className="p-2">Status</th>
              <th className="p-2">Date</th>
              <th className="p-2">Transaction ID</th>
            </tr>
          </thead>
          <tbody>
            {payments.length > 0 ? (
              payments.map((payment, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{payment.client?.name || "N/A"}</td>
                  <td className="p-2">{payment.client?.email || "N/A"}</td>
                  <td className="p-2">{payment.amount || "0"}</td>
                  <td className="p-2">{payment.method || "N/A"}</td>
                  <td className="p-2">{payment.status || "N/A"}</td>
                  <td className="p-2">{new Date(payment.date).toLocaleString()}</td>
                  <td className="p-2">{payment.transactionId || "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-4">No payments found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentDetails;