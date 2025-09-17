import express from "express";
import {  registerUser,loginUser, getMe, getAdmin } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import { getAllUsers } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.get("/admin", protect, authorizeRoles("admin"), getAdmin);
router.get("/users", protect, getAllUsers);
export default router;
