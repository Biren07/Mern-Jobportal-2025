import generateInterviewQuestions from "../utils/interviewGemini.js";

export const startInterview = async (req, res) => {
  const { role, skills, bio } = req.body;

  try {
    const questions = await generateInterviewQuestions({ role, skills, bio });
    res.json({ questions });
  } catch (error) {
    console.error("Gemini API error details:", {
      message: error.message,
      responseData: error.response?.data,
      stack: error.stack,
    });
    res.status(500).json({ message: "Failed to generate interview questions" });
  }
};
