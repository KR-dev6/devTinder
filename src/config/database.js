const mongoose = require("mongoose");
const connectDB = async () =>{
    await mongoose.connect(
"mongodb+srv://kanakrawat:tTVV2OKlZSiQI5ez@mongopractice.byuwbf3.mongodb.net/devTinder"
    );
};

connectDB().then(()=>{
    console.log("db connection established....");
})
.catch((err) =>{
    console.error("db connection failed....");

});