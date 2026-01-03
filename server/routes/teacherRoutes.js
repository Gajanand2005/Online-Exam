import express from "express";
import { protectTeacher } from "../middleware/teacherAuthMiddleware.js";
import { createExam, getClassResults, exportResults, loginTeacher, registerTeacher, getResultsByExam } from "../controllers/teacherController.js";

const router = express.Router();

router.post("/register", registerTeacher);
router.post("/login", loginTeacher );
router.post("/exam/create", protectTeacher, createExam);
router.get("/results/:className", protectTeacher, getClassResults);
router.get("/results/export", protectTeacher, exportResults);
// results by exam id
router.get("/results/exam/:examId", protectTeacher, getResultsByExam);

export default router;
