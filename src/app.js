const express = require("express");
const app = express();

app.use("/test", (req, res) => {
  res.send("hello hello hello");
});

app.use("/", (req, res) => {
  res.send("Namaste from the server");
});

app.listen(3000, () => {
  console.log("server is listening at port 3000");
});
