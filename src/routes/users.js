const express=require('express');
const passport = require('passport');
const { route } = require('.');
const { checkAuthentication } = require('../config/passport-local-strategy');
// const userController=require('../controllers/userController');
const {profile,signUp,signIn,create,createSession, destroySession, update}=require('../controllers/userController');



const router=express.Router();

// router.get('/profile',profile)
router.get('/profile/:id',passport.checkAuthentication, profile)
router.get('/signup',signUp)
router.get('/signin',signIn)
router.post('/create',create) 
router.get('/signout',destroySession);
router.post('/update/:id',passport.checkAuthentication,update)

router.post('/create-session', passport.authenticate(
    'local',
    { 
      // successRedirect: '/',
      failureRedirect: '/users/signin'
    }
),createSession);  // passport.authenticate is being used as a middleware

module.exports=router;