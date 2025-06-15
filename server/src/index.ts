import express from "express";
import cors from "cors";
import path from "path";
import connectDB from "./db/mongodb";
import authRoutes from "./routes/auth.route";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json());
app.use("/api/auth", authRoutes);

app.get("/api", (_req, res) => {
  res.send("Backend is working!");
});

// Serve static files
const outDir = path.join(__dirname, "../../client/out");
console.log("Serving static files from:", outDir); // 🕵️‍♀️ Add this
app.use(express.static(outDir));

// Handle SPA routing
app.get("/", (_req, res) => {
  res.sendFile(path.join(outDir, "index.html"));
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
  });
});