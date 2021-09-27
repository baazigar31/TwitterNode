const ejs =require('ejs');

module.exports.root = function(req,res) {
    // return res.send('<h1>Welcome to twitter</h1>');
    return res.render('home',{title:"Twitter",pageName:"Twitter Home Page",layout:'layout'});
}