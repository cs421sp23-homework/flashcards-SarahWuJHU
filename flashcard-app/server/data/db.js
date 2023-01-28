const mongoose = require("mongoose");

const URI = `mongodb+srv://flashcardadmin:dine5340FORM@flashcard.vhxtsdf.mongodb.net/?retryWrites=true&w=majority`;

async function connect() {
  try {
    await mongoose.connect(URI);
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.log(err);
  }
}

module.exports = { connect };
