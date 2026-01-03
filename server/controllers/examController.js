import Exam from "../models/examModel.js";

export const createExam = async (req, res) => {
  try {
    // Explicit mapping from request body
    const {
      examName,
      class: className,
      subject,
      examDate,
      duration,
      totalMarks,
      questions,
      isActive,
    } = req.body;

    // Basic validation
    if (!examName || !className || !examDate || !duration || !totalMarks) {
      return res.status(400).json({ success: false, message: "Missing required exam fields" });
    }

    // Validate questions array exists and is not empty
    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ success: false, message: "Questions array is required and cannot be empty" });
    }

    // Validate each question shape minimally
    for (const q of questions) {
      if (!q.questionText || !Array.isArray(q.options) || typeof q.correctAnswer === "undefined") {
        return res.status(400).json({ success: false, message: "Each question must have questionText, options and correctAnswer" });
      }
    }

    // Create exam with inline questions and inject createdBy from teacher middleware
    const exam = await Exam.create({
      examName,
      class: className,
      subject,
      examDate,
      duration,
      totalMarks,
      questions,
      isActive: typeof isActive === "boolean" ? isActive : true,
      createdBy: req.teacher._id,
    });

    res.status(201).json({ success: true, message: "Exam created successfully", exam });
  } catch (error) {
    res.status(500).json({ success: false, message: "Exam creation failed", error: error.message });
  }
};
