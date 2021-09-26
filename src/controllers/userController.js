const User = require('../models/user');

module.exports.profile= function(req,res){
    // res.send('<h1>User Profile</h1>');
    // return res.render('./users/user_profile',{title:"User Profile",layout:false});
    return res.render('./users/user_profile',{title:"User Profile"} ); // by deaflut layout will look in views for the layout 
}

module.exports.signUp=function(req,res){
    return res.render('./users/user_sign_up',{
        title:'Twitter | Sign Up'
    });
}

module.exports.signIn=function(req,res){
    return res.render('users/user_sign_in',{
        title:'Twitter | Sign In'
    });
} 

module.exports.create= function(req,res){
    // console.log('user signup');
    console.log(req.body);
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user){
        if(err) {
            console.error(err);
            return;
        }
        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.error(err);
                    return;
                }
                return res.redirect('/users/signin');
            })
        }else{
            return res.redirect('/users/signin');
        }
    });
    // res.status(201).send("user signup!!");
}

module.exports.createSession= function(req,res){
    console.log('Logged In');
    res.status(201).send("User Logged In!!");
}