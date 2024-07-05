import dbConnect from "@/app/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import UserModel, { IUser } from "@/app/lib/model/User";
const fs = require("fs");
const readFile = promisify(fs.readFile);
import path from "path";
import { promisify } from "util";
import { SentMessageInfo } from "nodemailer";

const nodemailer = require("nodemailer");

function generateRandomString(length:number) {
    const characters = '0123456789abcdefghijklmnopqrstuvwxyz';
    let randomString = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }
  
    return randomString;
  }
  

  
  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASS,
    },
  
  });
  



  export const POST = async (req: NextRequest) => {
    try {
        const { email } = await req.json();
        
        const AdminUser = {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASS,
        };
        
        let code = generateRandomString(6);
        
        console.log({ AdminUser });
        
        await dbConnect();
        
        let user: IUser | null = await UserModel.findOne({ email: { $regex: new RegExp('^' + email + '$', 'i') } });
        
        if (user) {
            const updateUser: IUser | null  = await UserModel.findOneAndUpdate(
                { email: { $regex: new RegExp('^' + email + '$', 'i') } },
                { $set: { code: code } },
                { new: true }
            );

            if (updateUser) {
                let htmlContent = await readFile(path.join(process.cwd(), 'public', 'client-email-validation.html'), 'utf8');
                htmlContent = htmlContent.replace(/\$\$VALIDATION_LINK\$\$/g, code);

                const mailOptions = {
                    from: "Instagram clone",
                    to: email,
                    subject: "Instagram clone Email verification",
                    html: htmlContent,
                };

                try {
                    await transporter.sendMail(mailOptions);
                    return NextResponse.json({ Message: "Successfully updated user", user }, { status: 200 });
                } catch (error) {
                    console.error({ error });
                    return NextResponse.json({ Message: "Failed to send email", error }, { status: 500 });
                }
            } else {
                return NextResponse.json({ Message: "Failed to update user" }, { status: 400 });
            }
        } else {
            return NextResponse.json({ Message: "User not found" }, { status: 400 });
        }
    } catch (error) {
        console.log("Error occurred", error);
        return NextResponse.json({ Message: "Failed", error }, { status: 500 });
    }
};