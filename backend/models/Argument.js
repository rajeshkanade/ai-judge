import mongoose from "mongoose";

const argumentSchema = new mongoose.Schema({
  lawyer: { type: String, required: true },     // lawyer1 or lawyer2
  prompt: { type: String, required: true },     // the argument or uploaded text
  aiResponse: { type: String, required: true }, // AI's post-decision
  createdAt: { type: Date, default: Date.now }  // timestamp
});

export default mongoose.model("Argument", argumentSchema);
