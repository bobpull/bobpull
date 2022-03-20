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

  static async getUserEducation({ id }) {
    const education = await Education.findById({ id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!education) {
      const errorMessage =
        "학력 정보를 추가하지 않았습니다.";
      return { errorMessage };
    }

    return education;
  }

  static async setEducation({ user_id, id, toUpdate }) {
    // 우선 해당 id의 학력이 db에 존재하는지 여부 확인
    let education = await Education.findById({ id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!education) {
      const errorMessage =
        "존재하지 않는 학력 정보입니다.";
      return { errorMessage };
    }

    // 업데이트 대상에 school 있다면, 즉 school 값이 null 이 아니라면 업데이트 진행
    if (toUpdate.school) {
      const fieldToUpdate = "school";
      const newValue = toUpdate.school;
      education = await Education.update({ id, fieldToUpdate, newValue });
    }

    if (toUpdate.major) {
      const fieldToUpdate = "major";
      const newValue = toUpdate.major;
      education = await Education.update({ id, fieldToUpdate, newValue });
    }

    if (toUpdate.degree) {
      const fieldToUpdate = "degree";
      const newValue = toUpdate.degree;
      education = await Education.update({ id, fieldToUpdate, newValue });
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
  
  static async setEducation({ id, toUpdate }) {
    // 우선 해당 id의 학력이 db에 존재하는지 여부 확인
    let education = await Education.findById({ id });
    
    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!education) {
      const errorMessage =
        "존재하지 않는 학력 정보입니다.";
        return { errorMessage };
    }

    // 업데이트 대상에 school 있다면, 즉 school 값이 null 이 아니라면 업데이트 진행
    if (toUpdate.school) {
      const fieldToUpdate = "school";
      const newValue = toUpdate.school;
      education = await Education.update({ id, fieldToUpdate, newValue });
    }
    
    if (toUpdate.major) {
      const fieldToUpdate = "major";
      const newValue = toUpdate.major;
      education = await Education.update({ id, fieldToUpdate, newValue });
    }
    
    if (toUpdate.degree) {
      const fieldToUpdate = "degree";
      const newValue = toUpdate.degree;
      education = await Education.update({ id, fieldToUpdate, newValue });
    }
    
    return education;
  }
  
  static async getUserEducation({ id }) {
    const education = await Education.findById({ id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!education) {
      const errorMessage =
        "학력 정보를 추가하지 않았습니다.";
      return { errorMessage };
    }

    return education;
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

  static async deleteUserEducation({ id }) {
    const education = await Education.deleteById({ id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!education || education === null) {
      const errorMessage =
        "학력 정보가 존재하지 않습니다.";
      return { errorMessage };
    }

    return education;
  }
}

export { EducationService };

