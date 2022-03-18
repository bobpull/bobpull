import { ProjectModel } from "../schemas/project";

class Project {
  static async create({ newProject }) {
    const createdNewProject = await ProjectModel.create(newProject);
    return createdNewProject;
  }

  static async findByTitle({ user_id, title }) {
    const project = await ProjectModel.findOne({ user_id, title });
    return project;
  }

  static async findById({ _id }) {
    const project = await ProjectModel.findOne({ _id });
    return project;
  }

  static async deleteById({ _id }) {
    const project = await ProjectModel.deleteOne({ _id });
    return project;
  }

  static async findAll() {
    const project = await ProjectModel.find({});
    return project;
  }

  static async update({ _id, fieldToUpdate, newValue }) {
    const filter = { _id };
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
