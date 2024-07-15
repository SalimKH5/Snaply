import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import dbConnect from "@/app/lib/mongodb";
import UserModel, { IUser } from "@/app/lib/model/User";
import { NextApiRequest } from "next";


export const GET = async (req: NextRequest,context:any) => {
    console.log("hello wolrd");
    try {

     const username=req?.nextUrl?.searchParams.get('username')
        console.log({username});
      
       await dbConnect();
       if(username!==""){
        const users=await UserModel.find({ username: { $regex: username, $options: 'i' } },  'username email fullName' // Specify the fields you want to retrieve separated by a space

    )
            return NextResponse.json({ message: "geting user succesfully", users}, { status: 201 });
       }else{
        return NextResponse.json({ message: "need to have usernmae",}, { status: 401 });

       }
              

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Server Error", error:error }, { status: 500 });
    }
};
