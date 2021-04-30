const express = require("express");
const app = express();
require("dotenv").config();
var cors = require('cors')
const userRouter = require("./api/users/user.router");

app.use(express.json());

app.use(cors())
 

app.use("/api/users", userRouter); 
app.listen(process.env.APP_PORT,()=>{
    console.log("Server up and running", process.env.APP_PORT);
})