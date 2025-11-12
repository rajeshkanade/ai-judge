import axios from "axios"
export const generateFromGemini = async (prompt) => {
  try {
    const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
    const resp = await axios.post(
      url,
      { contents: [{ parts: [{ text: prompt }] }] },
      {
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": process.env.GEMINI_API_KEY,
        },
        timeout: 120000,
      }
    );
    return resp.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No AI response.";
  } catch (err) {
    console.error("Gemini error:", err.response?.data || err.message);
    // return informative text instead of throwing so we still save to DB
    return `AI generation failed: ${err.response?.data?.error?.message || err.message}`;
  }
};