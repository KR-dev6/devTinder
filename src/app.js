const express = require("express");
require ("./config/database");
const User = require("./models/user");
const app = express();

app.post("/signup", async(req , res)=>{

  const user = new User({
    firstName: "kanak",
    lastName :  "rawat ",
    email:"kanakrwt.com",
    password:"kanak666",
    age:"20",
  });
  try {
   await user.save();
   res.send("user created successfully....");
} catch(err){
  res.status(400).send("user creation failed...." + err.message);
}
});


app.listen(3000, () => {
  console.log(" server is successfully listening on port 3000.....");
});
