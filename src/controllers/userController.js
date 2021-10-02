const User = require('../models/user');

module.exports.profile= function(req,res){
    // res.send('<h1>User Profile</h1>');
    // return res.render('./users/user_profile',{title:"User Profile",layout:false});

    User.findById(req.params.id, function(err, user){
        if(!user){
            return res.redirect('/');
        }
        return res.render('./users/user_profile',{
            title:'User Profile',
            profile_user:user
        }); // by deaflut layout will look in views for the layout 
    
    })
}
    

module.exports.signUp=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('./users/user_sign_up',{
        title:'Twitter | Sign Up'
    });
}

module.exports.signIn=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
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
    // res.status(201).send("User Logged In!!");
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    req.logout();
    return res.redirect('/')
    // req.session.destroy(function (err) {
    //     res.redirect('/'); //Inside a callback… bulletproof!
    //   });
}

module.exports.update = function(req,res){
    console.log(req.body);
    if(req.user.id == req.params.id) {
            User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
                if(err){
                    console.log('Error updating user');
                    return res.redirect('/');
                }
                return res.redirect('back');

            })
    }
    else {
        return res.status(401).isAuthenticated('Unauthorised');
    }
}