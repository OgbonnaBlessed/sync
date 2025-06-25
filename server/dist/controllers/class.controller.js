"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClassByClassName = exports.getTeacherClasses = exports.sendReportToParent = exports.addStudentToClass = exports.createClass = void 0;
const teacher_model_1 = __importDefault(require("../models/teacher.model"));
const mailer_1 = require("../utils/mailer");
const createClass = async (req, res) => {
    try {
        const { teacherId } = req.params;
        const { className } = req.body;
        const teacher = await teacher_model_1.default.findOne({ teacherId });
        if (!teacher) {
            res.status(404).json({ message: 'Teacher not found.' });
            return;
        }
        if (!className) {
            res.status(404).json({ message: "Kindly enter a class name" });
            return;
        }
        // Avoid duplicate class names
        const classExists = teacher.classes.some((cls) => cls.className === className);
        if (classExists) {
            res.status(400).json({ message: 'Class already exists.' });
            return;
        }
        teacher.classes.push({ className, students: [] });
        await teacher.save();
        res.status(201).json({ message: 'Class created successfully.', classes: teacher.classes });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.createClass = createClass;
const addStudentToClass = async (req, res) => {
    try {
        const { teacherId, className } = req.params;
        const { name, parentEmail } = req.body;
        if (!name || !parentEmail) {
            res.status(400).json({ message: 'Kindly provide student name and parent email' });
            return;
        }
        const teacher = await teacher_model_1.default.findOne({ teacherId });
        if (!teacher) {
            res.status(404).json({ message: 'Teacher not found.' });
            return;
        }
        const targetClass = teacher.classes.find((cls) => cls.className === className);
        if (!targetClass) {
            res.status(404).json({ message: 'Class not found.' });
            return;
        }
        targetClass.students.push({ name, parentEmail, status: 'active' });
        await teacher.save();
        res.status(201).json({ message: 'Student added successfully.', class: targetClass });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.addStudentToClass = addStudentToClass;
const sendReportToParent = async (req, res) => {
    try {
        const { teacherId, className, studentEmail } = req.params;
        const { report } = req.body;
        const teacher = await teacher_model_1.default.findOne({ teacherId });
        if (!teacher) {
            res.status(404).json({ message: 'Teacher not found' });
            return;
        }
        const foundClass = teacher.classes.find((cls) => cls.className === className);
        if (!foundClass) {
            res.status(404).json({ message: 'Class not found' });
            return;
        }
        const student = foundClass.students.find((std) => std.parentEmail === studentEmail);
        if (!student) {
            res.status(404).json({ message: 'Student not found' });
            return;
        }
        // ✅ Send the actual email using Nodemailer
        await (0, mailer_1.sendEmail)(student.parentEmail, `Report for ${student.name}`, report);
        // ✅ Update database with report info
        foundClass.lastReportText = report;
        foundClass.lastReportDate = new Date();
        student.lastReportSent = report;
        student.reportDate = new Date();
        await teacher.save();
        res.status(200).json({ message: 'Report sent successfully via email' });
    }
    catch (error) {
        console.error('Email error:', error);
        res.status(500).json({ message: 'Failed to send report', error });
    }
};
exports.sendReportToParent = sendReportToParent;
const getTeacherClasses = async (req, res) => {
    try {
        const { teacherId } = req.params;
        const teacher = await teacher_model_1.default.findOne({ teacherId });
        if (!teacher) {
            res.status(404).json({ message: 'Teacher not found.' });
            return;
        }
        const classes = teacher.classes || [];
        res.status(200).json({
            message: 'Classes fetched successfully',
            count: classes.length,
            classes,
        });
    }
    catch (error) {
        console.error('Failed to fetch classes:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.getTeacherClasses = getTeacherClasses;
const getClassByClassName = async (req, res) => {
    try {
        const { teacherId, className } = req.params;
        const teacher = await teacher_model_1.default.findOne({ teacherId });
        if (!teacher) {
            res.status(404).json({ message: 'Teacher not found' });
            return;
        }
        const foundClass = teacher.classes.find((cls) => cls.className === className);
        if (!foundClass) {
            res.status(404).json({ message: 'Class not found' });
            return;
        }
        res.status(200).json({
            message: 'Fetched class successfully',
            class: foundClass
        });
    }
    catch (error) {
        console.error('Failed to fetch class details:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.getClassByClassName = getClassByClassName;
