import axios from "axios";

async function generateInterviewQuestions({ role, skills = [], bio = "" }) {
  const geminiUrl = process.env.GEMINI_URL;
  const geminiApiKey = process.env.GEMINI_API_KEY;

  if (!geminiUrl || !geminiApiKey) {
    throw new Error("Gemini URL or API Key missing in environment variables");
  }

  const prompt = `
Generate 5 personalized mock interview questions for the role of "${role}".
Candidate skills: ${skills.join(", ")}.
Candidate bio: ${bio}
`;

  const data = {
    contents: [
      {
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ],
  };

  try {
    const response = await axios.post(`${geminiUrl}?key=${geminiApiKey}`, data);
    // Extract the AI-generated interview questions text from response
    return response.data.candidates[0]?.content.parts[0].text;
  } catch (error) {
    console.error("Gemini API error:", error.response?.data || error.message);
    throw new Error("Failed to get interview questions from Gemini");
  }
}

export default generateInterviewQuestions;
