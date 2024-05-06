const mongoose = require('mongoose')

const dbConnect=()=>{

const conn = mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("connection successful")
})
.catch((error)=>{
    console.log("error in db connection",error)
})

}

module.exports = dbConnect;