const express= require('express');
const homeController=require('../controllers/homeController');
const userRouter= require('./users');
const tweetRouter = require('./tweet');

const router=express.Router();
console.log('Router UP!');

router.get('/',homeController.root);
router.use('/users',userRouter);
router.use('/tweets', tweetRouter);

module.exports=router;