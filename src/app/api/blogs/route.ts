import { addPost, getPosts } from "@/app/lib/data";
import { NextResponse } from "next/server"

export const GET =async (req:Request,res:Response) => {
       try {
                    const posts=getPosts();
                    return NextResponse.json({message:"OK",posts},{status:200})
       } catch (error) {
                return NextResponse.json({message:"Error",error}.error,{
                    status:500
                })
       }
}


export const POST =async (req:Request,res:Response) => {
    try {
        const {title,desc}=await req.json();
        
        const post={title,desc,date:new Date(),id: Date.now().toString()}
        const posts=addPost(post);
        
        return NextResponse.json({message:"OK",post},{status:201})
} catch (error) {
    return NextResponse.json({message:"Error",error}.error,{
        status:500
    })
}
}