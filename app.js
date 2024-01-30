const express=require('express');
const cors=require('cors')
const dotenv=require('dotenv');
const cookieParser=require('cookie-parser')
const bodyParser=require('body-parser');
const app=express();
app.use(cookieParser());
const dbconnection=require('./server');

dotenv.config({path:'./config.env'});
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.json());
dbconnection();
app.get('/',(req,res)=>{
    res.send("working")
})
app.use(cors({
    origin:process.env.WEBLINK,
    credentials: true,
    methods:["GET","POST","DELETE","PUT"]
}));

app.listen(process.env.PORT,()=>{
    console.log(`http://localhost:${process.env.PORT}`)
    console.log(`server is working on ${process.env.PORT} `)
})