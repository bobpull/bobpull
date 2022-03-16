import { ProjectModel } from "../schemas/project";

class Project {
  static async create({ newProject }) {
    const createdNewProject = await ProjectModel.create(newProject);
    return createdNewProject;
  }

  static async findByTitle({ title }) {
    const project = await ProjectModel.findOne({ title });
    return project;
  }
}

export { Project };