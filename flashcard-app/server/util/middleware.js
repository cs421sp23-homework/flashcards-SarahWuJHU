const ApiError = require("../model/ApiError");
const { verifyToken, decodeToken, parseBearer } = require("./token");

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

const checkToken = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization ? parseBearer(authorization) : "";
  const valid = await verifyToken(token);
  if (!valid) {
    next(new ApiError(403, "You are not authorized to perform this action."));
  }
  req.user = decodeToken(token);
  next();
};

const globalErrorHandler = (err, req, res, next) => {
  if (err) {
    // debug(err);
    return res
      .status(err.status || 500)
      .json({ message: err.message || "Internal server error!" });
  }
  next();
};

module.exports = {
  checkToken,
  checkAdmin,
  globalErrorHandler,
};