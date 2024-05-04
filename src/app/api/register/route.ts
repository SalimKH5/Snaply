import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import dbConnect from "@/app/lib/mongodb";
import UserModel, { IUser } from "@/app/lib/model/User";

export const POST = async (req: NextRequest) => {
    try {
        const { email, password, fullName, username } = await req.json();
        if (!email || !password || !fullName || !username) {
            return NextResponse.json({ message: "Invalid Data" }, { status: 422 });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        
       
        await dbConnect();
        console.log({hashPassword})
        const newUser: IUser = await UserModel.create({
            email,
            hashPassword,
            username,
            fullName
        });

        console.log({ newUser });

        return NextResponse.json({ message: "User created successfully", newUser }, { status: 201 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Server Error", error:error }, { status: 500 });
    }
};
