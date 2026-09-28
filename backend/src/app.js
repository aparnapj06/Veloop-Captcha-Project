import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import captchaRoutes from "./routes/captchaRoutes.js";
import walletRoutes from "./routes/walletRoutes.js";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(
  cors({
origin: [
      "http://localhost:5173",
      "http://192.168.29.186:5173",
    ],  })
);
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://192.168.29.186:5173",
      "https://veloop-captcha-project.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 204,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "VELoop CAPTCHA Backend is running.",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/captcha", captchaRoutes);
app.use("/api/wallet", walletRoutes);

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected successfully.");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

startServer();