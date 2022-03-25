import { CertificateModel } from "../schemas/certificate";

class Certificate {
  static async create({ newCertificate }) {
    const createdNewCertificate = await CertificateModel.create(newCertificate);
    return createdNewCertificate;
  }

  static async findById({ id }) {
    const certificate = await CertificateModel.findOne({ id });
    return certificate;
  }

  static async update(id, fieldToUpdate) {
    const filter = { id };
    const update = fieldToUpdate;
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

  static async deleteById({ id }) {
    const certificate = await CertificateModel.deleteOne({ id });
    return certificate;
  }

  static async deleteByUserId({ user_id }) {
    const certificates = await CertificateModel.deleteMany({ user_id });
    return certificates;
  }
}

export { Certificate };
