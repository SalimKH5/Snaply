import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/mongodb";
import User from "@/app/lib/model/User";
import { getAuthUserId, toPublicUser, unauthorized } from "@/app/lib/security";

// PUT /api/User/:id/followers  { following: boolean }
// :id is the account being followed; the follower is always the authenticated user.
export const PUT = async (req: NextRequest, context: any) => {
    try {
        const authId = getAuthUserId(req);
        if (!authId) {
            const { body, init } = unauthorized();
            return NextResponse.json(body, init);
        }
        const { params } = context;
        const { following } = await req.json();
        if (String(params.id) === authId) {
            return NextResponse.json({ Message: "Invalid user to follow" }, { status: 422 });
        }

        await dbConnect();
        const op = following ? "$addToSet" : "$pull";
        const user = await User.findOneAndUpdate(
            { _id: params.id },
            { [op]: { followers: { userId: authId } } },
            { new: true }
        );
        const other = await User.findOneAndUpdate(
            { _id: authId },
            { [op]: { follwing: { userId: params.id } } },
            { new: true }
        );

        return NextResponse.json(
            following
                ? { Message: "success follow", user: toPublicUser(user), followerUser: toPublicUser(other), id: params.id }
                : { Message: "success unfollow", user: toPublicUser(user), unfollowerUser: toPublicUser(other) },
            { status: 200 }
        );
    } catch (error) {
        console.error("followers error", error);
        return NextResponse.json({ Message: "error updating followers" }, { status: 500 });
    }
};
