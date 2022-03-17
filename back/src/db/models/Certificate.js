import { CertificateModel } from "../schemas/certificate";

class Certificate {
  static async create({ newCertificate }) {
    const createdNewCertificate = await CertificateModel.create(newCertificate);
    return createdNewCertificate;
  }

  static async findByTitleWithDescription({ user_id, title, description }) {
    const titleWithDescription = await CertificateModel.findOne({ user_id, title, description });
    return titleWithDescription;
  }

  static async findById({ _id }) {
    const certificate = await CertificateModel.findOne({ _id });
    return certificate;
  }

  static async update({ _id, fieldToUpdate, newValue }) {
    const filter = { _id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedCertificate = await CertificateModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedCertificate;
  }

  static async findByUserId({ user_id }) {
    const certificatelist = await CertificateModel.find({ user_id });
    return certificatelist;
  }
}

export { Certificate };