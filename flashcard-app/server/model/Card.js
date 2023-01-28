const mongoose = require("mongoose");
const CardSchema = new mongoose.Schema({
  word: { type: String },
  definition: { type: String },
  deck: { type: String }
});
const Card = mongoose.model("Card", CardSchema);
module.exports = Card;
