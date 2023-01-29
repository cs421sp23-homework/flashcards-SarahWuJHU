const express = require("express");
const CardDao = require("../data/CardDao");

const router = express.Router();
const cards = new CardDao();

router.get("/api/cards", async (req, res) => {
  const { query } = req.query;
  const data = await cards.readAll(query);
  res.json({ data });
});

router.get("/api/cards/:id", async (req, res) => {
  const { id } = req.params;
  const data = await cards.read(id);
  res.json({ data: data ? data : [] });
});

router.post("/api/cards", async (req, res) => {
  try {
    const { word, definition, deck } = req.body;
    const data = await cards.create({ word, definition, deck });
    res.status(201).json({ data });
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
});

router.delete("/api/cards/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await cards.delete(id);
    res.json({ data });
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
});

router.put("/api/cards/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { word, definition, deck } = req.body;
    const data = await cards.update(id, { word, definition, deck });
    res.json({ data });
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
});

module.exports = router;
