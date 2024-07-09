import { NextRequest, NextResponse } from "next/server";
import db from "../../models/db";
import Post from "../../models/Post";
import mongoose from "mongoose";

export async function GET(request: NextRequest) {
  await db();
  const userId = request.nextUrl.searchParams.get("userId") as string;

  const posts = await Post.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },
    {
      $project: {
        _id: 1,
        title: 1,
        description: 1,
        createdAt: 1,
        updatedAt: 1,
        userId: 1,
        coverImage: 1,
        communityId: 1,
        "user._id": 1,
        "user.name": 1,
        "user.profileImage": 1,
        views: 1,
        likes: 1,
      },
    },
    {
      $sort: { createdAt: -1 },
    },
  ]);

  return NextResponse.json(posts);
}
