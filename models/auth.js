const {Schema,model}=require("mongoose");



const authSchema=new Schema({
    name:{
        type:String,
      
    },
    googleId:String,
    email:String,
    
    profileImageURL:{
        type:String,
       default:"/images/user.jpg"
    }
   

   

},{timestamps:true});


const Auth=model('auth',authSchema);
module.exports=Auth;
