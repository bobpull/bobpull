import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { TallService } from "../services/tallService";

const TallRouter = Router();

TallRouter.post(
  "/tall/create",
  login_required,
  async function (req, res, next) {
  try {
    const user_id = req.currentUserId;
  
    // 위 데이터를 프로젝트 db에 추가하기
    const newTall = await TallService.addTall({
      user_id,
    });
  
    if (newTall.errorMessage) {
      throw new Error(newTall.errorMessage);
    }
  
      res.status(201).json(newTall);
    } catch (error) {
      next(error);
    }
  } 
);

TallRouter.get(
  "/talls/:user_id",
  login_required,
  async function (req, res, next) {
    try {
      const user_id = req.params.user_id;
      const currentUserTall = await TallService.getTallInfo({ user_id });
  
      if (currentUserTall.errorMessage) {
        throw new Error(currentUserTall.errorMessage);
      }
  
      res.status(200).send(currentUserTall);
    } catch (error) {
      next(error);
    }
  }
);

TallRouter.put(
  "/talls/:case",
  login_required,
  async function (req, res, next) {
    try {
      // URI, body data 로부터 업데이트할 프로젝트 정보를 추출함.
      const user_id = req.currentUserId;
      let condition = req.params.case;
  
      const toUpdate = { toUpdate };
  
      // 해당 프로젝트 아이디로 프로젝트 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
      const updatedTall = await TallService.setTall({ user_id, toUpdate });
  
      if (updatedTall.errorMessage) {
        throw new Error(updatedTall.errorMessage);
      }
  
      res.status(200).json(updatedTall);
    } catch (error) {
      next(error);
    }
  }
);

TallRouter.delete(
  "/talls/:id",
  login_required,
  async function (req, res, next) {
    try {
      const id = req.params.id;
      const deletedTall = await TallService.deleteUserTall({ id });
  
      if (deletedTall.errorMessage) {
        throw new Error(deletedTall.errorMessage);
      }
  
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
);

export { TallRouter };