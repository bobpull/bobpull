import { Certificate } from "../db";
import { v4 as uuidv4 } from "uuid";

class CertificateService {
  static async addCertificate({ user_id, title, description, issued_at }) {
    const id = uuidv4();
    const newCertificate = { id, user_id, title, description, issued_at };

    // db에 저장
    const createdNewCertificate = await Certificate.create({ newCertificate });

    return createdNewCertificate;
  }

  static async getCertificateInfo({ id }) {
    const certificate = await Certificate.findById({ id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!certificate) {
      const errorMessage = "자격증이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }
    return certificate;
  }

  static async setCertificate({ user_id, id, toUpdate }) {
    // 우선 해당 id의 award가 db에 존재하는지 여부 확인
    let certificate = await Certificate.findById({ id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!certificate) {
      const errorMessage = "자격증이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    const title = toUpdate.title;
    const description = toUpdate.description;
    const issued_at = toUpdate.issued_at;

    // 업데이트 대상에 title이 있다면, 즉 title 값이 null이 아니라면 업데이트 진행
    if (title && description && issued_at) {
      const fieldToUpdateTitle = "title";
      const fieldToUpdateDescription = "description";
      const fieldToUpdateIssuedAt = "issued_at";

      certificate = await Certificate.update(
        id,
        {
         [fieldToUpdateTitle]: title,
         [fieldToUpdateDescription]: description,
         [fieldToUpdateIssuedAt]: issued_at
        }
      );
    }

    return certificate;
  }

  static async getCertificatelistInfo({ user_id }) {
    const certificatelist = await Certificate.findByUserId({ user_id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!certificatelist || certificatelist.length === 0) {
      const errorMessage = "자격증이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return certificatelist;
  }

  static async deleteUserCertificate({ id }) {
    const certificate = await Certificate.findById({ id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!certificate || certificate === null) {
      const errorMessage = "자격증이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }
    await Certificate.deleteById({ id });

    return certificate;
  }
}

export { CertificateService };
