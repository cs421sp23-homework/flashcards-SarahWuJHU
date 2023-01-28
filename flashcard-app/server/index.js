const express = require("express");
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
const db = require("./data/db");
const CardDAO = require("./data/CardDao");
const cards = new CardDAO();
db.connect()

app.get("/", (req, res) => {
  res.send("Flashcard API!");
});

app.get("/api/cards", async (req, res) => {
  const { query } = req.query;
  const data = await cards.readAll(query);
  res.json({ data });
});

app.get("/api/cards/:id", async (req, res) => {
  const { id } = req.params;
  const data = await cards.read(id);
  res.json({ data: data ? data : [] });
});

app.post("/api/cards", async (req, res) => {
  try {
    const { word, definition, deck } = req.body;
    const data = await cards.create({ word, definition, deck});
    res.status(201).json({ data });
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
});

app.delete("/api/cards/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await cards.delete(id);
    res.json({ data });
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
});

app.put("/api/cards/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { word, definition, deck } = req.body;
    const data = await cards.update(id, { word, definition, deck });
    res.json({ data });
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
});

app.listen(port, () => {
  console.log(`Express app listening at port: http://localhost:${port}/`);
});



