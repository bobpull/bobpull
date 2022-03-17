import { CertificateModel } from "../schemas/certificate";

class Certificate {
  static async create({ newCertificate }) {
    const createdNewCertificate = await CertificateModel.create(newCertificate);
    return createdNewCertificate;
  }

  static async findByTitleWithDescription({ title, description }) {
    const titleWithDescription = await CertificateModel.findOne({ title, description });
    return titleWithDescription;
  }

  static async findById({ certificate_id }) {
    const certificate = await CertificateModel.findOne({ _id: certificate_id });
    return certificate;
  }

  static async update({ certificate_id, fieldToUpdate, newValue }) {
    const filter = { _id: certificate_id };
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
    const certificatelist = await CertificateModel.find({ user_id: user_id });
    return certificatelist;
  }
}

export { Certificate };