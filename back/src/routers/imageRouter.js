import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { upload, nameField } from "../middlewares/multerMiddleware";
import { ImageService } from "../services/imageService";
import fs from "fs";

const ImageRouter = Router();

ImageRouter.post(
  '/profile/create', 
  login_required,
  upload.single(nameField), 
  async function (req, res, next) {
    try {
      const user_id = req.currentUserId;
      const filePath = req.file.path; 
      const imageBuffer = fs.readFileSync(filePath);
      const contentType = req.file.mimetype;
      const img = { 
        data: imageBuffer,
        contentType,
      }
      
      const updatedImage = await ImageService.setImage({ user_id, img, filePath });

      if(updatedImage.errorMessage) {
        throw new Error(updatedImage.errorMessage);
      }
      
      res.status(200).send(updatedImage);
    } catch(error) {
      next(error);
    }
  }
);

ImageRouter.get(
  '/profile', 
  login_required, 
  async function (req, res, next) {
    try{
      const user_id = req.currentUserId;
      
      const image = await ImageService.getImage({ user_id });

      if(image.errorMessage){
        throw new Error(image.errorMessage);
      }
      
      res.status(200).send(image);
    } catch(error) {
      next(error);
    }
  }
);

ImageRouter.get(
  "/profiles/:id", 
  login_required, 
  async function (req, res, next) {
    try{
      const user_id = req.params.id;

      const image = await ImageService.getImage({ user_id });

      if(image.errorMessage){
        throw new Error(userImg.errorMessage);
      }
    
      res.status(200).send(image);
    } catch(error) {
      next(error);
    }
  }
);

export { ImageRouter };