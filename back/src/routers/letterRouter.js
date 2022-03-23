import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { LetterService } from "../services/letterService";

const LetterRouter = Router();

LetterRouter.post(
  "/letter/:penpal_id",
  login_required,
  async function (req, res, next) {
  try {
    const user_id = req.currentUserId;
    const penpal_id = req.params.penpal_id;
    const letters = req.body.letters;

    // 위 데이터를 Like db에 추가하기
    const newLetter = await LetterService.addLetter({
      user_id,
      penpal_id,
      letters,
    });

    if (newLetter.errorMessage) {
      throw new Error(newLetter.errorMessage);
    }

    res.status(201).json(newLetter);
  } catch (err) {
    next(err);
  }
});

LetterRouter.get(
  "/letterlist/:user_id",
  login_required,
  async function (req, res, next) {
    try {
      const user_id = req.params.user_id;
      const currentLetter = await LetterService.getLetterlist({ user_id });
      
      if (currentLetter.errorMessage) {
        throw new Error(currentLetter.errorMessage);
      }

      res.status(200).send(currentLetter);
    } catch (err) {
      next(err);
    }
  }
);

LetterRouter.delete(
  "/letters/:id",
  login_required,
  async function (req, res, next) {
    try {
      const id = req.params.id;
      const deletedLetter = await LetterService.deleteLetter({ id });
  
      if (deletedLetter.errorMessage) {
        throw new Error(deletedLetter.errorMessage);
      }
  
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
);

export { LetterRouter };