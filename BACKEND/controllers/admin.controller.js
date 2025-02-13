import bcrypt from 'bcrypt';
import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';
import dotenv from "dotenv";
import User from '../models/user.model.js';
import Client from '../models/client.model.js';
import Payment from '../models/payment.model.js';







export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Define Admin Credentials (Load from env for security)
    const adminCredentials = {
      email: process.env.ADMIN_EMAIL || "admin@123",
      password: process.env.ADMIN_PASSWORD || "admin@admin",
    };

    // Ensure adminCredentials exist
    if (!adminCredentials.email || !adminCredentials.password) {
      return res.status(500).json({ error: "Admin credentials are not configured" });
    }

    // Compare credentials
    if (email === adminCredentials.email && password === adminCredentials.password) {
      
      
      return res.status(200).json({ message: "Login successful" });
    } else {
      return res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    console.error("❌ Error in adminLogin controller:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};






export const dashboard = (req, res) => {
  res.status(200).json({ message: "Admin Dashboard Access Granted" });
};




export const addUser = async (req, res) => {
  try {
    const { email, password, role } = req.body; // Accept role from admin input

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
     role: role || "user", // Default role is "user", but admin can set it
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error adding user:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'email'); 
    res.status(200).json({ users });
  } catch (error) {
    console.error('Error fetching users:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const getClients = async (req, res) => {
  try {
    // Fetch all clients
    const clients = await Client.find().select('name email phone place vehicleNumber role');
    
    res.status(200).json({ clients });
  } catch (error) {
    console.error('Error fetching clients:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
export const getPayments = async (req, res) => {
  try {
    // Fetch all payments with user details populated
    const payments = await Payment.find()
  .populate('client', 'name email', null, { strictPopulate: false })
  .select('amount method status date transactionId createdAt')
  .sort({ createdAt: -1 });


    res.status(200).json({ payments });
  } catch (error) {
    console.error('Error fetching payments:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}; 




export const exportClientsToExcel = async (req, res) => {
  try {
    // Fetch client data from the database
    const clients = await Client.find().select("name email phone place vehicleNumber role");

    // Convert data to Excel format
    const worksheet = XLSX.utils.json_to_sheet(
      clients.map(client => ({
        Name: client.name,
        Email: client.email,
        Phone: client.phone,
        Place: client.place,
        "Vehicle Number": client.vehicleNumber,
        Role: client.role
      }))
    );

    // Create a new workbook and add the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Clients");

    // Ensure `exports` directory exists
    const exportDir = path.join(__dirname, "../exports");
    if (!fs.existsSync(exportDir)) {
      fs.mkdirSync(exportDir, { recursive: true });
    }

    // Define file path
    const filePath = path.join(exportDir, "clients.xlsx");

    // Write the Excel file
    XLSX.writeFile(workbook, filePath);

    // Send the file as a response
    res.download(filePath, "clients.xlsx", (err) => {
      if (err) {
        console.error("Error sending file:", err);
        return res.status(500).json({ error: "Failed to download file" });
      }

      // Delete file after sending
      setTimeout(() => fs.unlinkSync(filePath), 5000); // Wait 5 sec before deleting
    });

  } catch (error) {
    console.error("Error exporting clients:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
//excel payment
export const exportPaymentsToExcel = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate('client', 'name email', null, { strictPopulate: false })
      .select('amount method status date transactionId createdAt')
      .sort({ createdAt: -1 });

    const worksheet = XLSX.utils.json_to_sheet(payments.map(payment => ({
      'Client Name': payment.client?.name || 'N/A',
      'Client Email': payment.client?.email || 'N/A',
      Amount: payment.amount,
      Method: payment.method,
      Status: payment.status,
      Date: new Date(payment.date).toLocaleString(),
      'Transaction ID': payment.transactionId,
      'Created At': new Date(payment.createdAt).toLocaleString()
    })));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Payments");

    const filePath = path.join(__dirname, '../exports/payments.xlsx');
    XLSX.writeFile(workbook, filePath);

    res.download(filePath, 'payments.xlsx', (err) => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(500).json({ error: 'Failed to download file' });
      }
      fs.unlinkSync(filePath); // Delete file after sending
    });

  } catch (error) {
    console.error('Error exporting payments:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

  