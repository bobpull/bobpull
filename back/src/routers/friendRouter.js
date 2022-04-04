import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { FriendService } from "../services/friendService";

const FriendRouter = Router();

/*** 친구 맺기 ***/
FriendRouter.post(
  "/friend/:friend_id",
  login_required,
  async function (req, res, next) {
  try {
    const user_id = req.currentUserId;
    const friend_id = req.params.friend_id;

    // 위 데이터를 Friend db에 추가
    const newFriend = await FriendService.addFriend({
      user_id,
      friend_id,
    });

    if (newFriend.errorMessage) {
      throw new Error(newFriend.errorMessage);
    }

    res.status(201).json(newFriend);
  } catch (err) {
    next(err);
  }
});

/***  ***/
// FriendRouter.get(
//   "/friends/:id",
//   login_required,
//   async function (req, res, next) {
//     try {
//       const id = req.params.id;
//       const friend = await FriendService.getFriend({ id });

//       if (friend.errorMessage) {
//         throw new Error(friend.errorMessage);
//       }

//       res.status(200).send(friend);
//     } catch (err) {
//       next(err);
//     }
//   }
// );

/*** 친구 리스트 ***/
FriendRouter.get(
  "/friendlist/:user_id",
  login_required,
  async function (req, res, next) {
    try {
      const user_id = req.params.user_id;
      const friendlist = await FriendService.getFriendlist({ user_id });

      if (friendlist.errorMessage) {
        throw new Error(friendlist.errorMessage);
      }

      res.status(200).send(friendlist);
    } catch (err) {
      next(err);
    }
  }
);

/*** 친구 끊기 ***/
FriendRouter.delete(
  "/friends/:id",
  login_required,
  async function (req, res, next) {
    try {
      const id = req.params.id;
      const deleted_result = await FriendService.deleteFriend({ id });
  
      if (deleted_result.errorMessage) {
        throw new Error(deleted_result.errorMessage);
      }
  
      res.status(204).send("삭제가 완료되었습니다.");
    } catch (err) {
      next(err);
    }
  }
);

/*** 모든 유저 검색 ***/
FriendRouter.get(
  "/friendlist",
  login_required,
  async function (req, res, next) {
    try {
      const friendlist = await FriendService.getUsers();
      res.status(200).send(friendlist);
    } catch (err) {
      next(err);
    }
  }
);

export { FriendRouter };