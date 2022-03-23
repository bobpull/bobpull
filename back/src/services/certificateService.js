import { Certificate } from "../db";

class userCertificateService {
  static async addCertificate({ user_id, title, description, issued_at }) {
    // 자격증 중복 확인
    const titleWithDescription = await Certificate.findByTitleWithDescription({
      user_id,
      title,
      description,
    });
    if (titleWithDescription) {
      const errorMessage =
        "동일한 자격증과 내용을 중복으로 등록할 수 없습니다.";
      return { errorMessage };
    }

    const newCertificate = { user_id, title, description, issued_at };

    // db에 저장
    const createdNewCertificate = await Certificate.create({ newCertificate });
    createdNewCertificate.errorMessage = null;

    return createdNewCertificate;
  }

  static async getCertificateInfo({ _id }) {
    const certificate = await Certificate.findById({ _id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!certificate) {
      const errorMessage = "자격증이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }
    return certificate;
  }

  static async setCertificate({ user_id, _id, toUpdate }) {
    // 우선 해당 id의 award가 db에 존재하는지 여부 확인
    let certificate = await Certificate.findById({ _id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!certificate) {
      const errorMessage = "자격증이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    const title = toUpdate.title;
    const description = toUpdate.description;
    const titleWithDescription = await Certificate.findByTitleWithDescription({
      user_id,
      title,
      description,
    });
    if (titleWithDescription) {
      const errorMessage =
        "동일한 자격증과 내용을 중복으로 등록할 수 없습니다.";
      return { errorMessage };
    }

    // 업데이트 대상에 title이 있다면, 즉 title 값이 null이 아니라면 업데이트 진행
    if (title) {
      const fieldToUpdate = "title";
      const newValue = title;
      certificate = await Certificate.update({ _id, fieldToUpdate, newValue });
    }

    if (description) {
      const fieldToUpdate = "description";
      const newValue = description;
      certificate = await Certificate.update({ _id, fieldToUpdate, newValue });
    }

    if (toUpdate.issued_at) {
      const fieldToUpdate = "issued_at";
      const newValue = toUpdate.issued_at;
      certificate = await Certificate.update({ _id, fieldToUpdate, newValue });
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

  static async getUserInfo({ user_id }) {
    const user = await Certificate.findByUserId({ user_id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      const errorMessage =
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return user;
  }

  static async deleteUserCertificate({ _id }) {
    const certificate = await Certificate.deleteById({ _id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!certificate || certificate === null) {
      const errorMessage = "자격증이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return certificate;
  }
}

export { userCertificateService };
