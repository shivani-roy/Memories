import express from "express";
import { register, login, logout, googleAuth } from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", register);
router.post("/login", login);
router.get("/logout", logout);
router.post("/google/auth", googleAuth);

export default router;
