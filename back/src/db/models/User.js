import { UserModel } from "../schemas/user";

class User {
  static async create({ newUser }) {
    const createdNewUser = await UserModel.create(newUser);
    return createdNewUser;
  }

  static async deleteById({ user_id }) {
    const user = await UserModel.deleteOne({ id: user_id });
    return user;
  }

  static async findById({ user_id }) {
    const user = await UserModel.findOne({ id: user_id });
    return user;
  }

  static async findAll() {
    const users = await UserModel.find({});
    return users;
  }

  static async findByEmail({ email }) {
    const user = await UserModel.findOne({ email });
    return user;
  }

  static async findUserName({ word }) {
    let searchedUsers = await UserModel.find({ name: { $regex: String(word) } });
    return searchedUsers;
  }

  static async findByFriendId({ friend_id }) {
    const friend = await UserModel.findOne({ id: friend_id });
    return friend;
  }

  static async update({ user_id, fieldToUpdate, newValue }) {
    const filter = { id: user_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedUser = await UserModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedUser;
  }

  static async updatePassword({ email, password }) {
    const filter = { email };
    const update = { [password]: password };
    const option = { returnOriginal: false };

    const updatedPassword = await UserModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedPassword;
  }

  static async findProfileById({ user_id }) {
    const user = await UserModel.findOne({ id: user_id });
    return user.profileImg;
  }
}

export { User };
