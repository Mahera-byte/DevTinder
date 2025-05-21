const express = require("express");
const app = express();

app.get("/user", (req, res) => {
  res.send({ FirstName: "Mahera", LastName: "Alam" });
});

app.post("/user", (req, res) => {
  res.send("Data successfully saved to database");
});

app.use("/test", (req, res) => {
  res.send("hello hello hello");
});

app.listen(3000, () => {
  console.log("server is listening at port 3000");
});
