
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dbConnect from "@/app/lib/mongodb";
import UserModel, { IUser } from "@/app/lib/model/User";
const  PostModel=require("@/app/lib/model/Post");
export const POST = async (req: Request) => {

    try {


        const { email, password } = await req.json();


        if (!email || !email) {
            return NextResponse.json({ message: "Invalid Data" }, { status: 422 })
        }


        await dbConnect();
        const user: IUser | null = await UserModel.findOne({ email: { $regex: new RegExp('^' + email + '$', 'i') } })
        //const user: IUser | null = await UserModel.findOne({ email: { $regex: new RegExp('^' + email + '$', 'i') } }).populate('saveposts.postId') as IUser | null;


        if (user && user?.hashPassword) {

            // Compare hashed passwords securely
            const passwordMatches = await bcrypt.compare(password, user?.hashPassword); // Use correct property name
            if (!passwordMatches) {
                return NextResponse.json({ message: "Invalid password" }, { status: 401 }); // Use 401 for Unauthorized
            } else {

                // Secret key for signing (store securely in environment variables)
                const secret: string | undefined = process.env.JWT_SECRET;

                try {
                    if (secret) {
                        const userObject = user.toObject();
                        const payload = {
                            user: {
                                ...userObject
                            }
                        };
                        const token = jwt.sign(payload, secret, { expiresIn: '1d' }); // Set expiration time


                        return NextResponse.json({
                            message: "connected succesfully",
                            user: {
                                ...userObject,
                                token
                            },
                        }, { status: 220 }); // Use 401 for Unauthorized

                    }

                } catch (error) {
                    console.error(error);
                    return NextResponse.json({ message: "error token" }, { status: 402 }); // Use 401 for Unauthorized
                }

            }
        } else {

            return NextResponse.json({ message: "User not found it" }, { status: 422 })
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "server Error", error }, { status: 500 })

    }
}
