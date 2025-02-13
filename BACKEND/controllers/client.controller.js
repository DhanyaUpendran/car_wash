import mongoose from "mongoose";
import Client from "../models/client.model.js";
import Payment from "../models/payment.model.js";
import User from "../models/user.model.js"
import bcrypt from "bcrypt";

import generateTokenAndSetCookie from "../utils/generateToken.js";

// User Login Controller
export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT and set cookie
    generateTokenAndSetCookie(user._id, res);

    return res.status(200).json({ message: "Login successful", userId: user._id });
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getClients = async (req, res) => {
  try {
    const { name, phone, place, vehicleNumber } = req.body;

    // 🔴 Ensure req.user is defined (Check if auth middleware is working)
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "Unauthorized: User not authenticated" });
    }

    
    if (!name || !phone || !place || !vehicleNumber) {
      return res.status(400).json({ error: "All fields are required" });
    }

    
    console.log("Received client data:", { name, phone, place, vehicleNumber });

  
    // ✅ Create and save client data
    const newClient = new Client({ name, phone, place, vehicleNumber });
    await newClient.save();

    res.status(201).json({
      clientId: newClient._id,
      name: newClient.name,
      phone: newClient.phone,
      place: newClient.place,
      vehicleNumber: newClient.vehicleNumber,
    });
  } catch (error) {
    console.error("Error saving client data:", error.stack || error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// Add Payment Controller
export const addPayment = async (req, res) => {
  try {
    const { client: clientId, amount, method, status, transactionId } = req.body;

    // 🔴 Ensure executive is authenticated
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "Unauthorized: User not authenticated" });
    }

    // 🔴 Validate clientId
    if (!clientId) {
      return res.status(400).json({ error: "Client ID is required" });
    }
    
    if (!mongoose.Types.ObjectId.isValid(clientId)) {
      return res.status(400).json({ error: "Invalid Client ID format" });
    }

    console.log("Processing payment for clientId:", clientId);

    // ✅ Create new payment entry
    const newPayment = new Payment({
      client: clientId,
      amount,
      method,
      status,
      transactionId,
    });

    await newPayment.save();

    res.status(201).json({
      _id: newPayment._id,
      clientId: newPayment.client,
      amount: newPayment.amount,
      method: newPayment.method,
      status: newPayment.status,
      transactionId: newPayment.transactionId,
    });
  } catch (error) {
    console.error("Error creating payment:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// User Logout Controller
export const userLogout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in logout controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
