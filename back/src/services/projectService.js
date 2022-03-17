import { Project } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.

class userProjectService {
  static async addProject({ user_id, title, description, from_date, to_date }) {
    // title 중복 확인
    const isTitle = await Project.findByTitle({ title });
    if (isTitle) {
      const errorMessage =
        "이 프로젝트는 이미 존재합니다.";
      return { errorMessage };
    }

    const newProject = { user_id, title, description, from_date, to_date };

    // db에 저장
    // 문제 없이 db 저장 완료되었으므로 에러가 없음.
    const createdNewProject = await Project.create({ newProject });
    createdNewProject.errorMessage = null; 

    return createdNewProject;
  }

  static async getUserInfo({ user_id }) {
    const user = await Project.findByUserId({ user_id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      const errorMessage =
        "유저가 존재하지 않습니다.";
      return { errorMessage };
    }

    return user;
  }

  static async setProject({ _id, toUpdate }) {
    // 우선 해당 id 의 프로젝트가 db에 존재하는지 여부 확인
    let project = await Project.findById({ _id });

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
      project = await Project.update({ _id, fieldToUpdate, newValue });
    }

    if (toUpdate.description) {
      const fieldToUpdate = "description";
      const newValue = toUpdate.description;
      project = await Project.update({ _id, fieldToUpdate, newValue });
    }

    if (toUpdate.from_date) {
      const fieldToUpdate = "from_date";
      const newValue = toUpdate.from_date;
      project = await Project.update({ _id, fieldToUpdate, newValue });
    }

    if (toUpdate.to_date) {
      const fieldToUpdate = "to_date";
      const newValue = toUpdate.to_date;
      project = await Project.update({ _id, fieldToUpdate, newValue });
    }

    return project;
  }

  static async getUserProject({ _id }) {
    const project = await Project.findById({ _id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!project) {
      const errorMessage =
        "해당 프로젝트가 존재하지 않습니다.";
      return { errorMessage };
    }

    return project;
  }

  static async deleteUserProject({ _id }) {
    const project = await Project.deleteById({ _id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!project || project === null) {
      const errorMessage =
        "해당 프로젝트가 존재하지 않습니다.";
      return { errorMessage };
    }

    return project;
  }

  static async getCurrentUserProject({ user_id }) {
    const projectList = await (await Project.findProjectByUserId({ user_id }))
      .map((element) => {
        return element.title
      });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!projectList || projectList.length === 0) {
      const errorMessage =
        "프로젝트가 존재하지 않습니다.";
      return { errorMessage };
    }

    return projectList;
  }
}

export { userProjectService };
