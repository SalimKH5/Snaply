import { connectToDatabase } from "@/helpers/server-helpers";
import prisma from "../../../../prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
export const POST=async (req:Request)=>{
    try{
            const {email,password,fullName,username}=await req.json();
        if(!email || !email){
            return NextResponse.json({message:"Invalid Data"},{status:422})
        }
        const hashpassword=await bcrypt.hash(password,10);
        await connectToDatabase();
        
        const newUser=await prisma.user.create({
            data:{email,hashpassword,username,fullName}
        })

        return NextResponse.json({message:"user created succesfully",newUser},{status:201})


    }catch(error){
            console.log(error);
            return NextResponse.json({message:"server Error",error},{status:422})
            
    }finally{
        await prisma.$disconnect();
    }
}
