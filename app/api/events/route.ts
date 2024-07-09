import { NextRequest, NextResponse } from "next/server";
import db from "../models/db";
import Event from "../models/Event";
import Community from "../models/Community";

export async function POST(request: NextRequest) {
  try {
    await db();
    const body = await request.json();

    const event = await Event.create(body);
    return NextResponse.json(event, { status: 201 });
  } catch (err) {
    console.log(err);
    return new NextResponse("There was an error", { status: 500 });
  }
}
export async function GET(request: NextRequest) {
  await db();
  const userId = request.nextUrl.searchParams.get("userId") as string;
  const communities = await Community.find({ "members.userId": userId }).select(
    "_id"
  );

  const events = await Event.aggregate([
    {
      $match: {
        communityId: { $in: communities.map((community) => community._id) },
        status: { $ne: "unpublished" },
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
  ]);
  return NextResponse.json(events);
}
export async function PUT(request: NextRequest) {
  try {
    await db();
    const body = await request.json();
    const updatedIEvent = await Event.findOneAndUpdate(
      { _id: body._id },
      body,
      {
        new: true,
      }
    );
    return NextResponse.json(updatedIEvent);
  } catch (err) {
    return new NextResponse("There was an error", { status: 500 });
  }
}
export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id") as string;
    await db();
    console.log(id);
    const deletedEvent = await Event.findOneAndDelete({ _id: id });
    return NextResponse.json(deletedEvent);
  } catch (err) {
    return new NextResponse("There was an error", { status: 500 });
  }
}
