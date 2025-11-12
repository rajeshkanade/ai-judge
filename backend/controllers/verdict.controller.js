
import axios from "axios"
export const verdict = async(req , res) =>{
      try {
    const { lawyer1, lawyer2 } = req.body;

    const prompt = `
You are an impartial AI Judge. Analyze both lawyers' post-decisions and deliver a fair verdict.

Lawyer 1 Arguments:
${lawyer1}

Lawyer 2 Arguments:
${lawyer2}

Now provide a clear and concise final verdict explaining which argument is stronger and why.
    `;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }
    );

    const aiVerdict = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No verdict received.";
    res.json({ verdict: aiVerdict });
  } catch (error) {
    console.error("Judge verdict error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to get verdict" });
  }
};