import { Request, Response } from 'express';
import Teacher from '../models/teacher.model';
import { sendEmail } from '../utils/mailer';

export const createClass = async (req: Request, res: Response): Promise<void> => {
    try {
        const { teacherId } = req.params;
        const { className } = req.body;

        const teacher = await Teacher.findOne({ teacherId });
        if (!teacher) {
            res.status(404).json({ message: 'Teacher not found.' });
            return;
        }

        if (!className) {
            res.status(404).json({ message: "Kindly enter a class name" });
            return;
        }

        // Avoid duplicate class names
        const classExists = teacher.classes.some((cls: { className: any; }) => cls.className === className);
        if (classExists) {
            res.status(400).json({ message: 'Class already exists.' });
            return;
        }

        teacher.classes.push({ className, students: [] });
        await teacher.save();

        res.status(201).json({ message: 'Class created successfully.', classes: teacher.classes });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const addStudentToClass = async (req: Request, res: Response): Promise<void> => {
    try {
        const { teacherId, className } = req.params;
        const { name, parentEmail } = req.body;

        if (!name || !parentEmail) {
            res.status(400).json({ message: 'Kindly provide student name and parent email' });
            return;
        }

        const teacher = await Teacher.findOne({ teacherId });
        if (!teacher) {
            res.status(404).json({ message: 'Teacher not found.' });
            return;
        }

        const targetClass = teacher.classes.find((cls: { className: string; }) => cls.className === className);
        if (!targetClass) {
            res.status(404).json({ message: 'Class not found.' });
            return;
        }

        targetClass.students.push({ name, parentEmail, status: 'active' });
        await teacher.save();

        res.status(201).json({ message: 'Student added successfully.', class: targetClass });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const sendReportToParent = async (req: Request, res: Response): Promise<void> => {
    try {
        const { teacherId, className, studentEmail } = req.params;
        const { report } = req.body;

        const teacher = await Teacher.findOne({ teacherId });
        if (!teacher) {
            res.status(404).json({ message: 'Teacher not found' });
            return;
        }

        const foundClass = teacher.classes.find((cls: { className: string; }) => cls.className === className);
        if (!foundClass) {
            res.status(404).json({ message: 'Class not found' });
            return;
        }

        const student = foundClass.students.find((std: { parentEmail: string; }) => std.parentEmail === studentEmail);
        if (!student) {
            res.status(404).json({ message: 'Student not found' });
            return;
        }

        // ✅ Send the actual email using Nodemailer
        await sendEmail(student.parentEmail, `Report for ${student.name}`, report);

        // ✅ Update database with report info
        foundClass.lastReportText = report;
        foundClass.lastReportDate = new Date();
        student.lastReportSent = report;
        student.reportDate = new Date();

        await teacher.save();

        res.status(200).json({ message: 'Report sent successfully via email' });
    } catch (error) {
        console.error('Email error:', error);
        res.status(500).json({ message: 'Failed to send report', error });
    }
};

export const getTeacherClasses = async (req: Request, res: Response): Promise<void> => {
    try {
        const { teacherId } = req.params;

        const teacher = await Teacher.findOne({ teacherId });

        if (!teacher) {
            res.status(404).json({ message: 'Teacher not found.' });
            return;
        }

        const classes = teacher.classes || [];
        res.status(200).json({
            message: 'Classes fetched successfully.',
            count: classes.length,
            classes,
        });
    } catch (error) {
        console.error('Failed to fetch classes:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

export const getClassByClassName = async (req: Request, res: Response) => {
    try {
        const { teacherId, className } = req.params;

        const teacher = await Teacher.findOne({ teacherId });
        if (!teacher) {
            res.status(404).json({ message: 'Teacher not found' });
            return;
        }

        const foundClass = teacher.classes.find((cls: { className: string; }) => cls.className === className);
        if (!foundClass) {
            res.status(404).json({ message: 'Class not found' });
            return;
        }

        res.status(200).json({
            message: 'Fetched class successfully',
            class: foundClass
        });
        
    } catch (error) {
        console.error('Failed to fetch class details:', error);
        res.status(500).json({ message: 'Server error', error });
    }
}