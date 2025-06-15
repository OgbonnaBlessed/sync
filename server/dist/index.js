"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const mongodb_1 = __importDefault(require("./db/mongodb"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const __dirname = path_1.default.resolve(); // only works if "module": "CommonJS"
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)({
    origin: '*',
    credentials: true
}));
app.use(express_1.default.json());
app.use("/api/auth", auth_route_1.default);
app.get("/api", (_req, res) => {
    res.send("Backend is working!");
});
// Serve static files
const outDir = path_1.default.resolve(__dirname, "../client/out");
app.use(express_1.default.static(outDir));
// Handle SPA routing
app.get("*", (_req, res) => {
    res.sendFile(path_1.default.join(outDir, "index.html"));
});
(0, mongodb_1.default)().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
});
