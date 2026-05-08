import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { createResume, deleteResume, getPublicResumeById, getResumeById, updateResume } from "../controllers/resume.controller.js";
import upload from "../config/multer.js";

const router = express.Router();

router.post("/create", protect, createResume);
router.put("/update", upload.single("image"), protect, updateResume);
router.delete("/delete/:resumeId", protect, deleteResume);
router.get("/get/:resumeId", protect, getResumeById);
router.get("/public/:resumeId", getPublicResumeById);

export default router;
