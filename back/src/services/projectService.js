import { Project } from "../db"; 
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

class userProjectService {
  static async addProject({ user_id, title, description, from_date, to_date }) {
    // 프로젝트 중복 확인
    const project = await Project.findByTitle({ title });
    if (project) {
      const errorMessage =
        "이 프로젝트는 이미 존재합니다.";
      return { errorMessage };
    }

    const newProject = { user_id, title, description, from_date: to_date };

    // db에 저장
    // 문제 없이 db 저장 완료되었으므로 에러가 없음.
    const createdNewProject = await Project.create({ newProject });
    createdNewProject.errorMessage = null; 

    return createdNewProject;
  }
}

export { userProjectService };