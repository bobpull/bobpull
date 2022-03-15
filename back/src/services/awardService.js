import { Award } from "../db";
import { v4 as uuidv4 } from "uuid";

class awardAuthService {
  static async addAward({ user_id, title, description }) {

    // id 는 유니크 값 부여
    const id = uuidv4();
    const newAward = { id, user_id, title, description };

    // db에 저장
    const createdNewAward = await Award.create({ newAward });
    createdNewAward.errorMessage = null;

    return createdNewAward;
  }
}

export { awardAuthService };