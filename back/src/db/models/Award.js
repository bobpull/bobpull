import { AwardModel } from "../schemas/award";

class Award {
  static async create({ newAward }) {
    const createdNewAward = await AwardModel.create(newAward);
    return createdNewAward;
  }

  static async findByTitleWithDescription({ title, description }) {
    const titleWithDescription = await AwardModel.findOne({ title, description });
    return titleWithDescription;
  }

  static async findById({ award_id }) {
    const award = await AwardModel.findOne({ _id: award_id });
    return award;
  }

  static async update({ award_id, fieldToUpdate, newValue }) {
    const filter = { _id: award_id };
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
    const awardlist = await AwardModel.find({ user_id: user_id });
    return awardlist;
  }
}

export { Award };