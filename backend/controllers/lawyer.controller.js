import fs from "fs";
import axios from "axios";
import Argument from "../models/Argument.js";

export const handleLawyerRequest = async (req, res, lawyerName) => {
  try {
    let textPrompt = req.body.prompt || "";

    if (req.file) {
      const fileContent = fs.readFileSync(req.file.path, "utf8");
      textPrompt += "\n\n" + fileContent;
      fs.unlinkSync(req.file.path);
    }

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `You are an AI legal analyst. Evaluate ${lawyerName}'s argument and provide a professional post-decision summary.\n\n${textPrompt}`,
              },
            ],
          },
        ],
      }
    );

    const aiText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI";

    const saved = await Argument.create({
      lawyer: lawyerName,
      prompt: textPrompt,
      aiResponse: aiText,
    });

    res.json({ success: true, response: aiText });
  } catch (error) {
    console.error("AI request failed:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to process request" });
  }
};
