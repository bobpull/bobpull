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
}

export { Education };
