const mongoose = require('mongoose')
const User = require('./userModel')
const chatSchema = mongoose.Schema({
    chatName:{
        type:String,
        
    },
    isGroupChat:{
        type:Boolean,
        default:false
    },
    members:[{type:mongoose.Schema.Types.ObjectId, ref:"User"}],

    latestMessage:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"message"
    },
   
    groudAdmin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    isDeleted:{
        type:Boolean,
        default:false
    }

},{
    timestamps:true
}
)
const Chat = mongoose.model('Chat',chatSchema)

module.exports = Chat;
