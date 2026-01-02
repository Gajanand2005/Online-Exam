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
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);
