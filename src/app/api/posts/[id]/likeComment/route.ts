import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/mongodb";
import PostModel from "@/app/lib/model/Post";
import { getAuthUserId, unauthorized } from "@/app/lib/security";

export const PUT = async (req: NextRequest, context: any) => {
    try {
        const userId = getAuthUserId(req);
        if (!userId) {
            const { body, init } = unauthorized();
            return NextResponse.json(body, init);
        }

        const { comment_id, liked } = await req.json();
        const { params } = context;

        await dbConnect();
        const update = liked
            ? { $addToSet: { "comments.$.likes": { userId } } }
            : { $pull: { "comments.$.likes": { userId } } };
        const post = await PostModel.findOneAndUpdate(
            { _id: params.id, "comments._id": comment_id },
            update,
            { new: true }
        );

        return NextResponse.json({ Message: "success updating comment likes", post }, { status: 200 });
    } catch (error) {
        console.error("likeComment error", error);
        return NextResponse.json({ Message: "Cannot update comment likes" }, { status: 500 });
    }
};
