const faker = require("faker");
const db = require("../server/data/db");
const UserDao = require("../server/data/UserDAO");

async function createSampleUsers(role) {
  try {
    await db.connect();

    const users = new UserDao();
    const user = await users.create({
      username: faker.internet.userName(),
      password: faker.internet.password(),
      role: role,
    });
    console.log(user);
  } catch (err) {
    console.log(err);
  }
}

createSampleUsers("CLIENT");
createSampleUsers("CLIENT");
createSampleUsers("ADMIN");
