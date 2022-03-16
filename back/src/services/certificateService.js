import { Certificate } from "../db";
import { v4 as uuidv4 } from "uuid";

class certificateAuthService {
  static async addCertificate({ user_id, title, description, when_date }) {

    // id는 유니크 값 부여
    const id = uuidv4();
    const newCertificate = { id, user_id, title, description, when_date };

    // db에 저장
    const createdNewCertificate = await Certificate.create({ newCertificate });
    createdNewCertificate.errorMessage = null;

    return createdNewCertificate;
  }
}

export { certificateAuthService };