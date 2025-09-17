import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import jarRoutes from "./routes/jar.routes.js";
import splitRoutes from "./routes/splits.routes.js";
import transactionRoutes from "./routes/transactions.routes.js";
import cardRoutes from "./routes/cardRoutes.js";
dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());

// Robust CORS setup
app.use(cors());



// Routes
app.use("/api/auth", authRoutes);
app.use("/api/jars", jarRoutes);
app.use("/api/splits", splitRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/cards", cardRoutes);
// Root endpoint
app.get("/", (req, res) => res.send("API is running..."));


// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
