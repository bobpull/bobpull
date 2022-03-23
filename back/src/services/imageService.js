import { UserImage } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import path from "path";

class ImageService {
  
  static async setUserImage({ userId, Image, filePath }){
    const foundUserImage = await UserImage.findById({ userId });
    
    if(foundUserImage?.userId !== userId ){
      const errorMessage =
       "다른 유저의 이미지를 바꿀 수 없습니다.";
      return { errorMessage };
    }

    const setImageDocument = {
      userId,
      filePath,
      Image,
    }
    
    const updatedUserImage = await UserImage.update({ userId, setImageDocument });
    const updatedFilePath = updatedUserImage.filePath;
    
    if(!updatedFilePath){
      const errorMessage =
        "해당 유저의 프로필 이미지가 존재하지 않습니다.";
      return { errorMessage };
    }
    
    const fileName = path.basename(updatedFilePath);
    const successResult = {
      userId,
      fileName,
      message: "success",
    }

    return successResult;
  }

  static async getUserImage({ currentUserId }){
    const foundUserImage = await UserImage.findById({ userId: currentUserId });
    
    if(!foundUserImage){
      const errorMessage = 
       "유저를 찾을 수 없습니다.";
      return { errorMessage };
    }

    const { Image } = foundUserImage;
    
    return Image.data;
  }
}

export { userAuthService };
