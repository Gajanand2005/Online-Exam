import express from "express";
import {
  studentLogin,
  getExamQuestions,
  submitExam,
} from "../controllers/studentController.js";

const router = express.Router();


router.post("/login", studentLogin);

router.get("/exam/:examId/questions", getExamQuestions);

router.post("/submit-exam", submitExam);

export default router;
