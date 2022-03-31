import is from "@sindresorhus/is";
import { Router } from "express";
import {login_required} from "../middlewares/login_required";
import { AwardService } from "../services/awardService";

const AwardRouter = Router();

/*** 수상 내역 작성 ***/
AwardRouter.post(
  "/award/create",
  login_required,
  async function (req, res, next) {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error(
          "필수 파라미터가 존재하지 않습니다."
        );
      }

      const user_id = req.currentUserId;
      const title = req.body.title;
      const description = req.body.description;

      // 위 데이터를 유저 db에 추가하기
      const newAward = await AwardService.addAward({
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

/*** 선택한 수상 내역 조회 ***/
AwardRouter.get(
  "/awards/:id",
  login_required,
  async function(req, res, next) {
    try {
      const id = req.params.id;
      const currentAwardInfo = await AwardService.getAwardInfo({ id })

      if (currentAwardInfo.errorMessage) {
        throw new Error(currentAwardInfo.errorMessage);
      }

      res.status(200).send(currentAwardInfo);
    } catch (err) {
      next(err);
    }
  }
);

/*** 해당 id를 가진 수상 내역 수정 ***/
AwardRouter.put(
  "/awards/:id",
  login_required,
  async function (req, res, next) {
    try {
      const id = req.params.id;
      const title = req.body.title ?? null;
      const description = req.body.description ?? null;

      const toUpdate = { title, description };

      //해당 award_id로 수상이력 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
      const updated_result = await AwardService.setAward({ id, toUpdate });

      if (updated_result.errorMessage) {
        throw new Error(updated_result.errorMessage);
      }
      res.status(200).json(updated_result);
    } catch (err) {
      next(err);   
    }
  }
);

/*** user의 수상 리스트 조회 ***/
AwardRouter.get(
  "/awardlist/:user_id",
  login_required,
  async function (req, res, next) {
    try {
      const user_id = req.params.user_id;
      const currentAwardlistInfo = await AwardService.getAwardlistInfo({ user_id });

      if (currentAwardlistInfo.errorMessage) {
        throw new Error(currentAwardlistInfo.errorMessage);
      }

      res.status(200).send(currentAwardlistInfo);
    } catch (err) {
      next(err);
    }
  }
);

/*** 해당 id인 수상 내역 삭제 ***/
AwardRouter.delete(
  "/awards/:id",
  login_required,
  async function (req, res, next) {
    try {
      const id = req.params.id;
      const deleted_result = await AwardService.deleteUserAward({ id });
  
      if (deleted_result.errorMessage) {
        throw new Error(deleted_result.errorMessage);
      }
  
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
);

export { AwardRouter };