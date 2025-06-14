import express from "express";
import cors from "cors";
import connectDB from "./db/mongodb";
import authRoutes from "./routes/auth.route";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use("/api/auth", authRoutes);

app.get("/", (_req, res) => {
  res.send("Backend is working!");
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});