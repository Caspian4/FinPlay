import express from "express";

const router = express.Router();
import {
    createJar,
    getAllJars,
    contributeToJar,
    deleteJar,
} from "../controllers/jarController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";


router.post("/", protect, createJar);
router.get("/", protect, getAllJars);
router.patch("/:id/contribute", protect, contributeToJar);
router.delete("/:id", protect, deleteJar);
export default router;
