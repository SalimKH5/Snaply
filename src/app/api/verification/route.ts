import dbConnect from "@/app/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/app/lib/model/User";
import { readFile } from "fs/promises";
import path from "path";
import { emailQuery, generateVerificationCode, VERIFICATION_CODE_TTL_MS } from "@/app/lib/security";

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASS,
  },
});

// Same answer whether or not the account exists, so the endpoint cannot be
// used to discover which emails are registered.
const GENERIC_RESPONSE = { Message: "If this account exists, a verification code has been sent" };

export const POST = async (req: NextRequest) => {
  try {
    const { email } = await req.json();
    const query = emailQuery(email);
    if (!query) {
      return NextResponse.json({ Message: "Email is required" }, { status: 422 });
    }

    await dbConnect();

    const code = generateVerificationCode();
    const user = await UserModel.findOneAndUpdate(
      { email: query },
      { $set: { code, codeExpires: new Date(Date.now() + VERIFICATION_CODE_TTL_MS) } },
      { new: true }
    );

    if (user) {
      let htmlContent = await readFile(path.join(process.cwd(), "public", "client-email-validation.html"), "utf8");
      htmlContent = htmlContent.replace(/\$\$VALIDATION_LINK\$\$/g, code);

      try {
        await transporter.sendMail({
          from: "Snaply",
          to: user.email,
          subject: "Snaply email verification",
          html: htmlContent,
        });
      } catch (error) {
        console.error("Failed to send verification email", error);
        return NextResponse.json({ Message: "Failed to send email" }, { status: 500 });
      }
    }

    return NextResponse.json(GENERIC_RESPONSE, { status: 200 });
  } catch (error) {
    console.error("Verification error", error);
    return NextResponse.json({ Message: "Failed" }, { status: 500 });
  }
};
