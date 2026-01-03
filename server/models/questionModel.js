// Deprecated: Questions are now stored inline inside the Exam document.
// This file remains for backward-compatibility but should not be used.

import mongoose from "mongoose";

const deprecatedQuestionSchema = new mongoose.Schema(
  {
    deprecated: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Question", deprecatedQuestionSchema);
