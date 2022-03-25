import { Schema, model } from "mongoose";
import { stringify } from "uuid";

const BadgeSchema = new Schema(
  
  {
    id: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: false,
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
    description: {
      type: String,
      required: true,
      default: "새로운 뱃지",
    },
    have: {
      type: Boolean,
      required: true,
      default: true,
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