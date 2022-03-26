import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { userAuthService } from "../services/userService";
import sendMail from "../utils/send-mail";
import generateRandomPassword from "../utils/generate-random-password";
import fs from "fs";
import sharp from "sharp";
import koreaNow from "../utils/korea-now";

const userAuthRouter = Router();

let verificationNumber = {};

/*** 회원가입 ***/
userAuthRouter.post("/user/register", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error("필수 파라미터가 존재하지 않습니다.");
    }

    // req (request) 에서 데이터 가져오기
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    // 위 데이터를 유저 db에 추가하기
    const newUser = await userAuthService.addUser({
      name,
      email,
      password,
    });

    if (newUser.errorMessage) {
      throw new Error(newUser.errorMessage);
    }
    
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

/*** 비밀번호 변경(로그인 상태에서) ***/
userAuthRouter.post(
  "/changepw",
  login_required,
  async function (req, res, next) {
    try {
      const user_id = req.currentUserId;
      const password = req.body.password;

      const checkPassword = await userAuthService.checkPassword({
        user_id,
        password,
      });

      if (checkPassword.errorMessage) {
        throw new Error(checkPassword.errorMessage);
      }

      res.status(200).send("새로운 비밀번호를 입력해주세요.");
    } catch (err) {
      next(err);
    }
  }
);

/*** 임시 비밀번호 생성 ***/
userAuthRouter.post("/resetpw", async function (req, res, next) {
  try {
    const email = req.body.email;
    const user = await userAuthService.findUserByEmail({ email });

    if (!user) {
      throw new Error("해당 메일로 가입된 사용자가 없습니다.");
    }

    const name = user.name;
    const user_id = user.id;
    const password = generateRandomPassword();
    const toUpdate = { password };
    const updatedUser = await userAuthService.setUser({ user_id, toUpdate });
  
    if (updatedUser.errorMessage) {
      throw new Error(updatedUser.errorMessage);
    }

    await sendMail(
      email,
      "밥풀(pull) 임시 비밀번호입니다!",
      `안녕하세요 ${name}님! 임시 비밀번호는: ${password} 입니다. 로그인 후 비밀번호를 꼭 변경해주세요!`
    );
    res.status(200).send("임시 비밀번호가 전송되었습니다.");
  } catch (err) {
    next(err);
  }
});

/*** 회원가입 인증 번호 ***/
userAuthRouter.post("/availablemail", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error("필수 파라미터가 존재하지 않습니다.");
    }

    const email = req.body.email;
    verificationNumber = generateRandomPassword();

    await sendMail(
      email,
      "밥풀(pull) 회원가입 인증번호입니다!",
      `안녕하세요! 인증번호는 ${verificationNumber} 입니다.`
    );

    res.status(200).send("인증번호가 전송되었습니다.");
  } catch (err) {
    next(err);
  }
});

/*** 회원가입 시 인증 번호 일치 확인 ***/
userAuthRouter.post("/availablemail/check", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error("필수 파라미터가 존재하지 않습니다.");
    }

    const inputNumber = req.body.verificationNumber;

    if (inputNumber !== verificationNumber) {
      throw new Error(
        "인증 번호가 일치하지 않습니다. 인증번호를 재요청하세요."
      );
    }
    res.status(200).send("올바른 인증번호입니다.");
  } catch (err) {
    next(err);
  }
});

/*** 로그인 ***/
userAuthRouter.post("/user/login", async function (req, res, next) {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await userAuthService.getUser({ email, password });

    if (user.errorMessage) {
      throw new Error(user.errorMessage);
    }

    // 출석 체크 (tall += 2)
    const beforeLoginedAt = user.loginedAt;
    let tall = user.tall;
    
    if (beforeLoginedAt < koreaNow()) {  
      tall += 2;
    }
    
    const user_id = user.id;
    const loginedAt = koreaNow();
    const toUpdate = { loginedAt, tall };

    // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 최근 접속시간 업데이트
    const updatedUser = await userAuthService.setUser({ user_id, toUpdate });

    if (updatedUser.errorMessage) {
      throw new Error(updatedUser.errorMessage);
    }

    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
});

/*** 모든 유저 검색 ***/
userAuthRouter.get(
  "/userlist",
  login_required,
  async function (req, res, next) {
    try {
      const userlist = await userAuthService.getUsers();
      res.status(200).send(userlist);
    } catch (err) {
      next(err);
    }
  }
);

/*** 이름으로 유저 검색 ***/
userAuthRouter.get(
  '/search/:word',
  login_required,
  async function (req, res, next) {
    try {
      const word = req.params.word;

      let userlist = await userAuthService.searchUsers({ word });

      if (userlist.length === 0) {
        throw new Error("검색 내용이 존재하지 않습니다.");
      }
      
      res.status(200).send(userlist);
    } catch (err) {
      next(err);
    }
  }
);

/*** 마이페이지 ***/
userAuthRouter.get(
  "/user/current",
  login_required,
  async function (req, res, next) {
    try {
      const user_id = req.currentUserId;
      const currentUserInfo = await userAuthService.getUserInfo({
        user_id,
      });

      if (currentUserInfo.errorMessage) {
        throw new Error(currentUserInfo.errorMessage);
      }

      res.status(200).send(currentUserInfo);
    } catch (err) {
      next(err);
    }
  }
);

/*** 유저 페이지 방문 ***/
userAuthRouter.get(
  "/users/:id",
  login_required,
  async function (req, res, next) {
    try {
      const user_id = req.params.id;
      const currentUserInfo = await userAuthService.getUserInfo({ user_id });

      if (currentUserInfo.errorMessage) {
        throw new Error(currentUserInfo.errorMessage);
      }

      res.status(200).send(currentUserInfo);
    } catch (err) {
      next(err);
    }
  }
);

/*** 유저 바이오 수정 ***/
userAuthRouter.put(
  "/users/:id",
  login_required,
  async function (req, res, next) {
    try {
      const user_id = req.params.id;
      const name = req.body.name ?? null;
      const password = req.body.password ?? null;
      const description = req.body.description ?? null;
      const loginedAt = req.body.loginedAt ?? null;
      const tall = req.body.tall ?? null;

      const toUpdate = { name, password, description, loginedAt, tall };

      // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트. 업데이트 요소가 없을 시 생략함
      const updatedUser = await userAuthService.setUser({ user_id, toUpdate });

      if (updatedUser.errorMessage) {
        throw new Error(updatedUser.errorMessage);
      }

      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  }
);

/*** 회원 탈퇴 ***/
userAuthRouter.delete(
  "/users/:id",
  login_required,
  async function (req, res, next) {
    try {
      const user_id = req.params.id;
      const deletedUser = await userAuthService.deleteUser({ user_id });

      if (deletedUser.errorMessage) {
        throw new Error(deletedUser.errorMessage);
      }

      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
);


/*******
* 프로필 이미지 처리
********/


// jwt 토큰 기능 확인용, 삭제해도 되는 라우터임.
userAuthRouter.get("/afterlogin", login_required, function (req, res, next) {
  res
    .status(200)
    .send(
      `안녕하세요 ${req.currentUserId}님, jwt 웹 토큰 기능 정상 작동 중입니다.`
    );
});

export { userAuthRouter };
