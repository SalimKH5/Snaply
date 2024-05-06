import { NextRequest, NextResponse } from "next/server";
const UserModel= require("@/app/lib/model/User");
import User from "@/app/lib/model/User";
import Post from "@/app/lib/model/Post";
const  PostModel=require("@/app/lib/model/Post");
export const PUT=async(req:NextRequest,context:any)=>{

    try {
        const {userId,following}=await req.json();
        const {params}=context;
        if(following){
            const user=await User.findOneAndUpdate(                
                { _id: params.id, },
                {
                    $addToSet: {
                        followers: { "userId": userId }, // Remove like based on userId
                    }
                },
            { new: true })

            const followerUser=await User.findOneAndUpdate(                
                { _id: userId },
                {
                    $addToSet: {
                        follwing: { "userId": params.id }, // Remove like based on userId
                    }
                },
            { new: true })
            return NextResponse.json({ Message: "success save post",user,followerUser,id:params.id},{status: 200});
        }else{
            const user=await User.findOneAndUpdate(                
                { _id: params.id, },
                {
                    $pull: {
                        followers: { "userId": userId }, // Remove like based on userId
                    }
                },
            { new: true })
            
            const unfollowerUser=await User.findOneAndUpdate(                
                { _id: userId },
                {
                    $pull: {
                        follwing: { "userId": params.id }, // Remove like based on userId
                    }
                },
            { new: true })    

            return NextResponse.json({ Message: "success save post",user,unfollowerUser},{status: 200});
    
        }
        
    } catch (error) {
        return NextResponse.json({ Message: "error saving a post",error},{status: 500});
    }
};