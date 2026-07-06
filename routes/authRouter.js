import express from "express";
import { loginUser, user, sucess, fail } from "../controllers/authController.js";

const router = express.Router();

router.get("/login", loginUser);
router.get("/user", user);
router.get("/sucess", sucess);
router.get("/fail", fail);

export default router;