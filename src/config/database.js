const mongoose = require("mongoose");
const connectDB = async () =>{
    await mongoose.connect(
     (process.env.MANGO_URI)
    );
};

connectDB().then(()=>{
    console.log("db connection established....");
})
.catch((err) =>{
    console.error("db connection failed....");

});