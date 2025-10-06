const mongoose = require("mongoose");

const connectionDB = async () =>{
    try{
        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log("mongoDB is conected!");
    }catch (err){
        console.log(err);
    }
}
module.exports = connectionDB;