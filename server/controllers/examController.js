import Exam from "../models/examModel.js";
import Question from "../models/questionModel.js";

export const createExam = async (req, res) => {
  try {
    const {
      examName,
      class: className,
      subject,
      examDate,
      duration,
      totalMarks,
      questions,
    } = req.body;

    // 🔐 validation
    if (
      !examName ||
      !className ||
      !examDate ||
      !duration ||
      !totalMarks
    ) {
      return res.status(400).json({
        success: false,
        message: "All exam fields are required",
      });
    }

    // 1️⃣ Create exam
    const exam = await Exam.create({
      examName,
      class: className,
      subject,
      examDate,
      duration,
      totalMarks,
      createdBy: req.teacher.id,
    });

    // 2️⃣ Create questions (if any)
    if (Array.isArray(questions) && questions.length > 0) {
      const createdQuestions = await Question.insertMany(
        questions.map((q) => ({
          examId: exam._id,
          questionText: q.questionText,
          imageUrl: q.imageUrl || null,
          options: q.options,
          correctOption: q.correctOption,
          marks: q.marks || 1,
          createdBy: req.teacher.id,
        }))
      );

      exam.questions = createdQuestions.map((q) => q._id);
      await exam.save();
    }

    res.status(201).json({
      success: true,
      message: "Exam created successfully",
      exam,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Exam creation failed",
      error: error.message,
    });
  }
};
