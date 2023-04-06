const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../model/user");
module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  // console.log("Authorization",!authHeader)
  if (!authHeader && authHeader === undefined) {
    const error = new Error("not Authorized");
    error.statusCode = 401;
    throw error;
  }

  let decodedToken;
  let token;
  try {
    token = authHeader.split(" ")[1];
    decodedToken = jwt.verify(token, config.get("App.JwtKey"));
  } catch (err) {
    const error = new Error("Please Login.");
    error.statusCode = 401;
    throw error;
  }
  if (!decodedToken || decodedToken == undefined) {
    const error = new Error("not Authorized");
    error.statusCode = 401;
    throw error;
  }
  if (!decodedToken.userId || decodedToken.userId == undefined) {
    const error = new Error("not Authorized");
    error.statusCode = 401;
    throw error;
  }
  console.log("decoded token", decodedToken);
  User.findOne({ where: { id: decodedToken.userId } })
    .then((user) => {
      if (user === undefined || !user) {
        return res.status(401).json({
          status: false,
          message: "Please Login",
        });
      }
      req.userId = user.id;
      next();
    })
    .catch((error) => {
      throw error;
    });
};
