// const ejs =require('ejs');
const Tweet = require('../models/tweet');
const User = require('../models/user');

module.exports.root = async function(req,res) {
    // return res.send('<h1>Welcome to twitter</h1>');
    // console.log(req);  Now the req contains flash
     Tweet.find({})
     .populate('user')
     .populate({
         path:'comments',
         populate: {
             path:'user'
         }
     }).sort({createdAt:-1})
     .exec(async function(err,tweets){
      let fetchedTweets = tweets;
    //   console.log(tweets);
     const users = await User.find({});
    //  console.log(users)           // displays all the users in console.
      if(err){
        console.log('Error finding tweets');
        fetchedTweets = {};
      }
      return res.render('home',{
          title:"Twitter",
          tweets:fetchedTweets,
          layout:'layout',
          users:users
        });
    });
    
}