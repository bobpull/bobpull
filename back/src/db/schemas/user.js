import { Schema, model } from "mongoose"; 

const UserSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
      default: "설명이 아직 없습니다. 추가해 주세요.",
    },
    profile_img:{
      type: String,
      required: false,
      default : "default_img/default_profile.jpg"
    },
    profilePath:{
      type: String,
      required: false,
      default: "http://localhost:5000/profileImg/default_profile.jpg"
    },
    loginedAt: {
      type: String,
      required: false,
      default: ""
    },
    point: {
      type: Number,
      required: true,
      default: 5,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = model("User", UserSchema);

export { UserModel };
