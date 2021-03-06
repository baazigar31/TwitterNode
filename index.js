const express= require('express');
const {json, urlencoded } = require('body-parser');
const cors = require('cors');


const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./src/config/passport-local-strategy');
const mongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
// const multer  = require('multer');
// const upload = multer({ dest: './src/uploads' });

const router= require('./src/routes/index');
const connect= require('./src/config/database');

var expressLayouts = require('express-ejs-layouts');
const { setFlash } = require('./src/config/middleware');

const app =express();

app.use(sassMiddleware({
    src: './src/assets/scss',     // from where to take css file from
    dest: './src/assets/css',
    debug: true,
    outputStyle:'expanded',
    prefix: '/css'
}));

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
app.use(flash());


// app.set('layout',__dirname+'/src/views/layouts/layout')

app.use('/',setFlash,router);
// app.post('/profile', upload.single('avatar'), function (req, res, next) {
//     // req.file is the `avatar` file
//     // req.body will hold the text fields, if there were any
//     console.log('File Uploaded');
//     res.redirect('/');
//   })
app.set('view engine', 'ejs');
app.set('views', './src/views');

app.listen(3000,async ()=>{
    await connect(); 
    console.log('Server started at 3000!!');
})
