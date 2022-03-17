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

  static async findByUserId({ user_id }) {
    const project = await ProjectModel.find({ user_id });
    return project;
  }

  static async findProjectByUserId({ user_id }) {
    const project = await ProjectModel.find({ user_id });
    return project;
  }

  static async findById({ _id }) {
    const project = await ProjectModel.findOne({ _id });
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
}

export { Project };
