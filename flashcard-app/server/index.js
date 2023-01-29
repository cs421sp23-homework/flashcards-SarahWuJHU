const express = require("express");
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
const db = require("./data/db");
const cards = require("./routes/cards.js");
const users = require("./routes/users.js");
const auth = require("./routes/auth.js");

db.connect()

app.get("/", (req, res) => {
  res.send("Flashcard API!");
});

// routing
app.use(cards);
app.use(users);
app.use(auth);

app.listen(port, () => {
  console.log(`Express app listening at port: http://localhost:${port}/`);
});



