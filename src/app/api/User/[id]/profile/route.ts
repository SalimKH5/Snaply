import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/mongodb";
import User from "@/app/lib/model/User";
import { forbidden, getAuthUserId, toPublicUser, unauthorized } from "@/app/lib/security";

// PUT /api/User/:id/profile  { postId, savePost } — same contract as PUT /api/User/:id.
export const PUT = async (req: NextRequest, context: any) => {
    try {
        const authId = getAuthUserId(req);
        if (!authId) {
            const { body, init } = unauthorized();
            return NextResponse.json(body, init);
        }
        const { params } = context;
        if (String(params.id) !== authId) {
            const { body, init } = forbidden();
            return NextResponse.json(body, init);
        }

        const { postId, savePost } = await req.json();
        await dbConnect();
        const op = savePost ? "$addToSet" : "$pull";
        const user = await User.findOneAndUpdate(
            { _id: authId },
            { [op]: { saveposts: { postId } } },
            { new: true }
        ).populate("saveposts.postId");

        return NextResponse.json(
            { Message: savePost ? "success save post" : "success removing asave post", user: toPublicUser(user) },
            { status: 200 }
        );
    } catch (error) {
        console.error("profile save post error", error);
        return NextResponse.json({ Message: "error saving a post" }, { status: 500 });
    }
};
