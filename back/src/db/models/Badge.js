import { BadgeModel } from "../schemas/badge";

class Badge {
  static async create({ newBadge }) {
    const createdNewBadge = await BadgeModel.create(newBadge);
    return createdNewBadge;
  }

  static async findBadge({ user_id, id }) {
    const badge = await BadgeModel.findOne({ user_id, id });
    return badge;
  }

  static async findByUserId({ user_id }) {
    const badge = await BadgeModel.find({ user_id });
    return badge;
  }
}

export { Badge };