import { Award } from "../db";
import { v4 as uuidv4 } from "uuid";

class AwardService {
  static async addAward({ user_id, title, description }) {

    const id = uuidv4();
    const newAward = { id, user_id, title, description };

    // db에 저장
    const createdNewAward = await Award.create({ newAward });

    return createdNewAward;
  }

  static async getAwardInfo({ id }) {
    const award = await Award.findById({ id })

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!award) {
      const errorMessage =
        "수상 이력이 없습니다. 다시 한 번 확인해 주세요.";
        return { errorMessage };
    }

    return award;
  }

  static async setAward({ id, toUpdate }) {
    // 우선 해당 id의 award가 db에 존재하는지 여부 확인
    let award = await Award.findById({ id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!award) {
      const errorMessage =
        "수상 이력이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    const title = toUpdate.title;
    const description = toUpdate.description;

    // 업데이트 대상에 title이 있다면, 즉 title 값이 null 이 아니라면 업데이트 진행
    if (title && description) {
      const fieldToUpdate1 = "title";
      const newTitle = title;
      const fieldToUpdate2 = "description";
      const newDescription = description;
      award = await Award.update( id, {[fieldToUpdate1]:newTitle, [fieldToUpdate2]:newDescription});
    }
    
    // if (description) {
    //   const fieldToUpdate = "description";
    //   const newValue = description;
    //   award = await Award.update({ id, fieldToUpdate, newValue });
    // }

    return award;
  }

  static async getAwardlistInfo({ user_id }) {
    const awardlist = await Award.findByUserId({ user_id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!awardlist || awardlist.length === 0) {
      const errorMessage =
        "수상 이력이 없습니다. 다시 한 번 확인해 주세요."
        return { errorMessage }
    }
    return awardlist;
  }

  static async getUserInfo({ user_id }) {
    const user = await Award.findByUserId({ user_id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      const errorMessage =
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return user;
  }

  static async deleteUserAward({ id }) {
    const award = await Award.deleteById({ id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!award || award === null) {
      const errorMessage =
        "수상 이력이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return award;
  }
}

export { AwardService };