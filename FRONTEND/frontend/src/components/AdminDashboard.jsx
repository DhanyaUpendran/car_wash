
// import React from "react";
// import { useNavigate } from "react-router-dom";




// const Dashboard = () => {
//   const navigate = useNavigate();

  
//   const handleNavigateToAddUser = () => {
//     navigate('/dashboard/adduser');
//   };
//   const userDetails =() =>{
//     navigate('/dashboard/clients')
//   }
//   const paymentDetails =()=>{
//     navigate ('/dashboard/payments')
//   }

//   return (
//     <div className="dashboard py-5 flex flex-col items-center gap-4">
//       <div className="dashboard-heading-container">
//         <h1 className="dashboard-heading">ADMIN</h1>
//       </div>
  
//       <div className="container flex flex-col sm:flex-row justify-center items-center gap-4">
//         {/* Card 1 */}
    
//         <div className="card w-64 h-auto bg-blue-500 text-white rounded-lg shadow-md overflow-hidden">
//           <figure>
//             <img
//               src="./carwash.webp"
//               alt="car!"
//               className="w-full h-40 object-cover"
//             />
//           </figure>
//           <div className="card-body bg-white text-black p-4">
//             <h2 className="card-title">Add Users</h2>
//             <p>Give permission to access the user page</p>
//             <div className="card-actions justify-end">
//              <button className="btn btn-info"
//                 onClick={handleNavigateToAddUser}>GO!!!!!!</button>
//             </div>
//           </div>
//         </div>
  
//         {/* Card 2 */}
//         <div className="card w-64 h-auto bg-blue-500 text-white rounded-lg shadow-md overflow-hidden">
//           <figure>
//             <img
//               src="./carwash.webp"
//               alt="car!"
//               className="w-full h-40 object-cover"
//             />
//           </figure>
//           <div className="card-body bg-white text-black p-4">
//             <h2 className="card-title">User Details</h2>
//             <p>Know your clients</p>
//             <div className="card-actions justify-end">
//               <button className="btn btn-info"
//               onClick={userDetails}>Go!!!!!</button>
//             </div>
//           </div>
//         </div>
  
//         {/* Card 3 */}
//         <div className="card w-64 h-auto bg-blue-500 text-white rounded-lg shadow-md overflow-hidden">
//           <figure>
//             <img
//               src="./carwash.webp"
//               alt="car!"
//               className="w-full h-40 object-cover"
//             />
//           </figure>
//           <div className="card-body bg-white text-black p-4">
//             <h2 className="card-title">Payment Details</h2>
//             <p>Pay for the work</p>
//             <div className="card-actions justify-end">
//               <button className="btn btn-info"
//               onClick={paymentDetails}>
//                 Go!!!!!</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
  
  
// };

// export default Dashboard;

import React from "react";
import { useState } from "react";
 import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const handleNavigateToAddUser = () => navigate("/dashboard/adduser");
  const userDetails = () => navigate("/dashboard/clients");
  const paymentDetails = () => navigate("/dashboard/payments");
  const cards = [
    {
      title: "Add Users",
      description: "Give permission to access the user page",
      image: "./carwash.webp",
      onClick: handleNavigateToAddUser,
    },
    {
      title: "User Details",
      description: "Know your clients",
      image: "./carwash.webp",
      onClick: userDetails,
    },
    {
      title: "Payment Details",
      description: "Pay for the work",
      image: "./carwash.webp",
      onClick: paymentDetails,
    },
   
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 1; // Show 2 cards per page

  const totalPages = Math.ceil(cards.length / cardsPerPage);

  // Get current cards based on pagination
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);

  return (
    <div className="dashboard py-5 flex flex-col items-center gap-4 bg-gradient-to-r from-orange-500 to-gray-600 min-h-screen">
      <div className="dashboard-heading-container mt-5 p-4">
        <h1 className="dashboard-heading ">ADMIN PAGE</h1>
      </div>

      <div className="container flex flex-col sm:flex-row justify-center items-center gap-4">
        {currentCards.map((card, index) => (
          <div key={index} className="card w-64 h-auto bg-blue-500 text-white rounded-lg shadow-md overflow-hidden">
            <figure>
              <img src={card.image} alt="car!" className="w-full h-40 object-cover" />
            </figure>
            <div className="card-body bg-white text-black p-4">
              <h2 className="card-title">{card.title}</h2>
              <p>{card.description}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-info" onClick={card.onClick}>Go!!!!!</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="join mt-4">
        <button 
          className="join-item btn" 
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          «
        </button>
        <button className="join-item btn">
          Page {currentPage} of {totalPages}
        </button>
        <button 
          className="join-item btn" 
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          »
        </button>
      </div>
    </div>
    
  );
};

export default Dashboard;
