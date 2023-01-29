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
    return {
      _id: user._id.toString(),
      username: user.username,
      password: user.password,
      role: user.role,
    };
  }

  // to update or reset password, or to change role.
  async update(id, { password, role }) {
    await this.read(id);
    return User.findByIdAndUpdate(
      id,
      { password, role },
      { new: true, runValidators: true }
    )
      .lean()
      .select("-__v");
  }

  async delete(id) {
    await this.read(id);
    return User.findByIdAndDelete(id).lean().select("-__v");
  }

  async read(id) {
    const user = await User.findById(id).lean().select("-__v");

    if (user === null) {
      throw new ApiError(404, "There is no user with the given ID!");
    }

    return user;
  }

  // returns empty array if no user matches the username
  async readOne(username) {
    return User.find({ username }).lean().select("-__v");
  }

  // returns an empty array if there is no user in the database
  //  or no user matches the user role query
  async readAll(role = "") {
    const filter = role === "" ? {} : { role };
    return User.find(filter).lean().select("-__v");
  }
}

module.exports = UserDao;
