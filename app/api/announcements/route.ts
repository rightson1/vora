import { NextRequest, NextResponse } from "next/server";
import db from "../models/db";
import Announcement from "../models/Announcement";
import Community from "../models/Community";
import mongoose from "mongoose";

export async function POST(request: NextRequest) {
  try {
    await db();
    const body = await request.json();
    const annAnnouncement = await Announcement.create(body);
    return NextResponse.json(annAnnouncement, { status: 201 });
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

  const announcements = await Announcement.aggregate([
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
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
  ]);

  return NextResponse.json(announcements);
}
export async function PUT(request: NextRequest) {
  try {
    await db();
    const body = await request.json();
    const updatedIAnnouncement = await Announcement.findOneAndUpdate(
      { _id: body._id },
      body,
      {
        new: true,
      }
    );
    return NextResponse.json(updatedIAnnouncement);
  } catch (err) {
    return new NextResponse("There was an error", { status: 500 });
  }
}
//delete
export async function DELETE(request: NextRequest) {
  try {
    await db();
    const id = request.nextUrl.searchParams.get("id") as string;
    const deletedAnnouncement = await Announcement.findByIdAndDelete(id);
    return NextResponse.json(deletedAnnouncement);
  } catch (err) {
    return new NextResponse("There was an error", { status: 500 });
  }
}
