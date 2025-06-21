import { Request, Response } from 'express';
import Teacher from '../models/teacher.model';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

const generateToken = (id: string) =>
  jwt.sign({ id }, process.env.JWT_SECRET as string, { expiresIn: '7d' });

export const registerTeacher = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, DOB, discipline, certification, password, teacherId, image } = req.body;

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

        const imageUrl = req.file?.path;
        
        const teacher = await Teacher.create({
            name,
            DOB,
            discipline,
            certification,
            password,
            teacherId,
            image: imageUrl
        });

        const token = generateToken(teacher._id);

        res.status(201).json({
            message: 'Teacher created successfully.',
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