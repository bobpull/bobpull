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

  static async setCertificate({ certificate_id, toUpdate }) {
    // 우선 해당 id의 award가 db에 존재하는지 여부 확인
    let certificate = await Certificate.findById({ certificate_id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!certificate) {
      const errorMessage =
        "자격증이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // 업데이트 대상에 title이 있다면, 즉 title 값이 null이 아니라면 업데이트 진행
    if (toUpdate.title) {
      const fieldToUpdate = "title";
      const newValue = toUpdate.title;
      certificate = await Certificate.update({ certificate_id, fieldToUpdate, newValue });
    }

    if (toUpdate.description) {
      const fieldToUpdate = "description";
      const newValue = toUpdate.description;
      certificate = await Certificate.update({ certificate_id, fieldToUpdate, newValue });
    }

    if (toUpdate.when_date) {
      const fieldToUpdate = "when_date";
      const newValue = toUpdate.when_date;
      certificate = await Certificate.update({ certificate_id, fieldToUpdate, newValue });
    }

    return certificate;
  }
}

export { certificateAuthService };