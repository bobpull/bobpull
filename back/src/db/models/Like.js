import { LikeModel } from "../schemas/like";

class Like {
  static async create({ newLike }) {
    const createdNewLike = await LikeModel.create(newLike);
    return createdNewLike;
  }

  static async findById({ post_id }) {
    const Like = await LikeModel.findOne({ post_id });
    return Like;
  }

//   static async update(id, fieldToUpdate) {
//     const filter = { id };
//     const update = fieldToUpdate;
//     const option = { returnOriginal: false };
    
//     const updatedLike = await LikeModel.findOneAndUpdate(
//       filter,
//       update,
//       option
//     );

//     return updatedLike;
//   }

  static async findByUserId({ user_id }) {
    const likelist = await LikeModel.find({ user_id });
    return likelist;
  }

  static async deleteById({ post_id }) {
    const Like = await LikeModel.deleteOne({ post_id });
    return Like;
  }
}

export { Like };