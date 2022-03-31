import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { EducationService } from "../services/educationService";

const EducationRouter = Router();

/*** 학력 작성 ***/ 
EducationRouter.post(
  "/education/create",
  login_required,
  async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "필수 파라미터가 존재하지 않습니다."
      );
    }

    const user_id = req.currentUserId;
    const currentUserInfo = await EducationService.getUserInfo({ user_id });

    if (currentUserInfo.errorMessage) {
      throw new Error(currentUserInfo.errorMessage);
    }

    // req (request) 에서 데이터 가져오기
    const school = req.body.school;
    const major = req.body.major;
    const degree = req.body.degree;

    // 위 데이터를 Education db에 추가하기
    const newEducation = await EducationService.addEducation({
      user_id,
      school,
      major,
      degree,
    });

    if (newEducation.errorMessage) {
      throw new Error(newEducation.errorMessage);
    }

    res.status(201).json(newEducation);
  } catch (err) {
    next(err);
  }
});

/*** 선택한 학력 조회 ***/ 
EducationRouter.get(
  "/educations/:id",
  login_required,
  async function (req, res, next) {
    try {
      const id = req.params.id;
      const currentEducationlistInfo = await EducationService.getEducationInfo({ id });

      if (currentEducationlistInfo.errorMessage) {
        throw new Error(currentEducationlistInfo.errorMessage);
      }

      res.status(200).send(currentEducationlistInfo);
    } catch (err) {
      next(err);
    }
  }
);


/*** 선택한 학력 수정 ***/
EducationRouter.put(
  "/educations/:id",
  login_required,
  async function (req, res, next) {
    try {
      const id = req.params.id;
      // body data 로부터 업데이트할 education 정보를 추출함.
      const school = req.body.school ?? null;
      const major = req.body.major ?? null;
      const degree = req.body.degree ?? null;

      const toUpdate = { school, major, degree };

      // 해당 education 아이디로 education 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
      const updated_result = await EducationService.setEducation({ id, toUpdate });

      if (updated_result.errorMessage) {
        throw new Error(updated_result.errorMessage);
      }

      res.status(200).json(updated_result);
    } catch (err) {
      next(err);
    }
  }
);

/*** user의 학력 리스트 조회 ***/
EducationRouter.get(
  "/educationlist/:user_id",
  login_required,
  async function (req, res, next) {
    try {
      const user_id = req.params.user_id;
      const currentEducationlistInfo = await EducationService.getEducationlistInfo({ user_id });

      if (currentEducationlistInfo.errorMessage) {
        throw new Error(currentEducationlistInfo.errorMessage);
      }

      res.status(200).send(currentEducationlistInfo);
    } catch (err) {
      next(err);
    }
  }
);

/*** 해당 id인 학력 삭제 ***/
EducationRouter.delete(
  "/educations/:id",
  login_required,
  async function (req, res, next) {
    try {
      const id = req.params.id;
      const deleted_result = await EducationService.deleteUserEducation({ id });
  
      if (deleted_result.errorMessage) {
        throw new Error(deleted_result.errorMessage);
      }
  
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
);

export { EducationRouter };