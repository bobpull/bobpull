import { Schema, model } from "mongoose";

const FriendSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    friend_id: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const FriendModel = model("Friend", FriendSchema);

export { FriendModel };