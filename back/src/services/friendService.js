import { Friend, User } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from "uuid";

class FriendService {
  static async addFriend({ user_id, friend_id }) {
    const id = uuidv4();

    const newFriend = { id, user_id, friend_id };

    // db에 저장
    const createdNewFriend = await Friend.create({ newFriend });

    return createdNewFriend;
  }

  static async getFriendInfo({ friend_id }) {
    const friend = await User.findByFriendId({ friend_id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!friend || friend.length === 0) {
      const errorMessage =
        "해당 친구가 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return friend;
  }
  
  static async getFriendlist({ user_id }) {
    const friendlist = await Friend.findByUserId({ user_id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!friendlist || friendlist.length === 0) {
      const errorMessage =
        "아직 친구 추가를 하지 않았습니다.";
      return { errorMessage };
    }

    return friendlist;
  }

  static async deleteFriend({ id }) {
    const friend = await Friend.findById({ id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!friend || friend === null) {
      const errorMessage =
        "해당 친구가 존재하지 않습니다.";
      return { errorMessage };
    }
    
    await Friend.deleteById({ id });

    return friend;
  }
}

export { FriendService };
