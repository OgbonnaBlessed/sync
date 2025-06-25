import express from "express";
import { addStudentToClass, createClass, getClassByClassName, getTeacherClasses, sendReportToParent } from "../controllers/class.controller";

const router = express.Router();

router.post('/:teacherId/classes', createClass);
router.post('/:teacherId/classes/:className/students', addStudentToClass);
router.post('/:teacherId/classes/:className/students/:studentEmail/report', sendReportToParent);
router.get('/:teacherId/classes/:className', getClassByClassName);
router.get('/:teacherId/classes', getTeacherClasses);

export default router;