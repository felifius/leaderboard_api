import express from "express";
import { login, googleCallback, checkAuth, success, logout, fail } from "../controllers/authController.js";


const router = express.Router();

router.get("/auth/check", checkAuth);
router.get("/google", login);
router.get("/google/callback", googleCallback);
router.get("/success", success);
router.get("/logout", logout);
router.get("/fail", fail);

export default router;