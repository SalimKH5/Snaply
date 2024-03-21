import { UpdatePost, deletePost, getById } from "@/app/lib/data";
import { NextResponse } from "next/server";
import connectMongoDB from "@/app/lib/mongodb";
import Users from "@/models/users";
import { HydratedDocument } from "mongoose";





export const GET =async (req,res) => {
    try {

        await connectMongoDB();
        const id =req.url.split("blogs/")[1];


        const user=getById(id);
        if(!user){
                return NextResponse.json({message:"Error"},{status:401})
        }
        return NextResponse.json({message:"OK",user},{status:200})
    } catch (error) {
        return NextResponse.json({message:"Error",error}.error,{status:500})
        
    }
}


export const PUT =async (req,res) => {
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


export const DELETE =async (req,res) => {
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