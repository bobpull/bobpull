import { BadgeModel } from "../schemas/badge";

class Badge {
  static async create({ newBadge }) {
    const createdNewBadge = await BadgeModel.create(newBadge);
    return createdNewBadge;
  }

  static async findById({ id }) {
    const badge = await BadgeModel.findOne({ id });
    return badge;
  }

  static async update(id, fieldToUpdate) {
    const filter = { id };
    const update = fieldToUpdate;
    const option = { returnOriginal: false };
    console.log("모델:", filter);
    const updatedBadge = await BadgeModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedBadge;
  }

  static async deleteById({ id }) {
    const badge = await BadgeModel.deleteOne({ id });
    return badge;
  }
}

export { Badge };