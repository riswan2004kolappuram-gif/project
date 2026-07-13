import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config.js";

import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin:['https://project-hy61.vercel.app','http://localhost:5173'],  
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders:["Content-Type","Authorization"]
}));
app.use(express.json());
 
app.get("/", (req, res) => {
  res.send("Backend is running successfully");
});
 
app.use("/api", authRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});