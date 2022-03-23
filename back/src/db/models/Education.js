import { EducationModel } from "../schemas/education";

class Education {
  static async create({ newEducation }) {
    const createdNewEducation = await EducationModel.create(newEducation);
    return createdNewEducation;
  }

  static async findByUserId({ user_id }) {
    const educationlist = await EducationModel.find({ user_id });
    return educationlist;
  }

  static async findById({ id }) {
    const education = await EducationModel.findOne({ id });
    return education;
  }

  static async update(id, fieldToUpdate) {
    const filter = { id };
    const update = fieldToUpdate;
    const option = { returnOriginal: false };

    const updatedEducation = await EducationModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedEducation;
  }

  static async deleteById({ id }) {
    const education = await EducationModel.deleteOne({ id });
    return education;
  }

  static async deleteByUserId({ user_id }) {
    const education = await EducationModel.deleteMany({ user_id });
    return education;
  }
}

export { Education };
