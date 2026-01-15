
const express = require("express");

const app = express();
app.use("server", (req, res) => {
  res.send(" This is your first server...");
});

app.use("/hello", (req, res) => {
  res.send(" Hello from the request hello with NODEMON..");
});
app.use("/test",(req,res )=>{
    res.send ( " Hello from the server with NODEMON..");
});
app.listen(3000, ()=>{
    console.log(" server is successfully listening on port 3000.....");

});