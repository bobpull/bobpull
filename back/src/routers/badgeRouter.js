import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { BadgeService } from "../services/badgeService";
import { userService } from "../services/userService";
import { badgelist } from "../db/publicSchema/badgelist";

const BadgeRouter = Router();

/*** 뱃지 구매 시 결제 기능 구현 ***/
BadgeRouter.post(
  "/badge/:id",
  login_required,
  async function (req, res, next) {
    try {
      const user_id = req.currentUserId;
      const id = Number(req.params.id);

      if (id >= 22) {
        return res.status(400).send("유효하지 않은 접근입니다.");
      }
      
      const badge = await BadgeService.isBadge({ user_id, id });

      if (badge) {
        return res.status(400).send("이미 존재하는 뱃지입니다.");
      }

      const currentBadge = badgelist[id];
      const { name, url, price } = currentBadge;

     // 유저의 아이디로 point를 찾음
      const user = await userService.getUserInfo({ user_id });

      if (!user) {
        throw new Error(user.errorMessage);
      }

      let { point } = user;
      console.log(price);
      if (point >= currentBadge.price) {
        point -= price;
      } else {
        return res.status(403).send("톨이 부족합니다.");
      }

      // 위 데이터를 뱃지 db에 추가하기
      const newBadge = await BadgeService.addBadge({
        id,
        user_id,
        name,
        url,
        price,
      });
    
      if (newBadge.errorMessage) {
        throw new Error(newBadge.errorMessage);
      }

      const toUpdate = { point };

      // point 결제
      const updatedUser = await userService.setPoint({ user_id, toUpdate });

      const newBagde_id = newBadge.id;
      point = updatedUser.point;
      
      res.status(201).json([newBagde_id, point]);
    } catch (err) {
      next(err);
    }
  }
);

/*** 뱃지 상점 구입할 때 클릭할 부분 ***/
BadgeRouter.get(
  "/badges/:id",
  login_required,
  async function (req, res, next) {
    try {
      const id = Number(req.params.id);
      
      if (id >= 22) {
        return res.status(400).send("유효하지 않은 접근입니다.");
      }
      
      const currentBadge = badgelist[id];

      res.status(200).send(currentBadge);
    } catch (err) {
      next(err);
    }
  }
);

/*** 가진 뱃지 리스트 보이기 ***/
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
