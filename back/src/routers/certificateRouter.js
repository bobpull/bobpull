import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { certificateAuthService } from "../services/certificateService";

const certificateAuthRouter = Router();

certificateAuthRouter.post(
  "/certificate/create",
  login_required,
  async function (req, res, next) {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error(
          "header의 Content-Type을 application/json으로 설정해주세요"
        );
      }
  
      // req (request)에서 데이터 가져오기
      const user_id = req.body.user_id;
      const title = req.body.title;
      const description = req.body.description;
      const when_date = req.body.when_date;

      // 위 데이터를 자격증 db에 추가하기
      const newCertificate = await certificateAuthService.addCertificate({
        user_id,
        title,
        description,
        when_date,
      });

      if (newCertificate.errorMessage) {
        throw new Error(newCertificate.errorMessage);
      }

      res.status(201).json(newCertificate);
    } catch (err) {
      next(err);
    }
  }
);

certificateAuthRouter.get(
  "/certificates/:id",
  login_required,
  async function(req, res, next) {
    try{
      const certificate_id = req.params.id;
      const currentCertificateInfo = await certificateAuthService.getCertificateInfo({ certificate_id });

      if (currentCertificateInfo.errorMessage) {
        throw new Error(currentCertificateInfo.errorMessage);
      }

      res.status(200).send(currentCertificateInfo);
    } catch (err) {
      next(err);
    }
  }
);

certificateAuthRouter.put(
  "/certificates/:id",
  login_required,
  async function(req, res, next) {
    try{
      // url로부터 사용자 id를 추출함.
      const certificate_id = req.params.id;
      // body data로부터 업데이트할 자격증 정보를 추출함.
      const title = req.body.title ?? null;
      const description = req.body.description ?? null;
      const when_date = req.body.when_date ?? null;

      const toUpdate = {title, description, when_date};

      // 해당 certificate_di로 자격증 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
      const updatedCertificate = await certificateAuthService.setCertificate({ certificate_id, toUpdate });

      if (updatedCertificate.errorMessage) {
        throw new Error(updatedCertificate.errorMessage);
      }
      res.status(200).json(updatedCertificate);
    } catch (err) {
      next(err);
    }
  }
);

certificateAuthRouter.get(
  "/certificatelist/:user_id",
  login_required,
  async function (req, res, next) {
    try {
      const user_id = req.params.user_id;
      const currentCertificatelistInfo = await certificateAuthService.getCertificatelistInfo({ user_id });

      if (currentCertificatelistInfo.errorMessage) {
        throw new Error(currentCertificatelistInfo.errorMessage);
      }

      res.status(200).send(currentCertificatelistInfo);
    } catch (err) {
      next(err);
    }
  }
);

export { certificateAuthRouter };