import { Tall } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.

class TallService {
  static async addTall({ user_id, tall }) {
    const newTall = { user_id, tall };

    // db에 저장
    const createdNewTall = await Tall.create({ newTall });

    return createdNewTall;
  }
  
  static async getTallInfo({ user_id }) {
    const tall = await Tall.findById({ user_id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!tall) {
      const errorMessage =
        "해당 회원이 존재하지 않습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return tall;
  }

  static async setTall({ user_id, toUpdate }) {
    let tall = await Tall.findById({ user_id });

    if (tall) {
      const fieldToUpdateTall = "tall";
      Tall = await Tall.update( 
        id, 
        { [fieldToUpdateTall]: tall, }
      );
    }

    return tall;
  }

  static async deleteUserTall({ user_id }) {
    const tall = await Tall.findById({ user_id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!tall || tall === null) {
      const errorMessage =
        "해당 프로젝트가 존재하지 않습니다.";
      return { errorMessage };
    }
    
    await Tall.deleteById({ user_id });

    return tall;
  }
}

export { TallService };
