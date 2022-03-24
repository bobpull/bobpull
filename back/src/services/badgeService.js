import { Badge } from "../db";
import { v4 as uuidv4 } from "uuid";

class BadgeService {
  static async addBadge({ user_id, title, price }) {

    const id = uuidv4();
    const newBadge = { id, user_id, title, price };

    // db에 저장
    const createdNewBadge = await Badge.create({ newBadge });

    return createdNewBadge;
  }

  static async getBadgeInfo({ id }) {
    const badge = await Badge.findById({ id })

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!badge) {
      const errorMessage =
        "뱃지가 없습니다. 다시 한 번 확인해 주세요.";
        return { errorMessage };
    }

    return badge;
  }

  static async setBadge({ id, toUpdate }) {
    // 우선 해당 id의 Badge가 db에 존재하는지 여부 확인
    let badge = await Badge.findById({ id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!badge) {
      const errorMessage =
        "뱃지가 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    const user_id = toUpdate.user_id;
    const title = toUpdate.title;
    const price = toUpdate.price;
    const description = toUpdate.description;
    const have = toUpdate.description;

    if (user_id && title && price && description && have) {
      const fieldToUpdateUserId = "user_id";
      const fieldToUpdateTitle = "title";
      const fieldToUpdatePrice = "price";
      const fieldToUpdateDescription = "description";
      const newDescription = description;
      Badge = await Badge.update( id, {[fieldToUpdate1]:newTitle, [fieldToUpdate2]:newDescription});
    }

    return Badge;
  }

  static async getBadgelistInfo({ user_id }) {
    const Badgelist = await Badge.findByUserId({ user_id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!Badgelist || Badgelist.length === 0) {
      const errorMessage =
        "수상 이력이 없습니다. 다시 한 번 확인해 주세요."
        return { errorMessage }
    }
    return Badgelist;
  }

  static async deleteUserBadge({ id }) {
    const Badge = await Badge.findById({ id });
    
    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!Badge || Badge === null) {
      const errorMessage =
      "수상 이력이 없습니다. 다시 한 번 확인해 주세요.";

      await Badge.deleteById({ id });
      return { errorMessage };
    }

    return Badge;
  }
}

export { BadgeService };