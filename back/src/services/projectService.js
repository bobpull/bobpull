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

  static async setProject({ id, toUpdate }) {
    // 우선 해당 id 의 유저가 db에 존재하는지 여부 확인
    let project = await Project.findById({ id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!project) {
      const errorMessage =
        "프로젝트가 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // 업데이트 대상에 name이 있다면, 즉 name 값이 null 이 아니라면 업데이트 진행
    if (toUpdate.title) {
      const fieldToUpdate = "title";
      const newValue = toUpdate.title;
      project = await Project.update({ id, fieldToUpdate, newValue });
    }

    if (toUpdate.description) {
      const fieldToUpdate = "description";
      const newValue = toUpdate.description;
      project = await Project.update({ id, fieldToUpdate, newValue });
    }

    if (toUpdate.from_date) {
      const fieldToUpdate = "from_date";
      const newValue = toUpdate.from_date;
      project = await Project.update({ id, fieldToUpdate, newValue });
    }

    if (toUpdate.to_date) {
      const fieldToUpdate = "to_date";
      const newValue = toUpdate.to_date;
      project = await Project.update({ id, fieldToUpdate, newValue });
    }

    return project;
  }

  static async getUserAllProject({ user_id }) {
    const project = await Project.findAll({ user_id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!project) {
      const errorMessage =
        "프로젝트를 생성하지 않았습니다.";
      return { errorMessage };
    }

    return project;
  }

  static async getUserProject({ id }) {
    const project = await Project.findById({ id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!project) {
      const errorMessage =
        "해당 프로젝트는 존재하지 않습니다.";
      return { errorMessage };
    }

    return project;
  }
}

export { userProjectService };