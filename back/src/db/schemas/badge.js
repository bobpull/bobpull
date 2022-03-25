import { Schema, model } from "mongoose";

const BadgeSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: false,
      default: 3,
    },
    url: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const BadgeModel = model("Badge", BadgeSchema);

export { BadgeModel };