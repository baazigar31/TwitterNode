module.exports.profile= function(req,res){
    // res.send('<h1>User Profile</h1>');
    // return res.render('./users/user_profile',{title:"User Profile",layout:false});
    return res.render('./users/user_profile',{title:"User Profile",layout:'user_layout'}); // by deaflut layout will look in views for the layout 
}
