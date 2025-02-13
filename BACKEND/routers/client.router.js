import express from "express";
import {addPayment,getClients,userLogin,userLogout}from "../controllers/client.controller.js";
import protectRoute from "../middleware/authmiddlware.js";
const router = express.Router();


router.post('/clientdata',protectRoute,getClients)
router.post("/payment",protectRoute,addPayment)
router.post ("/userlogin",userLogin )
router.post("/logout",userLogout)

export default router; 