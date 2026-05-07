import express from "express";
import { getUserById, getUserResumes, login, logout, register } from "../controllers/auth.controller.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/data", protect, getUserById);
router.get("/resumes", protect, getUserResumes);

export default router;
