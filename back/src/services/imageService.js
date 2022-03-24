import { Image } from "../db";
import path from "path";

class ImageService {
  static async setImage({ user_id, image, filePath }) {
    const userImage = await Image.findById({ user_id });

    if(!userImage){
      await Image.create({ user_id });
    }

    const setImage = {
      user_id,
      filePath,
      image,
    }
            
    const updatedImage = await Image.update({ user_id, setImage });
    const newPath = updatedImage.filePath;
            
    if(!newPath){
      const errorMessage =
        "프로필 이미지가 존재하지 않습니다.";
      return { errorMessage };
    }
            
    const newImage = path.basename(newPath);
    const profile = {
      user_id,
      newImage,
      message: "success",
    }

      return profile;
  }

  static async getImage({ user_id }){
    const userImage = await Image.findById({ user_id });
        
    if(!userImage){
      const errorMessage = 
        "유저가 존재하지 않습니다.";
      return { errorMessage };
    }

      const { image } = userImage;
        
      return image.data;
  }
}

export { ImageService };