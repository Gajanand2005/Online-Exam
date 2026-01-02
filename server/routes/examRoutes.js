import express from "express";
import { createExam } from "../controllers/examController.js";
import { protectTeacher } from "../middleware/teacherAuthMiddleware.js";

const router = express.Router();

router.post("/create", protectTeacher, createExam);

export default router;
