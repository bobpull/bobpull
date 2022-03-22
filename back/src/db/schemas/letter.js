import { Schema, model } from "mongoose";

const LetterSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    penpal_id: {
      type: String,
      required: true,
    },
    letters: {
        type: String,
        required: true,
      },
  },
  {
    timestamps: true,
  }
);

const LetterModel = model("Letter", LetterSchema);

export { LetterModel };