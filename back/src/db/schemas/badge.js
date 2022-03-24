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
    badge: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    have: {
      type: Boolean,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const BadgeModel = model("Badge", BadgeSchema);

export { BadgeModel };
