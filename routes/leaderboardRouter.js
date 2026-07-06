import express from "express";
import { addScore } from "../controllers/leaderboardController.js";

const router = express.Router();

router.post("/add-score", addScore);

export default router;