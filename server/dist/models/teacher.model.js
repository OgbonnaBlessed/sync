"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const StudentSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    parentEmail: { type: String, required: true },
    status: { type: String, default: 'active' },
    lastReportText: { type: String },
    reportDate: { type: Date },
});
const ClassSchema = new mongoose_1.Schema({
    className: { type: String, required: true },
    students: [StudentSchema],
    lastReportText: { type: String },
    lastReportDate: { type: Date }
});
const TeacherSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    DOB: { type: String, required: true },
    discipline: { type: String, required: true },
    certification: { type: String, required: true },
    password: { type: String, required: true },
    teacherId: { type: String, required: true, unique: true },
    userRole: { type: String, default: 'teacher' },
    gender: { type: String, required: true },
    status: { type: String, default: 'active' },
    image: { type: String, required: true },
    classes: [ClassSchema],
    lastLogin: { type: Date }
}, { timestamps: true });
exports.default = mongoose_1.default.models.Teacher || mongoose_1.default.model('Teacher', TeacherSchema);
