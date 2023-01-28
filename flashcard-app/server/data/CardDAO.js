const Card = require("../model/Card");
const ApiError = require("../model/ApiError");

class CardDao {
  constructor() {
    this.cards = [];
  }

  async create({ word, definition,deck}) {
    if (word === undefined || word === "") {
      throw new ApiError(400, "Every card must have a word!");
    }
    if (definition === undefined) {
      throw new ApiError(400, "Every card must have a definition!");
    }
    const card = new Card(word, definition,deck);
    this.cards.push(card);
    return card;
  }

  async update(id, { word, definition, deck}) {
    const index = this.cards.findIndex((card) => card._id === id);
    if (index === -1) {
      throw new ApiError(404, "There is no card with the given ID!");
    }
    
    if (word === undefined || definition === undefined) {
      return this.cards[index];
    }
    this.cards[index].word = word;
    this.cards[index].definition = definition;
    if (deck !== undefined) {
      this.cards[index].deck = deck;
    }
    return this.cards[index];
  }

  async delete(id) {
    const index = this.cards.findIndex((card) => card._id === id);
    if (index === -1) {
      throw new ApiError(404, "There is no card with the given ID!");
    }
    const card = this.card[index];
    this.cards.splice(index, 1);
    return card
  }

  async read(id) {
    return this.cards.find((card) => card._id === id);
  }

  async readAll(query = "") {
    if (query !== "") {
      return this.cards.filter(
        (card) => card.word.includes(query) || card.definition.includes(query) || card.deck.includes(query)
      );
    }
    return this.cards;
  }
}

module.exports = CardDao;
