const { v4: uuidv4 } = require("uuid");
class Card {
  constructor(word, definition) {
    this.word = word;
    this.definition = definition;
    this._id = uuidv4();
    this.deck = 'idk';
  }
}

module.exports = Card;
