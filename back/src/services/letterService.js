import { Letter } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from "uuid";

class LetterService {
  static async addLetter({ user_id, penpal_id, letters}) {
    const id = uuidv4();
    const newLetter = { id, user_id, penpal_id, letters };

    // db에 저장
    const createdNewLetter = await Letter.create({ newLetter });

    return createdNewLetter;
  }
  
  static async getLetterlist({ user_id }) {
    const letterlist = await Letter.findByUserId({ user_id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!letterlist || letterlist.length === 0) {
      const errorMessage =
        "이야기를 나눠본 적이 없습니다.";
      return { errorMessage };
    }

    return letterlist;
  }

  static async deleteLetter({ id }) {
    const letter = await Letter.findById({ id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!letter || letter === null) {
      const errorMessage =
        "해당 쪽지가 존재하지 않습니다.";
      return { errorMessage };
    }
    
    await Letter.deleteById({ id });

    return letter;
  }
}

export { LetterService };
