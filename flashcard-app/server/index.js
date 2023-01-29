const express = require("express");
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
const db = require("./data/db");
const cards = require("./routes/cards.js");
const users = require("./routes/users.js");
const auth = require("./routes/auth.js");
const cors = require("cors");
app.use(cors());

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

// Global error handler!
app.use((err, req, res, next) => {
  if (err) {
    // debug(err);
    return res
      .status(err.status || 500)
      .json({message: err.message || "Internal server error!"});
  }
  next();
});



