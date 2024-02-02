const { auth } = require('../middleware/auth');
const Advice=require('../model/AdviceModel');

const express=require('express');
const postAdvice=async(req,res)=>{
    try{
        req.body.id=req.user._id;
        const advice= await Advice.create(req.body);
        res.status(201).json({
            advice,
            success:true,
            message:"Advice successfully Posted"
        })
    }catch(err){
res.status(404).json({
    err,
    success:false
})
}
}
const router=express.Router();
router.route('/create/advice').post(auth,postAdvice);

const allAdvice=async(req,res)=>{
    try{
    
            const advice= await Advice.find({});
            res.status(201).json({
                advice,
                success:true,
            })
        
    }catch(err){
res.status(404).json({
    err,
    success:false,
    message:"Not Found"
})
}
}

router.route('/allAdvice').get(allAdvice);


// for upvoting 

const upvoteState=async(req,res)=>{
   try{
    let advice= await Advice.findById(req.body._id);
    if(!advice){
        res.status(404).json({
            message:"something went wrong"
         })
        return; 
    }
    let total= advice.upvote?advice.upvote.length:0;
    let state=false;
    if( req.body.userId && problem.upvote){
        advice.upvote=advice.upvote.filter(e=>e.userId!=req.body.userId);
    }
    if(req.body.userId && total!==advice.upvote.length ){
        state=true;
    }
    res.status(200).json({
        total,
        state
    })
   }catch(err){
    console.log(err)
     res.status(404).json({
        message:"something went wrong"
     })
    }
}

router.route('/advice/upvote').post(upvoteState);





// update Upvote state 
const updateUpvote=async(req,res)=>{
    try{
        
        let problem=await Advice.findById(req.body._id);
        let size=problem.upvote?problem.upvote.length:0;
        // req.body.userId=req.user._id;
        if(problem.id==req.body.userId){
            res.status(201).json({
                total:size,
                state:false,
                success:true,
                message:"You cannot Upvote in You posted Problem"

            })
            return ;
        }
        if(problem.upvote){
            problem.upvote=problem.upvote.filter(e=>e.userId!=req.body.userId);

        }
        let state=false;
         if(!problem.upvote || size===problem.upvote.length){
            const array=problem.upvote || [];
            array.push({userId:req.body.userId});
            problem.upvote=array;
            state=true;
        }
        problem=await problem.save(); 
        const total=problem.upvote.length;
        res.status(200).json({
            total,
            state,
            success:true
        })
    }catch(err){
    res.status(404).json({
        success:false,
        message:"something went wrong"
    })
    console.log(err);
}
}
router.route('/advice/new/upvote').post(auth,updateUpvote);





// profile data -->
const profile=async(req,res)=>{
    try{
        let user=await Advice.find({id:req.body.userId});
        let array=[];
        let problemD={};
        const problem=user.length;
        let upvote=0;
        for( let i=0;i<user.length;i++){
            const date=new Date(user[i].createdAt);
            const s=date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear();
            if(!problemD.hasOwnProperty(s)){
                array.push(s);
                problemD[s]=0;
            }
            problemD[s]++;
            
            upvote+=user[i].upvote?user[i].upvote.length:0;   
        }
        res.status(200).json({
            Totalproblem:problem,
            time:array,
            coins:upvote,
            problemD,
            success:true
        })
    }catch(err){
        res.status(200).json({
            success:false,
            message:"someThing went wrong"         
        })
        console.log(err);
    }
}
router.route('/profile').post(auth,profile);
module.exports=router;



