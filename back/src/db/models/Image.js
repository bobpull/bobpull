import { ImageModel } from  "../schemas/image";

class Image{
  static async create(setImage){
    const createdImage = await ImageModel.create(setImage);
    return createdImage;
  }

  static async update({ id, update }){
    const user_id  = { id };
    const option = { returnOriginal: false };
        
    const image = await ImageModel.findOneAndUpdate(
      user_id, 
      update,
      option 
    );
      return image;
  }

  static async findById({ user_id }){
    const image = await ImageModel.findOne({ user_id });
    return image;
  }

}

export { Image };
