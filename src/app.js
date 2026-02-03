const express = require("express");

const app = express();
app.use("/user", (req, res) => {
  res.send(" This is your first server...");
});
// get api
app.get("/user", (req, res) => {
  res.send({ firstName: "kanak", lastName: "rawat" });
});

//  post api
app.post("/user", (req, res) => {
  console.log(" save data to the DB");
  res.send(" data successfully saved to the database");
});
// delete api
app.delete("/user", (req, res) => {
  res.send(" data successfully delete");
});

app.use("server", (req, res) => {
  res.send(" This is your first server...");
});

app.use("/hello", (req, res) => {
  res.send(" Hello from the request hello with NODEMON..");
});
app.use("/test", (req, res) => {
  res.send(" Hello from the server with NODEMON..");
});
app.listen(3000, () => {
  console.log(" server is successfully listening on port 3000.....");
});
