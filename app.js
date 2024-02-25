const express=require('express');
const cors=require('cors')
const dotenv=require('dotenv');
const cookieParser=require('cookie-parser')
const bodyParser=require('body-parser');
const app=express();
const Signup=require('./router/auth/signupR')
const Login=require('./router/auth/loginR')
const Logout=require('./router/auth/logoutR')
const Advice=require('./router/adviceR')
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
    origin: "*",
    credentials: true,
    methods:["GET","POST","DELETE","PUT"]
}));
app.use('/api/v1',Signup);
app.use('/api/v1',Login);
app.use('/api/v1',Logout);
app.use('/api/v1',Advice);
app.listen(process.env.PORT,()=>{
    console.log(`http://localhost:${process.env.PORT}`)
    console.log(`server is working on ${process.env.PORT} `)
})