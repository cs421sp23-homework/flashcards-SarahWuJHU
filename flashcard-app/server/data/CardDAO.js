const Card = require("../model/Card");
const mongoose = require("mongoose");
const ApiError = require("../model/ApiError");

class CardDao {
  constructor() {
    this.cards = [];
  }

  async create({ word, definition, deck, author }) {
    if (word === undefined || word === "") {
      throw new ApiError(400, "Every card must have a word!");
    }
    if (definition === undefined) {
      throw new ApiError(400, "Every card must have a definition!");
    }
    if (!author || !mongoose.isValidObjectId(author)) {
      throw new ApiError(400, "Every note must have an author!");
    }
    const card = await Card.create({ word, definition, deck, author });
    return card;
  }

  async update(author, id, { word, definition, deck }) {
    await this.read(author, id);
    return Card.findByIdAndUpdate(
      id,
      { word, definition, deck },
      { new: true, runValidators: true }
    );
  }

  async delete(author, id) {
    await this.read(author, id);
    return Card.findByIdAndDelete(id);
  }

  async read(author, id) {
    const card = await Card.findById(id);
    if (!author || !mongoose.isValidObjectId(author)) {
      throw new ApiError(500, "Author attribute was is invalid or missing!");
    }
    if (card === null) {
      throw new ApiError(404, "There is no note with the given ID!");
    }
    if (card.author.toString() !== author) {
      throw new ApiError(
        403,
        "You are not authorized to access this resource!"
      );
    }
    return card;
  }

  async readAll(author, query = "") {
    if (!author || !mongoose.isValidObjectId(author)) {
      throw new ApiError(500, "Author attribute was is invalid or missing!");
    }
    const cards = await Card.find({ author });
    if (query !== "") {
      return cards.filter(
        (card) =>
          card.word.includes(query) ||
          card.definition.includes(query) ||
          card.deck.includes(query)
      );
    }
    return cards;
  }
}

module.exports = CardDao;
