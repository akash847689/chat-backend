const mongoose = require('mongoose')
const User = require('./userModel')
const chatSchema = mongoose.Schema({
    chatName:{
        type:String,
        require:true
    },
    isGroupChat:{
        type:Boolean,
        default:false
    },
    user:[{type:mongoose.Schema.Types.ObjectId, ref:"User"}],

    latestMessage:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Message"
    },
    groudAdmin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

},{
    timestamps:true
}
)
const Chat = mongoose.model('Chat',chatSchema)

module.exports = Chat;
