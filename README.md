# car_wash🚗 Car Wash Service - MERN Stack Web App

Welcome to the Car Wash Service web application! This is a full-stack MERN project designed to streamline car wash bookings and payments for users and executives.

📌 Features
✅ Executive Login & Admin Login
✅ User & Car Details Management
✅ Dashboard with Client & Payment Details
✅ Secure Authentication with jwt

📂 Project Structure
csharp
Copy
Edit
car_wash/
│-- backend/              # Node.js, Express.js Server  
│-- frontend/             # React Frontend (Vite + Tailwind CSS)  
│-- models/               # Mongoose Models  
│-- routes/               # API Routes  
│-- controllers/          # Business Logic  
│-- views/                # EJS Templates (If Used)  
│-- public/               # Static Assets  
│-- .gitignore            # Ignored Files  
│-- README.md             # Project Documentation  
🚀 Tech Stack
Frontend: React, Vite, Tailwind CSS
Backend: Node.js, Express.js
Database: MongoDB (Mongoose ODM)
Authentication: JWT based Login

💻 Installation & Setup
1️⃣ Clone the Repository
sh
Copy
Edit
git clone https://github.com/DhanyaUpendran/car_wash.git
cd car_wash
2️⃣ Install Dependencies
Backend



cd backend
npm install
Frontend


cd frontend
npm install
3️⃣ Start the Application
Backend Server


npm run dev
Frontend Server


npm run dev
Now, open http://localhost:5173 in your browser!

🔧 Environment Variables (.env)
Create a .env file in the backend folder with:

PORT = 5000;
NODE_ENV =development

MONGO_DB_URI=your uri
JWT_SECRET=your secrete
ADMIN_EMAIL = yourmail
ADMIN_PASSWORD= your password
📸 Screenshots
car wash site photos:[car_wash/images/Screenshot (1).png]


📞 Contact & Support
For queries, feel free to reach out!

📧 Email: dhanyaupendran@gmail.com
🔗 GitHub: DhanyaUpendran
