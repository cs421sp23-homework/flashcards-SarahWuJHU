const mongoose = require("mongoose");
const CardSchema = new mongoose.Schema({
  word: { type: String, required: true },
  definition: { type: String , required: true},
  deck: { type: String, required: true},
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});
const Card = mongoose.model("Card", CardSchema);
module.exports = Card;
