const mongoose = require("mongoose");
const connectDB = async () =>{
    await mongoose.connect(
      "mongodb+srv://kanakrawat:eCKpH9VWHAHw3raV@mongopractice.byuwbf3.mongodb.net/devTinder",
    );
};

connectDB().then(()=>{
    console.log("db connection established....");
})
.catch((err) =>{
    console.error("db connection failed....");

});