import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    fatherName: {
      type: String,
    },

    rollNo: {
      type: String,
      required: true,
      unique: true,
    },

    class: {
      type: String,
      required: true,
    },

    section: {
      type: String,
    },
role: {
      type: String,
      default: "student",
    },
    attemptedExams: [
      {
        examId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Exam",
        },
        attemptedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);
