import { UserImgModel } from  "../schemas/userImg";

class UserImg{
    static async create(imgDocument){
        const createdUserImg = await UserImgModel.create(imgDocument);
        return createdUserImg;
    }

    static async findById({ userId }){
        const foundUserImg = await UserImgModel.findOne({ userId });
        return foundUserImg;
    }

    static async update({ userId, setImgDocument }){
        const option = { returnOriginal: false };
        
        const UserImg = await UserImgModel.findOneAndUpdate({ userId }, setImgDocument, option );
        return UserImg;
    }

}

export { UserImg };