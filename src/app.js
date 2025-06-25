const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");

app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);

    const { firstName, lastName, emailID, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailID,
      password: passwordHash,
    });

    await user.save();
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("Error:" + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailID, password } = req.body;

    const user = await User.findOne({ emailID: emailID });

    if (!user) {
      throw new Error("Email Id is not present in the DB");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      res.send("Login successful");
    } else {
      throw new Error("Password is not corect");
    }
  } catch (err) {
    res.status(400).send("Error:" + err.message);
  }
});

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailID;

  try {
    const user = await User.find({ emailID: userEmail });
    res.send(user);
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

app.patch("/user", async (res, req) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    await User.findByIdAndUpdate({ _id: userId, data });
    res.send("User updated successfully");
  } catch (error) {
    res.status(400).send("something went wrong");
  }
});
connectDB()
  .then(() => {
    console.log("Database connection established");
    app.listen(4000, () => {
      console.log("server is listening at port 4000");
    });
  })
  .catch((error) => {
    console.error("Database cannot be connected" + error);
  });
