const User = require("../model/User");
const ApiError = require("../model/ApiError");
const { hashPassword } = require("../util/hashing");

class UserDao {

  async create({ username, password, role }) {
    if (username === undefined || username === "") {
      throw new ApiError(400, "Every user must have a username!");
    }

    if (password === undefined || password === "") {
      throw new ApiError(400, "Every user must have a password!");
    }

    if (role !== "ADMIN" && role !== "CLIENT") {
      throw new ApiError(400, "Every user must have a valid role!");
    }
    const hash = await hashPassword(password);
    const user = await User.create({ username, password: hash, role });
    return user;
  }

  // to update or reset password, or to change role.
  async update(id, { password, role }) {
    const user = await User.findByIdAndUpdate(
      id,
      { password, role },
      { new: true, runValidators: true }
    );

    if (user === null) {
      throw new ApiError(404, "There is no user with the given ID!");
    }

    return user;
  }

  async delete(id) {
    const user = await User.findByIdAndDelete(id);

    if (user === null) {
      throw new ApiError(404, "There is no user with the given ID!");
    }

    return user;
  }

  // returns an empty array if there is no user with the given ID
  async read(id) {
    const user = await User.findById(id);
    return user ? user : [];
  }

  // returns null if no user matches the search query
  async readOne(username) {
    const user = await User.findOne({ username });
    return user;
  }

  // returns an empty array if there is no user in the database
  //  or no user matches the user role query
  async readAll(role = "") {
    if (role !== "") {
      const users = await User.find({ role });
      return users;
    }
    const users = await User.find({});
    return users;
  }
}

module.exports = UserDao;
