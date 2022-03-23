import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { upload, delImg } from "../middlewares/imageMiddleware";

const ImageRouter = Router();

ImageRouter.post(
  "/upload", 
  login_required, 
  upload.single('filename'), 
  delImg, 
  async function (req, res) {
    const profile = req.file.location;
    res.status(201).send(profile);
});

ImageRouter.delete(
  "/delete/:id", 
  delImg, 
  async function (req, res) {
    res.status(204).send("delete_success");
})

export { ImageRouter };
