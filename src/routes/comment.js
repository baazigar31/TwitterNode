const express = require('express');
const {create} = require('../controllers/commentController');
const passport = require('passport');

const router = express.Router();

router.post('/create',passport.checkAuthentication, create);

module.exports = router;  