import dbConnect from "@/app/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import UserModel from "@/app/lib/model/User";
import { emailQuery, MIN_PASSWORD_LENGTH, verifyResetToken } from "@/app/lib/security";

export const POST = async (req: NextRequest) => {
  try {
    const { password, resetToken } = await req.json();

    // The email comes from the signed reset token issued by /api/CodeVerfication,
    // never from the request body: only someone who received the code can reset.
    const email = verifyResetToken(resetToken);
    if (!email) {
      return NextResponse.json({ message: "Invalid or expired reset session" }, { status: 401 });
    }
    if (typeof password !== "string" || password.length < MIN_PASSWORD_LENGTH) {
      return NextResponse.json(
        { message: `Password must contain at least ${MIN_PASSWORD_LENGTH} characters` },
        { status: 422 }
      );
    }

    await dbConnect();
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.findOneAndUpdate(
      { email: emailQuery(email) },
      { $set: { hashPassword } },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 400 });
    }
    return NextResponse.json({ message: "password updated succesfully" }, { status: 200 });
  } catch (error) {
    console.error("Password reset error", error);
    return NextResponse.json({ message: "server Error" }, { status: 500 });
  }
};
