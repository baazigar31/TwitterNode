const Comment = require('../models/comment');
const Tweet = require('../models/tweet');

const create = function(req,res){
    // console.log(req.body);
    Tweet.findById(req.body.tweet, function(err, tweet) {
        if(tweet) {
            // console.log(tweet);
            Comment.create({
                content: req.body.content,
                tweet: req.body.tweet,
                user: req.user._id
            }, function(err, comment) {
                if(err) {
                    console.log(err);
                    return res.redirect('/');
                }
                tweet.comments.push(comment);
                tweet.save();
                return res.redirect('/');
            })
        } else {
            console.error('Error finding tweet');
            return res.redirect('/');
        }
    })
}

const destroy = function(req,res){
    // console.log(req);
    Comment.findById(req.params.id, function(err,comment){
        // console.log('hit');
        // console.log(comment);
        if(!comment) {
            return res.redirect('back');
        }

        // if(err){
        //     console.error('Error deleting comment');
        //     return res.redirect('/');
        // }
        if(comment.user == req.user.id){
            let tweetId = comment.tweet;
            comment.remove();

            Tweet.findByIdAndUpdate(tweetId, { $pull: {comments: req.params.id}} , function(err, tweet) {
                return res.redirect('back');
            })

            return res.redirect('back');
        }
        else{
            // console.log('I am here');
            return res.redirect('back');
        }

    });
}

module.exports = {create,destroy};