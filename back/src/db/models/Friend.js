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

  static async findByUserId({ user_id }) {
    const friendlist = await FriendModel.find({ user_id });
    return friendlist;
  }

  static async deleteById({ id }) {
    const friend = await FriendModel.deleteOne({ id });
    return friend;
  }

  static async deleteByUserId({ user_id }) {
    const friend = await FriendModel.deleteMany({ user_id });
    return friend;
  }
}

export { Friend };