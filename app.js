import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "./config/passport.js";
import authRouter from "./routes/authRouter.js";
import leaderboardRouter from "./routes/leaderboardRouter.js";
import {createClient} from "redis";
import path from "path";
import ejs from "ejs";

const __dirname = path.resolve();

dotenv.config({ path: "./config/.env" });

export const app = express();
const PORT = 5173;

export const client = createClient();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET || 'seu-segredo',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 7 * 24 * 60 * 60 * 1000 }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use("/", authRouter);
app.use("/", leaderboardRouter);


const startServer = async () => {
  try {
    await client.connect();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
};
startServer();
