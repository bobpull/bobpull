import { UserModel } from "../schemas/user";
import { FriendModel } from "../schemas/friend";

class Friend {
  static async create({ newFriend }) {
    const createdNewFriend = await FriendModel.create(newFriend);
    return createdNewFriend;
  }

  static async findById({ id }) {
    const friend = await FriendModel.findOne({ id });
    return friend;
  }

  // static async findByFriendId({ friend_id }) {
  //   const friend = await FriendModel.findOne({ friend_id });
  //   return friend;
  // }

  static async findByUserId({ user_id }) {
    let findFriendList = await FriendModel.find({ user_id });
    return findFriendList;
  }

  static async deleteById({ id }) {
    const friend = await FriendModel.deleteOne({ id });
    return friend;
  }

  static async deleteByUserId({ user_id }) {
    const friend = await FriendModel.deleteMany({ user_id });
    const deleteFriend = await FriendModel.deleteMany({ friend_id: user_id });
    console.log(deleteFriend);
    return friend;
  }

  static async findAll() {
    const friendlist = await FriendModel.find({});
    return friendlist;
  }
}

export { Friend };
