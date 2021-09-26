const mongoose=require('mongoose');

const connect=()=>{
    console.log("MongoDB connected");
    return mongoose.connect('mongodb://localhost/twitter_dev');
}

module.exports=connect