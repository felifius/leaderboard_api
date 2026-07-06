import mongoose from "mongoose";
import express from "express";
import {connectDB} from "./config/db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRouter.js";
import leaderboardRouter from "./routes/leaderboardRouter.js";

dotenv.config({ path: "./config/.env" });

const app = express();
const PORT = 5173;

connectDB();

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", leaderboardRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
