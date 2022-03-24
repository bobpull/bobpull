import { Schema, model } from "mongoose";

const ImageSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  filePath: {
    type: String,
    required: false,
  },
  image: {
    data: { type: Buffer },
    contentType: { type: String },
    required: false,
  }
});

const ImageModel = model("Image", ImageSchema);

export { ImageModel };