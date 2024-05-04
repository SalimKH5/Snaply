import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/app/lib/model/User";
const  PostModel=require("@/app/lib/model/Post");
export const PUT=async(req:NextRequest,context:any)=>{

    try {
        const {postId,savePost}=await req.json();
        const {params}=context;
        if(savePost){
            const user = await UserModel.findOneAndUpdate(
                { _id: params.id, },
                    {
                        $addToSet: {
                            saveposts: { "postId": postId }, // Remove like based on userId
                        }
                    },
                { new: true }
            ).populate('saveposts.postId');
            console.log({user});
            return NextResponse.json({ Message: "success save post",user},{status: 200});
    
          
        }else{
            const user = await UserModel.findOneAndUpdate(
                { _id: params.id, },
                    {
                        $pull: {
                            saveposts: { "postId": postId }, // Remove like based on userId
                        }
                    },
                { new: true }
            ).populate('saveposts.postId');
            console.log({user});
            return NextResponse.json({ Message: "success save post",user},{status: 200});
    
          
        }
      
        
    } catch (error) {
        return NextResponse.json({ Message: "error saving a post",error},{status: 500});
    }
};