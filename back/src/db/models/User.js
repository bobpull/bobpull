import { UserModel } from "../schemas/user";
import { EducationModel } from "../schemas/education";
import { AwardModel } from "../schemas/award";
import { ProjectModel } from "../schemas/project";
import { CertificateModel } from "../schemas/certificate";

class User {
  static async create({ newUser }) {
    const createdNewUser = await UserModel.create(newUser);
    return createdNewUser;
  }

  static async findByEmail({ email }) {
    const user = await UserModel.findOne({ email });
    return user;
  }

  static async deleteById({ user_id }) {
    const user = await UserModel.deleteOne({ id: user_id });
    await EducationModel.deleteMany({ user_id });
    await AwardModel.deleteMany({ user_id });
    await ProjectModel.deleteMany({ user_id });
    await CertificateModel.deleteMany({ user_id });
    
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
}

export { User };
