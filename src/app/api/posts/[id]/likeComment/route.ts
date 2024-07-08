import { NextRequest, NextResponse } from "next/server";
import PostModel from "@/app/lib/model/Post";
export const PUT=async(req:NextRequest,context:any)=>{

    try {
        const {comment_id,userId,liked}=await req.json();
        const {params}=context;
       

       if(!liked){
        const post = await PostModel.findOneAndUpdate(
            { _id: params.id, "comments._id": comment_id },
                {
                    $pull: {
                        "comments.$.likes": { userId: userId } // Remove like based on userId
                    }
                },
            { new: true }
        );
        return NextResponse.json({ Message: "success adding a comment",post},{status: 200});

       }else{
        const post = await PostModel.findOneAndUpdate(
            { _id: params.id, "comments._id": comment_id },
                {
                    $addToSet: {
                        "comments.$.likes": { userId: userId } 
                    }
                },
            { new: true }
        );
        return NextResponse.json({ Message: "success adding a comment",post},{status: 200});
       }
        
    } catch (error) {
        return NextResponse.json({ Message: "Cannot add a comment",error},{status: 500});
    }
};