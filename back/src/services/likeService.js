import { Like } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from "uuid";

class LikeService {
  static async addLike({ user_id, lover_id, post_id }) {
    const id = uuidv4();
    const newLike = { id, user_id, lover_id, post_id };

    // db에 저장
    const createdNewLike = await Like.create({ newLike });

    return createdNewLike;
  }
  
  static async getLikeInfo({ post_id }) {
    const like = await Like.findById({ post_id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!like) {
      const errorMessage =
        "해당 좋아요가 존재하지 않습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return Like;
  }

//   static async setLike({ user_id, id, toUpdate }) {
//     // 우선 해당 id 의 좋아요가 db에 존재하는지 여부 확인
//     let Like = await Like.findById({ id });

//     // db에서 찾지 못한 경우, 에러 메시지 반환
//     if (!Like) {
//       const errorMessage =
//         "해당 좋아요가 존재하지 않습니다. 다시 한 번 확인해 주세요.";
//       return { errorMessage };
//     }

//     const title = toUpdate.title;
//     const description = toUpdate.description;
//     const from_date = toUpdate.from_date;
//     const to_date = toUpdate.to_date;

//     // 업데이트 대상에 title이 있다면, 즉 title 값이 null 이 아니라면 업데이트 진행
//     if (title && description && from_date && to_date) {
//       const fieldToUpdateTitle = "title";
//       const fieldToUpdateDescription = "description";
//       const fieldToUpdateFromDate = "from_date";
//       const fieldToUpdateToDate = "to_date";
//       Like = await Like.update( 
//         id, 
//         {
//           [fieldToUpdateTitle]: title, 
//           [fieldToUpdateDescription]: description, 
//           [fieldToUpdateFromDate]: from_date, 
//           [fieldToUpdateToDate]: to_date
//         }
//       );
//     }

//     return Like;
//   }

  static async getLikelistInfo({ user_id }) {
    const likelist = await Like.findByUserId({ user_id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!likelist || likelist.length === 0) {
      const errorMessage =
        "해당 좋아요가 존재하지 않습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return likelist;
  }

  static async deleteLike({ post_id }) {
    const like = await Like.findById({ post_id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!like || like === null) {
      const errorMessage =
        "해당 좋아요가 존재하지 않습니다.";
      return { errorMessage };
    }
    
    await Like.deleteById({ id });

    return like;
  }
}

export { LikeService };
