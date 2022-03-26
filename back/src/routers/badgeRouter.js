import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { BadgeService } from "../services/badgeService";

const BadgeRouter = Router();

const badgeName = ["pull", "bowl", "egg", "spam", "cleanCode", "css3", "dj", "es6", "GraphQL", "grid", "html5", "JS", "MongoDB", "NestJS", "nodejs", "Pug", "python", "ReactNative", "React", "socketio", "typescript", "websockets"];

const badgeUrlList = ["pull.png", "bowl.png", "egg.png", "spam.png", "cleanCode.png", "css3.png", "dj.png", "es6.png", "GraphQL.png", "grid.png", "html5.png", "JS.png",  "MongoDB.png", "NestJS.png", "nodejs.png", "Pug.png", "python.png", "ReactNative.png", "React.png", "socketio.png", "typescript.png", "websockets.png"];

BadgeRouter.post(
  "/badge/:id",
  login_required,
  async function (req, res, next) {
    try {
      const user_id = req.currentUserId;
      let id = req.params.id;
      let name = {};
      let price = {};
      let url = {};
    
      for (let i = 0; i < 22; i++) {
        if (i === Number(id)) {
          name = badgeName[i];
          if (i < 5) {
            price = 10;
          } else {
            price = 3;
          }
          url = "https://bobpullbucket.s3.ap-northeast-2.amazonaws.com/language/" + badgeUrlList[i];
        }
      }

      if (Number(id) >= 22) {
        return res.status(400).send("유효하지 않은 접근입니다.");
      }

      // 위 데이터를 뱃지 db에 추가하기
      const newBadge = await BadgeService.addBadge({
        id,
        user_id,
        name,
        price,
        url
      });
    
      if (newBadge.errorMessage) {
        throw new Error(newBadge.errorMessage);
      }
    
      res.status(201).json(newBadge);
    } catch (err) {
      next(err);
    }
  }
);

BadgeRouter.get(
  "/badges/:id",
  login_required,
  async function (req, res, next) {
    try {
      const id = req.params.id;
      const currentBadge = await BadgeService.getBadge({ id });
  
      if (currentBadge.errorMessage) {
        throw new Error(currentBadge.errorMessage);
      }
  
      res.status(200).send(currentBadge);
    } catch (err) {
      next(err);
    }
  }
);

BadgeRouter.get(
  "/badgelist/:user_id",
  login_required,
  async function (req, res, next) {
    try {
      const user_id = req.params.user_id;

      const currentBadgelist = await BadgeService.getBadgelist({ user_id });

      if (currentBadgelist.errorMessage) {
        throw new Error(currentBadgelist.errorMessage);
      }

      res.status(200).send(currentBadgelist);
    } catch (err) {
      next(err);
    }
  }
);

export { BadgeRouter };
