import dbConnect from "@/app/lib/mongodb";
import PostModel from "@/app/lib/model/Post";
import UserModel from "@/app/lib/model/User";
import { getAuthUserId, unauthorized } from "@/app/lib/security";
import { NextRequest, NextResponse } from "next/server";

export const GET=async (req: NextRequest,context:any )=>{
    try {
        
        const {params}=context;
       
      await dbConnect();

        const result = await PostModel.findById(params.id);
    return NextResponse.json({ Message: "successfully upload a post",id:params.id,result},{status: 200});
    } catch (error) {
        return NextResponse.json({ Message: "error ocurred",error},{status: 500});

    }
}

export const PUT=async (req: NextRequest,context:any )=>{
    try {
        
        const authId = getAuthUserId(req);
        if (!authId) {
            const { body, init } = unauthorized();
            return NextResponse.json(body, init);
        }
        const {params}=context;

        const {like,comment}=await req.json();

        await dbConnect();

        const result = await PostModel.findById(params.id);

        // Likes and comments are always recorded for the authenticated user.
        if(result){
            if(like){
                result.likes.push({
                    userId:authId
                })
            }
            if(comment && typeof comment.TextComment === "string"){
                result.comments.push({ userId: authId, TextComment: comment.TextComment })
            }
        }

        await result?.save()


    return NextResponse.json({ Message: "successfully update a post",id:params.id,result},{status: 200});
    } catch (error) {
        return NextResponse.json({ Message: "error ocurred",error},{status: 500});

    }
}