import express from "express";
import { createCard, getUserCards, updateCard } from "../controllers/cardController.js";
import { protect } from "../middleware/authMiddleware.js"; // your auth middleware

const router = express.Router();

router.route("/")
  .post(protect, createCard)   // create a new card
  .get(protect, getUserCards); // get all cards for logged-in user
router.patch("/:id", protect, updateCard);
export default router;
