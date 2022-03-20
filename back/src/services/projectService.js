import { Project } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from "uuid";

class userProjectService {
  static async addProject({ user_id, title, description, from_date, to_date }) {
    const id = uuidv4();
    const newProject = { id, user_id, title, description, from_date, to_date };

    // db에 저장
    // 문제 없이 db 저장 완료되었으므로 에러가 없음.
    const createdNewProject = await Project.create({ newProject });
    createdNewProject.errorMessage = null; 

    return createdNewProject;
  }
  
  static async getProjectInfo({ id }) {
    const project = await Project.findById({ id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!project) {
      const errorMessage =
        "해당 프로젝트가 존재하지 않습니다.";
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
        "해당 프로젝트가 존재하지 않습니다.";
      return { errorMessage };
    }

    // 업데이트 대상에 title이 있다면, 즉 title 값이 null 이 아니라면 업데이트 진행
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


  static async getUserProject({ id }) {
    const project = await Project.findById({ id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!project) {
      const errorMessage =
        "해당 프로젝트가 존재하지 않습니다.";
      return { errorMessage };
    }

    return project;
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
  
  static async getCurrentUserProject({ user_id }) {
    const projectList = await Project.findByUserId({ user_id });
    
    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!projectList || projectList.length === 0) {
      const errorMessage =
      "프로젝트가 존재하지 않습니다.";
      return { errorMessage };
    }

    return projectList;
  }

  static async getUserInfo({ user_id }) {
    const project = await Project.findByUserId({ user_id });
    console.log(project);
    
    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!project) {
      const errorMessage =
      "유저가 존재하지 않습니다.";
      return { errorMessage };
    }
    
    return project;
  }
}

export { userProjectService };
