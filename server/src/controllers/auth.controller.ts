import { Request, Response } from "express";
import User from "../models/auth.model.ts";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Generate JWT token
const generateToken = (userId: string) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET as string, {
        expiresIn: "7d",
    });
};

// === Signup Controller ===
export const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, email, schoolName, schoolLocation, password } = req.body;

        // Check for existing user
        const existingUser = await User.findOne({ email });
        if (existingUser)
        return res.status(400).json({ message: "User already exists." });

        // Create and save user
        const newUser = await User.create({
            name,
            email,
            schoolName,
            schoolLocation,
            password,
        });

        // Generate token
        const token = generateToken(newUser._id);

        // Return user info (without password)
        res.status(201).json({
            message: "User registered successfully.",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                schoolName: newUser.schoolName,
                schoolLocation: newUser.schoolLocation,
            },
            token,
        });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong.", error });
    }
};

// === Login Controller ===
export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user)
        return res.status(404).json({ message: "Invalid email or password." });

        // Compare password
        const isMatch = await user.comparePassword(password);
        if (!isMatch)
        return res.status(401).json({ message: "Invalid email or password." });

        // Generate token
        const token = generateToken(user._id);

        // Return user info (without password)
        res.status(200).json({
            message: "Login successful.",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                schoolName: user.schoolName,
                schoolLocation: user.schoolLocation,
            },
            token,
        });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong.", error });
    }
};