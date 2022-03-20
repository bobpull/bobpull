import { Project } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from "uuid";

class ProjectService {
  static async addProject({ user_id, title, description, from_date, to_date }) {
    const id = uuidv4();
    const newProject = { id, user_id, title, description, from_date, to_date };

    // db에 저장
    const createdNewProject = await Project.create({ newProject });

    return createdNewProject;
  }
  
  static async getProjectInfo({ id }) {
    const project = await Project.findById({ id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!project) {
      const errorMessage =
        "해당 프로젝트가 존재하지 않습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return project;
  }

  static async setProject({ user_id, id, toUpdate }) {
    // 우선 해당 id 의 프로젝트가 db에 존재하는지 여부 확인
    let project = await Project.findById({ id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!project) {
      const errorMessage =
        "해당 프로젝트가 존재하지 않습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // 업데이트 대상에 title이 있다면, 즉 title 값이 null 이 아니라면 업데이트 진행
    if (title) {
      const fieldToUpdateTitle = "title";
      const newTitle = toUpdate.title;
      const fieldToUpdateDescription = description;
      const newDescription = toUpdate.description;
      const fieldToUpdateFromDate = "from_date";
      const from_date = toUpdate.from_date;
      const fieldToUpdateToDate = "to_date";
      const to_date = toUpdate.to_date;
      project = await Project.update(id, {
        [fieldToUpdateTitle]: newTitle, 
        [fieldToUpdateDescription]: newDescription, 
        [fieldToUpdateFromDate]: from_date, 
        [fieldToUpdateToDate]: to_date
      });
    }

    return project;
  }


  static async getProjectlistInfo({ id }) {
    const projectlist = await Project.findById({ id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!projectlist || projectlist.length === 0) {
      const errorMessage =
        "해당 프로젝트가 존재하지 않습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return projectlist;
  }

  static async getUserInfo({ user_id }) {
    const user = await Award.findByUserId({ user_id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      const errorMessage =
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return projectList;
  }

  static async deleteUserProject({ id }) {
    const project = await Project.deleteById({ id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!project || project === null) {
      const errorMessage =
        "해당 프로젝트가 존재하지 않습니다.";
      return { errorMessage };
    }

    return project;
  }
}

export { ProjectService };
