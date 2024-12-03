const express = require("express")
const cors =require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
require('dotenv').config()
const connectDB= require('./conig/db')
const router=require('./routes')
const { log } = require("console");
const { Cashfree } = require("cashfree-pg");


const app = express()
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}))
require('dotenv').config();


app.use(express.json({limit:'1mb'}))
app.use(express.urlencoded({limit:'1mb'})) //size is only this code work

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(cookieParser())

app.use("/api",router)

//payment
Cashfree.XClientId = process.env.CLIENT_ID;
Cashfree.XClientSecret = process.env.CLIENT_SECRET;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

//Error
app.use((req,res,next)=>{
    res.status(404).send(`<h1>404 page not found</h1>`)
})

const PORT =7070 || process.env.PORT

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("connect to DB");
        console.log("server is running")
    })
})

