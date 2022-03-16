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

  static async getAwardInfo({ award_id }) {
    const award = await Award.findById({ award_id })

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!award) {
      const errorMessage =
        "수상이력이 없습니다. 다시 한 번 확인해 주세요.";
        return { errorMessage };
    }

    return award;
  }
}

export { awardAuthService };