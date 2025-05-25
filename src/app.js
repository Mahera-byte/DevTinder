const express = require("express");
const app = express();
app.use("/admin", (req, res, next) => {
  console.log("admin data is getiing checked");
  const token = "xyzj";
  const isAdminAuthorized = token == "xyz";
  if (!isAdminAuthorized) {
    res.status(401).send("Unauthorized request");
    next();
  }
});
app.get("/admin/getAllData", (req, res) => {
  res.send("All data send");
});

app.get("/admin/DeleteUser", (req, res) => {
  res.send("Deleted user");
});
app.listen(3000, () => {
  console.log("server is listening at port 3000");
});
