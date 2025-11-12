import mongoose from "mongoose";

const argumentSchema = new mongoose.Schema({
  lawyer: { type: String, required: true },
  prompt: { type: String, required: true },
  aiResponse: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Argument", argumentSchema);
