import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { LikeService } from "../services/likeService";

const LikeRouter = Router();

LikeRouter.post(
  "/likes/:post_id",
  login_required,
  async function (req, res, next) {
  try {
    const user_id = req.currentUserId;
    // lover_id 받아야 함
    const post_id = req.params.post_id;

    // 위 데이터를 Like db에 추가하기
    const newLike = await LikeService.addLike({
      user_id,
      lover_id,
      post_id,
    });

    if (newLike.errorMessage) {
      throw new Error(newLike.errorMessage);
    }

    res.status(201).json(newLike);
  } catch (err) {
    next(err);
  }
});

LikeRouter.get(
  "/likes/:post_id",
  login_required,
  async function (req, res, next) {
    try {
      const post_id = req.params.post_id;
      const currentLikeInfo = await LikeService.getLikeInfo({ post_id });

      if (currentLikeInfo.errorMessage) {
        throw new Error(currentLikeInfo.errorMessage);
      }

      res.status(200).send(currentLikeInfo);
    } catch (err) {
      next(err);
    }
  }
);

// put 이 필요한가?
// LikeRouter.put(
//   "/likes/:post_id",
//   login_required,
//   async function (req, res, next) {
//     try {
//       // URI로부터 Like id를 추출함.
//       const user_id = req.currentUserId;
//       const post_id = req.params.post_id;
//       // body data 로부터 업데이트할 Like 정보를 추출함.

//       const toUpdate = { school, major, degree };

//       // 해당 Like 아이디로 Like 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
//       const updatedLike = await LikeService.setLike({ user_id, id, toUpdate });

//       if (updatedLike.errorMessage) {
//         throw new Error(updatedLike.errorMessage);
//       }

//       res.status(200).json(updatedLike);
//     } catch (err) {
//       next(err);
//     }
//   }
// );

LikeRouter.get(
  "/likelist/:user_id",
  login_required,
  async function (req, res, next) {
    try {
      const user_id = req.params.user_id;
      const currentLikelistInfo = await LikeService.getLikelistInfo({ user_id });

      if (currentLikelistInfo.errorMessage) {
        throw new Error(currentLikelistInfo.errorMessage);
      }

      res.status(200).send(currentLikelistInfo);
    } catch (err) {
      next(err);
    }
  }
);

LikeRouter.delete(
  "/likes/:post_id",
  login_required,
  async function (req, res, next) {
    try {
      const post_id = req.params.post_id;
      const deletedLike = await LikeService.deleteLike({ post_id });
  
      if (deletedLike.errorMessage) {
        throw new Error(deletedLike.errorMessage);
      }
  
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
);

export { LikeRouter };