import React, { useState, useEffect } from 'react';
import { useParams,useNavigate  } from 'react-router-dom';
import axios from 'axios';

const PaymentDetailsPage = () => {
   
  const { clientId } = useParams(); // Get clientId from URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    
    client: clientId || '', // Initialize with clientId
    name: '',
    amount: '',
    method: '',
    status: '',
    transactionId: '',
  });

  useEffect(() => {
    if (clientId) {
      setFormData((prev) => ({
        ...prev,
        client: clientId, // Ensure clientId is set
      }));
  
      const fetchClientData = async () => {
        try {
          const res = await axios.get(`http://localhost:5000/client/${clientId}`, { withCredentials: true });
          setFormData((prev) => ({
            ...prev,
            name: res.data.name, // Populate name field
          }));
        } catch (error) {
          console.error("Error fetching client data:", error);
        }
      };
  
      fetchClientData();
    }
  }, [clientId]);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'amount' && isNaN(value)) return; // Prevent non-numeric input for amount
    setFormData({ ...formData, [name]: value, });
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    console.log("Form Data Before Submission:", formData); // Debugging
  
    if (!formData.client) {
      console.error("Error: Client ID is missing!");
      setError("Client ID is missing!");
      setLoading(false);
      return;
    }
  
    try {
      const response = await axios.post(
        'http://localhost:5000/client/payment',
        formData,  // Sending the form data
        { withCredentials: true }
      );
      console.log('Payment added successfully:', response.data);
      alert('Payment added successfully!');
      navigate('/clientdata');
    } catch (error) {
      console.error('Error adding payment:', error.response?.data?.message || error.message);
      setError('Failed to add payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
   

  return (
    <div className="flex justify-center items-center min-h-screen bg-[url('/carwash.webp')] bg-cover bg-center bg-no-repeat">
    <div className="bg-white bg-opacity-50 p-6 rounded-lg shadow-md w-1/3 backdrop-blur-lg">
      {/* Title */}
      <h1 className="text-center text-orange-600 text-2xl font-semibold mb-6 mt-5 ">Payment</h1>
  
      {/* Client ID Display */}
      <div className="mb-4 bg-gray-100 p-3 rounded-md shadow">
      <h2 className="text-lg font-semibold text-gray-800">Client ID</h2>
      <p className="text-gray-700">{clientId}</p>
    </div>
  
      {/* Payment Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Client ID (Readonly) */}
         <div>
          <label className="block text-sm font-medium text-gray-700">Client ID</label>
          <input
            type="text"
            name="client"
            value={formData.client || ''}
            readOnly
            className="w-full border border-gray-300 bg-gray-200 rounded-lg p-2 focus:outline-none"
          />
        </div> 
  
        {/* Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount || ''}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>
  
        {/* Payment Method */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Payment Method</label>
          <select
            name="method"
            value={formData.method}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          >
            <option value="">Select Method</option>
            <option value="Cash">Cash</option>
            <option value="Card">Card</option>
            <option value="Online">Online</option>
          </select>
        </div>
  
        {/* Payment Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Payment Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          >
            <option value="">Select Status</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Failed">Failed</option>
          </select>
        </div>
  
        {/* Transaction ID (Optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Transaction ID (Optional)</label>
          <input
            type="text"
            name="transactionId"
            value={formData.transactionId}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
  
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-orange-600 text-white font-semibold py-2 rounded-lg hover:bg-orange-700 transition-all duration-300 ease-in-out shadow-md"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Add Payment'}
        </button>
  
        {/* Error Message */}
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      </form>
    </div>
  </div>
  )}
export default PaymentDetailsPage;
