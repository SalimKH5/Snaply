import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import dbConnect from "@/app/lib/mongodb";
import UserModel, { IUser } from "@/app/lib/model/User";
import { escapeRegex } from "@/app/lib/security";


export const GET = async (req: NextRequest,context:any) => {
    console.log("hello wolrd");
    try {

     const username=req?.nextUrl?.searchParams.get('username')
        console.log({username});
      
       await dbConnect();
       if(username){
        // Escaped so a crafted search string cannot run an expensive (ReDoS) pattern.
        const users=await UserModel.find({ username: { $regex: escapeRegex(username), $options: 'i' } },  'username email fullName' // Specify the fields you want to retrieve separated by a space

    ).limit(20)
            return NextResponse.json({ message: "geting user succesfully", users}, { status: 201 });
       }else{
        return NextResponse.json({ message: "need to have usernmae",}, { status: 401 });

       }
              

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
};
