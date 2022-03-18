import { Education } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.

class userEducationService {
  static async addEducation({ user_id, school, major, position }) {
    // 학교 이름 중복 확인
    const schoolMajorPosition = await Education.findBySchoolMajorPosition({ school, major, position });
    if (schoolMajorPosition) {
      const errorMessage =
        "동일한 학력을 중복으로 등록할 수 없습니다.";
      return { errorMessage };
    }

    const newEducation = { user_id, school, major, position };

    // db에 저장
    // 문제 없이 db 저장 완료되었으므로 에러가 없음.
    const createdNewEducation = await Education.create({ newEducation });
    createdNewEducation.errorMessage = null;

    return createdNewEducation;
  }

  static async getUserEducation({ _id }) {
    const education = await Education.findById({ _id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!education) {
      const errorMessage =
        "학력 정보를 추가하지 않았습니다.";
      return { errorMessage };
    }

    return education;
  }

  static async setEducation({ _id, toUpdate }) {
    // 우선 해당 id의 학력이 db에 존재하는지 여부 확인
    let education = await Education.findById({ _id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!education) {
      const errorMessage =
        "존재하지 않는 학력 정보입니다.";
      return { errorMessage };
    }
    
    const school = toUpdate.school;
    const major = toUpdate.major;
    const position = toUpdate.position;
    const schoolMajorPosition = await Education.findBySchoolMajorPosition({ school, major, position });
    if (schoolMajorPosition) {
      const errorMessage =
        "동일한 학력을 중복으로 등록할 수 없습니다.";
      return { errorMessage };
    }

    // 업데이트 대상에 school 있다면, 즉 school 값이 null 이 아니라면 업데이트 진행
    if (school) {
      const fieldToUpdate = "school";
      const newValue = school;
      education = await Education.update({ _id, fieldToUpdate, newValue });
    }

    if (major) {
      const fieldToUpdate = "major";
      const newValue = major;
      education = await Education.update({ _id, fieldToUpdate, newValue });
    }

    if (position) {
      const fieldToUpdate = "position";
      const newValue = position;
      education = await Education.update({ _id, fieldToUpdate, newValue });
    }

    return education;
  }

  static async getUserInfo({ user_id }) {
    const user = await Education.findByUserId({ user_id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      const errorMessage =
        "유저가 존재하지 않습니다.";
      return { errorMessage };
    }

    return user;
  }

  static async getCurrentUserEducation({ user_id }) {
    const educationList = await Education.findByUserId({ user_id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!educationList || educationList.length === 0) {
      const errorMessage =
        "학력 정보가 존재하지 않습니다.";
      return { errorMessage };
    }

    return educationList;
  }

  static async deleteUserEducation({ _id }) {
    const education = await Education.deleteById({ _id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!education || education === null) {
      const errorMessage =
        "학력 정보가 존재하지 않습니다.";
      return { errorMessage };
    }

    return education;
  }
}

<<<<<<< HEAD
export { userEducationService };
=======
export { userEducationService };
>>>>>>> education-mvp-back
