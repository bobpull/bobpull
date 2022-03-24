import { TallModel } from "../schemas/tall";

class Tall {
  static async create({ newTall }) {
    const createdNewTall = await TallModel.create(newTall);
    return createdNewTall;
  }

  static async findById({ user_id }) {
    const tall = await TallModel.findOne({ user_id });
    return tall;
  }

  static async update(user_id, toUpdate) {
    const filter = { user_id };
    const update = fieldToUpdate;
    const option = { returnOriginal: false };
    
    const updatedTall = await TallModel.findOneAndUpdate(
      filter,
      update,
      option
      );
      return updatedTall;
    }

  static async deleteById({ user_id }) {
    const tall = await TallModel.deleteOne({ user_id });
    return tall;
  }
}

export { Tall };