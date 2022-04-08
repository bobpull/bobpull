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

  static async findByUserId({ user_id }) {
    const project = await ProjectModel.find({ user_id });
    return project;
  }

  static async update(id, fieldToUpdate) {
    const filter = { id };
    const update = fieldToUpdate;
    const option = { returnOriginal: false };
    
    const updatedProject = await ProjectModel.findOneAndUpdate(
      filter,
      update,
      option
      );
      return updatedProject;
    }

  static async deleteById({ id }) {
    const project = await ProjectModel.deleteOne({ id });
    return project;
  }

  static async deleteByUserId({ user_id }) {
    const project = await ProjectModel.deleteMany({ user_id });
    return project;
  }
}

export { Project };