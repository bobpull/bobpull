import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { certificateAuthService } from "../services/certificateService";

const certificateAuthRouter = Router();

certificateAuthRouter.post("/certificate/create", async function (req, res, next) {

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
});

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


export { certificateAuthRouter };