import { LetterModel } from "../schemas/letter";

class Letter {
  static async create({ newLetter }) {
    const createdNewLetter = await LetterModel.create(newLetter);
    return createdNewLetter;
  }

  static async findByUserId({ user_id }) {
    const letter = await LetterModel.find({ user_id });
    return letter;
  }

  static async findById({ id }) {
    const letter = await LetterModel.findOne({ id });
    return letter;
  }

  static async deleteById({ id }) {
    const Letter = await LetterModel.deleteOne({ id });
    return Letter;
  }
}

export { Letter };