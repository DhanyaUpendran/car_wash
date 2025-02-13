import jwt from "jsonwebtoken";

import User from "../models/user.model.js";


const protectRoute = async (req, res, next) => {
    try {
        // Check if JWT secret is set in .env
        if (!process.env.JWT_SECRET) {
            throw new Error("Missing JWT_SECRET in environment variables");
        }

        // Get token from cookies
        const token = req.cookies?.jwt;
        if (!token) {
            return res.status(401).json({ error: "Unauthorized - No token provided" });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find user by ID (excluding password)
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(404).json({ error: "user not found" });
        }

        req.user = user; // Attach client data to request
        next();
    } catch (error) {
        console.error("Error in protectRoute middleware:", error.message);
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ error: "Unauthorized - Invalid token" });
        }
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ error: "Unauthorized - Token expired" });
        }

        res.status(500).json({ error: "Internal Server Error" });
    }
};

export default protectRoute;
