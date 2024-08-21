import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import dbConnect from "@/app/lib/mongodb";
import UserModel, { IUser } from "@/app/lib/model/User";
const userModel = require("@/app/lib/model/User");
import jwt from "jsonwebtoken"
import { decrypt } from "@/app/lib/Autherisation";
export const POST = async (req: NextRequest) => {
    try {
        const { email, password, fullName, username } = await req.json();
        if (!email || !password || !fullName || !username) {
            return NextResponse.json({ message: "Invalid Data" }, { status: 422 });
        }

        const hashPassword = await bcrypt.hash(password, 10);


        await dbConnect();

        const user: IUser | null = await UserModel.findOne({ email: { $regex: new RegExp('^' + email + '$', 'i') } })
        if (!user) {
            const newUser: IUser = await UserModel.create({
                email,
                hashPassword,
                username,
                fullName
            });
            return NextResponse.json({ message: "User created successfully", newUser }, { status: 201 });
        } else {
            return NextResponse.json({ message: "the email does' alerdy exist" }, { status: 300 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Server Error", error: error }, { status: 500 });
    }
};
export const PUT = async (req: NextRequest) => {

    try {
        const auth_header = req.headers.get('authorization');
        const token: string | undefined = auth_header?.split("Bearer ")[1];
        if (!auth_header && !token) {
            return NextResponse.json({ error: "token not found" }, { status: 401 });

        }

        const decode: string | jwt.JwtPayload | null | undefined = decrypt(token);

        dbConnect();

        if (!decode || typeof (decode) == "string") {
            return NextResponse.json({ error: "not authorized" }, { status: 401 });
        }



        const { fullName, username, gender, bio } = await req.json();
        if (!fullName || !username || !gender) {
            return NextResponse.json({ message: "Invalid Data" }, { status: 422 });
        }




        await dbConnect();

        const newUser: IUser | null = await UserModel.findByIdAndUpdate(
            decode?.user?._id,
            {
                username,
                fullName,
                gender,
                bio
            },
            { new: true, runValidators: true } // This option returns the updated document
        );



        return NextResponse.json({ message: "User Updated successfully", newUser }, { status: 201 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Server Error", error: error }, { status: 500 });
    }
};
