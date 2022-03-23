import { Schema, model } from "mongoose";

const ImageSchema = new Schema({
    user_id: {
        type: String,
        required: true,
    },
    file_path: {
        type: String,
        required: false,
    },
    image: {
        data: { type: Buffer },
        content_type: { type: String },
        required: false,
    }
})

const ImageModel = model("UserImg", ImageSchema);

export { ImageModel };