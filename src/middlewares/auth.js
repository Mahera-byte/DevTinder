const User = require("../models/user");
const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  //Read the token from request cookies
  //validate the user
  //Find the username
  try {
    const cookies = req.cookies;

    const { token } = cookies;
    if (!token) {
      throw new Error("Token is not valid");
    }

    const decodedObj = await jwt.verify(token, "DEV@Tinder$790");

    const { _id } = decodedObj;

    const user = await User.findById({ _id });
    if (!user) {
      throw new Error("user not found");
    }
    req.user = user;
    next(); //going to next handler
  } catch (error) {
    res.status(400).send("Eroor", +error.message);
  }
};

module.exports = {
  userAuth,
};
