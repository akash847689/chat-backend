const mongoose = require('mongoose')

const dbConnect=()=>{

const conn = mongoose.connect('mongodb://localhost:27017/chatterBoxDb')
.then(()=>{
    console.log("connection successful")
})
.catch((error)=>{
    console.log("error in db connection",error)
})

}

module.exports = dbConnect;