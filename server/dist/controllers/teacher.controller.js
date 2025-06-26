"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTeacherById = exports.toggleTeacherStatus = exports.getAllTeachers = exports.loginTeacher = exports.registerTeacher = void 0;
const teacher_model_1 = __importDefault(require("../models/teacher.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const generateToken = (id) => jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
const registerTeacher = async (req, res) => {
    const file = req.file;
    try {
        const { name, DOB, discipline, certification, password, teacherId, gender } = req.body;
        if (!name || !DOB || !discipline || !certification || !password) {
            res.status(400).json({ message: 'All fields are required.' });
            return;
        }
        if (password.length < 6) {
            res.status(400).json({ message: "Password should not be less than 6 characters" });
            return;
        }
        const existing = await teacher_model_1.default.findOne({ teacherId });
        if (existing) {
            res.status(400).json({ message: 'Teacher ID already exists. Try again.' });
            return;
        }
        const imageUrl = file?.path;
        const teacher = await teacher_model_1.default.create({
            name,
            DOB,
            discipline,
            certification,
            password,
            teacherId,
            gender,
            image: imageUrl
        });
        const token = generateToken(teacher._id);
        res.status(201).json({
            message: 'Teacher created successfully',
            teacher: {
                id: teacher._id,
                name: teacher.name,
                teacherId: teacher.teacherId,
                userRole: 'teacher',
            },
            token
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
        console.log(error);
    }
};
exports.registerTeacher = registerTeacher;
const loginTeacher = async (req, res) => {
    try {
        const { teacherId, password } = req.body;
        if (!teacherId || !password) {
            res.status(400).json({ message: 'Please provide both Teacher ID and password.' });
            return;
        }
        const teacher = await teacher_model_1.default.findOne({ teacherId });
        if (!teacher) {
            res.status(404).json({ message: 'Invalid credentials.' });
            return;
        }
        const token = generateToken(teacher._id);
        teacher.lastLogin = new Date();
        await teacher.save();
        res.status(200).json({
            message: 'Login successful.',
            teacher: {
                id: teacher._id,
                name: teacher.name,
                teacherId: teacher.teacherId,
                userRole: 'teacher',
                lastLogin: teacher.lastLogin,
            },
            token
        });
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error.', error });
    }
};
exports.loginTeacher = loginTeacher;
const getAllTeachers = async (req, res) => {
    try {
        const teachers = await teacher_model_1.default.find();
        res.status(200).json({ count: teachers.length, teachers, message: "Fetched all teachers successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch teachers", error });
    }
};
exports.getAllTeachers = getAllTeachers;
const toggleTeacherStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const teacher = await teacher_model_1.default.findById(id);
        if (!teacher) {
            res.status(404).json({ message: "Teacher not found" });
            return;
        }
        teacher.status = teacher.status === 'active' ? 'inactive' : 'active';
        await teacher.save();
        res.status(200).json({ message: `Teacher is now ${teacher.status}`, teacher });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to update status", error });
    }
};
exports.toggleTeacherStatus = toggleTeacherStatus;
const getTeacherById = async (req, res) => {
    try {
        const { id } = req.params;
        const teacher = await teacher_model_1.default.findById(id);
        if (!teacher) {
            res.status(404).json({ message: "Teacher not found." });
            return;
        }
        res.status(200).json({ teacher, message: "Teacher fetched successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
exports.getTeacherById = getTeacherById;
