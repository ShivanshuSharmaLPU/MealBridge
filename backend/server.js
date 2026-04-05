// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

// Load environment variables
dotenv.config();

// App config
const app = express();
const PORT = process.env.PORT || 4000;

// ✅ CORS: allow requests only from your frontend
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*", // fallback to * if FRONTEND_URL not set
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Middleware to parse JSON
app.use(express.json());

// Serve static images
app.use("/images", express.static("uploads"));

// Connect to MongoDB
connectDB();

// API Endpoints
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Test route
app.get("/", (req, res) => {
  res.send("API Working");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server Started on http://localhost:${PORT}`);
});