import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/mongodb";
import User from "@/app/lib/model/User";
import { forbidden, getAuthUserId, toPublicUser, unauthorized } from "@/app/lib/security";

// PUT /api/User/:id/following  { userId: <account to follow>, following: boolean }
// :id is the follower and must be the authenticated user.
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

        const { userId, following } = await req.json();
        if (!userId || String(userId) === authId) {
            return NextResponse.json({ Message: "Invalid user to follow" }, { status: 422 });
        }

        await dbConnect();
        const op = following ? "$addToSet" : "$pull";
        const user = await User.findOneAndUpdate(
            { _id: authId },
            { [op]: { follwing: { userId } } },
            { new: true }
        );
        const other = await User.findOneAndUpdate(
            { _id: userId },
            { [op]: { followers: { userId: authId } } },
            { new: true }
        );

        return NextResponse.json(
            following
                ? { Message: "success follow", user: toPublicUser(user), followerUser: toPublicUser(other), id: authId }
                : { Message: "success unfollow", user: toPublicUser(user), unfollowerUser: toPublicUser(other) },
            { status: 200 }
        );
    } catch (error) {
        console.error("following error", error);
        return NextResponse.json({ Message: "error updating following" }, { status: 500 });
    }
};
