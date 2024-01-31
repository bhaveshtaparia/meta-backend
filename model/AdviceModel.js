const mongoose =require('mongoose');
const adviceSchema=new mongoose.Schema({
    id:{
        type:mongoose.Schema.ObjectId,
        ref:"Registers",
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    upvote:[
     {
        userId:{
            type:mongoose.Schema.ObjectId,
            ref:"Registers",
            required:true
        },
     }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    }
   
})

module.exports=new mongoose.model('advice',adviceSchema);