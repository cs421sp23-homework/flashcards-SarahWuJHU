const mongoose = require("mongoose");
const CardSchema = new mongoose.Schema({
  word: { type: String, required: true },
  definition: { type: String , required: true},
  deck: { type: String, required: true}
});
const Card = mongoose.model("Card", CardSchema);
module.exports = Card;
