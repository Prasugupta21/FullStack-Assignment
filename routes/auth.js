

const {Router}=require("express");
const router=Router();

const Auth=require("../models/auth");

const passport=require("passport");


router.get('/google',
  passport.authenticate('google', { scope: ['email','profile'] }));


router.get('/google/dashboard', 
  passport.authenticate('google', { failureRedirect: '/login-failure' }),
  async function(req, res) {
  
      
return res.redirect("/dashboard");
   

  
  });
  router.get('/login-failure', (req, res) => {
    res.send('Something went wrong...');
  });
  



  module.exports=router;