require('dotenv').config();
const path=require("path");
const express=require("express");



const mongoose=require("mongoose");
const  connectDB = require("./database");
const bodyParser=require("body-parser");
const cookieParser=require("cookie-parser");
const userRouter=require("./routes/user");
const authRouter=require("./routes/auth");
const { checkforAuthenticationCookie } = require("./middlewares/auth");
const Auth=require("./models/auth");
const Course=require("./models/course");

const passsportSetup=require("./controllers/passport");
const session = require('express-session');
const passport=require("passport");

const app=express();
const PORT=4000;

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }));

app.use(passport.initialize());
app.use(passport.session());

connectDB();


  

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(checkforAuthenticationCookie("token"));

app.use(express.static(path.resolve("./public")));



app.get("/",async (req,res)=>{
    res.render("home");
});

app.use("/user",userRouter);
app.use("/auth",authRouter);




app.get("/dashboard",async (req,res)=>{
    
   

    Course.find({}).exec().then((courses)=>{
       
        return res.render("dashboard",{user:req.user,auth:req.auth,courses:courses});

    }).catch(error=>{
        console.log(error);
    })

    
     
    });
app.listen(PORT,()=>{
    console.log(`server started on port:${PORT}` );
})
