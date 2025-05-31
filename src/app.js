const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Mahera",
    lastName: "Alam",
    emailID: "mahera@alam.com",
    password: "mahera@we",
  });

  await user.save();
  res.send("User updated successfully");
});

connectDB()
  .then(() => {
    console.log("Database connection established");
    app.listen(4000, () => {
      console.log("server is listening at port 4000");
    });
  })
  .catch((error) => {
    console.error("Database cannot be connected");
  });
