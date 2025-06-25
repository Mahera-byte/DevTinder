const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailID, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("firstname and lastname is not present");
  } else if (!validator.isEmail(emailID)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong");
  }
};

module.exports = { validateSignUpData };
