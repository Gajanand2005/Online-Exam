import mongoose from "mongoose";

const questionSubSchema = new mongoose.Schema(
  {
    questionText: { type: String, required: true },
    options: {
      type: [String],
      required: true,
      validate: {
        validator: (v) => Array.isArray(v) && v.length >= 2,
        message: "At least two options are required",
      },
    },
    correctAnswer: { type: Number, required: true }, // index-based (0,1,2..)
    marks: { type: Number, default: 1 },
    image: { type: String },
  },
  { _id: false }
);

const examSchema = new mongoose.Schema(
  {
    examName: { type: String, required: true },
    class: { type: String, required: true },
    subject: { type: String },
    examDate: { type: Date, required: true },
    duration: { type: Number, required: true },
    totalMarks: { type: Number, required: true },

    // Inline questions
    questions: {
      type: [questionSubSchema],
      default: [],
    },

    isActive: { type: Boolean, default: true },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Exam", examSchema);
