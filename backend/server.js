// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config()
import mongoose from "mongoose";
import AIRoutes from "./Routes/AIRoutes.js";

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("MongoDB connection error:", error));

const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta1/models/gemini-1.5-flash-latest:generateContent";

app.get("/", (req, res) => res.send("AI Judge Backend Running 🚀"));

app.use("/api", AIRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
