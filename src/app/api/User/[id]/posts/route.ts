import { NextRequest, NextResponse } from "next/server";
const UserModel= require("@/app/lib/model/User");
import User from "@/app/lib/model/User";
import Post from "@/app/lib/model/Post";
const  PostModel=require("@/app/lib/model/Post");

export const GET=async(req:NextRequest,context:any)=>{

    try {
        
        const {params}=context;

        const user=await User.findOne({ username: { $regex: new RegExp('^' + params.id + '$', 'i') }});
      
                if(user){
                    console.log({user:user._id})
                    const posts=await Post.find({ postby: user._id},).populate('postby','_id username').sort({ created: -1 }); ;
                    
                    
                    
                    return NextResponse.json({ Message: "success save post",posts},{status: 200});
                }
     
    
          
                return NextResponse.json({ Message: "error retrive posts"},{status: 400});
      
        
    } catch (error) {
        return NextResponse.json({ Message: "error saving a post",error},{status: 500});
    }
};