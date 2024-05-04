import dbConnect from "@/app/lib/mongodb";
import PostModel from "@/app/lib/model/Post";
import UserModel from "@/app/lib/model/User";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export const GET=async (req: NextRequest,context:any )=>{
    try {
        
        const {params}=context;
        const user_id = req.nextUrl.searchParams.get('user_id') as string;
        dbConnect();

        const result = await PostModel.findById(params.id);
    return NextResponse.json({ Message: "successfully upload a post",id:params.id,result},{status: 200});
    } catch (error) {
        return NextResponse.json({ Message: "error ocurred",error},{status: 500});

    }
}

export const PUT=async (req: NextRequest,context:any )=>{
    try {
        
        const {params}=context;
        
        const {like,comment}=await req.json();
       
        dbConnect();

        const result = await PostModel.findById(params.id);

        if(result){
            if(like){
                result.likes.push({
                    userId:like
                })
            }
            if(comment){
                result.comments.push(comment)
            }
        }

        await result?.save()


    return NextResponse.json({ Message: "successfully update a post",id:params.id,result},{status: 200});
    } catch (error) {
        return NextResponse.json({ Message: "error ocurred",error},{status: 500});

    }
}