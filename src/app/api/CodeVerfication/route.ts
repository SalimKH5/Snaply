import dbConnect from "@/app/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/app/lib/model/User";
import { emailQuery, signResetToken } from "@/app/lib/security";

export const POST = async (req: NextRequest) => {
  try {
    const { code, email } = await req.json();
    const query = emailQuery(email);
    if (!query || typeof code !== "string" || !code) {
      return NextResponse.json({ Message: "Error Code verification" }, { status: 400 });
    }

    await dbConnect();

    // The code is single-use: it is cleared in the same atomic update that checks it.
    const user = await UserModel.findOneAndUpdate(
      { email: query, code, codeExpires: { $gt: new Date() } },
      { $unset: { code: "", codeExpires: "" } },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ Message: "Error Code verification" }, { status: 400 });
    }

    const resetToken = signResetToken(user.email);
    if (!resetToken) {
      return NextResponse.json({ Message: "Server misconfiguration" }, { status: 500 });
    }

    return NextResponse.json({ Message: "Successfully code checked", resetToken }, { status: 200 });
  } catch (error) {
    console.error("Code verification error", error);
    return NextResponse.json({ Message: "Failed" }, { status: 500 });
  }
};
