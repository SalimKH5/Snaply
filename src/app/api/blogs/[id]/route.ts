import { UpdatePost, deletePost, getById } from "@/app/lib/data";
import { NextResponse } from "next/server";

export const GET =async (req:Request,res:Response) => {
    try {
        const id =req.url.split("blogs/")[1];
        const post=getById(id);
        if(!post){
                return NextResponse.json({message:"Error"},{status:401})
        }
        return NextResponse.json({message:"OK",post},{status:200})
    } catch (error) {
        return NextResponse.json({message:"Error",error}.error,{status:500})
        
    }
}

export const PUT =async (req:Request,res:Response) => {
    try {
        const {title,desc}=await req.json();
        const id =req.url.split("blogs/")[1];
        let post=getById(id);
        if(!post){
                return NextResponse.json({message:"Error"},{status:401})
        }

         UpdatePost(id,title,desc)


        return NextResponse.json({message:"OK"},{status:200})
    } catch (error) {
        return NextResponse.json({message:"Error",error}.error,{status:500})
        
    }
}


export const DELETE =async (req:Request,res:Response) => {
    try {
                 const id =req.url.split("blogs/")[1]

                 const posts=deletePost(id);
                 return NextResponse.json({message:"OK",posts},{status:202})
    } catch (error) {
             return NextResponse.json({message:"Error",error}.error,{
                 status:500
             })
    }
}