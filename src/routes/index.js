const express= require('express');
const homeController=require('../controllers/homeController');
const userRouter= require('./users');
const tweetRouter = require('./tweet');
const commentRouter = require('./comment')

const router=express.Router();
console.log('Router UP!');

router.get('/',homeController.root);
router.use('/users',userRouter);
router.use('/tweets', tweetRouter);
router.use('/comments', commentRouter);


module.exports=router;