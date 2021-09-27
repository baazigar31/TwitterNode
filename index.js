const express= require('express');
const {json, urlencoded } = require('body-parser');
const cors = require('cors');


const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./src/config/passport-local-strategy');
const mongoStore = require('connect-mongo');


const router= require('./src/routes/index');
const connect= require('./src/config/database');

var expressLayouts = require('express-ejs-layouts');

const app =express();
app.use(json());
app.use(cors());
app.use(urlencoded({extended:true}));

app.use(express.static('./src/assets'));
app.use(expressLayouts);

app.use(session({
    name: 'twitter',
    secret: 'shubham',
    resave: false,
    cookie: {
        maxAge: 300000
    },
    store: new mongoStore({
         mongoUrl:'mongodb://localhost/twitter_dev',
         autoRemove:'disable'
    },function(err){
        if(err)
         console.error(err);
        else{
            console.log('connect-mongo setup done');
        }
    })
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);


// app.set('layout',__dirname+'/src/views/layouts/layout')
app.use('/',router);
app.set('view engine', 'ejs');
app.set('views', './src/views');

app.listen(3000,async ()=>{
    await connect(); 
    console.log('Server started at 3000!!');
})
