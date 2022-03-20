import { ProjectModel } from "../schemas/project";

class Project {
  static async create({ newProject }) {
    const createdNewProject = await ProjectModel.create(newProject);
    return createdNewProject;
  }

  static async findById({ id }) {
    const project = await ProjectModel.findOne({ id });
    return project;
  }

  static async deleteById({ id }) {
    const project = await ProjectModel.deleteOne({ id });
    return project;
  }

  static async findAll() {
    const project = await ProjectModel.find({});
    return project;
  }

  static async update({ id, fieldToUpdate, newValue }) {
    const filter = { id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };
    
    const updatedProject = await ProjectModel.findOneAndUpdate(
      filter,
      update,
      option
      );
      return updatedProject;
    }
    
    static async findByUserId({ user_id }) {
      const projectList = await ProjectModel.find({ user_id });
      return projectList;
    }
}

export { Project };
