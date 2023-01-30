const express = require("express");
const UserDao = require("../data/UserDao");
const ApiError = require("../model/ApiError");
const { verifyPassword } = require("../util/hashing");
const { createToken, verifyToken } = require("../util/token");

const router = express.Router();
const users = new UserDao();

router.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await users.create({ username, password, role: "CLIENT" });
    const token = createToken(user);
    return res.status(201).json({
      message: "Registration successful!",
      token: token,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/authenticate", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new ApiError(400, "You must provide both username and password.");
    }

    const user = await users.readOne(username);
    const hashedPassword = (user && user[0] && user[0].password) || "";

    // Authentication!
    const isAuthenticated = await verifyPassword(password, hashedPassword);
    if (!isAuthenticated) {
      throw new ApiError(403, "Wrong username or password!");
    } else {
      const token = createToken(user[0]);
      return res.json({
        message: "Authentication successful!",
        token: token,
      });
    }
  } catch (err) {
    next(err);
  }
});

router.post("/verify", async (req, res, next) => {
  try {
    if (!req.body || !req.body.token) {
      throw new ApiError(400, "You must provide a token in request's payload!");
    }

    const { token } = req.body;
    const isValid = await verifyToken(token);

    if (!isValid) {
      throw new ApiError(403, "Invalid or expired token!");
    }

    return res.json({
      message: "Token verified, and it is valid!",
      token: token,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;