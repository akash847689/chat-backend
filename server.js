const express = require("express")
require('dotenv').config()
const dbConnect = require("./src/utils/db.js")
const userRoute = require('./src/routes/userRoute.js')
const cors = require('cors')
const path = require('path')

const app = express();
app.use(cors())
dbConnect()

//if u dont use express.json then u will getr Cannot destructure property 'firstName' of 'req.body' as it is undefined. as u cant get req.body data bcz its a  json format
app.use(express.json()); // to accept json data

// route
app.use('/api/user',userRoute)

app.use('/images', express.static(path.join(__dirname, './src/images')));

//error middleware
app.use((error,req,res,next)=>{
    //here we set the default statusCode and message so if we dont send it then default one will send to user
    const errorStatus =error.status || 500;
    const errorMessage= error.Message || "something went wrong";
    return res.status(errorStatus).json(
        {
            error:true,
            success:false,
            status:errorStatus,
            message:errorMessage,
            stack:error.stack
        }
    )

})

app.get('/temp', (req, res)=>{
    return res.status(200).send(`Server is running`);
});
// console.log(typeof(userRoute))
const port = process.env.PORT ;
app.listen(port,()=>{
    console.log(`server is running at ${port}`)
})