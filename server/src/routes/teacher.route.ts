import express from "express";
import { getAllTeachers, loginTeacher, registerTeacher, toggleTeacherStatus } from "../controllers/teacher.controller";
import upload from "../middleware/upload";

const router = express.Router();

// Register a new teacher
router.post("/create", upload.single("image"), registerTeacher);
router.post("/login", loginTeacher);
router.get("/all", getAllTeachers);
router.patch("/toggle-status/:id", toggleTeacherStatus);

export default router;