import { AwardModel } from "../schemas/award";

class Award {
  static async create({ newAward }) {
    const createdNewAward = await AwardModel.create(newAward);
    return createdNewAward;
  }

  static async findById({ id }) {
    const award = await AwardModel.findOne({ id });
    return award;
  }

  static async update( id, fieldToUpdate ) {
    const filter = { id };
    const update = fieldToUpdate
    const option = { returnOriginal: false };
    console.log(filter, update);
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

  static async deleteById({ id }) {
    const award = await AwardModel.deleteOne({ id });
    return award;
  }
}

export { Award };