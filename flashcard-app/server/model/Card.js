const { v4: uuidv4 } = require("uuid");
class Card {
  constructor(word, definition,deck) {
    this.word = word;
    this.definition = definition;
    this._id = uuidv4();
    this.deck = deck;
  }
}

module.exports = Card;
