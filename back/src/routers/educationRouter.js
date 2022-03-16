import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { userEducationService } from "../services/educationService";

const userEducationRouter = Router();

userEducationRouter.post(
  "/education/create", 
  login_required,
  async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    const user_id = req.currentUserId;
    const currentUserInfo = await userEducationService.getUserInfo({ user_id });

    if (currentUserInfo.errorMessage) {
      throw new Error(currentUserInfo.errorMessage);
    }

    // req (request) 에서 데이터 가져오기
    const school = req.body.school;
    const major = req.body.major;
    const position = req.body.position;

    // 위 데이터를 유저 db에 추가하기
    const newEducation = await userEducationService.addEducation({
      user_id,
      school,
      major,
      position,
    });

    if (newEducation.errorMessage) {
      throw new Error(newEducation.errorMessage);
    }

    res.status(201).json(newEducation);
  } catch (error) {
    next(error);
  }
});

userEducationRouter.get(
  "/educations/:id",
  login_required,
  async function (req, res, next) {
    try {
      const _id = req.params.id;
      const currentUserEducation = await userEducationService.getUserEducation({ _id });

      if (currentUserEducation.errorMessage) {
        throw new Error(currentUserEducation.errorMessage);
      }

      res.status(200).send(currentUserEducation);
    } catch (error) {
      next(error);
    }
  }
);

userEducationRouter.put(
  "/educations/:id",
  login_required,
  async function (req, res, next) {
    try {
      // URI로부터 사용자 id를 추출함.
      const _id = req.params.id;
      // body data 로부터 업데이트할 사용자 정보를 추출함.
      const school = req.body.school ?? null;
      const major = req.body.major ?? null;
      const position = req.body.position ?? null;

      const toUpdate = { school, major, position };

      // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
      const updatedEducation = await userEducationService.setEducation({ _id, toUpdate });

      if (updatedEducation.errorMessage) {
        throw new Error(updatedEducation.errorMessage);
      }

      res.status(200).json(updatedEducation);
    } catch (error) {
      next(error);
    }
  }
);

userEducationRouter.get(
  "/educationlist/:user_id",
  login_required,
  async function (req, res, next) {
    try {
      const user_id = req.params.user_id;
      const currentUserEducation = await userEducationService.getCurrentUserEducation({ user_id });

      if (currentUserEducation.errorMessage) {
        throw new Error(currentUserEducation.errorMessage);
      }

      res.status(200).send(currentUserEducation);
    } catch (error) {
      next(error);
    }
  }
);

export { userEducationRouter };