"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const auth_model_1 = __importDefault(require("../models/auth.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const generateToken = (userId) => jsonwebtoken_1.default.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
});
const registerUser = async (req, res) => {
    try {
        const { name, email, schoolName, schoolLocation, password } = req.body;
        const existingUser = await auth_model_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "User already exists." });
            return;
        }
        if (password.length < 6) {
            res.status(400).json({ message: "Password should not be less than 6 characters" });
        }
        const newUser = await auth_model_1.default.create({ name, email, schoolName, schoolLocation, password });
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
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong.", error });
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await auth_model_1.default.findOne({ email });
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
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong.", error });
    }
};
exports.loginUser = loginUser;
