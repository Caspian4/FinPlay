import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import jarRoutes from "./routes/jars.routes.js";
import splitRoutes from "./routes/splits.routes.js";
import transactionRoutes from "./routes/transactions.js";
import cardRoutes from "./routes/cardRoutes.js";

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());

// Robust CORS setup
// Set this to the URL where your frontend is hosted
app.use(cors({
  origin: "*", // allow all origins
  methods: ["GET","POST","PATCH","DELETE"],
  credentials: true
}));


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/jars", jarRoutes);
app.use("/api/splits", splitRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/cards", cardRoutes);

// Root endpoint
app.get("/", (req, res) => res.send("API is running..."));

// Start server
// Use the PORT from environment variable or default to 5000 (for local dev)
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
