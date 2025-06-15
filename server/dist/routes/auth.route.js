"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const router = express_1.default.Router();
// @route   POST /api/auth/signup
// @desc    Register a new user
router.post("/signup", auth_controller_1.registerUser);
// @route   POST /api/auth/login
// @desc    Login an existing user
router.post("/login", auth_controller_1.loginUser);
exports.default = router;
