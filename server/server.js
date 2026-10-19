import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js"; 
import resumeRouter from "./routes/resumeRoutes.js";
import aiRouter from "./routes/aiRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// Routes
app.get("/", (req, res) => {
  res.send("server is live...");
});

app.use("/api/users", userRouter);
app.use('/api/resumes', resumeRouter)
app.use('/api/ai',aiRouter)

// Start server after DB connect
const startServer = async () => {
  try {
    await connectDB(); // ✅ safe async call
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();
