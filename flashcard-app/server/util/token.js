const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");

const parseBearer = (bearer) => {
  const [_, token] = bearer.trim().split(" ");
  return token;
};

const createToken = (user) => {
  return jwt.sign(
    {
      sub: user._id,
      username: user.username,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      algorithm: "HS256",
      expiresIn: "2d",
    }
  );
};

const verifyToken = (token) => {
  return new Promise((resolve, _reject) => {
    jwt.verify(
      token,
      process.env.JWT_SECRET,
      { algorithms: ["HS256"] },
      (err, _decoded) => {
        if (err) {
          resolve(false);
        } else {
          resolve(true);
        }
      }
    );
  });
};

const decodeToken = (token) => {
  const decoded = jwt_decode(token);
  return decoded;
}

module.exports = {
  createToken,
  verifyToken,
  decodeToken,
  parseBearer
};
