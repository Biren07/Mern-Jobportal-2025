import chatGemini from "../utils/chatGemini.js";
import generateInterviewQuestions from "../utils/interviewGemini.js";

export const startInterview = async (req, res) => {
  const { role, skills, bio } = req.body;

  try {
    // Generate questions (assume this returns an array of strings)
    const questionsArray = await generateInterviewQuestions({ role, skills, bio });

    // Convert the questions array to a single text string
    const questionsText = questionsArray.map((q, i) => `${i + 1}. ${q}`).join("\n");

    // Send as plain text
    res.json({ questions: questionsText });
  } catch (error) {
    console.error("Gemini API error details:", {
      message: error.message,
      responseData: error.response?.data,
      stack: error.stack,
    });
    res.status(500).json({ message: "Failed to generate interview questions" });
  }
};

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
