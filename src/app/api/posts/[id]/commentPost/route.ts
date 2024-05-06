import { NextRequest, NextResponse } from "next/server";
import PostModel from "@/app/lib/model/Post";
export const PUT=async(req:NextRequest,context:any)=>{

    try {
        const {comment}=await req.json();
        const {params}=context;
        console.log(params.id)

       
       const post = await PostModel.findOneAndUpdate(
            { _id: params.id },
            {
              $push: {
                comments: { 
                    "userId":comment.userId,
                    "TextComment":comment.TextComment
                 }, // Remove like based on userId
              }
            },
            { new: true }, // To
        );
        console.log({comments:post.comments});
        return NextResponse.json({ Message: "success adding a comment",post},{status: 200});

        
    } catch (error) {
        return NextResponse.json({ Message: "Cannot add a comment",error},{status: 500});
    }
};