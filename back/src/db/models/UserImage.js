import { UserModel } from "../schemas/user";
import { UserImageModel } from  "../schemas/userImage";

class UserImage{
    static async create(imageDocument){
        const createdUserImage = await UserImageModel.create(imageDocument);
        return createdUserImage;
    }

    static async findById({ userId }){
        const foundUserImage = await UserImageModel.findOne({ userId });
        return foundUserImage;
    }

    static async update({ userId, setImageDocument }){
        const option = { returnOriginal: false };
        
        const UserImage = await UserImageModel.findOneAndUpdate({ userId }, setImageDocument, option );
        return UserImage;
    }

}

export { UserImage };
