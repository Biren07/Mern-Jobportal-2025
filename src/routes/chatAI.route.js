import express from "express";
import { chatWithAI } from "../controllers/chatAI.controller.js";

const chatAi = express.Router();

chatAi.post("/chat", chatWithAI);

export default chatAi;
