import express from "express";
import {

  createExam,
  getClassResults,
  exportResults,
  loginTeacher,
  registerTeacher,
} from "../controllers/teacherController.js";
import { protectTeacher } from "../middleware/teacherAuthMiddleware.js";

const router = express.Router();

router.post("/register", registerTeacher);
router.post("/login",loginTeacher );
router.post("/exam/create",protectTeacher,createExam);
router.get("/results/:className", getClassResults);
router.get("/results/export", exportResults);

export default router;
