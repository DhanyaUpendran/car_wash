import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import adminRoute from "./routers/admin.router.js";
import clientRoute from './routers/client.router.js';
import connectToMongoDB from "./db/connectToMongoDb.js";
import path from "path";
import { fileURLToPath } from "url";
import cors from 'cors';

dotenv.config();
const app = express()


app.use (express.json());
app.use (cookieParser());


app.use(
  cors({
    origin: "http://localhost:5173", // ✅ Allow frontend
    credentials: true, // ✅ Allow cookies
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // ✅ Include "OPTIONS"
    allowedHeaders: ["Content-Type", "Authorization"], 
  })
);


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use((req, res, next) => {
    console.log(`Received Request: ${req.method} ${req.url}`);
    next();
});
app.use("/admin",adminRoute)  
app.use("/client",clientRoute) 

// Serve static frontend files
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, "../FRONTEND/frontend/dist")));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../FRONTEND/frontend/dist", "index.html"));
});





const port = process.env.PORT || 5000;







app.listen(5000,()=>{
    connectToMongoDB();
  
    console.log("MongoDB URI:",process.env.MONGO_DB_URI);
console.log(`server running on port ${port}`)
}); 