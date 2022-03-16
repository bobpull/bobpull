import is from "@sindresorhus/is";
import { Router } from "express";
import { userProjectService } from "../services/projectService";

const userProjectRouter = Router();

userProjectRouter.post(
  "/project/create", 
  async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req (request) 에서 데이터 가져오기
    const user_id = req.body.user_id;
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

// userProjectRouter.get(
//   "/projectlist/:id",
//   login_required,
//   async function (req, res, next) {
//     try {
//       // 전체 사용자 목록을 얻음
//       const users = await userProjectService.getProjects();
//       res.status(200).send(users);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

export { userProjectRouter };