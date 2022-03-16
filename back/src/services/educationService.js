import { Education } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

class userEducationService {
  static async addEducation({ user_id, school, major, position }) {
    // 학교 이름 중복 확인
    const schoolMajorPosition = await Education.findBySchool({ school, major, position });
    if (schoolMajorPosition) {
      const errorMessage =
        "동일한 학력을 중복 등록할 수 없습니다.";
      return { errorMessage };
    }

    // id 는 유니크 값 부여
    const newEducation = { user_id, school, major, position };

    // db에 저장
    // 문제 없이 db 저장 완료되었으므로 에러가 없음.
    const createdNewEducation = await Education.create({ newEducation });
    createdNewEducation.errorMessage = null;

    return createdNewEducation;
  }
}

export { userEducationService };
