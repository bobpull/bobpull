import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { FriendService } from "../services/friendService";

const FriendRouter = Router();

FriendRouter.post(
  "/friend/:friend_id",
  login_required,
  async function (req, res, next) {
  try {
    const user_id = req.currentUserId;
    const friend_id = req.params.friend_id;

    // 위 데이터를 Like db에 추가하기
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

FriendRouter.get(
  "/friends/:friend_id",
  login_required,
  async function (req, res, next) {
    try {
      const friend_id = req.params.friend_id;
      const currentFriendInfo = await FriendService.getFriendInfo({ friend_id });

      if (currentFriendInfo.errorMessage) {
        throw new Error(currentFriendInfo.errorMessage);
      }

      res.status(200).redirect(`/users/${currentFriendInfo.id}`);
    } catch (error) {
      next(error);
    }
  }
);

FriendRouter.get(
  "/friendlist",
  login_required,
  async function (req, res, next) {
    try {
      const user_id = req.currentUser.id;
      const currentFriendlist = await FriendService.getFriendlist({ user_id });

      if (currentFriendlist.errorMessage) {
        throw new Error(currentFriendlist.errorMessage);
      }

      res.status(200).send(currentFriendlist);
    } catch (err) {
      next(err);
    }
  }
);

FriendRouter.delete(
  "/friends/:id",
  login_required,
  async function (req, res, next) {
    try {
      const id = req.params.id;
      const deletedFriend = await FriendService.deleteFriend({ id });
  
      if (deletedFriend.errorMessage) {
        throw new Error(deletedFriend.errorMessage);
      }
  
      res.status(204).send("삭제가 완료되었습니다.");
    } catch (err) {
      next(err);
    }
  }
);

export { FriendRouter };