const express = require("express");

const app = express();



// Multiple route handler using next() fn

app.use("/user", (req, res,next) => {
  console.log(" 1st route  running properly");
  next();
  // res.send("1st response");
});
app.use("/user", (req, res,next) => {
  console.log(" 2nd route  running properly");
  next();
  // res.send("2nd response");
});
app.use("/user", (req, res,next) => {
  console.log(" 3rd route  running properly");
  next();
  // res.send("3rd response");
});
app.use("/user", (req, res, ) => {
  console.log(" 4th route  running properly");
  res.send("4th response");
});
app.listen(3000, () => {
  console.log(" server is successfully listening on port 3000.....");
});
