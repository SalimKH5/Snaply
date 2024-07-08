import { NextRequest, NextResponse } from "next/server";
const UserModel= require("@/app/lib/model/User");
import User from "@/app/lib/model/User";
import Post from "@/app/lib/model/Post";
const  PostModel=require("@/app/lib/model/Post");
export const PUT=async(req:NextRequest,context:any)=>{

    try {
        const {postId,savePost}=await req.json();
        const {params}=context;

       
        if(savePost){
            const user = await User.findOneAndUpdate(
                { _id: params.id, },
                    {
                        $addToSet: {
                            saveposts: { "postId": postId }, // Remove like based on userId
                        }
                    },
                { new: true }
            ).populate('saveposts.postId');

          
            return NextResponse.json({ Message: "success save post",user},{status: 200});
    
          
        }else{
            
            const user = await User.findOneAndUpdate(
                { _id: params.id, },
                    {
                        $pull: {
                            saveposts: { "postId": postId }, // Remove like based on userId
                        }
                    },
                { new: true }
            ).populate('saveposts.postId');
            
            return NextResponse.json({ Message: "success removing asave post",user},{status: 200});
    

        
    
          
        }
      
        
    } catch (error:any) {
        return NextResponse.json({ Message: "error saving a post",error},{status: 500});
    }
};