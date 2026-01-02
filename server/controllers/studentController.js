import Student from "../models/studentModel.js";
import Question from "../models/questionModel.js";
import Exam from "../models/examModel.js";
import Result from "../models/resultModel.js";

export const studentLogin = async (req, res) => {
  try {
    const { name, fatherName, rollNo, class: studentClass } = req.body;

    if (!name || !rollNo || !studentClass) {
      return res.status(400).json({
        message: "Name, Roll No and Class are required",
      });
    }

    let student = await Student.findOne({ rollNo, class: studentClass });

    if (!student) {
      student = await Student.create({
        name,
        fatherName,
        rollNo,
        class: studentClass,
        role: "student",
      });
    }

    res.status(200).json({
      message: "Login successful",
      studentId: student._id,
    });
  } catch (error) {
    res.status(500).json({
      message: "Student login failed",
      error: error.message,
    });
  }
};

/*  GET EXAM QUESTIONS*/
export const getExamQuestions = async (req, res) => {
  try {
    const { examId } = req.params;

    const exam = await Exam.findById(examId);
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    const questions = await Question.find({ examId })
      .select("-correctOption");

    res.status(200).json({
      examName: exam.title,
      duration: exam.duration,
      totalQuestions: questions.length,
      questions,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to load questions",
      error: error.message,
    });
  }
};

/*SUBMIT EXAM */
export const submitExam = async (req, res) => {
  try {
    const { studentId, examId, answers } = req.body;

    if (!studentId || !examId || !answers) {
      return res.status(400).json({ message: "Invalid submission" });
    }

    // prevent re-attempt
    const alreadySubmitted = await Result.findOne({ studentId, examId });
    if (alreadySubmitted) {
      return res.status(403).json({
        message: "Exam already submitted",
      });
    }

    const questions = await Question.find({ examId });

    let score = 0;

    answers.forEach((ans) => {
      const q = questions.find(
        (item) => item._id.toString() === ans.questionId
      );

      if (q && q.correctOption === ans.selectedOption) {
        score += q.marks || 1;
      }
    });

    await Result.create({
      studentId,
      examId,
      answers,
      score,
      class: req.body.class,
      submittedAt: new Date(),
    });

    res.status(201).json({
      message: "Exam submitted successfully",
      redirectTo: "/login",
    });
  } catch (error) {
    res.status(500).json({
      message: "Exam submission failed",
      error: error.message,
    });
  }
};
