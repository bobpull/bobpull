import is from "@sindresorhus/is";
import { Router } from "express";
import {login_required} from "../middlewares/login_required";
import { awardAuthService } from "../services/awardService";

const awardAuthRouter = Router();

awardAuthRouter.post("/award/create", async function (req, res, next) {
  
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req (request)에서 데이터 가져오기
    const user_id = req.body.user_id;
    const title = req.body.title;
    const description = req.body.description;

    // 위 데이터를 유저 db에 추가하기
    const newAward = await awardAuthService.addAward({
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
});

awardAuthRouter.get(
  "/awards/:id",
  login_required,
  async function(req, res, next) {
    try {
      const award_id = req.params.id;
      const currentAwardInfo = await awardAuthService.getAwardInfo({ award_id })

      if (currentAwardInfo.errorMessage) {
        throw new Error(currentAwardInfo.errorMessage);
      }

      res.status(200).send(currentAwardInfo);
    } catch (err) {
      next(err);
    }
  }
);





export { awardAuthRouter };