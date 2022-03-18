import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { userProjectService } from "../services/projectService";

const userProjectRouter = Router();

userProjectRouter.post(
  "/project/create",
  login_required,
  async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
    const user_id = req.currentUserId;
    const currentUserInfo = await userProjectService.getUserInfo({ user_id });

    if (currentUserInfo.errorMessage) {
      throw new Error(currentUserInfo.errorMessage);
    }

    // req (request) 에서 데이터 가져오기
    const title = req.body.title;
    const description = req.body.description;
    const from_date = req.body.from_date;
    const to_date = req.body.to_date;
  
    // 위 데이터를 프로젝트 db에 추가하기
    const newProject = await userProjectService.addProject({
      user_id,
      title,
      description,
      from_date,
      to_date,
    });
  
    if (newProject.errorMessage) {
      throw new Error(newProject.errorMessage);
    }
  
      res.status(201).json(newProject);
    } catch (error) {
      next(error);
    }
  } 
);

userProjectRouter.get(
  "/projects/:id",
  login_required,
  async function (req, res, next) {
    try {
      const _id = req.params.id;
      const currentUserProject = await userProjectService.getProjectInfo({ _id });
  
      if (currentUserProject.errorMessage) {
        throw new Error(currentUserProject.errorMessage);
      }
  
      res.status(200).send(currentUserProject);
    } catch (error) {
      next(error);
    }
  }
);

userProjectRouter.put(
  "/projects/:id",
  login_required,
  async function (req, res, next) {
    try {
      // URI, body data 로부터 업데이트할 프로젝트 정보를 추출함.
      const _id = req.params.id;
      const title = req.body.title ?? null;
      const description = req.body.description ?? null;
      const from_date = req.body.from_date ?? null;
      const to_date = req.body.to_date ?? null;
  
      const toUpdate = { title, description, from_date, to_date };
  
      // 해당 프로젝트 아이디로 프로젝트 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
      const updatedProject = await userProjectService.setProject({ _id, toUpdate });
  
      if (updatedProject.errorMessage) {
        throw new Error(updatedProject.errorMessage);
      }
  
      res.status(200).json(updatedProject);
    } catch (error) {
      next(error);
    }
  }
);

userProjectRouter.get(
  "/projectlist/:user_id",
  login_required,
  async function (req, res, next) {
    try {
      const user_id = req.params.user_id;
      const currentUserProject = await userProjectService.getCurrentUserProject({ user_id });

      if (currentUserProject.errorMessage) {
        throw new Error(currentUserProject.errorMessage);
      }

      res.status(200).send(currentUserProject);
    } catch (error) {
      next(error);
    }
  }
);

userProjectRouter.delete(
  "/projects/:id",
  login_required,
  async function (req, res, next) {
    try {
      const _id = req.params.id;
      const { title } = await userProjectService.getUserProject({ _id });
      const deletedProject = await userProjectService.deleteUserProject({ _id });
  
      if (deletedProject.errorMessage) {
        throw new Error(deletedProject.errorMessage);
      }
  
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
);

export { userProjectRouter };