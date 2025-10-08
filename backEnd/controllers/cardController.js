import Card from "../models/Cards.js";

// @desc    Create a new card
// @route   POST /api/cards
// @access  Private
export const createCard = async (req, res) => {
  try {
    const userId = req.user._id; // auth middleware sets req.user
    const { kind, title, category, subtitle, value, icon, rarity, level, tier } = req.body;

    if (!kind) {
      return res.status(400).json({ message: "Card 'kind' is required" });
    }

    const newCard = await Card.create({
      userId,
      kind,              // <-- Add this
      title,
      category,
      subtitle,
      value,
      icon,
      rarity: rarity || "common",
      level: level || 1,
      tier: tier || "bronze",
    });

    res.status(201).json(newCard);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error creating card" });
  }
};

// @desc    Get all cards for a user
// @route   GET /api/cards
// @access  Private
export const getUserCards = async (req, res) => {
  try {
    const userId = req.user._id;

    const cards = await Card.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(cards);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching cards" });
  }
};
// controllers/cardController.js

// @desc    Update a card by ID
// @route   PATCH /api/cards/:id
// @access  Private
export const updateCard = async (req, res) => {
  try {
    const userId = req.user._id;
    const cardId = req.params.id;

    // Find the card and ensure it belongs to the user
    const card = await Card.findOne({ _id: cardId, userId });
    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }

    // Update allowed fields
    const allowedFields = ["title", "subtitle", "value", "icon", "rarity", "tier", "progress"];
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) card[field] = req.body[field];
    });

    await card.save();
    res.status(200).json(card);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error updating card" });
  }
};

