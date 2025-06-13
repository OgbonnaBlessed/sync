import express from "express";
import { registerUser, loginUser } from "../controllers/auth.controller";

const router = express.Router();

// @route   POST /api/auth/signup
// @desc    Register a new user
router.post("/signup", registerUser);

// @route   POST /api/auth/login
// @desc    Login an existing user
router.post("/login", loginUser)

export default router;