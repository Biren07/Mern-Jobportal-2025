import express from "express";
import { chatWithAI } from "../controllers/aiController.js";
import { startInterview } from "../controllers/aiController.js";

const aiRoute = express.Router();

aiRoute.post("/chat", chatWithAI);
aiRoute.post("/start", startInterview);

export default aiRoute;
