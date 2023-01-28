const express = require("express");
const app = express();
app.use(express.json());
app.use(( err, req, res, next ) => {
  res.locals.error = err;
  if (err.status >= 100 && err.status < 600)
    res.status(err.status);
  else
    res.status(500);
});

const port = process.env.PORT || 3000;


const faker = require("faker");
const CardDao = require("./data/CardDao");
const NUM_SAMPLES = 3;
const cards = new CardDao();
for (let i = 0; i < NUM_SAMPLES; i++) {
  cards.create({
    word: faker.lorem.word(),
    definition: faker.lorem.paragraph(),
    deck: faker.lorem.word()
  });
}

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
    const { word, definition } = req.body;
    const data = await cards.create({ word, definition });
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

app.listen(port, () => {
  console.log(`Express app listening at port: http://localhost:${port}/`);
});



