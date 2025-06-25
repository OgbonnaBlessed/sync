"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const teacher_controller_1 = require("../controllers/teacher.controller");
const upload_1 = __importDefault(require("../middleware/upload"));
const router = express_1.default.Router();
// Register a new teacher
router.post("/create", upload_1.default.single("image"), teacher_controller_1.registerTeacher);
router.post("/login", teacher_controller_1.loginTeacher);
router.get("/all", teacher_controller_1.getAllTeachers);
router.patch("/toggle-status/:id", teacher_controller_1.toggleTeacherStatus);
router.get("/:id", teacher_controller_1.getTeacherById); // Add this line below your other routes
exports.default = router;
