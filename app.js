const express=require('express');
const expressLayouts=require('express-ejs-layouts');
const mongoose=require('mongoose');
const flash=require('connect-flash');
const session=require('express-session');
const passport=require('passport');

const app=express();

//passport config
require('./config/passport')(passport);

//DB config
const db=require('./config/keys').MongoURI;
//const username=require('./config/keys').username;
//const password=require('./config/keys').password;

//connect to Mongo
//this return a promse
mongoose.connect(db,{useNewUrlParser:true})
.then(()=>{
    console.log('MongoDB connected...');
})
.catch((error)=>{
    console.log(error);
})

//EJS
app.use(expressLayouts); //this line always above from view engine line
app.set('view engine','ejs');

//body parser
app.use(express.urlencoded({extended:false}));

//Express session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash());

//Global vars

app.use((req,res,next)=>{
    res.locals.success_msg=req.flash('success_msg');
    res.locals.error_msg=req.flash('error_msg');
    res.locals.error=req.flash('error');
    next();
})

//Routes
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));


const port=process.env.PORT || 5000;

app.listen(port,console.log(`Server started on port ${port}`));