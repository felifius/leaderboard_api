import express from "express";
import { addScore, getLeaderboardByGame, index, addGame } from "../controllers/leaderboardController.js";

const router = express.Router();

router.post("/add-score", addScore);
router.get("/", index);
router.get("/leaderboard", getLeaderboardByGame);
router.get("/add-game", addGame);

export default router;