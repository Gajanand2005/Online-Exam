import Student from "../models/studentModel.js"; // adjust path
import Question from "../models/questionModel.js"
import Exam from "../models/examModel.js"
import Result from "../models/resultModel.js";
import jwt from "jsonwebtoken";


const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

//Register 
export const registerUser = async (req, res) => {
  try {
    const {
      name,
      fatherName,
      class: studentClass,
      section,
      rollNo,
    } = req.body;

    // 1️⃣ validation
    if (!name || !rollNo || !studentClass) {
      return res.status(400).json({
        message: "Name, Roll No and Class are required",
      });
    }

    // 2️⃣ check existing student (by rollNo)
    let user = await Student.findOne({ rollNo });

    if (!user) {
      user = await Student.create({
        name,
        fatherName,
        class: studentClass,
        section,
        rollNo,
      });
    }

    // 3️⃣ success response
    res.status(201).json({
      message: "Student registered successfully",
      studentId: user._id,
      token: generateToken(user._id), // optional
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { name, rollNo } = req.body;

    // 1️⃣ validation
    if (!name || !rollNo) {
      return res.status(400).json({
        message: "Name and Roll No are required",
      });
    }

    // 2️⃣ find student (name + rollNo both)
    const user = await Student.findOne({
      rollNo,
      name: { $regex: `^${name}$`, $options: "i" }, // case-insensitive
    });

    if (!user) {
      return res.status(404).json({
        message: "Invalid Name or Roll No",
      });
    }

    // 3️⃣ success
    res.status(200).json({
      message: "Login successful",
      studentId: user._id,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
};

export const startExam = async (req, res) => {
  try {
    const { examId } = req.body;
    const studentId = req.user.id;

    if (!examId) {
      return res.status(400).json({ message: "Exam ID required" });
    }

    const exam = await Exam.findById(examId);
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    const student = await User.findById(studentId);

    const alreadyAttempted = student.attemptedExams.some(
      (e) => e.examId.toString() === examId
    );

    if (alreadyAttempted) {
      return res.status(403).json({
        message: "You already attempted this exam",
      });
    }

    res.status(200).json({
      message: "Exam started",
      examId: exam._id,
      duration: exam.duration,
    });
  } catch (error) {
    res.status(500).json({ message: "Start exam failed", error: error.message });
  }
};

export const getExamQuestions = async (req, res) => {
  try {
    const { examId } = req.params;

    const questions = await Question.find({ examId })
      .select("-correctOption -createdBy");

    if (!questions.length) {
      return res.status(404).json({ message: "No questions found" });
    }

    res.status(200).json({
      totalQuestions: questions.length,
      questions,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch questions",
      error: error.message,
    });
  }
};

export const submitExam = async (req, res) => {
  try {
    const { examId, answers } = req.body;
    const studentId = req.user.id;

    if (!examId || !answers || !answers.length) {
      return res.status(400).json({ message: "Invalid submission" });
    }

    // Prevent re-submit
    const existingResult = await Result.findOne({ studentId, examId });
    if (existingResult) {
      return res.status(403).json({
        message: "Exam already submitted",
      });
    }

    const questions = await Question.find({ examId });

    let score = 0;

    answers.forEach((ans) => {
      const question = questions.find(
        (q) => q._id.toString() === ans.questionId
      );

      if (
        question &&
        question.correctOption === ans.selectedOption
      ) {
        score += question.marks;
      }
    });

    const result = await Result.create({
      studentId,
      examId,
      answers,
      score,
      submittedAt: new Date(),
    });

    await User.findByIdAndUpdate(studentId, {
      $push: {
        attemptedExams: {
          examId,
          attemptedAt: new Date(),
        },
      },
    });

    res.status(201).json({
      message: "Exam submitted successfully",
      score,
      resultId: result._id,
    });
  } catch (error) {
    res.status(500).json({
      message: "Exam submission failed",
      error: error.message,
    });
  }
};

export const getResult = async (req, res) => {
  try {
    const { examId } = req.params;
    const studentId = req.user.id;

    const result = await Result.findOne({ studentId, examId });

    if (!result) {
      return res.status(404).json({
        message: "Result not found",
      });
    }

    const exam = await Exam.findById(examId);

    res.status(200).json({
      examName: exam.examName,
      score: result.score,
      totalMarks: exam.totalMarks,
      submittedAt: result.submittedAt,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch result",
      error: error.message,
    });
  }
};