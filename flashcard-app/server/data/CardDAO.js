const Card = require("../model/Card");
const ApiError = require("../model/ApiError");

class CardDao {
  constructor() {
    this.cards = [];
  }

  async create({ word, definition, deck }) {
    if (word === undefined || word === "") {
      throw new ApiError(400, "Every card must have a word!");
    }
    if (definition === undefined) {
      throw new ApiError(400, "Every card must have a definition!");
    }
    const card = await Card.create({ word, definition, deck });
    return card;
  }

  async update(id, { word, definition, deck }) {
    const card = await Card.findByIdAndUpdate(
      id,
      { word, definition, deck },
      { new: true, runValidators: true }
    );
    if (card === null) {
      throw new ApiError(404, "There is no card with the given ID!");
    }
    return card;
  }

  async delete(id) {
    const card = await Card.findByIdAndDelete(id);
    if (card === null) {
      throw new ApiError(404, "There is no card with the given ID!");
    }
    return card;
  }

  async read(id) {
    const card = await Card.findById(id);
    return card ? card : [];
  }

  async readAll(query = "") {
    if (query !== "") {
      const cards = await Card.find().or([
        { word: { $regex: query, $options: "i" } },
        { definition: { $regex: query, $options: "i" } },
        { deck: { $regex: query, $options: "i" } },
      ]);
      return cards;
    }
    const cards = await Card.find({});
    return cards;
  }
}

module.exports = CardDao;
