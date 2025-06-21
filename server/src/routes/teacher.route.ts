import express from "express";
import { loginTeacher, registerTeacher } from "../controllers/teacher.controller";
import upload from "../middleware/upload";

const router = express.Router();

// Register a new teacher
router.post("/create", upload.single("image"), registerTeacher);
router.post("/login", loginTeacher);

export default router;