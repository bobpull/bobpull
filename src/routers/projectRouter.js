import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { ProjectService } from "../services/projectService";

const ProjectRouter = Router();

/*** 프로젝트 생성 ***/
ProjectRouter.post(
  "/project/create",
  login_required,
  async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "필수 파라미터가 존재하지 않습니다."
      );
    }

    const user_id = req.currentUserId;
    const title = req.body.title;
    const description = req.body.description;
    const url = req.body.url;
    const from_date = req.body.from_date;
    const to_date = req.body.to_date;
  
    // 위 데이터를 프로젝트 db에 추가하기
    const newProject = await ProjectService.addProject({
      user_id,
      title,
      description,
      url,
      from_date,
      to_date,
    });
  
    if (newProject.errorMessage) {
      throw new Error(newProject.errorMessage);
    }
  
      res.status(201).json(newProject);
    } catch (err) {
      next(err);
    }
  } 
);

/*** 프로젝트 수정 시 선택 ***/
ProjectRouter.get(
  "/projects/:id",
  login_required,
  async function (req, res, next) {
    try {
      const id = req.params.id;
      const currentUserProject = await ProjectService.getProjectInfo({ id });
  
      if (currentUserProject.errorMessage) {
        throw new Error(currentUserProject.errorMessage);
      }
  
      res.status(200).send(currentUserProject);
    } catch (err) {
      next(err);
    }
  }
);

/*** 프로젝트 리스트 ***/
ProjectRouter.get(
  "/projectlist/:user_id",
  login_required,
  async function (req, res, next) {
    try {
      const user_id = req.params.user_id;
      const currentProjectlist = await ProjectService.getProjectlistInfo({ user_id });

      if (currentProjectlist.errorMessage) {
        throw new Error(currentProjectlist.errorMessage);
      }

      res.status(200).send(currentProjectlist);
    } catch (err) {
      next(err);
    }
  }
);

/*** 프로젝트 수정 ***/
ProjectRouter.put(
  "/projects/:id",
  login_required,
  async function (req, res, next) {
    try {
      // URI, body data 로부터 업데이트할 프로젝트 정보를 추출함.
      const id = req.params.id;
      const title = req.body.title ?? null;
      const description = req.body.description ?? null;
      const url = req.body.url ?? null;
      const from_date = req.body.from_date ?? null;
      const to_date = req.body.to_date ?? null;
  
      const toUpdate = { title, description, url, from_date, to_date };
  
      // 해당 프로젝트 아이디로 프로젝트 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
      const updated_result = await ProjectService.setProject({ id, toUpdate });
  
      if (updated_result.errorMessage) {
        throw new Error(updated_result.errorMessage);
      }
  
      res.status(200).json(updated_result);
    } catch (err) {
      next(err);
    }
  }
);

/*** 프로젝트 삭제 ***/
ProjectRouter.delete(
  "/projects/:id",
  login_required,
  async function (req, res, next) {
    try {
      const id = req.params.id;
      const deleted_result = await ProjectService.deleteUserProject({ id });
  
      if (deleted_result.errorMessage) {
        throw new Error(deleted_result.errorMessage);
      }
  
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
);

export { ProjectRouter };