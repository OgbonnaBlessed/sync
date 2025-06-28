import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/auth.model";
import dotenv from "dotenv";

dotenv.config();

export const protect = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "Not authorized" });
        return;
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };

        const user = await User.findById(decoded.id);

        if (!user) {
            res.status(401).json({ message: "User not found" });
            return;
        }

        (req as any).user = { id: user._id };
        next();
    } catch (err) {
        res.status(401).json({ message: "Token invalid", error: err });
        return;
    }
};