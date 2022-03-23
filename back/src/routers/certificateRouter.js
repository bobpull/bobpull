import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { CertificateService } from "../services/certificateService";

const CertificateRouter = Router();

CertificateRouter.post(
  "/certificate/create",
  login_required,
  async function (req, res, next) {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error("필수 파라미터가 존재하지 않습니다.");
      }

      const user_id = req.currentUserId;
      const title = req.body.title;
      const description = req.body.description;
      const issued_at = req.body.issued_at;

      // 위 데이터를 자격증 db에 추가하기
      const newCertificate = await CertificateService.addCertificate({
        user_id,
        title,
        description,
        issued_at,
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

CertificateRouter.get(
  "/certificates/:id",
  login_required,
  async function (req, res, next) {
    try {
      const id = req.params.id;
      const currentCertificateInfo =
        await CertificateService.getCertificateInfo({ id });

      if (currentCertificateInfo.errorMessage) {
        throw new Error(currentCertificateInfo.errorMessage);
      }

      res.status(200).send(currentCertificateInfo);
    } catch (err) {
      next(err);
    }
  }
);

CertificateRouter.put(
  "/certificates/:id",
  login_required,
  async function (req, res, next) {
    try {
      const user_id = req.currentUserId;
      // url로부터 사용자 id를 추출함.
      const id = req.params.id;
      // body data로부터 업데이트할 자격증 정보를 추출함.
      const title = req.body.title ?? null;
      const description = req.body.description ?? null;
      const issued_at = req.body.issued_at ?? null;

      const toUpdate = { title, description, issued_at };

      // 해당 certificate_di로 자격증 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
      const updatedCertificate = await CertificateService.setCertificate({
        user_id,
        id,
        toUpdate,
      });

      if (updatedCertificate.errorMessage) {
        throw new Error(updatedCertificate.errorMessage);
      }
      res.status(200).json(updatedCertificate);
    } catch (err) {
      next(err);
    }
  }
);

CertificateRouter.get(
  "/certificatelist/:user_id",
  login_required,
  async function (req, res, next) {
    try {
      const user_id = req.params.user_id;
      const currentCertificatelistInfo =
        await CertificateService.getCertificatelistInfo({ user_id });

      if (currentCertificatelistInfo.errorMessage) {
        throw new Error(currentCertificatelistInfo.errorMessage);
      }

      res.status(200).send(currentCertificatelistInfo);
    } catch (err) {
      next(err);
    }
  }
);

CertificateRouter.delete(
  "/certificates/:id",
  login_required,
  async function (req, res, next) {
    try {
      const id = req.params.id;
      const deletedCertificate = await CertificateService.deleteUserCertificate(
        { id }
      );

      if (deletedCertificate.errorMessage) {
        throw new Error(deletedCertificate.errorMessage);
      }

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
);

export { CertificateRouter };
