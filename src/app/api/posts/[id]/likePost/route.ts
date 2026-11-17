import dbConnect from "@/app/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import PostModel from "@/app/lib/model/Post";
import { getAuthUserId, unauthorized } from "@/app/lib/security";

export const PUT = async (req: NextRequest, context: any) => {
    try {
        // The liker is always the authenticated user, never an id from the body.
        const userId = getAuthUserId(req);
        if (!userId) {
            const { body, init } = unauthorized();
            return NextResponse.json(body, init);
        }

        const { liked } = await req.json();
        const { params } = context;

        await dbConnect();
        const update = liked
            ? { $addToSet: { likes: { userId } } }
            : { $pull: { likes: { userId } } };
        const result = await PostModel.findOneAndUpdate({ _id: params.id }, update, { new: true });

        return NextResponse.json({ Message: "successfully updated likes", id: params.id, result }, { status: 200 });
    } catch (error) {
        console.error("likePost error", error);
        return NextResponse.json({ Message: "error ocurred" }, { status: 500 });
    }
}
