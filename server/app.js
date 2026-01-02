import express from 'express';
import cors from "cors";
import dotenv from "dotenv";
import studentRoutes from "./routes/studentRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import examRoutes from "./routes/examRoutes.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const app = express()

app.use(cors());
app.use(express.json()); // ⭐ MOST IMPORTANT
app.use(express.urlencoded({ extended: true }));


app.use("/api/student", studentRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/exam", examRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Online Exam Backend Running 🚀",
  });
});



const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
