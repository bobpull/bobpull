import { EducationModel } from "../schemas/education";

class Education {
  static async create({ newEducation }) {
    const createdNewEducation = await EducationModel.create(newEducation);
    return createdNewEducation;
  }

  static async findBySchoolMajorPosition({ user_id, school, major, position }) {
    const schoolMajorPosition = await EducationModel.findOne({ user_id, school, major, position });
    return schoolMajorPosition;
  }

  static async findByUserId({ user_id }) {
    const education = await EducationModel.find({ user_id });
    return education;
  }

  static async findById({ id }) {
    const education = await EducationModel.findOne({ id });
    return education;
  }

  static async update({ id, fieldToUpdate, newValue }) {
    const filter = { id };
    const update = { [fieldToUpdate]: newValue };
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
}

export { Education };
