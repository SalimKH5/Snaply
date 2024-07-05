import dbConnect from "@/app/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import UserModel, { IUser } from "@/app/lib/model/User";
export const POST = async (req: NextRequest) => {
    try {
        const { code,email } = await req.json();
        
        const user: IUser | null = await UserModel.findOne({
            email: { $regex: new RegExp(`^${email}$`, 'i') },
            code: code
          });
        
        if(user){
            const updateUser: IUser | null  = await UserModel.findOneAndUpdate(
                { email: { $regex: new RegExp('^' + email + '$', 'i') } },
                { $set: { code: "" } },
                { new: true }
            );
            return NextResponse.json({ Message: "Successfully code checked",  user}, { status: 200 });
        }else{
            return NextResponse.json({ Message: "Error Code verification" }, { status: 400 });
        }
      
    } catch (error) {
        console.log("Error occurred", error);
        return NextResponse.json({ Message: "Failed", error }, { status: 500 });
    }
};