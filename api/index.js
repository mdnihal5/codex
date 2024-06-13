import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import blogRoutes from "./routes/blog.route.js";
import resumeRoutes from "./routes/resume.route.js";
import chatRoutes from "./routes/chat.route.js";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from 'url';

dotenv.config();

mongoose.connect(process.env.MONGO)
  .then(() => {
    console.log("⛁ MongoDb is connected ✅");
  })
  .catch((err) => {
    console.error(err);
  });

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/",(req,res)=>{
  res.send("Server is working!")
})


app.use("/api/auth", authRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/chats",chatRoutes);


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  console.error(message);
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT} 🥳`);
});
