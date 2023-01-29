const express = require("express");
const UserDao = require("../data/UserDao");
const ApiError = require("../model/ApiError");
const { verifyToken, decodeToken, parseBearer } = require("../util/token");

const router = express.Router();
const users = new UserDao();

const checkAdmin = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization ? parseBearer(authorization) : "";
  const valid = await verifyToken(token);
  const user = decodeToken(token);
  if (!valid || user.role !== "ADMIN") {
    next(new ApiError(403, "You are not authorized to perform this action."));
  }
  next();
};

router.get("/api/users", checkAdmin, async (req, res, next) => {
  try {
    const {username, role} = req.query;
    if (username && role) {
      throw new ApiError(
        400,
        "You must query the database based on either a username or user role."
      );
    } else {
      const data = username
        ? await users.readOne(username)
        : await users.readAll(role);
      res.json({data: data ? data : []});
    }
  } catch (err) {
    next(err);
  }
});

router.get("/api/users/:id", checkAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await users.read(id);
    res.json({ data: data ? data : [] });
  } catch (err) {
    next(err);
  }
});

router.post("/api/users", checkAdmin, async (req, res, next) => {
  try {
    const { username, password, role } = req.body;
    const data = await users.create({ username, password, role });
    res.status(201).json({ data });
  } catch (err) {
    next(err);
  }
});

router.delete("/api/users/:id", checkAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await users.delete(id);
    res.json({ data });
  } catch (err) {
    next(err);
  }
});

router.put("/api/users/:id", checkAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { password, role } = req.body;
    if (!password && !role) {
      throw new ApiError(400, "You must provide at least one user attribute!");
    }
    const data = await users.update(id, { password, role });
    res.json({ data });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
