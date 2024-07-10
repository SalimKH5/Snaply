import dbConnect from "@/app/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import PostModel from "@/app/lib/model/Post";
export const PUT=async (req: NextRequest,context:any )=>{
    try {
        
        const {userId,liked}=await req.json();
        const {params}=context;
    
        await dbConnect();
        if(!liked){
            const result = await PostModel.findOneAndUpdate(
                { _id: params.id },
                {
                  $pull: {
                    likes: { "userId": userId }, // Remove like based on userId
                  }
                },
                { new: true }, // To
            );
          
            return NextResponse.json({ Message: "successfully upload a post",id:params.id,result},{status: 200});
        }else{
          
            const result = await PostModel.findOneAndUpdate(
                { _id: params.id },
                {

                    $addToSet: {
                    likes: { "userId": userId }, 
                  }
                },
                { new: true }, // To
            );
            
            return NextResponse.json({ Message: "successfully upload a post",id:params.id,result},{status: 200});
        }
    
    } catch (error) {
        return NextResponse.json({ Message: "error ocurred",error},{status: 500});

    }
}