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
      default: "설명이 아직 없습니다. 추가해 주세요.",
    },
    have: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

const BadgeModel = model("Badge", BadgeSchema);

export { BadgeModel };
