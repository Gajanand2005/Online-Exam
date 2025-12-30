import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    examId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
      required: true,
    },

    questionText: {
      type: String,
      required: true,
    },

    imageUrl: {
      type: String, // optional (for image-based questions)
    },

    options: {
      type: [String], // ["A", "B", "C", "D"]
      required: true,
      validate: {
        validator: (v) => v.length >= 2,
        message: "At least 2 options required",
      },
    },

    correctOption: {
      type: String, // "A" / "B" / "C" / "D"
      required: true,
    },

    marks: {
      type: Number,
      default: 1,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Question", questionSchema);
