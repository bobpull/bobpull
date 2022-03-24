import { Schema, model } from "mongoose";

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
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: false,
      default: "새로운 뱃지",
    },
    have: {
      type: Boolean,
      required: true,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

const BadgeModel = model("Badge", BadgeSchema);

export { BadgeModel };
