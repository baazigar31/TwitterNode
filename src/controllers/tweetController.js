const Tweet = require('../models/tweet');
const Comment = require('../models/comment');


const create = function(req, res) {
    // console.log(req);
    Tweet.create({
        content: req.body.content,
        user: req.user._id
    }, function(err, tweet) {
        if(err) {
            console.error("Error in creating a tweet");
            return;
        }
        req.flash('info','Tweet Created Successfully')
        return res.redirect('back');
    })
}

const destroy = function(req,res){
    // console.log('hit');
    //console.log(req);
    Tweet.findById(req.params.id, function(err,tweet){
        if(err){
            return res.redirect('/');
        }
        if(tweet.user == req.user.id){
            tweet.remove();
            Comment.deleteMany({tweet: req.params.id}, function(err){
                return res.redirect('back');
            });
        }
        else{
            res.redirect('back');
        }
    })
}

module.exports = {create, destroy};