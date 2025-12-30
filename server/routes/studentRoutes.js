import express from "express";
import { registerUser,
    loginUser, 
    startExam, 
     getExamQuestions,
  submitExam,
  getResult,
} from "../controllers/studentController.js";

const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/start-exam", startExam);
router.get("/exam/:examId/questions",  getExamQuestions);
router.post("/submit-exam",  submitExam);
router.get("/result/:examId",  getResult);
export default router;