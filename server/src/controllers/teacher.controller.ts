import { Request, Response } from 'express';
import Teacher from '../models/teacher.model';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import User from '../models/auth.model';

dotenv.config();

const generateToken = (id: string) =>
  jwt.sign({ id }, process.env.JWT_SECRET as string, { expiresIn: '7d' });

export const registerTeacher = async (req: Request, res: Response): Promise<void> => {
    const file = (req as any).file;
    
    try {
        const { name, DOB, discipline, certification, password, teacherId, gender } = req.body;
        const principalId = (req as any).user?.id;

        if (!principalId) {
            res.status(401).json({ message: "Unauthorized, principal id missing" });
            return;
        }

        if (!name || !DOB || !discipline || !certification || !password) {
            res.status(400).json({ message: 'All fields are required.' });
            return;
        }

        if (password.length < 6) {
            res.status(400).json({ message: "Password should not be less than 6 characters" });
            return;
        }

        const existing = await Teacher.findOne({ teacherId });
        if (existing) {
            res.status(400).json({ message: 'Teacher ID already exists. Try again.' });
            return;
        }

        const imageUrl = file?.path;

        const teacher = await Teacher.create({
            name,
            DOB,
            discipline,
            certification,
            password,
            teacherId,
            gender,
            image: imageUrl
        });

        await User.findByIdAndUpdate(principalId, {
            $push: { teachers: teacher._id }
        })

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
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
        console.log(error);
    }
};

export const loginTeacher = async (req: Request, res: Response): Promise<void> => {
    try {
        const { teacherId, password } = req.body;

        if (!teacherId || !password) {
            res.status(400).json({ message: 'Please provide both Teacher ID and password.' });
            return;
        }

        const teacher = await Teacher.findOne({ teacherId });

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

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error.', error });
    }
};

export const getAllTeachers = async (req: Request, res: Response) => {
    try {
        const teachers = await Teacher.find();
        res.status(200).json({ count: teachers.length, teachers, message: "Fetched all teachers successfully" });
        
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch teachers", error });
    }
};

export const getMyTeachers = async (req: Request, res: Response): Promise<void> => {
    try {
        const principalId = (req as any).user?.id;
        const principal = await User.findById(principalId).populate('teachers');

        if (!principal) {
            res.status(404).json({ message: 'Principal not found.' });
            return;
        }

        res.status(200).json({
            count: principal.teachers.length,
            teachers: principal.teachers,
            message: "Fetched your teachers successfully"
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to get teachers', error });
    }
};

export const toggleTeacherStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const teacher = await Teacher.findById(id);

        if (!teacher) {
            res.status(404).json({ message: "Teacher not found" });
            return;
        }

        teacher.status = teacher.status === 'active' ? 'inactive' : 'active';
        await teacher.save();

        res.status(200).json({ message: `Teacher is now ${teacher.status}`, teacher });
    } catch (error) {
        res.status(500).json({ message: "Failed to update status", error });
    }
};

export const getTeacherById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const teacher = await Teacher.findById(id);

        if (!teacher) {
            res.status(404).json({ message: "Teacher not found." });
            return;
        }

        res.status(200).json({ teacher, message: "Teacher fetched successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};