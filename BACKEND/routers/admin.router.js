import express from "express";

import { addUser,dashboard,adminLogin,getAllUsers,getClients,getPayments,exportClientsToExcel} from "../controllers/admin.controller.js";
// import protectRoute from "../middleware/authmiddlware.js";
const router = express.Router();


router.post("/adminlogin",adminLogin)
router.get('/dashboard',  dashboard)
router.post ('/dashboard/adduser' , addUser)
router.get('/admin/dashboard/users', getAllUsers);
router.get ('/dashboard/clients', getClients)
router.get ('/dashboard/payments', getPayments)
router.get("/export/clients", exportClientsToExcel);

 

export default router;

