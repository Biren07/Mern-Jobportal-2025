import express from "express";
import { startInterview } from "../controllers/interview.controller.js";

const router = express.Router();

router.post("/start", startInterview); // No auth

export default router;
