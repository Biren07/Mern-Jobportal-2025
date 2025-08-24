import chatGemini from "../utils/chatGemini.js";

export const chatWithAI = async (req, res) => {
  const { userMessage } = req.body;

  if (!userMessage) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const prompt = `You are a helpful assistant. Answer this: ${userMessage}`;
    const aiResponse = await chatGemini(prompt);

    res.json({ reply: aiResponse });
  } catch (error) {
    res.status(500).json({ error: "AI service error" });
  }
};
