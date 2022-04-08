import { User, Education, Award, Project, Certificate, Friend } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

class userService {
  static async addUser({ name, email, password }) {
    // 이메일 중복 확인
    const user = await User.findByEmail({ email });
    if (user) {
      const errorMessage =
        "이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요.";
      return { errorMessage };
    }

    // 비밀번호 해쉬화
    const hashedPassword = await bcrypt.hash(password, 10);

    // id 는 유니크 값 부여
    const id = uuidv4();
    const newUser = { id, name, email, password: hashedPassword };

    // db에 저장
    const createdNewUser = await User.create({ newUser });
    return createdNewUser;
  }

  static async findByEmail({ email }) {
    const user = await User.findOne({ email });
    return user;
  }

  static async getUser({ email, password }) {
    // 이메일 db에 존재 여부 확인
    const user = await User.findByEmail({ email });
    if (!user) {
      const errorMessage =
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // 비밀번호 일치 여부 확인
    const correctPasswordHash = user.password;
    
    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash
    );
    if (!isPasswordCorrect) {
      const errorMessage =
        "비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // 로그인 성공 -> JWT 웹 토큰 생성
    const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
    const token = jwt.sign({ user_id: user.id }, secretKey);

    // 반환할 loginuser 객체를 위한 변수 설정
    const id = user.id;
    const name = user.name;
    const description = user.description;
    const point = user.point;
    const loginedAt = user.loginedAt;

    const loginUser = {
      token,
      id,
      email,
      name,
      description,
      errorMessage: null,
      point,
      loginedAt
    };

    return loginUser;
  }

  static async findUserByEmail({ email }) {
    const user = await User.findByEmail({ email });
    return user;
  }

  static async getUsers() {
    const users = await User.findAll();
    return users;
  }

  static async searchUsers({ word }) {
    let users = await User.findUserName({ word });
    return users;
  }

  static async setUser({ user_id, toUpdate }) {
    // 우선 해당 id 의 유저가 db에 존재하는지 여부 확인
    let user = await User.findById({ user_id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      const errorMessage =
        "가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // 업데이트 대상에 name이 있다면, 즉 name 값이 null 이 아니라면 업데이트 진행
    if (toUpdate.name) {
      const fieldToUpdate = "name";
      const newValue = toUpdate.name;
      user = await User.update({ user_id, fieldToUpdate, newValue });
    }

    if (toUpdate.password) {
      const fieldToUpdate = "password";
      // 비밀번호 해쉬화
      const hashedPassword = await bcrypt.hash(toUpdate.password, 10);
      const newValue = hashedPassword;
      user = await User.update({ user_id, fieldToUpdate, newValue });
    }

    if (toUpdate.description) {
      const fieldToUpdate = "description";
      const newValue = toUpdate.description;
      user = await User.update({ user_id, fieldToUpdate, newValue });
    }

    if (toUpdate.loginedAt) {
      const fieldToUpdate = "loginedAt";
      const newValue = toUpdate.loginedAt;
      user = await User.update({ user_id, fieldToUpdate, newValue });
    }

    if (toUpdate.point) {
      const fieldToUpdate = "point";
      const newValue = toUpdate.point;
      user = await User.update({ user_id, fieldToUpdate, newValue });
    }
    
    return user;
  }
  
  static async getUserInfo({ user_id }) {
    const user = await User.findById({ user_id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      const errorMessage =
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return user;
  }

  static async deleteUser({ user_id }) {
    const user = await User.findById({ user_id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user || user === null) {
      const errorMessage =
        "해당 유저가 존재하지 않습니다.";
      return { errorMessage };
    }
    
    await Education.deleteByUserId({ user_id });
    await Award.deleteByUserId({ user_id });
    await Project.deleteByUserId({ user_id });
    await Certificate.deleteByUserId({ user_id });
    await Friend.deleteByUserId({ user_id });
    await User.deleteById({ user_id });

    return user;
  }

  static async checkPassword({ user_id, password }) {
    const user = await User.findById({ user_id });

    const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash
    );
    if (!isPasswordCorrect) {
      const errorMessage =
        "비밀번호를 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }
    return true;
  }

  static async setProfile({ user_id, toUpdate }) {
    let user = await User.findById({ user_id });

    if (!user) {
      const errorMessage =
      "해당 유저가 존재하지 않습니다.";
      return { errorMessage };
    }

    const pullKeys = Object.keys(toUpdate);

    for (let i = 0; i < pullKeys.length; i++) {
      if (toUpdate[pullKeys[i]] !== null) {
        const fieldToUpdate = pullKeys[i];
        const newValue = toUpdate[pullKeys[i]];
        user = await User.update({
          user_id,
          fieldToUpdate,
          newValue,
        });
      }
    }
    return user;
  };

  static async getProfileImg({ user_id }) {
    const user = await User.findById({ user_id });

    if (!user) {
      const errorMessage =
        '해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }

    const profileImg = await User.findProfileById({ user_id });
    if (!profileImg) {
      const errorMessage =
        '프로필 이미지가 존재하지 않습니다.';
      return { errorMessage };
    }

    const profileImgPath = "http://localhost:5000/profileImg/";
    const profileImgURL = profileImgPath + profileImg;

    return profileImgURL;
  }

/*******
뱃지 구입
********/
  static async setPoint({ user_id, toUpdate }) {
    const fieldToUpdate = "point";
    const newValue = toUpdate.point;
    
    const user = await User.update({ user_id, fieldToUpdate, newValue });
    
    return user;
  }
}

export { userService };