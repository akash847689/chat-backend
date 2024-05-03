const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const createError = require('../utils/error')
const JWT = require('jsonwebtoken')




const registerUser= async(req,res)=>{
    const {firstName,lastName,email,password} = req.body

    const isUserExist = await User.findOne({email})
    if(isUserExist){
    //    return res.status(400).json({mssge:"User already exists"})
        return next(createError(400,"User already exists"))
  
    }
    if(!firstName || !email || !password || firstName=="" || password=="" || email==""){
        // return res.status(400).json({mssge:"Please Enter all the Feilds"})
       return next(createError(40,"Please Enter all the Feilds"))
    }

    const newUser = await User.create({
        firstName,
        lastName,
        email,
        password
    })
    
    if(newUser){
        res.status(201).json({
            message:"registration successfull",
            //this time we generate token in userExist not usercreated so we can implement the authorization
          
        },)
    }
    else{
        // res.status(400).json({mssge:"user not found"})
       return next(createError(200,"user not found"))
    }
}


const loginUser= async(req,res,next)=>{
    try{
    const {email,password} = req.body;
    
    if(!email || !password || email=="" || password ==""){
        return res.status(400).json({mssge:"fill all fields"})
    }
    
    const userExist = await User.findOne({email})
    console.log("userExist",userExist)
    
    if(!userExist){
        return next(createError(400,'invalid credentials'))

    }
    
   const verifiedUser = await userExist.comparePassword(password)
   console.log("verifyUser->",verifiedUser)
   
    const id =userExist._id;

   //generate token -> jwt.sign(payload, secretOrPrivateKey, [options, callback])
      
    if(verifiedUser){
        const token = JWT.sign({ id: userExist._id }, process.env.JWT_SECRET_KEY,{expiresIn:'20hr'})
    
        // return res.cookie('access-Token',token,{httpOnly:true,expires:token.expiresIn})
        // .status(200)
        // .json(
        //     {
        //         error:false,
        //         message:"Admin Login Successfully...!",
        //         token
        //     })
        return res.status(200)
        .json(
            {
                error:false,
                user:userExist,
                message:"Admin Login Successfully...!",
                token
            })

    }
    else{
                 console.log("invalid password or email")
             next(createError(401,"invalid email or password"))
            // res.status(400).json({mssge:"invalid "})
            }

    }
    catch(error){
        console.log('login error',error)
        next(error)
    }

}

const updateUser=async(req,res,next)=>{
    const userId = req.params.userId;

    const {...update} = req.body;
    
    try{
        const userExist = await User.findById(userId);
        if(!userExist){
           return next(createError(400,"User not found"))
        }
        // const uName = update.userName;

        if(update.userName){
            const uniqueUserName = await User.findOne({userName:update.userName})
            if(uniqueUserName){
                return next(createError(409,"userName alredy present!!!"))
            }
           
        }

        //updating field based on user requirement
        for(let key in update){
            if(update.hasOwnProperty(key)){
                userExist[key]=update[key]
            }
        }
        const result = await userExist.save();
        if(result){
            res.status(200).json({mssge:result})
        }
    }
    catch(error){
       return next(error)
    }

}

const updatePic= async(req,res,next) =>{
    const userId = req.body.userId;
    const fileName = req.file.filename;
    // console.log("userId",userId)
    // console.log("fileName",fileName)
   try{
    const userExist = await User.findById(userId)
    if(!userExist){
        next(createError(400,"User Not exists"))
    }

    userExist.picture = fileName;
    const result = await userExist.save()
    // console.log("res",res)
    // console.log("userExist",userExist);
    if(!result){
        next(createError(400,""))
    }
    return res.status(200).json({message:"Profile Updated successfuly"})
   }
   catch(error){
    next(error)
   }


}


const getProfileData=async(req,res,next)=>{
    const id = req.body.userId;
    console.log(id)

    const userExist = await User.findById(id);
    if(!userExist){
        return next(createError(400,"User not found"))
    }
    const data ={
        id:userExist._id,
        firstName:userExist.firstName,
        lastName:userExist.lastName,
        userName:userExist.userName,
        gender:userExist.gender,
        about:userExist.about,
        picture:userExist.picture

    }
    return res.status(200).json(data)
}
module.exports={registerUser,loginUser,updateUser,updatePic,getProfileData}