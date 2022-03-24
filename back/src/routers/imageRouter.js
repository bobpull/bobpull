import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { upload, nameField } from "../middlewares/multerMiddleware";
import { ImageService } from "../services/imageService";

const ImageRouter = Router();

ImageRouter.post(
  '/profile', 
  login_required, 
  upload.single(nameField), 
  async function (req, res, next) {
    try{
      const filePath = req.file.file_path;
      const imageBuffer = fs.readFileSync(filePath); 
      const contentType = req.file.mimetype;
      const image = { 
        data: imageBuffer,
        contentType,
      }
      const user_id = req.currentUserId;
      
      const updatedImage = await ImageService.setUserImage({ user_id, image, filePath });
  
      if(updatedImage.errorMessage){
        throw new Error(updatedImage.errorMessage);
      }
      
      res.status(200).send(updatedImage);
    } catch(error) {
      next(error);
    }
});
  
ImageRouter.get(
  "/profile", 
  login_required, 
  async function (req, res, next){
    try{
      const currentUserId = req.currentUserId;
      const userImage = await ImageService.getUserImage({ currentUserId });

      if(userImage.errorMessage){
        throw new Error(userImage.errorMessage);
      }
    
      res.status(200).send(userImage);
    } catch(error) {
      next(error);
    }
  }
);

export { ImageRouter };