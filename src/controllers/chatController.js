
const Chat = require('../models/chatModel');
const User = require('../models/userModel')
const createError = require('../utils/error');

const addChat= async (req,res,next)=>{
    const { userId } = req.body;
   
    const chatObj = {
        chatName:req.body.chatName,
        members:req.body.members,
       
    }    

    if (!userId) {
     return next(400,"user not exist")
    }
    try{
        const newChat = await Chat.create(chatObj)
        const result = await newChat.save()
        // const result = await newChat.save()
    if(!result){
        return (next(createError(400,"chat not added")))
    }
    return res.status(201).json({data:newChat})
    }
   catch(error){
    next(error)
   }
}

const getChat= async(req,res,next)=>{
    const { userId } = req.body;
    console.log(userId)

    if (!userId) {
     return next(400,"user not exist")
    }
    try{
        // const allChat = await Chat.find({_id:userId},{_id:1,members:1,})
        // const allChat = await Chat.find({
        //     members:{$eq:userId}
        // },{members:1}).populate({
        //     path:'members',
        //     select:"_id firstName lastName "
        // })
        const allChat = await Chat.find({
            members:userId
        },{members:1})

        // const arr = data.members;
        console.log("allChat",allChat)

    if(!allChat){
        return  next(createError(400,"data not found"))
    }
    return res.status(200).json({
        data:allChat
    })
    
    }
    catch(error){
        next(error)
    }

}


module.exports = {addChat,getChat}