import { AwardModel } from "../schemas/award";

class Award {
  static async create({ newAward }) {
    const createdNewAward = await AwardModel.create(newAward);
    return createdNewAward;
  }

  static async findByTitleWithDescription({ user_id, title, description }) {
    const titleWithDescription = await AwardModel.findOne({ user_id, title, description });
    return titleWithDescription;
  }

  static async findById({ _id }) {
    const award = await AwardModel.findOne({ _id });
    return award;
  }

  static async update({ _id, fieldToUpdate, newValue }) {
    const filter = { _id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedAward = await AwardModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedAward;
  }

  static async findByUserId({ user_id }) {
    const awardlist = await AwardModel.find({ user_id });
    return awardlist;
  }
}

export { Award };