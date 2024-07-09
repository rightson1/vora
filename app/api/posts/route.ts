import { NextRequest, NextResponse } from "next/server";
import db from "../models/db";
import Post from "../models/Post";
import mongoose from "mongoose";
export async function POST(request: NextRequest) {
  try {
    await db();
    const body = await request.json();
    const post = await Post.create(body);
    return NextResponse.json(post, { status: 201 });
  } catch (err) {
    console.log(err);
    return new NextResponse("There was an error", { status: 500 });
  }
}
export async function GET(request: NextRequest) {
  await db();
  const communitiesIds = request.nextUrl.searchParams.get(
    "communitiesIds"
  ) as string;
  const communityIdsArray = communitiesIds
    .split(",")
    .map((id) => new mongoose.Types.ObjectId(id.trim()));

  const posts = await Post.aggregate([
    {
      $match: {
        communityId: { $in: communityIdsArray },
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
export async function PUT(request: NextRequest) {
  try {
    await db();
    const body = await request.json();
    const updatedIPost = await Post.findOneAndUpdate({ _id: body._id }, body, {
      new: true,
    });
    return NextResponse.json(updatedIPost);
  } catch (err) {
    return new NextResponse("There was an error", { status: 500 });
  }
}
export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id") as string;
    await db();
    const deletedpost = await Post.findOneAndDelete({ _id: id });
    return NextResponse.json(deletedpost);
  } catch (err) {
    return new NextResponse("There was an error", { status: 500 });
  }
}
