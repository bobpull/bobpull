import { EducationModel } from "../schemas/education";

class Education {
  static async create({ newEducation }) {
    const createdNewEducation = await EducationModel.create(newEducation);
    return createdNewEducation;
  }

  static async findBySchoolMajorPosition({ school, major, position }) {
    const schoolMajorPosition = await EducationModel.findOne({ school, major, position });
    return schoolMajorPosition;
  }

  static async findByUserId({ user_id }) {
    const education = await EducationModel.find({ user_id });
    return education;
  }

  static async findById({ _id }) {
    const education = await EducationModel.findOne({ _id });
    return education;
  }

  static async update({ _id, fieldToUpdate, newValue }) {
    const filter = { _id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedEducation = await EducationModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedEducation;
  }
}

export { Education };
