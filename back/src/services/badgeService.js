import { Badge } from "../db";

class BadgeService {
  static async addBadge({ id, user_id, name, price, url }) {
    const newBadge = { id, user_id, name, price, url };

    const createdNewBadge = await Badge.create({ newBadge });

    return createdNewBadge;
  }

  static async getBadge({ id }) {
    const badge = await Badge.findById({ id })

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!badge) {
      const errorMessage =
        "뱃지가 없습니다. 다시 한 번 확인해 주세요.";
        return { errorMessage };
    }

    return badge;
  }

  static async getBadgelist({ user_id }) {
    const badgelist = await Badge.findByUserId({ user_id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!badgelist || badgelist.length === 0) {
      const errorMessage =
        "뱃지가 없습니다. 다시 한 번 확인해 주세요."
        return { errorMessage }
    }

    return badgelist;
  }
}

export { BadgeService };