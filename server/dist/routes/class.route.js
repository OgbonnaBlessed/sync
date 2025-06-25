"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const class_controller_1 = require("../controllers/class.controller");
const router = express_1.default.Router();
router.post('/:teacherId/classes', class_controller_1.createClass);
router.post('/:teacherId/classes/:className/students', class_controller_1.addStudentToClass);
router.post('/:teacherId/classes/:className/students/:studentEmail/report', class_controller_1.sendReportToParent);
router.get('/:teacherId/classes/:className', class_controller_1.getClassByClassName);
router.get('/:teacherId/classes', class_controller_1.getTeacherClasses);
exports.default = router;
