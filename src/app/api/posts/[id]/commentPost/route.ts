import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/mongodb";
import PostModel from "@/app/lib/model/Post";
import { getAuthUserId, unauthorized } from "@/app/lib/security";

const MAX_COMMENT_LENGTH = 2200;

export const PUT = async (req: NextRequest, context: any) => {
    try {
        const userId = getAuthUserId(req);
        if (!userId) {
            const { body, init } = unauthorized();
            return NextResponse.json(body, init);
        }

        const { comment } = await req.json();
        const text = typeof comment?.TextComment === "string" ? comment.TextComment.trim() : "";
        if (!text || text.length > MAX_COMMENT_LENGTH) {
            return NextResponse.json({ Message: "Invalid comment" }, { status: 422 });
        }
        const { params } = context;

        await dbConnect();
        const post = await PostModel.findOneAndUpdate(
            { _id: params.id },
            { $push: { comments: { userId, TextComment: text } } },
            { new: true },
        );

        return NextResponse.json({ Message: "success adding a comment", post }, { status: 200 });
    } catch (error) {
        console.error("commentPost error", error);
        return NextResponse.json({ Message: "Cannot add a comment" }, { status: 500 });
    }
};
