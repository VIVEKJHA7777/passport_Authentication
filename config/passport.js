const LocalStragegy=require('passport-local').Strategy;
const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');

//load User Model

const User=require('../models/User')

module.exports=function(passport){
    passport.use(
        new LocalStragegy({usernameField:'email'},(email,password,done)=>{
            //matchn User
            User.findOne({email:email})
            .then(user=>{
                if(!user){
                    return done(null,false,{message:'That email is not registered'});
                }
                //Match password
                bcrypt.compare(password,user.password,(err,isMatch)=>{
                    if(err) throw err;

                    if(isMatch){
                        return done(null,user);
                    }
                    else{
                        return done(null,false,{message:'password is incorrect'})
                    }
                });
            })
            .catch(err=>console.log(err));
        })
    );
//.......this is used in previous version of passport ...................

    // passport.serializeUser((user,done)=>{
    //     done(null,user.id);
    // })

    // passport.deserializeUser((id,done)=>{
    //     User.findById(id,(err,user)=>{
    //         done(err,user);
    //     })
    // })
//.................................

    passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user.id);
  });
});
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    })
    .catch(err => {
      done(err, null);
    });
});

}