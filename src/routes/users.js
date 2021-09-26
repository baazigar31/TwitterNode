const express=require('express');
const { route } = require('.');
// const userController=require('../controllers/userController');
const {profile,signUp,signIn,create,createSession}=require('../controllers/userController');

const router=express.Router();

router.get('/profile',profile)
router.get('/signup',signUp)
router.get('/signin',signIn)
router.post('/create',create) 

module.exports=router