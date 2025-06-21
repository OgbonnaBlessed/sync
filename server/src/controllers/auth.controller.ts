import { Request, Response } from "express";
import User from "../models/auth.model";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const generateToken = (userId: string) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
});

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, schoolName, schoolLocation, password } = req.body;
        if (!name || !email || !schoolName || !schoolLocation || !password) {
            res.status(400).json({ message: "Please, fill all fields" });
            return;
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "User already exists." });
            return;
        }

        if (password.length < 6) {
            res.status(400).json({ message: "Password should not be less than 6 characters" });
        }

        const newUser = await User.create({ name, email, schoolName, schoolLocation, password });
        const token = generateToken(newUser._id);

        res.status(201).json({
            message: "User registered successfully.",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                schoolName: newUser.schoolName,
                schoolLocation: newUser.schoolLocation,
                userRole: "principal"
            },
            token,
        });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong.", error });
    }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            res.status(404).json({ message: "Invalid email or password." });
            return;
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            res.status(401).json({ message: "Invalid email or password." });
            return;
        }

        const token = generateToken(user._id);

        res.status(200).json({
            message: "Login successful.",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                schoolName: user.schoolName,
                schoolLocation: user.schoolLocation,
                userRole: user.userRole,
            },
            token,
        });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong.", error });
    }
};