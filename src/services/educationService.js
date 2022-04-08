import { Education } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from "uuid";

class EducationService {
  static async addEducation({ user_id, school, major, degree }) {
    const id = uuidv4();
    const newEducation = { id, user_id, school, major, degree };

    // db에 저장
    const createdNewEducation = await Education.create({ newEducation });

    return createdNewEducation;
  }

  static async getEducationInfo({ id }) {
    const education = await Education.findById({ id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!education) {
      const errorMessage =
        "학력 정보를 추가하지 않았습니다.";
      return { errorMessage };
    }

    return education;
  }

  static async setEducation({ id, toUpdate }) {
    // 우선 해당 id의 학력이 db에 존재하는지 여부 확인
    let education = await Education.findById({ id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!education) {
      const errorMessage =
        "존재하지 않는 학력 정보입니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    const school = toUpdate.school;
    const major = toUpdate.major;
    const degree = toUpdate.degree;

    // 업데이트 대상에 school 있다면, 즉 school 값이 null 이 아니라면 업데이트 진행
    if (school && major && degree) {
      const fieldToUpdateSchool = "school";
      const fieldToUpdateMajor = "major";
      const fieldToUpdateDegree = "degree";
      education = await Education.update(
        id, 
        {
          [fieldToUpdateSchool]: school, 
          [fieldToUpdateMajor]: major, 
          [fieldToUpdateDegree]: degree
        }
      );
    }

    return education;
  }

  static async getEducationlistInfo({ user_id }) {
    const educationlist = await Education.findByUserId({ user_id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!educationlist || educationlist.length === 0) {
      const errorMessage =
        "유저가 존재하지 않습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return educationlist;
  }

  static async getUserInfo({ user_id }) {
    const user = await Education.findByUserId({ user_id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      const errorMessage =
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return user;
  }

  static async deleteUserEducation({ id }) {
    const education = await Education.findById({ id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!education || education === null) {
      const errorMessage =
        "학력 정보가 존재하지 않습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    await Education.deleteById({ id });

    return education;
  }
}

export { EducationService };