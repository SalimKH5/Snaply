import dbConnect from "@/app/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import UserModel, { IUser } from "@/app/lib/model/User";
const userModel=require("@/app/lib/model/User");
export const POST=async (req:NextRequest)=>{

    const {password,email}=await req.json();

    try {
        await dbConnect();
        const hashPassword = await bcrypt.hash(password, 10);
        const user:IUser|null=await UserModel.findOneAndUpdate(
            { email: { $regex: new RegExp('^' + email + '$', 'i') } },
            { $set: { hashPassword: hashPassword } },
            { new: true }
        )

        if(user){
            return NextResponse.json({message:"password updated succesfully"},{status:200})
        }else{
            return NextResponse.json({message:"user not found"},{status:400})

        }
    } catch (error) {
        return NextResponse.json({message:"server Error"},{status:500})

    }

 
    

}