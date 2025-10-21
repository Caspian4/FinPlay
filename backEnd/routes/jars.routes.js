import express from "express";
import { createJar, getAllJars, contributeToJar, deleteJar } from "../controllers/jarController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createJar);
router.get("/", protect, getAllJars);
router.patch("/:id/contribute", protect, contributeToJar);
router.delete("/:id", protect, deleteJar);

export default router;
