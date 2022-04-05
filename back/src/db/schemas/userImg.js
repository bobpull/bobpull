import { Schema, model } from "mongoose";

const userImgSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    filePath: {
        type: String,
        required: false,
    },
    img: {
        data: {type: Buffer},
        contentType: {type: String},
        required: false,
    }
})

const UserImgModel = model("UserImg", userImgSchema);

export { UserImgModel };