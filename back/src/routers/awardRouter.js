import is from "@sindresorhus/is";
import { Router } from "express";
import {login_required} from "../middlewares/login_required";
import { userAwardService } from "../services/awardService";

const userAwardRouter = Router();

userAwardRouter.post(
  "/award/create",
  login_required,
  async function (req, res, next) {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error(
          "headers의 Content-Type을 application/json으로 설정해주세요"
        );
      }

      const user_id = req.currentUserId;
      const currentUserInfo = await userAwardService.getUserInfo({ user_id });

      if (currentUserInfo.errorMessage) {
        throw new Error(currentUserInfo.errorMessage);
      }

      // req (request)에서 데이터 가져오기
      const title = req.body.title;
      const description = req.body.description;

      // 위 데이터를 유저 db에 추가하기
      const newAward = await userAwardService.addAward({
        user_id,
        title,
        description,
      });

      if (newAward.errorMessage) {
        throw new Error(newAward.errorMessage);
      }

      res.status(201).json(newAward);
    } catch (err) {
      next(err);
    }  
  }
);

userAwardRouter.get(
  "/awards/:id",
  login_required,
  async function(req, res, next) {
    try {
      const id = req.params.id;
      const currentAwardInfo = await userAwardService.getAwardInfo({ id })

      if (currentAwardInfo.errorMessage) {
        throw new Error(currentAwardInfo.errorMessage);
      }

      res.status(200).send(currentAwardInfo);
    } catch (err) {
      next(err);
    }
  }
);

userAwardRouter.put(
  "/awards/:id",
  login_required,
  async function (req, res, next) {
    try {
      const user_id = req.currentUserId;
      const id = req.params.id;
      const title = req.body.title ?? null;
      const description = req.body.description ?? null;

      const toUpdate = { title, description };

      //해당 award_id로 수상이력 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
      const updatedAward = await userAwardService.setAward({ user_id, id, toUpdate });

      if (updatedAward.errorMessage) {
        throw new Error(updatedAward.errorMessage);
      }
      res.status(200).json(updatedAward);
    } catch (err) {
      next(err);   
    }
  }
);

userAwardRouter.get(
  "/awardlist/:user_id",
  login_required,
  async function (req, res, next) {
    try {
      const user_id = req.params.user_id;
      const currentAwardlistInfo = await userAwardService.getAwardlistInfo({ user_id });

      if (currentAwardlistInfo.errorMessage) {
        throw new Error(currentAwardlistInfo.errorMessage);
      }

      res.status(200).send(currentAwardlistInfo);
    } catch (err) {
      next(err);
    }
  }
);

userAwardRouter.delete(
  "/awards/:id",
  login_required,
  async function (req, res, next) {
    try {
      const id = req.params.id;
      const deletedAward = await userAwardService.deleteUserAward({ id });
  
      if (deletedAward.errorMessage) {
        throw new Error(deletedAward.errorMessage);
      }
  
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
);

export { userAwardRouter };