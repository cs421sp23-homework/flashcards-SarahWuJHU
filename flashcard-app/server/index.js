const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Flashcard API!");
});

app.listen(port, () => {
  console.log(`Express app listening at port: http://localhost:${port}/`);
});
