"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongodb_1 = __importDefault(require("./db/mongodb"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const teacher_route_1 = __importDefault(require("./routes/teacher.route"));
const class_route_1 = __importDefault(require("./routes/class.route"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)({
    origin: '*',
    credentials: true
}));
app.use(express_1.default.json());
app.use("/api/auth", auth_route_1.default);
app.use("/api/teacher", teacher_route_1.default);
app.use("/api/class", class_route_1.default);
app.get("/", (_req, res) => {
    res.send("Backend is working!");
});
(0, mongodb_1.default)().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
});
