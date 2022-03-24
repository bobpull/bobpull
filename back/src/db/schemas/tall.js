import { Schema, model } from "mongoose";

const TallSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    tall: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

const TallModel = model("Tall", TallSchema);

export { TallModel };
