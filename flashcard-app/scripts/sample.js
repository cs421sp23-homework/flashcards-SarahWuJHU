const faker = require("faker");
const db = require("../server/data/db");
const User = require("../server/model/User");
const Card = require("../server/model/Card");
const UserDao = require("../server/data/UserDao");
const CardDao = require("../server/data/CardDao");

const users = new UserDao();
const cards = new CardDao();

async function createSampleUser(username, role) {
  return users.create({
    username: username,
    password: username,
    role,
  });
}

async function createSampleCards(author, numCards) {
  for(let i = 0; i < numCards; i++) {
    await cards.create({
      word: faker.lorem.word(),
      definition: faker.lorem.paragraph(),
      deck: faker.lorem.word(),
      author,
    });
  }
}

async function createSampleData() {
  try {
    await db.connect();         // this should not be your production database!!
    await User.deleteMany({});  // delete all users!
    await Card.deleteMany({});  // delete all Cards! 

    const user1 = await createSampleUser("client1", "CLIENT");
    await createSampleCards(user1._id, 3);

    const user2 = await createSampleUser("client2", "CLIENT");
    await createSampleCards(user2._id, 4);
    
    const user3 = await createSampleUser("admin1", "ADMIN");
    await createSampleCards(user3._id, 2);

    console.log("Samples created!");
  } catch (err) {
    console.log(err);
  }
}

createSampleData();
