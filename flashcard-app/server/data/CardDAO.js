const Card = require("../model/Card");

class CardDao {
  constructor() {
    this.cards = [];
  }

  async create({ word, definition }) {
    const card = new Card(word, definition);
    this.cards.push(card);
    return card;
  }

  async update(id, { word, definition }) {
    const index = this.cards.findIndex((card) => card._id === id);
    if (word === undefined || definition === undefined) {
      return undefined;
    }
    this.cards[index].word = word;
    this.cards[index].definition = definition;
    return this.cards[index];
  }

  async delete(id) {
    const index = this.cards.findIndex((card) => card._id === id);
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
        (card) => card.word.includes(query) || card.definition.includes(query)
      );
    }
    return this.cards;
  }
}

module.exports = CardDao;
