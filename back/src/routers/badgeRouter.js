import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { BadgeService } from "../services/badgeService";


const BadgeRouter = Router();

BadgeRouter.post(
  "/badge/create",
  login_required,
  async function (req, res, next) {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error(
          "필수 파라미터가 존재하지 않습니다."
        );
      }
    const user_id = req.currentUserId;
    const name = req.body.name;
    const price = req.body.price;
    const have = req.body.have;
    const url = req.body.url;
  
    // 위 데이터를 뱃지 db에 추가하기
    const newBadge = await BadgeService.addBadge({
      user_id,
      name,
      price,
      have,
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
      const currentBadge = await BadgeService.getBadgeInfo({ id });
  
      if (currentBadge.errorMessage) {
        throw new Error(currentBadge.errorMessage);
      }
  
      res.status(200).send(currentBadge);
    } catch (err) {
      next(err);
    }
  }
);

BadgeRouter.put(
  "/badges/:id",
  login_required,
  async function (req, res, next) {
    try {
      const id = req.params.id;
      const name = req.body.name ?? null;
      const description = req.body.description ?? null;
      const price = req.body.price ?? null;
      const have = req.body.have ?? null;
      const url = req.body.url ?? null;

      const toUpdate = { name, description, price, have, url };

      const updatedBadge = await BadgeService.setBadge({ id, toUpdate });
  
      if (updatedBadge.errorMessage) {
        throw new Error(updatedBadge.errorMessage);
      }
  
      res.status(200).json(updatedBadge);
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
      const user_id = req.currentUserId;
      const currentBadgelistInfo = await BadgeService.getBadgelistInfo({ user_id });

      if (currentBadgelistInfo.errorMessage) {
        throw new Error(currentBadgelistInfo.errorMessage);
      }

      res.status(200).send(currentBadgelistInfo);
    } catch (err) {
      next(err);
    }
  }
);

BadgeRouter.delete(
  "/badges/:id",
  login_required,
  async function (req, res, next) {
    try {
      const id = req.params.id;
      const deletedBadge = await BadgeService.deleteBadge({ id });
  
      if (deletedBadge.errorMessage) {
        throw new Error(deletedBadge.errorMessage);
      }
  
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
);

export { BadgeRouter };
