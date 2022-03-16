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

  static async getCertificateInfo({ certificate_id }) {
    const certificate = await Certificate.findById({ certificate_id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!certificate) {
      const errorMessage =
        "자격증이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }
    return certificate;
  }
}

export { certificateAuthService };