const express = require("express");
const CardDao = require("../data/CardDao");
const { verifyToken, decodeToken } = require("../util/token");
const router = express.Router();
const cards = new CardDao();

const checkToken = async (req, res, next) => {
  const { authorization } = req.headers;
  const [_, token] = authorization.trim().split(" ");
  const valid = await verifyToken(token);
  if (!valid) {
    return res.status(403).json({
      message:
        "You are not authorized to access this resource.",
    });
  }
  req.user = decodeToken(token);
  next();
};

router.get("/api/cards", checkToken, async (req, res) => {
  const { query } = req.query;
  const data = await cards.readAll(req.user.sub, query);
  res.json({ data });
});

router.get("/api/cards/:id", checkToken, async (req, res) => {
  try {
    const { id } = req.params;
    const data = await cards.read(req.user.sub, id);
    res.json({ data });
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
});

router.post("/api/cards", checkToken, async (req, res) => {
  try {
    const { word, definition, deck } = req.body;
    const data = await cards.create({ word, definition, deck, author:req.user.sub});
    res.status(201).json({ data });
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
});

router.delete("/api/cards/:id", checkToken, async (req, res) => {
  try {
    const { id } = req.params;
    const data = await cards.delete(req.user.sub,id);
    res.json({ data });
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
});

router.put("/api/cards/:id", checkToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { word, definition, deck } = req.body;
    const data = await cards.update(req.user.sub, id, { word, definition, deck });
    res.json({ data });
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
});

module.exports = router;
