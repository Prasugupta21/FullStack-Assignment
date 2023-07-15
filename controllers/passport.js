const Auth=require("../models/auth");
const mongoose=require("mongoose");
const passport=require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function(auth, cb) {
    process.nextTick(function() {
      return cb(null, {
        id: auth.id,
       
      });
    });
  });
  passport.deserializeUser(function(auth, cb) {
    process.nextTick(function() {
      return cb(null, auth);
    });
  });
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    response_type: 'token',
  scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
  },
 async function(accessToken, refreshToken, profile, cb) {
// console.log(profile);

const newAuth = {
    googleId: profile.id,
    name:profile.displayName,
    profileImageURL: profile.photos[0].value,
    
  };

  try {
    var auth = await Auth.findOne({ googleId: profile.id });
    if (auth) {
        console.log(auth);
     return cb(null, auth);
    } else {
        console.log(auth);
      auth = await Auth.create(newAuth);
    return  cb(null, auth);
    }
  } catch (error) {
    console.log(error);
  }
}

 
  
));
