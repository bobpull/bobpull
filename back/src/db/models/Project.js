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

  static async findById({ id }) {
    const project = await ProjectModel.findOne({ _id: id });
    return project;
  }

  static async findAll() {
    const project = await ProjectModel.find({});
    return project;
  }
}

export { Project };
